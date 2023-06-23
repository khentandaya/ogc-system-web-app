import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc"
);
const schema = new mongoose.Schema({
  mode: { type: String },
  othercontact: { type: String },
  prefferedemail: { type: String },
  alternateemail: { type: String },
  prefferedphone: { type: String },
  student: { type: String },
  college: { type: String },
  date: { type: Date },
});
export default mongoose.models.studentappointments ||
  mongoose.model("studentappointments", schema);
