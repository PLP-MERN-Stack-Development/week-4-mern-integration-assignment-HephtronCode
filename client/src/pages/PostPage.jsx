import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { postService } from "@/services/api.js";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext.jsx";

const PostPage = () => {
	const { slug } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await postService.getPost(slug);
				setPost(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [slug]);

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				await postService.deletePost(post._id);
				navigate("/");
			} catch (err) {
				console.error("Failed to delete post:", err);
				alert("Failed to delete post.");
			}
		}
	};

	if (loading) {
		return <p className="text-center">Loading post...</p>;
	}

	if (error || !post) {
		return (
			<div className="text-center mt-8">
				<h2 className="text-2xl font-bold">Post not found</h2>
				<p className="text-gray-600 mt-2">
					The post you are looking for does not exist.
				</p>
				<Link
					to="/"
					className="text-indigo-500 hover:underline mt-4 inline-block"
				>
					Go Back to Home
				</Link>
			</div>
		);
	}

	const cleanHtml = DOMPurify.sanitize(post.content);
	const isAuthor = user && user._id === post.author?._id;

	return (
		<article className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
			<img
				src={post.featuredImage}
				alt={post.title}
				className="w-full max-h-96 object-cover rounded-t-lg mb-6"
			/>
			<div className="flex justify-between items-start mb-4 gap-4">
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex-1">
					{post.title}
				</h1>
				{isAuthor && (
					<div className="flex gap-2">
						<Link to={`/posts/${post.slug}/edit`}>
							<Button variant="outline">Edit</Button>
						</Link>
						<Button onClick={handleDelete} variant="destructive">
							Delete
						</Button>
					</div>
				)}
			</div>

			<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-t border-slate-200 dark:border-slate-700 py-4">
				<span>
					By <strong>{post.author?.name || "Unknown Author"}</strong>
				</span>
				<span className="hidden sm:inline">•</span>
				<span>{new Date(post.createdAt).toLocaleDateString()}</span>
				<span className="hidden sm:inline">•</span>
				<Link
					to={`/categories/${post.category?.slug}`}
					className="bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
				>
					{post.category?.name || "Uncategorized"}
				</Link>
			</div>

			<div className="prose dark:prose-invert max-w-none prose-lg">
				{parse(cleanHtml)}
			</div>
		</article>
	);
};

export default PostPage;
