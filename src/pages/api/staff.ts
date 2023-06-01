import Staff from "@/models/Staff";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StaffHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const createdStaff = await Staff.create(req.body);
      res.status(200).json(createdStaff);
      return;

    case "GET":
      const staff = await Staff.findOne(req.query);
      res.status(200).json(staff);

    default:
      return;
  }
}
