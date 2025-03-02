"useclient";

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface InfoCard {
  title: string;
  summary: string;
  link: string;
  route: string;
}

export default function InfoCard({ title, summary, link, route }: InfoCard) {
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    const fetchPreviewImage = async () => {
      try {
        const response = await fetch(
          `/api/getPreviewImage?url=${encodeURIComponent(link)}`,
        );
        const data = await response.json();
        if (data.previewImage) {
          setPreviewImage(data.previewImage);
        }
      } catch (error) {
        console.log("Error setting preview immage:", error);
      }
    };

    fetchPreviewImage();
  }, [link]);

  return (
    <Link
      href={route}
      className="flex flex-col py-6 px-4 rounded-md border-gray-200 border-[1px] gap-4 hover:bg-gray-200 justify-between"
    >
      <div className="font-semibold text-black text-xl">{title}</div>
      <div className="whitespace-nowrap text-ellipsis w-full overflow-hidden text-gray-500">
        {summary}
      </div>

      <div className="flex flex-col gap-3 w-full overflow-hidden">
        <img
          src={previewImage}
          alt={title}
          className="w-full h-auto rounded-md"
        />
      </div>
    </Link>
  );
}
