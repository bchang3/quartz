import React from "react";
import * as emoji from "node-emoji";
import Link from "next/link";

export interface Issue {
  title: string;
  summary: string;
  notes?: string;
  links?: string[];
  date: string;
}
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
            href="/issue"
            key={i}
            className="flex flex-row justify-between py-1 hover:bg-gray-50"
          >
            <div className="flex flex-row gap-2 font-medium">
              <div>{emoji.find(emojis[i % emojis.length])?.emoji}</div>{" "}
              {issue.title}
            </div>
            {showDate && (
              <div className="text-gray-400 font-normal text-sm">
                {issue.date}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
export default function SearchBar() {
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
  const sampleTodayIssues: Issue[] = [
    { title: "Set up AWS Lightsail server", summary: "", date: "Mar 1" },
    { title: "Use a t3 stack with Next.JS", summary: "", date: "Mar 1" },
    { title: "Tailwind v4", summary: "", date: "Mar. 1" },
  ];
  const sampleWeekIssues = [
    { title: "Flask for WebSockets", summary: "", date: "Feb 27" },
    { title: "MongoDB Atlas Full Text Search", summary: "", date: "Feb 26" },
    { title: "Excalibur Javascript Game Engine", summary: "", date: "Feb 26" },
    { title: "Google Cloud Platform DB", summary: "", date: "Feb 24" },
  ];
  const sampleMonthIssues = [
    {
      title: "Kubernetes and Container Management",
      summary: "",
      date: "Feb 18",
    },
    { title: "Deploying to Vercel", summary: "", date: "Feb 14" },
    { title: "Setting Up HTTPS Backend", summary: "", date: "Feb 11" },
    { title: "Connect Arduino R4 to Wifi", summary: "", date: "Feb 7" },
  ];
  return (
    <div className="group w-full" tabIndex={0}>
      <div className="relative w-full">
        <div className="flex flex-row gap-2 rounded-tr-sm rounded-tl-sm rounded-br-sm rounded-bl-sm group-focus:rounded-br-none group-focus-within:rounded-br-none group-focus:rounded-bl-none group-focus-within:rounded-bl-none border-gray-200 border-[1px] px-4 py-2 w-full">
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
        <div className="group-focus:flex bg-white group-focus-within:flex flex-col gap-4 absolute top-0 mt-[42px] border-b-[1px] border-r-[1px] rounded-br-sm rounded-bl-sm border-l-[1px] border-gray-200 h-96 w-full p-4 hidden overflow-scroll">
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 font-semibold">Today</div>
            <IssueDisplay
              issues={sampleTodayIssues}
              emojis={emojis.slice(0, sampleTodayIssues.length)}
              showDate={false}
            ></IssueDisplay>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-gray-400 font-semibold">Past Week</div>
            <IssueDisplay
              issues={sampleWeekIssues}
              emojis={emojis.slice(
                sampleTodayIssues.length,
                sampleTodayIssues.length + sampleWeekIssues.length,
              )}
            ></IssueDisplay>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-gray-400 font-semibold">Past Month</div>
            <IssueDisplay
              issues={sampleMonthIssues}
              emojis={emojis.slice(
                sampleTodayIssues.length + sampleWeekIssues.length,
                emojis.length,
              )}
            ></IssueDisplay>
          </div>
        </div>
      </div>
    </div>
  );
}
