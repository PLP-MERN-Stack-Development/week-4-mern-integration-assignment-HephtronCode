import express from "express";
import { seedDatabase } from "../controller/seederController.js";

const router = express.Router();

router.route("/").post(seedDatabase);

export default router;
