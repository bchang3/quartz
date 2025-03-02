import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { getDateString, Issue } from "../utils/utils";
import { useRouter } from "next/router";

interface IssuePageProps {
  issue: Issue;
}
export default function IssuePage({ issue }: IssuePageProps) {
  const [previewImage, setPreviewImage] = useState<string>("");
  const notesEditRef = useRef<HTMLTextAreaElement>(null);
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [notesValue, setNotesValue] = useState<string>(issue.notes);
  const editNotes = () => {
    setEditingNotes(true);
  };

  const saveNotes = async () => {
    const res = await fetch("/api/updateNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: notesValue }),
    });
    issue.notes = notesValue;
    setEditingNotes(false);
  };

  useEffect(() => {
    const fetchPreviewImage = async () => {
      try {
        const response = await fetch(
          `/api/getPreviewImage?url=${encodeURIComponent(issue.link)}`,
        );
        const data = await response.json();
        if (data.previewImage) {
          setPreviewImage(data.previewImage);
        } else {
          setPreviewImage("/coding.png");
        }
      } catch (error) {
        console.log("Error setting preview image:", error);
        setPreviewImage("/coding.png");
      }
    };
    fetchPreviewImage();
  }, [issue]);
  return (
    <div className="w-5/6 h-screen">
      <div className="flex flex-row w-full h-full justify-center">
        <div className="flex flex-col gap-12 w-[45%]">
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

          <div className="flex flex-col gap-4 w-2/3">
            <div className="text-2xl font-semibold flex flex-row justify-between w-full">
              <div className="select-none">Your Notes</div>{" "}
              {!editingNotes && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  onClick={editNotes}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              )}
              {editingNotes && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={saveNotes}
                  className={"cursor-pointer"}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10 2v3a1 1 0 0 0 1 1h5" />
                  <path d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" />
                  <path d="M18 22H4a2 2 0 0 1-2-2V6" />
                  <path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z" />
                </svg>
              )}
            </div>
            {!editingNotes && (
              <div className="text-gray-600 text-lg">{issue.notes}</div>
            )}
            {editingNotes && (
              <textarea
                ref={notesEditRef}
                className="text-black text-lg h-48 bg-gray-50 p-4 rounded-md"
                value={notesValue}
                autoFocus
                onChange={() =>
                  setNotesValue(notesEditRef?.current?.value ?? "")
                }
              ></textarea>
            )}
          </div>

          <div className="flex flex-col gap-4 w-2/3">
            <div className="text-2xl font-semibold">Summary</div>
            <div className="text-gray-600 text-lg">{issue.summary}</div>
          </div>
          <div className="flex flex-col gap-4 w-2/3">
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
        <div className="flex items-center w-[45%] h-full -mt-16">
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
                <a href={issue.link} target="_blank">
                  <img
                    src={previewImage}
                    alt={issue.title}
                    className="w-full -mt-16 cursor-pointer h-auto rounded-md hover:scale-103 shadow-md transition-transform duration-300"
                  />
                </a>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
