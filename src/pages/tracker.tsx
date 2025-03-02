import React, { useEffect, useState } from "react";
import InfoCard from "@/lib/components/InfoCard";

interface Issue {
  title: string;
  summary: string;
  link: string;
}

interface Issues {
  day: Issue[];
  week: Issue[];
  month: Issue[];
}

export default function Tracker() {
  const [issues, setIssues] = useState<Issues>({
    day: [
      {
        title: "MongoDB Atlas Notes",
        summary:
          "The MongoDB Atlas Search Autocomplete Tutorial guides users on implementing autocomplete functionality using Atlas Search. ",
        link: "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/",
      },
      {
        title: "MongoDB Atlas Notes",
        summary:
          "The MongoDB Atlas Search Autocomplete Tutorial guides users on implementing autocomplete functionality using Atlas Search. ",
        link: "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/",
      },
      {
        title: "MongoDB Atlas Notes",
        summary:
          "The MongoDB Atlas Search Autocomplete Tutorial guides users on implementing autocomplete functionality using Atlas Search. ",
        link: "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/",
      },
      {
        title: "MongoDB Atlas Notes",
        summary:
          "The MongoDB Atlas Search Autocomplete Tutorial guides users on implementing autocomplete functionality using Atlas Search. ",
        link: "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/",
      },
      {
        title: "MongoDB Atlas Notes",
        summary:
          "The MongoDB Atlas Search Autocomplete Tutorial guides users on implementing autocomplete functionality using Atlas Search. ",
        link: "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/",
      },
    ],
    week: [],
    month: [],
  });

  useEffect(() => {}, []);

  return (
    <section className="w-screen flex flex-col items-center">
      <div className="w-2/3 flex flex-col gap-4 mt-3">
        <h1 className="text-2xl font-semibold mb-4">Today</h1>
        <div className="grid grid-cols-3 gap-x-5 gap-y-7">
          {issues.day?.map((issue: Issue, key: number) => {
            return (
              <div key={key}>
                <InfoCard
                  title={issue.title}
                  summary={issue.summary}
                  link={issue.link}
                  route=""
                />
              </div>
            );
          })}
        </div>

        <h1 className="text-2xl font-semibold my-4">Past Week</h1>
        <div className="grid grid-cols-3 gap-x-5 gap-y-7">
          {issues.week?.map((issue: Issue, key: number) => {
            return (
              <div key={key}>
                <InfoCard
                  title={issue.title}
                  summary={issue.summary}
                  link={issue.link}
                  route=""
                />
              </div>
            );
          })}
        </div>

        <h1 className="text-2xl font-semibold my-4">Past Month</h1>
        <div className="grid grid-cols-3 gap-x-5 gap-y-7">
          {issues.month?.map((issue: Issue, key: number) => {
            return (
              <div key={key}>
                <InfoCard
                  title={issue.title}
                  summary={issue.summary}
                  link={issue.link}
                  route=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
