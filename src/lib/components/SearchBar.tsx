import React from "react";
import * as emoji from "node-emoji";
import Link from "next/link";
import { getDateString, Issue } from "../utils/utils";

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
    {
      id: "",
      title: "Set up AWS Lightsail server",
      date: new Date("2025-03-01"),
    } as Issue,
    {
      title: "Use a t3 stack with Next.JS",
      summary: "",
      date: new Date("2025-03-01"),
    } as Issue,
    {
      title: "Tailwind v4",
      summary: "",
      date: new Date("2025-03-01"),
    } as Issue,
  ];
  const sampleWeekIssues = [
    {
      title: "Flask for WebSockets",
      summary: "",
      date: new Date("2025-02-27"),
    } as Issue,
    {
      title: "MongoDB Atlas Full Text Search",
      summary: "",
      date: new Date("2025-02-26"),
    } as Issue,
    {
      title: "Excalibur Javascript Game Engine",
      summary: "",
      date: new Date("2025-02-06"),
    } as Issue,
    {
      title: "Google Cloud Platform DB",
      summary: "",
      date: new Date("2025-02-24"),
    } as Issue,
  ];
  const sampleMonthIssues = [
    {
      title: "Kubernetes and Container Management",
      summary: "",
      date: new Date("2025-02-18"),
    } as Issue,
    {
      title: "Deploying to Vercel",
      summary: "",
      date: new Date("2025-02-14"),
    } as Issue,
    {
      title: "Setting Up HTTPS Backend",
      summary: "",
      date: new Date("2025-02-11"),
    } as Issue,
    {
      title: "Connect Arduino R4 to Wifi",
      summary: "",
      date: new Date("2025-02-07"),
    } as Issue,
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
        <div className="group-focus:flex bg-white group-focus-within:flex flex-col gap-4 absolute top-0 mt-12 border-b-[1px] border-r-[1px] rounded-br-sm rounded-bl-sm border-l-[1px] border-gray-200 h-96 w-full p-4 hidden overflow-scroll">
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
