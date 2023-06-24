import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc");
const sched = new mongoose.Schema({ from: { type: Date }, to: { type: Date } });
const schema = new mongoose.Schema({
  staff: { type: mongoose.Types.ObjectId, ref: "staffs" },
  college: { type: String },
  sun: [sched],
  mon: [sched],
  tue: [sched],
  wed: [sched],
  thu: [sched],
  fri: [sched],
  sat: [sched],
});
export default mongoose.models.weeklyscheds || mongoose.model("weeklyscheds", schema);
