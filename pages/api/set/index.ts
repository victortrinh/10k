import { NextApiRequest, NextApiResponse } from "next";
import { PostSetPrisma } from "@components/main/add-reps-form/AddRepsForm";
import prisma from "@lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const result =  await prisma.$transaction(
    req.body.map((set: PostSetPrisma) => prisma.set.create({ data: set, include: { exercise: true, user: true } }))
  );

  res.json(result);
  return result;
}
