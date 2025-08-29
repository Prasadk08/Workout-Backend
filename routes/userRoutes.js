
import express from "express";
import { signupownController, signuptrnController, loginController } from "../controller/userController.js";


const router = express.Router()

router.post("/ownersignup",signupownController)

router.post("/traineesignup",signuptrnController)

router.post("/login",loginController)

export default router;