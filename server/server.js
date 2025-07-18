// Import required modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import models
// import "./models/user.js";
// import "./models/Post.js";
// import "./models/Category.js";

// Import routes
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categories.js";
import authRoutes from "./routes/authRoutes.js";
import seederRoutes from "./routes/seederRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the "uploads" directory
// This is useful for serving images or files uploaded by users
// __dirname provides the absolute path to the current directory
// path.join ensures the correct path format across different operating systems
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Log requests in development mode
if (process.env.NODE_ENV === "development") {
	app.use((req, res, next) => {
		console.log(`${req.method} ${req.url}`);
		next();
	});
}

// API routes
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seeder", seederRoutes);
app.use("/api/upload", uploadRoutes);

// Root route
app.get("/", (req, res) => {
	res.send("MERN Blog API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.statusCode || 500).json({
		success: false,
		error: err.message || "Server Error",
	});
});

// Connect to MongoDB and start server
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(
				`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
			);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to MongoDB", err);
		process.exit(1);
	});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.error("Unhandled Promise Rejection:", err);
	process.exit(1);
});

export default app;
