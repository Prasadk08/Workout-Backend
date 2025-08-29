import mongoose from'mongoose';

const GymPlanSchema = new mongoose.Schema({
    gymName:{type:String},
    planName: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    features: { type: [String], required: true }
})

const GymPlan = mongoose.model('GymPlan', GymPlanSchema);
export default GymPlan;
