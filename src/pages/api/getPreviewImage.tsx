import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await response.text();

    // Extract <meta property="og:image" content="...">
    const match = html.match(
      /<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i,
    );
    const previewImage = match ? match[1] : null;

    if (!previewImage) {
      return res.status(404).json({ error: "No preview image found" });
    }

    res.status(200).json({ previewImage });
  } catch (error) {
    console.error("Error fetching preview image:", error);
    res.status(500).json({ error: "Failed to retrieve preview image" });
  }
}
