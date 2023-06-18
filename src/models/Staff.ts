import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc"
);
const sched = new mongoose.Schema({ from: { type: Date }, to: { type: Date } });
const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleinital: { type: String },
  email: { type: String },
  college: { type: String },
  phone: { type: String },
  birthdate: { type: Date },
  gender: { type: String },
  address: { type: String },
  weeklysched: new mongoose.Schema({
    sun: [sched],
    mon: [sched],
    tue: [sched],
    wed: [sched],
    thu: [sched],
    fri: [sched],
    sat: [sched],
  }),
});
export default mongoose.models.staffs || mongoose.model("staffs", schema);
