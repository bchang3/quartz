// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { db } from "@/db";
import { Octokit } from "octokit";
import { Issue } from "@/lib/utils/utils";
import { Issues } from "../tracker";
dotenv.config();

type Data = {
  issues: Issues;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const access_token = req.cookies["access_token"];
  const octokit = new Octokit({ auth: `${access_token}` });
  const { data } = await octokit.rest.users.listEmailsForAuthenticatedUser();
  const primaryEmail = data.find((email) => email.primary === true)?.email;
  const issues = await db.issue.findMany({ where: { email: primaryEmail } });
  const day_issues: Issue[] = [];
  const week_issues: Issue[] = [];
  const month_issues: Issue[] = [];
  const oneDayAgo = new Date();
  const oneWeekAgo = new Date();
  const oneMonthAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  oneWeekAgo.setDate(oneDayAgo.getDate() - 7);
  oneMonthAgo.setDate(oneMonthAgo.getMonth() - 1);

  for (const issue of issues) {
    if (issue.date > oneDayAgo) {
      day_issues.push(issue);
    } else if (issue.date > oneWeekAgo) {
      week_issues.push(issue);
    } else {
      month_issues.push(issue);
    }
  }
  const returning: Issues = {
    day: day_issues,
    month: month_issues,
    week: week_issues,
  };
  res.status(200).send({
    issues: returning,
  });
}
