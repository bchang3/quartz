import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function AddIssue() {
  const router = useRouter();
  const headerText = "Add an Issue to Quartz";
  const [email, setEmail] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLInputElement>(null);
  const getEmail = async () => {
    const res = await fetch("/api/getemail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setEmail(data["email"]);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("https://overunderdev.com/process_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        notes: notesRef?.current?.value,
        link: notesRef?.current?.value,
        title: notesRef?.current?.value,
      }),
    });
    if (res.status === 200) {
      router.push("/user/tracker");
    }
  };
  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="font-inter flex flex-col gap-8 w-5/6 mt-24">
        <h1
          className="relative w-fit font-inter
      before:absolute
      before:bg-white
      after:absolute after:inset-0 after:w-[0.125em] after:animate-blinkc
      after:bg-black text-5xl font-bold h-12"
          style={{ "--steps": headerText.length * 2 } as React.CSSProperties}
        >
          {headerText}
        </h1>
        <div className="flex flex-row justify-between w-full">
          <form
            className="font-inter flex flex-col gap-8 mt-16 w-1/2"
            onSubmit={submitHandler}
          >
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">Title</div>
              <input
                className="w-3/4 rounded-md border-gray-300 border-2 p-4 h-12"
                placeholder="Title of issue..."
                ref={titleRef}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">Reference</div>
              <input
                type="link"
                className="w-3/4 rounded-md border-gray-300 border-2 p-4 h-12"
                placeholder="Link to reference..."
                ref={linkRef}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">Notes</div>
              <input
                className="w-3/4 rounded-md border-gray-300 border-2 p-4 h-12"
                placeholder="Notes..."
                ref={notesRef}
              ></input>
            </div>
            <button className="flex flex-row items-center justify-center cursor-pointer text-black text-2xl border-black hover:bg-gray-50 border-2 p-4 rounded-md w-36 h-12">
              Save
            </button>
          </form>
          <div className="w-1/3">
            <img src="/coding.png" className="w-full h-auto"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
