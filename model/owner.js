import mongoose from'mongoose';

const OwnerSchema = new mongoose.Schema({
    name: { type: String },
    gymName: { type: String },
    phone: { type: Number },
    gymLocation: { type: String },
    members:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Trainee'
    },
    plans:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'GymPlan'
    },
    gymImages: [
    {
      url: { type: String, required: true }, // S3 public URL
      key: { type: String, required: true }, // S3 object key (for Deletion)
      uploadedAt: { type: Date, default: Date.now },
    },
  ],

})

const Owner = mongoose.model('Owner', OwnerSchema);
export default Owner