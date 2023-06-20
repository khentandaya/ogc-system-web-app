import StudentAppointment from "@/models/StudentAppointment";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StaffsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { collegeQ, ...query } = req.query;
      const test = await StudentAppointment.find({college: collegeQ});
      res.status(200).json(test);

    default:
      return;
  }
}
