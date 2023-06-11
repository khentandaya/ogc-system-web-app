import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc"
);
const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  initals: { type: String },
  email: { type: String },
  college: { type: String },
  phone: { type: String },
  birthdate: { type: Date },
  gender: { type: String },
  address: { type: String },
});
export default mongoose.models.staffs || mongoose.model("staffs", schema);
