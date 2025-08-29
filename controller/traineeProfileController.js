import Owner from "../model/owner.js";
import Trainee from "../model/trainee.js";

export const traineeRecentJoinings = async (req, res) => {
  try {
    let traineeId = req.user.refId;
    let traineeData = await Trainee.findById(traineeId)
      .populate("pastjoinings")
      .populate("myPlan");
    res.status(200).json(traineeData);
  } catch (e) {
    console.log("Error fetching recent joinings: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getTraineeProfile = async (req, res) => {
  try {
    let traineeId = req.user.refId;
    let traineeData = await Trainee.findById(traineeId).populate("myPlan");
    res.status(200).json(traineeData);
  } catch (e) {
    console.log("Error fetching trainee profile: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editTraineeProfile = async (req, res) => {
  try {
    let traineeId = req.user.refId;
    let updatedData = req.body;

    let trainee = await Trainee.findByIdAndUpdate(traineeId, updatedData, {
        new: true,
    });

    res.status(200).json(trainee);
  } catch (e) {
    console.log("Error updating trainee profile: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
