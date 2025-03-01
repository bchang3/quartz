import Link from "next/link"
import React from 'react'

interface InfoCard {
  title: string;
  image: string;
  summary: string;
  link: string;  
}

export default function InfoCard({title, image, summary, link} : InfoCard) {
  return (
    <Link
      href={link}
      className="flex flex-col py-6 px-4 rounded-md border-gray-200 border-[1px] h-76 gap-4 hover:bg-gray-200"
    >
      <div className="font-semibold text-black">{title}</div>
      <div></div>
      <div>{summary}</div>
    </Link>
  )
}
