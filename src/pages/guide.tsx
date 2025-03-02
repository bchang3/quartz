import React from "react";

export default function Guide() {
  return (
    <section className="w-screen flex flex-col items-center">
      <div className="w-2/3 flex flex-col gap-32 mt-6 mb-8">
        <div className="flex flex-row gap-4 items-center">
          <div className="w-1/3 flex flex-col">
            <h1 className="text-6xl font-semibold">Redefining Code Reuse</h1>
            <p className="text-2xl mt-3 text-gray-600">
              Never forget your solutions again.
            </p>
          </div>
          <div className="w-2/3">
            <img
              src="/main_page.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <div className="w-2/3">
            <img
              src="/main_page.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
          <div className="w-1/3 flex flex-col items-end">
            <h1 className="text-6xl font-semibold text-right">
              Create notes. With ease.
            </h1>
            <p className="text-2xl mt-3 text-gray-600">
              Build an AI assisted log in VS code.
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <div className="w-1/3 flex flex-col">
            <h1 className="text-6xl font-semibold">
              Your solutions. Your way.
            </h1>
            <p className="text-2xl mt-3 text-gray-600">
              Endless customization with your notes.
            </p>
          </div>
          <div className="w-2/3">
            <img
              src="/main_page.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <div className="w-2/3">
            <img
              src="/main_page.png"
              alt="Main page illustration"
              className="border"
            />
          </div>
          <div className="w-1/3 flex flex-col justify-end">
            <h1 className="text-6xl font-semibold text-right">
              Simple views. Simple finds.
            </h1>
            <p className="text-2xl mt-3 text-gray-600 text-right">
              Navigate through an intuitive network of your past conquests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
