import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { postService } from "@/services/api.js";
import PostForm from "@/components/PostForm.jsx";

const EditPostPage = () => {
	const { slug } = useParams();
	const [post, setPost] = useState();
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		const fetchPostToEdit = async () => {
			try {
				const response = await postService.getPost(slug);
				setPost(response.data);
			} catch (error) {
				console.error("Failed to fetch post for editing", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPostToEdit();
	}, [slug]);

	return (
		<section className="max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
				Edit Post
			</h1>
			{loading ? (
				<p>Loading post data...</p>
			) : post ? (
				<PostForm postToEdit={post} />
			) : (
				<p>
					Post not found.{" "}
					<Link to="/" className="text-indigo-500">
						Go home
					</Link>
				</p>
			)}
		</section>
	);
};

export default EditPostPage;
