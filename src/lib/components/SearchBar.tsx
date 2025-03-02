import React, { useEffect, useState } from "react";
import * as emoji from "node-emoji";
import Link from "next/link";
import { getDateString, Issue } from "../utils/utils";
import { Issues } from "@/pages/tracker";

interface IssueDisplay {
  issues: Issue[];
  emojis: string[];
  showDate?: boolean;
}
function IssueDisplay({ issues, emojis, showDate = true }: IssueDisplay) {
  return (
    <div className="flex flex-col gap-1 text-base ">
      {issues.map((issue, i) => {
        return (
          <Link
            href={`/issues/${issue.id}`}
            key={i}
            className="flex flex-row justify-between py-1 hover:bg-gray-50"
          >
            <div className="flex flex-row gap-2 font-medium">
              <div>{emoji.find(emojis[i % emojis.length])?.emoji}</div>{" "}
              {issue.title}
            </div>
            {showDate && (
              <div className="text-gray-400 font-normal text-sm">
                {getDateString(issue)}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
export default function SearchBar() {
  const [issues, setIssues] = useState<Issues>({
    day: [],
    week: [],
    month: [],
  });
  const getIssues = async () => {
    const res = await fetch("/api/getissues", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setIssues(data["issues"] as Issues);
  };
  useEffect(() => {
    getIssues();
  }, []);
  const emojis = [
    "house",
    "rocket",
    "space_invader",
    "rose",
    "whale",
    "gem",
    "evergreen_tree",
    "city_sunrise",
    "mountain",
    "night_with_stars",
    "seedling",
  ];

  return (
    <div className="group w-full" tabIndex={0}>
      <div className="relative w-full">
        <div className="flex flex-row gap-2 h-12 items-center rounded-tr-sm rounded-tl-sm rounded-br-sm rounded-bl-sm group-focus:rounded-br-none group-focus-within:rounded-br-none group-focus:rounded-bl-none group-focus-within:rounded-bl-none border-gray-200 border-[1px] px-4 py-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-gray-500"
          >
            <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
          </svg>
          <input
            className="w-full outline-none"
            placeholder="Search for an issue..."
          ></input>
        </div>
        {issues.day.length + issues.month.length + issues.week.length > 0 && (
          <div className="group-focus:flex bg-white group-focus-within:flex flex-col gap-4 absolute top-0 mt-12 border-b-[1px] border-r-[1px] rounded-br-sm rounded-bl-sm border-l-[1px] border-gray-200 h-fit max-h-96 w-full p-4 hidden overflow-scroll">
            {issues.day.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-gray-400 font-semibold">Today</div>
                <IssueDisplay
                  issues={issues.day}
                  emojis={emojis.slice(0, issues.day.length)}
                  showDate={false}
                ></IssueDisplay>
              </div>
            )}

            {issues.week.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-gray-400 font-semibold">Past Week</div>
                <IssueDisplay
                  issues={issues.week}
                  emojis={emojis.slice(
                    issues.day.length,
                    issues.day.length + issues.week.length,
                  )}
                ></IssueDisplay>
              </div>
            )}

            {issues.month.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-gray-400 font-semibold">Past Month</div>
                <IssueDisplay
                  issues={issues.month}
                  emojis={emojis.slice(
                    issues.day.length + issues.week.length,
                    emojis.length,
                  )}
                ></IssueDisplay>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
