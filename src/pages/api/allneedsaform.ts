import StudentNeedsForm from "@/models/forms/StudentNeedsForm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StaffsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const test = await StudentNeedsForm.find(req.query);
      res.status(200).json(test);

    default:
      return;
  }
}
