// client/src/layouts/MainLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext.jsx";

const MainLayout = () => {
	// Get user and logout function from context
	const { user, logout } = useContext(AuthContext);

	return (
		<div className="min-h-screen bg-slate-100 dark:bg-slate-900">
			{/* The Header and Navbar logic goes right here */}
			<header className="bg-slate-800 text-white p-4 shadow-md">
				<nav className="container mx-auto flex justify-between items-center">
					<Link
						to="/"
						className="text-xl font-bold hover:text-slate-300 transition-colors"
					>
						Blog Heron
					</Link>

					<div className="flex items-center gap-4">
						{user ? (
							<>
								<span className="font-semibold hidden sm:block">
									Welcome, {user.name}
								</span>
								<Link to="/posts/add">
									<Button variant="ghost">Create Post</Button>
								</Link>
								<Button onClick={logout} variant="ghost">
									Logout
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="ghost">Login</Button>
								</Link>
								<Link to="/register">
									<Button variant="ghost">Register</Button>
								</Link>
							</>
						)}
					</div>
				</nav>
			</header>

			{/* The main content area where child routes will render */}
			<main className="container mx-auto p-4 md:p-8">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
