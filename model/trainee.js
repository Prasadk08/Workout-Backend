import mongoose from 'mongoose';

const TraineeSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: Number },

    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
    age: { type: Number },
    personalInfo: { type: String },

    gymDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
    },
    myPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GymPlan',
    },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false },
    pastjoinings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PastJoining',
    }
});

const Trainee = mongoose.model('Trainee', TraineeSchema);
export default Trainee;
