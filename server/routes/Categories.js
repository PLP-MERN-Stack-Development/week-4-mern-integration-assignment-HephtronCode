import express from "express";
import {
	getCategory,
	createCategory,
} from "../controller/categoryController.js";

const router = express.Router();

// Define routes
router.route("/").get(getCategory).post(createCategory);

export default router;
