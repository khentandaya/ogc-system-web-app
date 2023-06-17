import mongoose, { Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://kazueyah:kjH4ryRp4sF2ysc8@cluster0.irqxuw2.mongodb.net/e-ogc"
);
const schema = new mongoose.Schema(
  {
    needToImprovetheFollowing: [{type:String}],
    needsAssistance: [{type:String}],
    personalSocial: [{type:String}],
    pushedLimitsResponse: [{type:String}],
    discussProblemsWith: [{type:String}],
    iFindMyself: [{type:String}],
    cameForCounselingWhenProblem: {type:String},
    experiencedCounseling: {type:String},
    knowsTheHelpAvailable: {type:String},
    shyToAskAssistance: {type:String},
    afraidToGoGuidance: {type:String},
    student: {type:String }
  },
  { timestamps: true }
);

export default mongoose.models.studentneedsforms ||
  mongoose.model("studentneedsforms", schema);
