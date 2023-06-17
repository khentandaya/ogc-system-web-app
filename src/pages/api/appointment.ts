import Appointment from "@/models/Appointment";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { format } from "date-fns";

export default async function AppointmentHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { startDate, endDate, student, college } = req.body;

  switch (req.method) {
    case "POST":
      const newAppointment = await Appointment.create(req.body);
      res.json(newAppointment);
      return;

    case "GET":
      const available = req.query.available === "true";
      const college = req.query.college;
      const date = req.query.date
        ? new Date(req.query.date?.toString())
        : new Date();
      date.setHours(0, 0, 0, 0);
      const endDate = new Date(date.toString());
      endDate.setHours(23, 59, 59);
      let response: any = null;

      if (available && college) {
        response = await Appointment.find({
          college,
          $or: [
            { disabled: false },
            {
              startDate: {
                $gte: date,
                $lte: endDate,
              },
            },
          ],
        });
      }

      res.json(response);
      return;

    default:
      return;
  }
}
