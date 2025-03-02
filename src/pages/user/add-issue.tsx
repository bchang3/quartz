import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function AddIssue() {
  const router = useRouter();
  const headerText = "Add an Issue to Quartz";
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
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
    setSubmitting(true);
    const res = await fetch("https://overunderdev.com/process_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        notes: notesRef?.current?.value,
        link: linkRef?.current?.value,
        title: titleRef?.current?.value,
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
      <div className="font-inter flex flex-col gap-8 w-5/6 mt-12 lg:mt-24">
        <h1
          className="relative w-fit font-inter
      before:absolute
      before:bg-white
      after:absolute after:inset-0 lg:after:w-[0.125em] after:w-0 after:animate-blinkc
      after:bg-black text-5xl font-bold h-12"
          style={{ "--steps": headerText.length * 2 } as React.CSSProperties}
        >
          {headerText}
        </h1>
        <div className="flex flex-row justify-between w-full">
          <form
            className="font-inter flex flex-col gap-8 mt-16 w-full lg:w-1/2"
            onSubmit={submitHandler}
          >
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">Title</div>
              <input
                className="w-full lg:w-3/4 rounded-md border-gray-300 border-2 p-4 h-12"
                placeholder="Title of issue..."
                ref={titleRef}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">Reference</div>
              <input
                type="link"
                className="w-full lg:w-3/4 rounded-md border-gray-300 border-2 p-4 h-12"
                placeholder="Link to reference..."
                ref={linkRef}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">Notes</div>
              <input
                className="w-full lg:w-3/4 rounded-md border-gray-300 border-2 p-4 h-12"
                placeholder="Notes..."
                ref={notesRef}
              ></input>
            </div>
            <button className="flex flex-row items-center justify-center cursor-pointer text-black text-2xl border-black hover:bg-gray-50 border-2 p-4 rounded-md w-36 h-12">
              {!submitting && "Save"}
              {submitting && (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-primary-gray animate-spin dark:text-gray-200 fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </button>
          </form>
          <div className="w-1/4 mr-44 hidden lg:block">
            <img src="/quartz.png" className="w-full h-auto"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
