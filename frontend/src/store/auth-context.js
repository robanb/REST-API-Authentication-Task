import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
	token: "",
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const isValidToken = (accessToken) => {
	if (!accessToken) {
		return false;
	}

	const decodedToken = jwtDecode(accessToken);
	const currentTime = Date.now() / 1000;
	return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
	if (accessToken) {
		localStorage.setItem("accessToken", accessToken);
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	} else {
		localStorage.removeItem("accessToken");
		delete axios.defaults.headers.common.Authorization;
	}
};

export const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [token, setAuth] = useState({});
	const userIsLoggedIn = !!token;
	if (Object.keys(token).length !== 0) {
		setSession(token);
	}

	const loginHandler = (token) => {
		setAuth(token);
		setSession(token);
	};

	const logoutHadler = () => {
		setAuth(null);
	};

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHadler,
	};

	useEffect(() => {
		(async () => {
			try {
				const accessToken = window.localStorage.getItem("accessToken");

				if (accessToken && isValidToken(accessToken)) {
					navigate("/");
				} else {
					navigate("/login");
				}
			} catch (err) {
				navigate("/login");
			}
		})();
	}, []);

	return (
		<AuthContext.Provider value={{ token, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
