
import Owner from "../model/owner.js";
import Trainee from "../model/trainee.js";
import GymPlan from "../model/plans.js";

export const ownerHomeController = async (req, res) => {
  try {
    const owner = await Owner.findById(req.user.refId)
      .populate({
        path: "members",
        populate: {
          path: "myPlan",
          model: "GymPlan"
        }
      })
      .populate("plans");

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json(owner);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch owner data" });
  }
};

export const owneraddPlancontroller = async(req,res)=>{
  let newplandata = req.body
  
  let newPlan = await GymPlan(newplandata)
  let ownerplanAdd = await Owner.findById(req.user.refId)
  ownerplanAdd.plans.push(newPlan._id)

  ownerplanAdd.save()
  newPlan.save()

}

export const ownerGetallMember =async(req,res)=>{
  const gymMembers = await Owner.findById(req.user.refId)
      .populate({
        path: 'members',
        populate: {
          path: 'myPlan',
          model: 'GymPlan'
        }
      });

  res.status(201).json(gymMembers.members)

}


export const ownergetTraineestatus = async (req, res) => {
  try {
    let members = await Trainee.find()
      .populate("myPlan", "planName") // only fetch planName from GymPlan
      .sort({ endDate: 1 }); // soonest expiring first

    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching member status" });
  }
};

export const ownerPlandata = async(req,res)=>{
  try{
    let data = await Owner.findById(req.user.refId).populate('plans')
    console.log("Thiss is sdda",data)
    res.status(200).json(data.plans)
  }catch(e){
    res.status(500).json({message:"Failed to fetch plans"})
  }
}


