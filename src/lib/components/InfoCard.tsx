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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewImage = async () => {
      try {
        const response = await fetch(
          `/api/getPreviewImage?url=${encodeURIComponent(link)}`,
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
  }, [link]);

  return (
    <div>
      {previewImage !== null && (
        <Link
          href={route}
          className="flex flex-col py-6 px-4 rounded-md border-gray-200 border-[1px] gap-4 hover:bg-gray-200 justify-between hover:scale-103 shadow-md transition-transform duration-300 h-80"
        >
          <div className="font-semibold text-black text-xl">{title}</div>
          <div className="whitespace-nowrap text-ellipsis w-full overflow-hidden text-gray-500">
            {summary}
          </div>

          <div className="flex flex-col gap-3 w-full overflow-hidden">
            {previewImage && (
              <img
                src={previewImage}
                alt={title}
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        </Link>
      )}
    </div>
  );
}
