// server/controllers/seederController.js

import Post from "../models/post.js";
import Category from "../models/Category.js";
import User from "../models/user.js";

// @desc Seed the database with large amounts of data
// @route POST /api/seeder
// @access Private (for development purposes only)
export const seedDatabase = async (req, res, next) => {
	try {
		// --- 1. CLEAR EXISTING DATA ---
		console.log("Clearing existing data...");
		await Post.deleteMany({});
		await Category.deleteMany({});
		await User.deleteMany({});
		console.log("Existing data cleared.");

		// --- 2. SEED CATEGORIES AND USERS (Your improved version) ---
		let dummyCategories = [
			{ name: "Technology" },
			{ name: "Health" },
			{ name: "Lifestyle" },
			{ name: "Travel" },
			{ name: "Finance" },
			{ name: "Programming" },
		];

		// This is a great addition! You're pre-generating category slugs.
		dummyCategories = dummyCategories.map((category) => ({
			...category,
			slug: category.name
				.toLowerCase()
				.replace(/ & /g, "-and-")
				.replace(/[^\w-]+/g, "")
				.replace(/--+/g, "-"),
		}));

		const dummyUsers = [
			{ name: "Alice", email: "alice@example.com", password: "password123" },
			{ name: "Bob", email: "bob@example.com", password: "password123" },
			{
				name: "Charlie",
				email: "charlie@example.com",
				password: "password123",
			},
			{ name: "David", email: "david@example.com", password: "password123" },
			{ name: "Eve", email: "eve@example.com", password: "password123" },
			{ name: "Frank", email: "frankie@example.com", password: "password123" },
		];

		console.log("Inserting the categories and users...");
		const createdCategories = await Category.insertMany(dummyCategories);
		const createdUsers = await User.insertMany(dummyUsers);
		console.log("Categories and users inserted successfully.");

		// --- 3. SEED DYNAMIC DATA (Posts) ---
		console.log("Generating and inserting dynamic posts...");
		const postsToCreate = [];
		const sampleContents = [
			// Renamed from samplePost for clarity
			"This is the content for the post. It is a sample to demonstrate seeding a larger number of posts. We can add more variations later.",
			"Learning about the MERN stack is a journey. This post explores the key concepts and best practices.",
			"A discussion on the importance of state management in modern web applications. We compare different approaches.",
			"Exploring the latest features in JavaScript ES2023 and how they can improve your code.",
		];

		for (let i = 1; i <= 50; i++) {
			// Changed to 1-based loop for clarity in title
			const randomUser = createdUsers[i % createdUsers.length];
			const randomCategory = createdCategories[i % createdCategories.length];
			const randomContent = sampleContents[i % sampleContents.length];
			const title = `Sample Post #${i}`;

			// --- THIS IS THE CRITICAL FIX ---
			// Using the robust regex to create a clean, URL-friendly slug that removes the '#'.

			const slug = title
				.toLowerCase()
				.trim()
				.replace(/ & /g, "-and-") // Replace & with 'and'
				.replace(/[^\w\s-]/g, "") // Remove all non-word, non-space, non-dash characters
				.replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single dash
				.replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes

			const postData = {
				title: title,
				slug: slug, // Use the new, corrected slug
				content: `<h2>This is a Sub-Heading</h2><p>${randomContent} This is post number ${i}.</p>`,
				category: randomCategory._id,
				author: randomUser._id,
			};
			postsToCreate.push(postData);
		}

		// --- 4. INSERT ALL POSTS AT ONCE ---
		console.log("Inserting 50 posts...");
		await Post.insertMany(postsToCreate);
		console.log("50 posts inserted successfully.");

		res.status(201).json({
			success: true,
			message:
				"Database seeded successfully with categories, users, and posts.",
			data: {
				categories: createdCategories.length,
				users: createdUsers.length,
				posts: postsToCreate.length,
			},
		});
	} catch (error) {
		console.error("Error seeding the database:", error);
		res.status(500).json({
			success: false,
			message: "Failed to seed the database.",
			error: error.message,
		});
	}
};
