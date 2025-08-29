import express from "express"

import { checkToken } from "../middleware.js"
import { traineeRecentJoinings,getTraineeProfile,editTraineeProfile } from "../controller/traineeProfileController.js"

const router = express.Router()

router.get("/recent",checkToken,traineeRecentJoinings)

router.get("/mydetail",checkToken,getTraineeProfile)

router.put("/mydetail",checkToken,editTraineeProfile)



export default router;