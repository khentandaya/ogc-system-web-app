import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc"
);
const schema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middleinitial: { type: String },
    idNumber: { type: String, required: true },
    contactNumber: { type: String },
    birthDate: { type: Date },
    sex: { type: String },
    homeAddress: { type: String },
    ay: { type: String },
    addressIligan: { type: String },
    citizenship: { type: String },
    civilStatus: { type: String },
    course: { type: String },
    genderIdentity: { type: String },
    leisureRecreational: { type: String },
    nickname: { type: String },
    noChildren: { type: String },
    placeOfBirth: { type: String },
    religiousAffiliation: { type: String },
    sasescore: { type: String },
    staysWith: { type: String },
    talentSkills: { type: String },
    toWhomareYouAttracted: { type: String },
    workingStudent: { type: String },
    yrlevel: { type: String },
    college: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.studentprofiles ||
  mongoose.model("studentprofiles", schema);
