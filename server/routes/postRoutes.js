import express from "express";
import {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
} from "../controller/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validationRules, validate } from "../utils/Validator.js";

const router = express.Router();

// Define routes for posts
// These routes will handle the HTTP requests for posts
router
	.route("/")
	.get(getPosts)
	.post(validationRules(), validate, protect, createPost);

// Route for a single post by ID
// This will handle requests for getting, updating, or deleting a specific post
router
	.route("/:identifier")
	.get(getPost)
	.put(validationRules(), validate, protect, updatePost)
	.delete(protect, deletePost);

export default router;
