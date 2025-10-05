import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import Owner from "./model/owner.js";
// import Trainee from "./model/trainee.js";
// import User from "./model/user.js";
// import bcrypt, { hash } from "bcrypt";
// import jwt from "jsonwebtoken";
// import { checkToken } from "./middleware.js";
// import GymPlan from "./model/plans.js";
import dotenv from "dotenv";
import "./scheduleTask/"


dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import ownerProfileRoutes from "./routes/ownerProfile.js";
import ownerRoutes  from "./routes/ownerRoutes.js";
import traineeRoutes from "./routes/traineeRoutes.js"
import traineeProfileRoutes from "./routes/traineeProfileRoutes.js"
import OwnerImages from "./routes/ownerImage.js"

const app = express();
const port = 8080;
app.use(express.json());
const secret =
  "aljfaoiwebs-sfasdflaskwejsnsadfslknfsdbubaeanajfkejkasdownesdowerna";

app.use(
  cors({
    origin: ["http://localhost:3000", "https://workout-frontend-z6e3.vercel.app"],
    credentials: true,
  })
);

app.use("/owner/profile",ownerProfileRoutes);
app.use("/owner", ownerRoutes);
app.use("/trainee/profile",traineeProfileRoutes );
app.use("/trainee",traineeRoutes );
app.use("/gymowner",OwnerImages);
app.use("/",userRoutes)

let atlasUrl = process.env.ATLAS_URL
// let localUrl ="mongodb://127.0.0.1:27017/workout"
async function main() {
  await mongoose.connect(atlasUrl);
}

main()
  .then((res) => console.log("Connected to Database"))
  .catch((err) => console.log("Error in connecting Database ", err));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


