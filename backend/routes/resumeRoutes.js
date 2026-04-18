import express from "express";
import { buildResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/v1/build-resume", buildResume);

export default router;
