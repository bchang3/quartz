// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit, App } from "octokit";
import queryString from "query-string";
import dotenv from "dotenv";
dotenv.config();

type Data = {
  profileIconURL: string;
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const access_token = req.cookies["access_token"];
  const octokit = new Octokit({ auth: `${access_token}` });
  const gitUser = await octokit.rest.users.getAuthenticated();
  res.status(200).send({
    profileIconURL: `${gitUser.data.avatar_url}`,
    username: `${gitUser.data.login}`,
  });
}
