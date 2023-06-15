import StudentProfile from "@/models/forms/StudentProfile";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const data = await StudentProfile.findOne({
        idNumber: req.body.idNumber,
      });
      if (data) {
        const query = { idNumber: req.body.idNumber };
        const update = await StudentProfile.findOneAndUpdate(query, req.body);
        res.status(200).json(update);
        return;
      }
      const test = await StudentProfile.create(req.body);
      res.status(200).json(test);
      return;

    case "GET":
      const id = req.query.id;
      const info = await StudentProfile.findOne({ idNumber: id });
      res.status(200).json(info);
      res.end();

    default:
      return;
  }
}
