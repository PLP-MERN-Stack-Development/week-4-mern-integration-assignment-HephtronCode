import Category from "../models/Category.js";

// @desc    Get all category
// @route   GET /api/categories
// @access  Public
export const getCategory = async (req, res, next) => {
	try {
		const categories = await Category.find();
		res.status(200).json({
			success: true,
			data: categories,
			count: categories.length,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server Error",
		});
	}
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
export const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		const category = new Category({ name });
		await category.save();
		res.status(201).json({
			success: true,
			data: category,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message || "Server Error",
		});
	}
};
