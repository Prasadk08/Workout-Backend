import express from "express"
import { checkToken } from "../middleware.js"
import { getAllgymController, getoneGymController, confirmJoinController} from "../controller/traineeController.js"

const router = express.Router()

router.get("/allgym",getAllgymController)

router.get("/getgyminfo/:id",getoneGymController)

router.post("/confirmjoin",checkToken,confirmJoinController)

export default router;