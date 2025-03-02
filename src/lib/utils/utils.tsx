import { issue } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

export const gitLogInURL = `https://github.com/login/oauth/authorize?client_id=Iv23liVTGpC7fMddM5Bk`;
export type Issue = issue;

export const getDateString = (issue: Issue) => {
  if (issue.date instanceof Date) {
    return `${issue.date.toLocaleString("en-US", { month: "short" })} ${issue.date.getDate()}`;
  }
  return `${new Date(issue.date).toLocaleString("en-US", { month: "short" })} ${new Date(issue.date).getDate()}`;
};
