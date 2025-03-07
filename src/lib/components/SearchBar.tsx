import React, { useEffect, useRef, useState } from "react";
import * as emoji from "node-emoji";
import Link from "next/link";
import { getDateString, Issue } from "../utils/utils";
import { Issues } from "@/pages/user/tracker";

interface IssueDisplay {
  issues: Issue[];
  emojis: string[];
  showDate?: boolean;
}
function IssueDisplay({ issues, emojis, showDate = true }: IssueDisplay) {
  return (
    <div className="flex flex-col gap-1 text-sm lg:text-base ">
      {issues.map((issue, i) => {
        return (
          <Link
            href={`/user/issues/${issue.id}`}
            key={i}
            className="flex flex-row justify-between gap-2 py-1 hover:bg-gray-50"
          >
            <div
              className={`flex flex-row gap-2 font-medium ${showDate ? "max-w-5/6" : "max-w-full"}`}
            >
              <div>{emoji.find(emojis[i % emojis.length])?.emoji}</div>{" "}
              {issue.title}
            </div>
            {showDate && (
              <div className="text-gray-400 font-normal text-xs lg:text-sm">
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
  const [dayIssues, setDayIssues] = useState<Issue[]>(issues.day);
  const [weekIssues, setWeekIssues] = useState<Issue[]>(issues.week);
  const [monthIssues, setMonthIssues] = useState<Issue[]>(issues.month);

  const searchBarRef = useRef<HTMLInputElement>(null);
  const getIssues = async () => {
    const res = await fetch("/api/getissues", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setIssues(data["issues"] as Issues);
    setDayIssues(data["issues"]["day"] as Issue[]);
    setMonthIssues(data["issues"]["month"] as Issue[]);
    setWeekIssues(data["issues"]["week"] as Issue[]);
  };
  useEffect(() => {
    getIssues();
  }, []);

  const updateSearch = () => {
    if (searchBarRef.current !== null) {
      setDayIssues(
        issues.day.filter((issue) => {
          return searchBarRef.current?.value
            ? issue.title
                .toLowerCase()
                .includes(searchBarRef.current?.value.toLowerCase()!)
            : true;
        }),
      );
      setWeekIssues(
        issues.week.filter((issue) => {
          return searchBarRef.current?.value
            ? issue.title
                .toLowerCase()
                .includes(searchBarRef.current?.value.toLowerCase()!)
            : true;
        }),
      );
      setMonthIssues(
        issues.month.filter((issue) => {
          return searchBarRef.current?.value
            ? issue.title
                .toLowerCase()
                .includes(searchBarRef.current?.value.toLowerCase()!)
            : true;
        }),
      );
    }
  };
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
            ref={searchBarRef}
            className="w-full outline-none"
            placeholder="Search for an issue..."
            onChange={updateSearch}
          ></input>
        </div>
        {dayIssues !== undefined &&
          weekIssues !== undefined &&
          monthIssues !== undefined &&
          dayIssues.length + monthIssues.length + weekIssues.length > 0 && (
            <div className="group-focus:flex bg-white group-focus-within:flex flex-col gap-4 absolute top-0 mt-12 border-b-[1px] border-r-[1px] rounded-br-sm rounded-bl-sm border-l-[1px] border-gray-200 h-fit max-h-96 w-full p-4 hidden overflow-scroll">
              {dayIssues.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="text-gray-400 font-semibold">Today</div>
                  <IssueDisplay
                    issues={dayIssues}
                    emojis={emojis.slice(0, dayIssues.length)}
                    showDate={false}
                  ></IssueDisplay>
                </div>
              )}

              {weekIssues.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="text-gray-400 font-semibold">Past Week</div>
                  <IssueDisplay
                    issues={issues.week}
                    emojis={emojis.slice(
                      dayIssues.length,
                      dayIssues.length + weekIssues.length,
                    )}
                  ></IssueDisplay>
                </div>
              )}

              {monthIssues.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="text-gray-400 font-semibold">Past Month</div>
                  <IssueDisplay
                    issues={monthIssues}
                    emojis={emojis.slice(
                      dayIssues.length + weekIssues.length,
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
