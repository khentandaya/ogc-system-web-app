import StudentNeedsForm from "@/models/forms/StudentNeedsForm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const test = await StudentNeedsForm.create(req.body);
      res.status(200).json(test);
      return;

    case "GET":
      const form = await StudentNeedsForm.findOne(req.query);
      res.status(200).json(form);
      return;

    default:
      return;
  }
}
