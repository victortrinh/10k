import prisma from "@lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.set.create({
    data: req.body
  });

  res.json(result);
  return result;
}
