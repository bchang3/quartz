// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";
import dotenv from "dotenv";
dotenv.config();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const code = req.query.code as string;
  const params: { [key: string]: string } = {
    client_id: process.env.GITHUB_APP_CLIENT_ID!,
    client_secret: process.env.GITHUB_APP_CLIENT_SECRET!,
    code: code,
  };
  const searchParams = new URLSearchParams(params);
  //get user access token
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: searchParams,
  });
  const data = queryString.parse(await response.text());
  //save user token

  if (data["access_token"]) {
    res.setHeader("Set-Cookie", [
      `access_token=${data["access_token"]}; HttpOnly; SameSite=Strict; Path=/; ${`Max-Age=${60 * 60 * 24 * 2}`}`,
      `logged_in=true; SameSite=Strict; Path=/; ${`Max-Age=${60 * 60 * 24 * 2}`}`,
    ]);
  }
  //redirect to main page
  res.writeHead(302, { Location: "/" });
  res.end();
}
