import React from "react";
import { Navigate } from "react-router-dom";
import AuthLogin from "./components/Auth/Login";
import AuthRegister from "./components/Auth/Register";
import ProfilePage from "./components/ProfilePage";
import Page from "./components/Page";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import Setting from "./components/setting";

const routes = [
	{ path: "/", element: <Page /> },
	{ path: "/register", element: <AuthRegister /> },
	{ path: "/profile", element: <ProfilePage /> },
	{ path: "/login", element: <AuthLogin /> },
	{ path: "/about", element: <About /> },
	{ path: "/pricing", element: <Pricing /> },
	{ path: "/services", element: <Services /> },
	{ path: "/setting", element: <Setting /> },
];

export default routes;
