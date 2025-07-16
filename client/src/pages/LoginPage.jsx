// client/src/pages/LoginPage.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext.jsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { login } = useContext(AuthContext); // <-- Use the context!
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			await login(email, password);
			navigate("/"); // Redirect to homepage on successful login
		} catch (err) {
			setError(err.response?.data?.error || "Failed to login");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10">
			<div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
					Login
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
				<p className="text-center mt-4 text-sm">
					Don't have an account?{" "}
					<Link to="/register" className="text-indigo-500 hover:underline">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
