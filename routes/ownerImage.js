
import express from "express";
import { checkToken } from "../middleware.js";
import { upload } from "../config/aws.js";
import {
  uploadImageController,
//   listOwnerImages,

} from "../controller/ownerImageController.js";

const router = express.Router();


// router.get("/images", checkToken, listOwnerImages);

router.post("/upload", checkToken, upload.single("image"), uploadImageController);

export default router;
