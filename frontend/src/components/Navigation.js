import React from "react";
import logo from "../assets/logo.png";
import * as Flowbite from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation(props) {
	console.log(props);
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("accessToken");
		navigate("/login");
	};
	return (
		<Flowbite.Navbar fluid={true} rounded={false} className="bg-opacity-70">
			<Link to={"/"}>
				<Flowbite.Navbar.Brand>
					<img
						src={logo}
						className="mr-3 h-6 sm:h-9 animate-pulse"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-SM font-semibold dark:text-white">
						WEB3 CONSCORTIUM
					</span>
				</Flowbite.Navbar.Brand>
			</Link>
			<div className="flex md:order-2">
				<Flowbite.Dropdown
					arrowIcon={false}
					inline={true}
					label={
						<Flowbite.Button outline={true} gradientDuoTone="purpleToBlue">
							Account
						</Flowbite.Button>
					}
				>
					<Link to={`/profile`}>
						<Flowbite.Dropdown.Item>Profile</Flowbite.Dropdown.Item>
					</Link>
					<Link to={`/setting`}>
						<Flowbite.Dropdown.Item>Settings</Flowbite.Dropdown.Item>
					</Link>
					<Link to={``}>
						<Flowbite.Dropdown.Item>Earnings</Flowbite.Dropdown.Item>
					</Link>
					<div onClick={logout}>
						<Flowbite.Dropdown.Item>Sign out</Flowbite.Dropdown.Item>
					</div>
				</Flowbite.Dropdown>
				<Flowbite.Navbar.Toggle />
			</div>
			<Flowbite.Navbar.Collapse>
				<Link to={`/`}>
					<Flowbite.Navbar.Link active={true}>HOME</Flowbite.Navbar.Link>
				</Link>
				<Link to={`/services`}>
					<Flowbite.Navbar.Link>SERVICES</Flowbite.Navbar.Link>
				</Link>
				<Link to={`/pricing`}>
					<Flowbite.Navbar.Link>PRICING</Flowbite.Navbar.Link>
				</Link>
				<Link to={`/about`}>
					<Flowbite.Navbar.Link>ABOUT</Flowbite.Navbar.Link>
				</Link>
			</Flowbite.Navbar.Collapse>
		</Flowbite.Navbar>
	);
}
