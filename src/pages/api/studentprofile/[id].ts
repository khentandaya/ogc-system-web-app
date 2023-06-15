import StudentProfile from "@/models/forms/StudentProfile";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
   case "GET":
      const id = req.query.id;
      const info = await StudentProfile.findOne({ idNumber: id });
      res.status(200).json(info);
      res.end();

    default:
      return;
  }
}
