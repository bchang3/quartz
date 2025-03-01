import Link from "next/link";
import React from "react";
import { Issue } from "./SearchBar";

interface IssuePageProps {
  issue: Issue;
}
export default function IssuePage({ issue }: IssuePageProps) {
  return (
    <div className="w-5/6 h-screen">
      <div className="flex flex-row w-full h-full justify-between">
        <div className="flex flex-col gap-12 w-1/2">
          <div>
            <h1
              className="relative w-fit font-inter
before:absolute
before:bg-white
after:absolute after:inset-0 after:w-[0.125em] after:animate-blinkc
after:bg-black text-4xl font-bold h-11"
              style={
                { "--steps": issue.title.length * 2 } as React.CSSProperties
              }
            >
              {issue.title}
            </h1>{" "}
            <div className="text-xl font-light">{issue.date}</div>
          </div>

          <div className="flex flex-col gap-4 w-3/5">
            <div className="text-2xl font-semibold">Your Notes</div>
            <div className="text-gray-600">{issue.notes}</div>
          </div>

          <div className="flex flex-col gap-4 w-3/5">
            <div className="text-2xl font-semibold">Summary</div>
            <div className="text-gray-600">{issue.summary}</div>
          </div>
          <div className="flex flex-col gap-4 w-3/5">
            <div className="text-2xl font-semibold">References</div>
            <div className="text-gray-600">
              {issue.links?.map((link, i) => {
                return (
                  <a
                    key={i}
                    className="text-primary-blue"
                    target="_blank"
                    href={link}
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <embed
          src="https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/"
          className="w-1/2 h-5/6 border-gray-400 border-2"
        ></embed>
      </div>
    </div>
  );
}
