import prisma from "../../../lib/prisma";

export default async function handle(req) {
    await prisma.set.create({
      data: req.body,
    });
  }