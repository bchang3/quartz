import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { getDateString, Issue } from "../utils/utils";

interface IssuePageProps {
  issue: Issue;
}
export default function IssuePage({ issue }: IssuePageProps) {
  const [embedHTML, setEmbedHTML] = useState<string>();
  const embedRef = useRef<HTMLDivElement>(null);
  const getHTML = async () => {
      const res = await fetch(`${issue.link}`, {
        method: "GET",
      });
      const data = await res.json();
      if (embedRef.current) embedRef.current.innerHTML = data.pageContent;
    };
  
    useEffect(() => {
      getHTML();
    }, []);
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
after:bg-black text-2xl font-bold h-8"
              style={
                { "--steps": issue.title.length * 2 } as React.CSSProperties
              }
            >
              {issue.title}
            </h1>{" "}
            <div className="text-xl font-light"> {getDateString(issue)}</div>
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
              <a
                className="text-primary-blue"
                target="_blank"
                href={issue.link}
              >
                {issue.link}
              </a>
            </div>
          </div>
        </div>
        <div
          ref={embedRef}
          className="w-1/2 h-5/6 border-gray-400 border-2"
        ></div>
      </div>
    </div>
  );
}
