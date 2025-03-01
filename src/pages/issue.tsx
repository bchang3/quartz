import InfoBox from "@/lib/components/InfoBox";
import IssuePage from "@/lib/components/IssuePage";

export default function Issue() {
  return (
    <div className="font-inter w-screen flex justify-center">
      <IssuePage
        issue={{
          title: "MongoDB Atlas Full Text Search",
          links: [
            "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/",
          ],
          notes:
            "Autocomplete search using MongoDB Atlas. Need to first create search index in MongoDB Atlas with correct settings. Set autocomplete mingrams to control when autocomplete should be used (e.g. after three characters).",
          summary:
            "MongoDB Atlas Search enables real-time autocomplete functionality by creating a specialized search index with the autocomplete type on fields like title and plot, using edgeGram tokenization to generate indexable terms and folding diacritics for broader matching. After defining and building the index in the Atlas UI, you can run an autocomplete query using the MongoDB Node.js driver, leveraging the $search stage with the autocomplete operator to filter results based on partial input. This allows applications to deliver fast and accurate search suggestions as users type, enhancing the search experience.",
          date: "Feb 26",
        }}
      />
    </div>
  );
}
