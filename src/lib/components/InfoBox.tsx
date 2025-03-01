import Link from "next/link";
import React from "react";

interface InfoBox {
  title: string;
  content: string;
  link: string;
}
export default function InfoBox({ title, content, link }: InfoBox) {
  return (
    <Link
      href={link}
      className="flex flex-col py-8 px-4 rounded-md border-gray-200 border-[1px] w-80 h-40 gap-4 hover:bg-gray-200"
    >
      <div className="font-bold text-black">{title}</div>
      <div>{content}</div>
    </Link>
  );
}
