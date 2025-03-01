import os
from dotenv import load_dotenv
load_dotenv()

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from bs4 import BeautifulSoup
import requests
import re

INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")


def scrape(link: str) -> dict:
    response = requests.get(link)
    if response.status_code != 200:
        return "Failed to retrieve webpage."
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    for tag in soup.find_all(["nav", "aside", "header", "footer", "script", "style"]):
        tag.decompose()
        
    unwanted = ["sidebar", "footer"]
    for tag in soup.find_all(lambda t: t.has_attr("class")):  
        flag = False
        for substring in unwanted: 
            try:
                for string in tag["class"]:
                    if substring in string:
                        tag.decompose()
                        flag = True
                        break
            except:
                break
            if flag:
                break
        
    elements = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "code"])
    
    code_data = []
    previous_text = ""
    for element in elements:
        if element.name in ["h1", "h2", "h3", "h4", "h5", "h6", "p"]:
            previous_text = element.get_text()
        elif element.name == "code":
            code_data.append({"header": previous_text.strip(), "code": element.get_text().strip()})
            previous_text = ""
    
    content = re.sub(r"\s+", " ", soup.get_text()).strip()
    
    data = {
        "content": content,
        "code_data": code_data
    }
    
    if data:
        return data
    return "No data found"


def ingest(link: str):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vector_store = PineconeVectorStore(index=INDEX_NAME, embedding=embeddings)
    
    data = scrape(link)
    if data == "No data found":
        return "No data found"
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=50)
    
    code_namespace = f"{link}_code"
    text_namespace = f"{link}_text"

    text_documents = text_splitter.create_documents([header + "\n" + code for item in data["code_data"] for header, code in item.items()])
    code_documents = text_splitter.create_documents([data["content"]], )

    print(len(text_documents), len(code_documents))

    print("Beginning load into vectorstore")
    vector_store.from_documents(text_documents, embeddings, index_name=INDEX_NAME, namespace=text_namespace)
    vector_store.from_documents(code_documents, embeddings, index_name=INDEX_NAME, namespace=code_namespace)
    print("Loading to vectorstore done")
    

if __name__ == "__main__":
    ingest("https://www.w3schools.com/react/react_getstarted.asp")