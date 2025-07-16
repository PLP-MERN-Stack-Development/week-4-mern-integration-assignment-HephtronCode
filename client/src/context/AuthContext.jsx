// client/src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { authService } from "@/services/api.js";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is already logged in (from previous session)
		const loggedInUser = authService.getCurrentUser();
		if (loggedInUser) {
			setUser(loggedInUser);
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		const responseData = await authService.login({ email, password });
		// The user object is now in responseData.data
		setUser(responseData.data);
		return responseData;
	};

	const register = async (name, email, password) => {
		const responseData = await authService.register({ name, email, password });
		// The user object is now in responseData.data
		setUser(responseData.data);
		return responseData;
	};

	const logout = () => {
		authService.logout();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, register, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
