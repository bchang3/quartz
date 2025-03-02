// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";
import dotenv from "dotenv";
dotenv.config();

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.setHeader("Set-Cookie", [
    "access_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict",
    "logged_in=; Max-Age=0; Path=/; Secure; SameSite=Strict",
  ]);
  res.status(200).send({});
}
