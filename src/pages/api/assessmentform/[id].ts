import StudentNeedsForm from "@/models/forms/StudentNeedsForm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
   case "GET":
      const id = req.query.idNumber;
      const info = await StudentNeedsForm.findOne({ student: id });
      res.status(200).json(info);
      res.end();

    default:
      return;
  }
}