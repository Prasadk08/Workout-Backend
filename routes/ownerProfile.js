import express from "express"
import { ownerProfileController,ownerProfileeditController } from "../controller/ownerProfileController.js"
import { checkToken } from "../middleware.js"
import { upload } from "../config/aws.js"


const router = express.Router()

router.get("/",checkToken,ownerProfileController)

router.post("/edit",checkToken,ownerProfileeditController)


export default router;