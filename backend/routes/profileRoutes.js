import express from "express";
import {
  getProfile,
  editProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/v1/getProfile", getProfile);
router.put("/v1/editProfile", editProfile);
router.delete("/v1/deleteProfile", deleteProfile);

export default router;
