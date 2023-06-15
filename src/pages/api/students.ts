import Student from "@/models/Student";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function StudentsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      // const student = await Student.find(req.query);
      // res.status(200).json(student);
      const { search, ...query } = req.query;
      let allUsers = [];
      if (search) {
        const regex = new RegExp(`.*${search}.*`, "i");
        allUsers = await Student.find({
          $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }, { idNumber: { $regex: regex }}, { college: { $regex: regex }}],
        });
      } else allUsers = await Student.find(query);

      res.status(200).json(allUsers);
      res.end();

    default:
      return;
  }
}
