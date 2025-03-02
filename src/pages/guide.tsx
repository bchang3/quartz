import React from "react";

export default function Guide() {
  return (
    <section className="w-screen flex flex-col items-center">
      <div className="w-5/6 lg:w-3/4 flex flex-col gap-12 lg:gap-32 mt-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start lg:items-center">
          <div className="w-full lg:w-1/3 flex flex-col">
            <h1 className="text-2xl lg:text-6xl font-semibold">
              Redefining Code Reuse
            </h1>
            <p className="text-2xl mt-3 text-gray-600">
              Never forget your solutions again.
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <img
              src="/quartz_landing_search.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start lg:items-center">
          <div className="w-full lg:w-2/3">
            <img
              src="/quartz_vscode.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end">
            <h1 className="text-2xl lg:text-6xl font-semibold text-left lg:text-right">
              Create notes. With ease.
            </h1>
            <p className="text-2xl mt-3 text-gray-600">
              Build an AI assisted log in VS code.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row  gap-4 lg:gap-16 items-start lg:items-center">
          <div className="w-full lg:w-1/3 flex flex-col">
            <h1 className="text-2xl lg:text-6xl font-semibold">
              Your solutions. Your way.
            </h1>
            <p className="text-2xl mt-3 text-gray-600">
              Endless customization with your notes.
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <img
              src="/quartz_edit_entry.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start lg:items-center">
          <div className="w-full lg:w-2/3">
            <img
              src="/quartz_tracker.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col justify-end">
            <h1 className="text-2xl lg:text-6xl font-semibold text-left lg:text-right">
              Simple views. Simple finds.
            </h1>
            <p className="text-2xl mt-3 text-gray-600 text-left lg:text-right">
              Navigate through an intuitive network of your past conquests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
