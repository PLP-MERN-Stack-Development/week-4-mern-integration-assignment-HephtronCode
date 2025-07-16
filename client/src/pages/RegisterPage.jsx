// client/src/pages/RegisterPage.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext.jsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { register } = useContext(AuthContext); // <-- Use the register function
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			await register(name, email, password);
			navigate("/"); // Redirect to homepage on successful registration
		} catch (err) {
			setError(err.response?.data?.error || "Failed to register");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10">
			<div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
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
							minLength="6"
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<Button type="submit" className="w-full">
						Register
					</Button>
				</form>
				<p className="text-center mt-4 text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-indigo-500 hover:underline">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
