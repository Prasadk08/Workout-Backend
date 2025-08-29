
import express from "express";
import { checkToken } from "../middleware.js";
import { ownerHomeController,ownerGetallMember,ownergetTraineestatus,owneraddPlancontroller,ownerPlandata } from "../controller/ownerController.js";
const router = express.Router()

router.get("/home",checkToken,ownerHomeController)

router.post("/addplan",checkToken,owneraddPlancontroller)

router.get("/getallmembers",checkToken,ownerGetallMember)

router.get("/status",checkToken,ownergetTraineestatus)

router.get("/plandata",checkToken,ownerPlandata)


export default router;