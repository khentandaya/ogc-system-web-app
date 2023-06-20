import StudentAppointment from "@/models/StudentAppointment";
import StudentProfile from "@/models/forms/StudentProfile";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const data = await StudentAppointment.findOne({
        idNumber: req.body.student,
      });
      if (!data) {
        const test = await StudentAppointment.create(req.body);
        res.status(200).json(test);
        return;
      }

    case "GET":
      const { collegeQ, dateQ, ...query } = req.query;

      const startDate = new Date(dateQ + "");
      const endDate = new Date(dateQ + "");
      endDate.setDate(startDate.getDate() + 1);
      

      console.log(startDate);
      const arr = await StudentAppointment.find({
        college: collegeQ,
        date: { $gte: startDate, $lt: endDate },
      });
      res.status(200).json(arr);

    default:
      return;
  }
}
