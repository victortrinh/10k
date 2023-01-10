import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.set.create({
    data: req.body
  });

  res.json(result);
  return result;
}
