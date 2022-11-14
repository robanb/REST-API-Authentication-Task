import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "../assets/logo.png";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ProfilePage from "./ProfilePage";
import * as Flowbite from "flowbite-react";
export default function Page() {
	return (
		<div className="bg-gray-800 h-screen w-screen relative overflow-hidden flex justify-center items-center ">
			<div className="h-40-r w-40-r bg-gradient-to-r  from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse brightness-50"></div>
			<div className="h-35-r w-35-r bg-gradient-to-r  from-purple-400 via-orange-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse brightness-50	"></div>
			<div className="h-screen w-screen bg-opacity-0 backdrop-blur-sm ">
				<Navigation />
			</div>
		</div>
	);
}
