import mongoose from "mongoose";

const PastJoiningSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainee",
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GymPlan",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

});

const PastJoining = mongoose.model("PastJoining", PastJoiningSchema);
export default PastJoining;
