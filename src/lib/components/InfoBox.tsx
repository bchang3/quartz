import Link from "next/link";
import React from "react";

interface InfoBoxProps {
  title: string;
  content: string;
  link: string;
}

export default function InfoBox({ title, content, link }: InfoBoxProps) {
  return (
    <Link
      href={link}
      className="flex flex-col py-8 px-4 rounded-md border-gray-200 border-[1px] w-96 h-48 gap-4 overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-gray-200"
    >
      <div className="font-bold text-black text-2xl">{title}</div>
      <div className="text-lg">{content}</div>
    </Link>
  );
}
