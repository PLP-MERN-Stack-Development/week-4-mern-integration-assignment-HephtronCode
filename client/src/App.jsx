import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

// routes
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AddPostPage from "./pages/AddPostPage.jsx";
import EditPostPage from "./pages/EditPostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const NotFoundPage = () => (
	<h1 className="text-3xl font-bold text-slate-800 dark:text-white">
		404 Not Found
	</h1>
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route index element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="posts/:slug" element={<PostPage />} />
			<Route path="*" element={<NotFoundPage />} />

			{/* Private Routes */}
			<Route element={<PrivateRoute />}>
				<Route path="/posts/add" element={<AddPostPage />} />
				<Route path="/posts/:slug/edit" element={<EditPostPage />} />
			</Route>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
