import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postService } from "@/services/api.js";
import { Button } from "@/components/ui/button";

const PostList = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const responseData = await postService.getAllPosts(currentPage);
				setPosts(responseData.data);
				setPagination(responseData.pagination);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [currentPage]);

	const handleNextPage = () => {
		if (pagination && currentPage < pagination.totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	if (loading) {
		return <p className="text-center text-gray-500">Loading posts...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">Error: {error}</p>;
	}

	return (
		<div>
			<h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
				Latest Posts
			</h2>
			{posts.length === 0 ? (
				<p className="text-slate-800 dark:text-white">No posts found.</p>
			) : (
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<Link key={post._id} to={`/posts/${post.slug}`}>
							<div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden h-full transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col">
								<img
									src={post.featuredImage}
									alt={post.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-6 flex flex-col flex-grow">
									<span className="inline-block bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100 text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide mb-3 self-start">
										{post.category?.name || "Uncategorized"}
									</span>
									<h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex-grow">
										{post.title}
									</h3>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}

			{pagination && pagination.totalPages > 1 && (
				<div className="flex justify-center items-center mt-8 gap-4">
					<Button onClick={handlePrevPage} disabled={currentPage === 1}>
						Previous
					</Button>
					<span className="text-lg font-semibold text-slate-800 dark:text-white">
						Page {pagination.currentPage} of {pagination.totalPages}
					</span>
					<Button
						onClick={handleNextPage}
						disabled={currentPage === pagination.totalPages}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default PostList;
