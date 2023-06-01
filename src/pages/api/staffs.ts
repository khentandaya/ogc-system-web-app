import Staff from "@/models/Staff";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StaffsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const staff = await Staff.find(req.query);
      res.status(200).json(staff);

    default:
      return;
  }
}
