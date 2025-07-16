import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";

const router = express.Router();

// Define routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
