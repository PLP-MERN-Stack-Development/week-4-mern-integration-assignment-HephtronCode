import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postService, categoryService } from "@/services/api.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PostForm = ({ postToEdit }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState("");
	const [uploading, setUploading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await categoryService.getAllCategories();
				setCategories(response.data);
			} catch (err) {
				console.error("Failed to fetch categories:", err);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		if (postToEdit) {
			setTitle(postToEdit.title);
			setContent(postToEdit.content);
			setCategoryId(postToEdit.category?._id || "");
			setImage(postToEdit.featuredImage);
		}
	}, [postToEdit]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: { "Content-Type": "multipart/form-data" },
			};
			const { data } = await axios.post("/api/upload", formData, config);
			setImage(data.image);
			setUploading(false);
		} catch (error) {
			console.error("Image upload failed:", error);
			setError("Image upload failed. Please try again.");
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !content || !categoryId) {
			setError("Please fill in all required fields.");
			return;
		}
		setIsLoading(true);
		setError(null);

		const postData = {
			title,
			content,
			category: categoryId,
			featuredImage: image,
		};

		try {
			let savedPost;
			if (postToEdit) {
				savedPost = await postService.updatePost(postToEdit._id, postData);
			} else {
				savedPost = await postService.createPost(postData);
			}
			navigate(`/posts/${savedPost.data.slug}`);
		} catch (err) {
			const errorData = err.response?.data;
			if (errorData && errorData.errors) {
				const errorMessages = errorData.errors
					.map((e) => Object.values(e)[0])
					.join(", ");
				setError(errorMessages);
			} else {
				setError(errorData?.error || "An unexpected error occurred.");
			}
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md"
		>
			<div>
				<Label htmlFor="title" className="text-slate-800 dark:text-white">
					Title
				</Label>
				<Input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					className="mt-1"
				/>
			</div>

			<div>
				<Label htmlFor="category" className="text-slate-800 dark:text-white">
					Category
				</Label>
				<Select onValueChange={setCategoryId} value={categoryId} required>
					<SelectTrigger className="mt-1">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((cat) => (
							<SelectItem key={cat._id} value={cat._id}>
								{cat.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label
					htmlFor="image-upload"
					className="text-slate-800 dark:text-white"
				>
					Featured Image
				</Label>
				<Input
					id="image-upload"
					type="file"
					onChange={uploadFileHandler}
					className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
				/>
				{uploading && (
					<p className="text-sm text-gray-500 mt-2 animate-pulse">
						Uploading image...
					</p>
				)}
				{image && !uploading && (
					<p className="text-sm text-green-600 mt-2">Image uploaded: {image}</p>
				)}
			</div>

			<div>
				<Label htmlFor="content" className="text-slate-800 dark:text-white">
					Content
				</Label>
				<Textarea
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
					rows={10}
					className="mt-1"
					placeholder="Write your post content here. You can use HTML tags like <p>, <h2>, <strong>, etc."
				/>
			</div>

			{error && (
				<p className="text-red-500 text-sm bg-red-100 p-3 rounded">{error}</p>
			)}

			<Button
				type="submit"
				disabled={isLoading || uploading}
				className="w-full"
			>
				{isLoading
					? "Saving..."
					: uploading
					? "Waiting for upload..."
					: postToEdit
					? "Update Post"
					: "Create Post"}
			</Button>
		</form>
	);
};

export default PostForm;
