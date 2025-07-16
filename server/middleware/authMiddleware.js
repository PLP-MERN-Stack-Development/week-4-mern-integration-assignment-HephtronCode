import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
	let token;

	// Check if token is provided in headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// Find user by ID from the decoded token
			req.user = await User.findById(decoded.id).select("-password");
			next();
		} catch (error) {
			console.error("Error in authMiddleware:", error);
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	}
	if (!token) {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
};
