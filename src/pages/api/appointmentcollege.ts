import StudentAppointment from "@/models/StudentAppointment";
import StudentProfile from "@/models/forms/StudentProfile";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StaffsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { collegeQ, ...query } = req.query;

      if (collegeQ) {
        const test = await StudentAppointment.find({ college: collegeQ });
        res.status(200).json(test);
      } else {
        const appointment = await StudentAppointment.find(req.query);
        res.status(200).json(appointment);
      }

    default:
      return;
  }
}
