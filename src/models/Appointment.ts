import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc"
);
const schema = new mongoose.Schema({
  startDate: { type: Date },
  endDate: { type: Date },
  college: { type: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
  disabled: { type: Boolean },
});
export default mongoose.models.appointments ||
  mongoose.model("appointments", schema);