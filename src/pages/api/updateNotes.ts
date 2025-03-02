// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { db } from "@/db";
import { Octokit } from "octokit";
import { Issue } from "@/lib/utils/utils";
dotenv.config();

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const id = req.query.id as string;
  const access_token = req.cookies["access_token"];
  const octokit = new Octokit({ auth: `${access_token}` });
  const { data } = await octokit.rest.users.listEmailsForAuthenticatedUser();
  const primaryEmail = data.find((email) => email.primary === true)?.email;
  await db.issue.update({
    where: { email: primaryEmail, id: id },
    data: { notes: req.body.notes },
  });
  res.status(200).send({});
}
