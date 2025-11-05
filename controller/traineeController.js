import Owner from "../model/owner.js";
import Trainee from "../model/trainee.js";
import PastJoining from "../model/pastjoinings.js";
import axios from "axios";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const getAllgymController = async (req, res) => {
  let allgym = await Owner.find();
  res.status(201).json(allgym);
};

export const getoneGymController = async (req, res) => {
  let id = req.params.id;
  let gymData = await Owner.findById(id).populate("plans");
  res.status(200).json(gymData);
};

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

export const getAiWorkoutPlan = async (req, res) => {
  try {
    let userinfo = await Trainee.findById(req.user.refId);

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      temperature: 0,
      maxRetries: 2,
    });

    let data = {
      age: userinfo.age,
      gender: userinfo.gender,
      personalInfo: userinfo.personalInfo,
    };
    const aiMsg = await llm.invoke([
  [
    "system",
    `You are a professional fitness trainer and nutritionist. 
Based on the given user profile, create a simple and user-friendly daily plan.`
  ],
  [
    "human",
    `User details:
- Age: ${userinfo.age}
- Gender: ${userinfo.gender}
- Weight: ${userinfo.weight}
- Goal: ${userinfo.personalInfo}

Give the output in this exact format:

🏋 Today's Workout Plan  
- Exercise 1: [Name] — [Sets] x [Reps] (Rest: [Time])  
- Exercise 2: [Name] — [Sets] x [Reps] (Rest: [Time])  
- Exercise 3: [Name] — [Sets] x [Reps] (Rest: [Time])  

🍽 Today's Diet Plan  
- Breakfast: [Food items + quantities]  
- Lunch: [Food items + quantities]  
- Snack: [Food items + quantities]  
- Dinner: [Food items + quantities]  

💡 Motivational Tip  
1 short sentence only`
  ]
]);

    // let aiResponse = await axios.post(
    //   "https://okay2.app.n8n.cloud/webhook/b0fe3ecf-0a99-41e4-974e-d8495bb72b63",
    //   data
    // );
    console.log(aiMsg.content)
    res.status(200).json(aiMsg.content);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong while generating Ai response" });
  }
};
