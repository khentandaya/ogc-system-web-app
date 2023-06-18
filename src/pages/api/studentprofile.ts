import Student from "@/models/Student";
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
      const { search, ...query } = req.query;
      let allUsers = [];
      if (search) {
        const regex = new RegExp(`.*${search}.*`, "i");
        allUsers = await StudentProfile.find({
          $or: [
            { firstname: { $regex: regex } },
            { lastname: { $regex: regex } },
            { idNumber: { $regex: regex } },
            { college: { $regex: regex } },
          ],
        });
      } else {
        const studentProfiles = await StudentProfile.find(query);
        for (const student of studentProfiles) {
          const exists = await Student.findOne({idNumber: student.idNumber});
          if (exists) allUsers.push(student);
        }
      }
      res.status(200).json(allUsers);
      res.end();

    default:
      return;
  }
}
