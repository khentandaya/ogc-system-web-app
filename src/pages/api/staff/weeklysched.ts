import WeeklySched from "@/models/WeeklySched";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function WeeklySchedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const id = req.body.id;
      const weeklysched = JSON.parse(req.body.weeklysched);
      const exists = await WeeklySched.findOne({ staff: id });
      if (exists) {
        const setStaff = await WeeklySched.findOneAndUpdate(
          { staff: id },
          weeklysched
        );
        res.json(setStaff);
        return;
      }
      const setStaff = await WeeklySched.create({ ...weeklysched, staff: id });
      res.json(setStaff);
      return;
    case "GET":
      const getStaff = await WeeklySched.findOne({ staff: req.query.id });
      res.json(getStaff);
      return;
  }
}
