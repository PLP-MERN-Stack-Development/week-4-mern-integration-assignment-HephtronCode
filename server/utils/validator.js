import { body, validationResult } from "express-validator";

export const validationRules = () => {
	return [
		body("title")
			.trim()
			.isLength({ min: 5 })
			.withMessage("Title must be at least 5 characters long.")
			.not()
			.isEmpty()
			.withMessage("Title is required."),

		body("content")
			.trim()
			.isLength({ min: 20 })
			.withMessage("Content must be at least 20 characters long.")
			.not()
			.isEmpty()
			.withMessage("Content is required."),

		body("category")
			.not()
			.isEmpty()
			.withMessage("Category is required.")
			.isMongoId()
			.withMessage("Invalid category ID."),
	];
};

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

	return res.status(422).json({
		success: false,
		errors: extractedErrors,
	});
};
