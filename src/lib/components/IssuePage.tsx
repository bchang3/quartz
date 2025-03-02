import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { getDateString, Issue } from "../utils/utils";

interface IssuePageProps {
  issue: Issue;
}
export default function IssuePage({ issue }: IssuePageProps) {
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    const fetchPreviewImage = async () => {
      try {
        const response = await fetch(
          `/api/getPreviewImage?url=${encodeURIComponent(issue.link)}`,
        );
        const data = await response.json();
        if (data.previewImage) {
          setPreviewImage(data.previewImage);
        }
      } catch (error) {
        console.log("Error setting preview image:", error);
      }
    };
    fetchPreviewImage();
  }, [issue.link]);
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
            <div className="text-gray-600 text-lg">{issue.notes}</div>
          </div>

          <div className="flex flex-col gap-4 w-3/5">
            <div className="text-2xl font-semibold">Summary</div>
            <div className="text-gray-600 text-lg">{issue.summary}</div>
          </div>
          <div className="flex flex-col gap-4 w-3/5">
            <div className="text-2xl font-semibold">References</div>
            <div className="text-gray-600 text-lg">
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
        <div className="flex items-center w-1/2 h-full -mt-16">
          {issue.link ===
            "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/" && (
            <embed
              src={issue.link}
              className="w-full h-5/6 border-gray-400 border-2"
            ></embed>
          )}
          {issue.link !==
            "https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/" &&
            previewImage && (
              <div>
                <img
                  src={previewImage}
                  alt={issue.title}
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
