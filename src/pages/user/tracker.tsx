import React, { useEffect, useState } from "react";
import InfoCard from "@/lib/components/InfoCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { Issue } from "@/lib/utils/utils";

export interface Issues {
  day: Issue[];
  week: Issue[];
  month: Issue[];
}

export default function Tracker() {
  const [issues, setIssues] = useState<Issues>({
    day: [],
    week: [],
    month: [],
  });

  const [carat, setCarat] = useState<{
    day: boolean;
    week: boolean;
    month: boolean;
  }>({
    day: false,
    week: false,
    month: false,
  });

  const toggleSection = (section: keyof typeof carat) => {
    setCarat((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  return (
    <section className="w-screen flex flex-col items-center">
      <div className="w-5/6 lg:w-2/3 flex flex-col gap-4 mt-3">
        {["day", "week", "month"].map((key) => (
          <div key={key}>
            <div className="flex mt-4 gap-3">
              <h1 className="text-2xl font-semibold">
                {key === "day"
                  ? "Today"
                  : key === "week"
                    ? "Past Week"
                    : "Past Month"}
              </h1>
              <motion.button
                onClick={() => toggleSection(key as keyof typeof carat)}
                className="flex items-center"
                animate={{ rotate: carat[key as keyof typeof carat] ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={
                    carat[key as keyof typeof carat]
                      ? "/chevron_down.svg"
                      : "/chevron_up.svg"
                  }
                  alt="Toggle"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </motion.button>
            </div>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-7 mt-4"
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={
                carat[key as keyof typeof carat]
                  ? { maxHeight: 0, opacity: 0, visibility: "hidden" }
                  : { maxHeight: "3000px", opacity: 1, visibility: "visible" }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {issues[key as keyof Issues].map(
                (issue: Issue, index: number) => (
                  <InfoCard
                    key={index}
                    title={issue.title}
                    summary={issue.summary}
                    link={issue.link}
                    route={`/user/issues/${issue.id}`}
                  />
                ),
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
