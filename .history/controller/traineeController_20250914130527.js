import Owner from "../model/owner.js";
import Trainee from "../model/trainee.js";
import PastJoining from "../model/pastjoinings.js";
import axios from "axios";

export const getAllgymController = async(req,res)=>{
  let allgym = await Owner.find()
  res.status(201).json(allgym)
}

export const getoneGymController = async(req,res)=>{
  let id = req.params.id
  let gymData = await Owner.findById(id).populate('plans')
  res.status(200).json(gymData)
}


export const confirmJoinController = async (req, res) => {
  try {
    // Step 1: Add trainee as member of Owner (Gym)
    const addMember = await Owner.findById(req.body.gymId);
    if (!addMember) {
      return res.status(404).json({ message: "Gym not found" });
    }
    if (!addMember.members.includes(req.user.refId)) {
      addMember.members.push(req.user.refId);
      await addMember.save();
    }

    console.log("Request is confirming ", req.user);

    // Step 2: Find trainee
    let trainee = await Trainee.findById(req.user.refId).populate("myPlan");

    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    // Step 3: If trainee already has active plan → move it to PastJoining
    if (trainee.myPlan) {
      await PastJoining.create({
        trainee: trainee._id,
        plan: trainee.myPlan._id,
        startDate: trainee.startDate,
        endDate: trainee.endDate,
      });
    }

    // Step 4: Set new plan details
    trainee.myPlan = req.body.planId;
    trainee.startDate = req.body.startDate;
    trainee.endDate = req.body.endDate;
    trainee.isActive = true;

    await trainee.save();

    // Step 5: Response
    res.status(201).json({ message: "Joined Successfully", trainee });
  } catch (error) {
    console.error("Error in confirmJoinController:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAiWorkoutPlan = async(req,res)=>{
  try{
    let userinfo = await Trainee.findById(req.user.refId)
  
    let data = {
      age:userinfo.age,
      gender:userinfo.gender,
      personalInfo:userinfo.personalInfo
    }
    let aiResponse = await axios.post("https://okay1.app.n8n.cloud/webhook/314a4f15-a1a8-4e54-8e24-225059615782",data)
    res.status(200).json(aiResponse.data)
  }catch(e){
    console.log(e)
    res.status(500).json({message:"Something went wrong while generating Ai response"})
  }
}