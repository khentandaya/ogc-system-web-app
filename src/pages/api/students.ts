import Student from "@/models/Student";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StudentsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const student = await Student.find(req.query);
      res.status(200).json(student);

    default:
      return;
  }
}
