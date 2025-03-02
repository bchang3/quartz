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
      <div className="w-2/3 flex flex-col gap-4 mt-3">
        <div className="flex mt-4 gap-3">
          <h1 className="text-2xl font-semibold">Today</h1>
          <motion.button
            onClick={() => toggleSection("day")}
            className="flex items-center"
            animate={{ rotate: carat.day ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={carat.day ? "/chevron_down.svg" : "/chevron_up.svg"}
              alt="Toggle"
              width={24}
              height={24}
            />
          </motion.button>
        </div>
        {!carat.day && (
          <motion.div
            className="grid grid-cols-3 gap-x-5 gap-y-7"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {issues.day.map((issue, key) => (
              <InfoCard
                key={key}
                title={issue.title}
                summary={issue.summary}
                link={issue.link}
                route={`/issues/${issue.id}`}
              />
            ))}
          </motion.div>
        )}

        <div className="flex mt-4 gap-3">
          <h1 className="text-2xl font-semibold">Past Week</h1>
          <motion.button
            onClick={() => toggleSection("week")}
            className="flex items-center"
            animate={{ rotate: carat.week ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={carat.week ? "/chevron_down.svg" : "/chevron_up.svg"}
              alt="Toggle"
              width={24}
              height={24}
            />
          </motion.button>
        </div>
        {!carat.week && (
          <motion.div
            className="grid grid-cols-3 gap-x-5 gap-y-7"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {issues.week.map((issue, key) => (
              <InfoCard
                key={key}
                title={issue.title}
                summary={issue.summary}
                link={issue.link}
                route={`/issues/${issue.id}`}
              />
            ))}
          </motion.div>
        )}

        <div className="flex mt-4 gap-3">
          <h1 className="text-2xl font-semibold">Past Month</h1>
          <motion.button
            onClick={() => toggleSection("month")}
            className="flex items-center"
            animate={{ rotate: carat.month ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={carat.month ? "/chevron_down.svg" : "/chevron_up.svg"}
              alt="Toggle"
              width={24}
              height={24}
            />
          </motion.button>
        </div>
        {!carat.month && (
          <motion.div
            className="grid grid-cols-3 gap-x-5 gap-y-7"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {issues.month.map((issue, key) => (
              <InfoCard
                key={key}
                title={issue.title}
                summary={issue.summary}
                link={issue.link}
                route={`/issues/${issue.id}`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
