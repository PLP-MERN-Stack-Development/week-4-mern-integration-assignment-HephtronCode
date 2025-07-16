// server/controllers/authController.js

import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Utility function to generate a token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res
				.status(400)
				.json({ success: false, error: "User with that email already exists" });
		}
		// The pre-save hook in the model will now automatically hash the password.
		const user = await User.create({ name, email, password });

		if (user) {
			const userResponse = {
				_id: user._id,
				name: user.name,
				email: user.email,
			};
			res.status(201).json({
				success: true,
				data: userResponse,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ success: false, error: "Invalid user data" });
		}
	} catch (error) {
		console.error("Registration Error:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				error: "Please provide an email and password",
			});
		}
		// Because of 'select: false', we MUST explicitly select the password here.
		const user = await User.findOne({ email }).select("+password");

		// The user.matchPassword method now handles the comparison.
		if (user && (await user.matchPassword(password))) {
			const userResponse = {
				_id: user._id,
				name: user.name,
				email: user.email,
			};
			res.json({
				success: true,
				data: userResponse,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ success: false, error: "Invalid credentials" });
		}
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};
