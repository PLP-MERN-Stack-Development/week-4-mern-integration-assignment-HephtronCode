import Post from "../models/post.js";
import mongoose from "mongoose";

// @desc    Get all posts with pagination
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page, 10) || 1; // Default to page 1
		const limit = parseInt(req.query.limit, 10) || 6; // Default to 6 posts per page
		const startIndex = (page - 1) * limit;

		const totalPosts = await Post.countDocuments(); // Get the total number of posts
		const totalPages = Math.ceil(totalPosts / limit);

		const posts = await Post.find()
			.populate("category", "name slug")
			.populate("author", "name")
			.sort({ createdAt: -1 }) // Show the newest posts first
			.skip(startIndex) // Skip posts of previous pages
			.limit(limit); // Limit the number of posts returned

		res.status(200).json({
			success: true,
			count: posts.length,
			pagination: {
				currentPage: page,
				totalPages: totalPages,
				totalPosts: totalPosts,
			},
			data: posts,
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res, next) => {
	req.body.author = req.user.id; // Example author ID

	try {
		// --- MANUAL SLUG GENERATION ---
		const slug = req.body.title
			.toLowerCase()
			.replace(/[^\w ]+/g, "")
			.replace(/ +/g, "-");

		console.log(`Manually generated slug: ${slug}`);

		const newPost = await Post.create({
			title: req.body.title,
			content: req.body.content,
			category: req.body.category,
			author: req.body.author,
			slug: slug, //
		});

		res.status(201).json({
			success: true,
			data: newPost,
		});
	} catch (error) {
		console.error("Error in createPost:", error);
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

// @desc    Get single post
// @route   GET /api/posts/:identifier
// @access  Public
export const getPost = async (req, res, next) => {
	try {
		const identifier = req.params.identifier;

		// Check if the identifier is a valid MongoDB ObjectId. If so, search by ID. Otherwise, search by slug.
		const isMongoId = mongoose.Types.ObjectId.isValid(identifier);
		const query = isMongoId ? { _id: identifier } : { slug: identifier };

		const post = await Post.findOne(query) // Use findOne() for flexibility
			.populate("category", "name slug")
			.populate("author", "name email");

		if (!post) {
			return res.status(404).json({ success: false, error: "Post not found" });
		}

		res.status(200).json({ success: true, data: post });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res, next) => {
	try {
		let post = await Post.findById(req.params.identifier);
		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}
		const body = { ...req.body };
		if (body.title) {
			body.slug = body.title
				.toLowerCase()
				.replace(/[^\w ]+/g, "")
				.replace(/ +/g, "-");
		}
		post = await Post.findByIdAndUpdate(req.params.identifier, body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			success: true,
			data: post,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message || "Server Error",
		});
	}
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}
		await post.deleteOne();
		res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message || "Server Error",
		});
	}
};
