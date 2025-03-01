import os
from dotenv import load_dotenv

from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from ingestion import ingest

load_dotenv()
INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")


def generate_summary(link: str):
    ingest(link)

    embeddings = OpenAIEmbeddings(api_key=os.environ["OPENAI_API_KEY"])

    primary_vectorstore = PineconeVectorStore.from_existing_index(index_name=INDEX_NAME,embedding=embeddings,namespace=f"{link}_code")
    secondary_vectorstore = PineconeVectorStore.from_existing_index(index_name=INDEX_NAME,embedding=embeddings,namespace=f"{link}_text")

    primary_retriever = primary_vectorstore.as_retriever()
    secondary_retriever = secondary_vectorstore.as_retriever()

    primary_docs = primary_retriever.invoke(link)
    secondary_docs = secondary_retriever.invoke(link)

    weighted_docs = primary_docs + [doc for doc in secondary_docs for _ in range(int(0.8 * len(primary_docs)))]

    template = """
    You writing from the persepctive of a sotware engineer that is taking notes. Given the following retrieved documents, summarize the key insights from the website regarding the technology, implementation, key information, and specific examples. Focus specifically on what the website does and the content held within the website and not general details. When talking about code examples, reference their headers.

    Website: {website}
    Retrieved Context: {context}

    Limit the summary to 100 words and remove all unrelated content such as information the website hold in regards to footers, nav, menus etc.. 
    """
    
    prompt_template = PromptTemplate(
        template=template,
        input_variables=["website", "context"]
    )

    llm = ChatOpenAI(api_key=os.environ["OPENAI_API_KEY"], temperature=0, model_name="gpt-4o-mini")

    document_chain = create_stuff_documents_chain(llm, prompt_template)
    retrieval_chain = create_retrieval_chain(primary_retriever, document_chain)

    result = retrieval_chain.invoke({
        "input": template,
        "website": link, 
        "context": "\n\n".join([doc.page_content for doc in weighted_docs])
    })
    
    return {"answer": result["answer"]}


if __name__ == "__main__":
    summary = generate_summary("https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/")
    print(summary["answer"])
