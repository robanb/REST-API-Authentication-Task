import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import * as Flowbite from "flowbite-react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useScriptRef from "../hooks/useScriptRef";
import * as Yup from "yup";
import { listData } from "../accessApi/userApi";
import { updateData } from "../accessApi/userApi";
import { deleteData } from "../accessApi/userApi";

export default function ProfilePage() {
	const [showEditModal, setEditModal] = React.useState(false);
	const [showDeleteModal, setDeleteModal] = React.useState(false);
	const [userData, setUserData] = useState({});

	const scriptedRef = useScriptRef();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				await listData(localStorage.getItem("userEmail")).then((response) => {
					if (!response.status === 200) throw new Error(response.status);
					else {
						setUserData(response.data.user[0]);
					}
				});
			} catch (err) {}
		})();
	}, []);

	const updateFormData = (values) => {
		updateData(values).then((response) => {
			if (!response.status === 200) throw new Error(response.status);
			else {
				setEditModal(false);
				localStorage.clear();
				navigate("/login");
			}
		});
	};

	const deleteFormData = () => {
		deleteData(userData._id).then((response) => {
			if (!response.status === 200) throw new Error(response.status);
			else {
				localStorage.clear();
				navigate("/register");
			}
		});
	};

	return (
		<div className="bg-gray-800 h-screen w-screen relative overflow-hidden flex justify-center items-center ">
			<div className="h-40-r w-40-r bg-gradient-to-r  from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse brightness-50"></div>
			<div className="h-35-r w-35-r bg-gradient-to-r  from-purple-400 via-orange-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse brightness-50	"></div>
			<div className="h-screen w-screen bg-opacity-0 backdrop-blur-sm  ">
				<Navigation />
				<div className="grid grid-cols gap-4 place-items-center">
					<div className=" h-100 w-96 bg-opacity-70 bg-gray-900 rounded-2xl shadow-5xl shadow-violet-900 mt-16 ">
						<div className="max-w-sm">
							<Flowbite.Card className="bg-opacity-70 border-violet-700">
								<div className="flex flex-col items-center pb-5">
									<Flowbite.Avatar rounded={true} />
									<h1 className="mb-1 text-4xl font-medium text-gray-900">
										{userData.name}
									</h1>
									<span className="text-sm font-bold text-gray-900 ">
										<p>Email: {userData.email}</p>
									</span>
									<span className="text-sm font-bold text-gray-900 ">
										<p>D.O.B: {userData.birthDate}</p>
									</span>
									<span className="text-sm font-bold text-gray-900 ">
										<p>Profession:{userData.profession} </p>
									</span>
									<div className="mt-4 flex space-x-3 lg:mt-6"></div>
									<div className="flex flex-row">
										<Flowbite.Button
											className="mx-10 bg-blue-700 px-4"
											onClick={() => setEditModal(true)}
										>
											Edit
										</Flowbite.Button>
										<Flowbite.Button
											className="mx-10"
											color="failure"
											onClick={() => setDeleteModal(true)}
										>
											Delete
										</Flowbite.Button>
									</div>
								</div>
							</Flowbite.Card>
						</div>
					</div>
				</div>
				{showDeleteModal ? (
					<div className="w-full justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none scroll-auto overflow-y-auto">
						<div className=" h-100 w-96 bg-opacity-60 bg-gray-900 rounded-2xl shadow-5xl hover:shadow-violet-900 mt-16">
							<div className="max-w-sm">
								<Flowbite.Card>
									<div className="flex flex-col gap-4">
										<h3 className="font-bold justify-between">
											Are you sure you want to delete your account?
										</h3>
										<div className="mt-4 flex space-x-3 lg:mt-6 items-center">
											<Flowbite.Button
												color="success"
												type="submit"
												value="yes"
												onClick={deleteFormData}
											>
												Yes
											</Flowbite.Button>
											<Flowbite.Button
												color="dark"
												type="button"
												value="no"
												onClick={() => setDeleteModal(false)}
											>
												No
											</Flowbite.Button>
										</div>
									</div>
								</Flowbite.Card>
							</div>
						</div>
					</div>
				) : null}
			</div>
			{showEditModal ? (
				<div className="w-full justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none scroll-auto overflow-y-auto">
					<div className=" h-100 w-96 bg-opacity-60 bg-gray-900 rounded-2xl shadow-5xl hover:shadow-violet-900 mt-16">
						<div className="max-w-sm">
							<Flowbite.Card>
								<Formik
									initialValues={{
										_id: userData._id,
										name: userData.name,
										email: userData.email,
										birthDate: userData.birthDate,
										profession: userData.profession,
										password: "",
										submit: null,
									}}
									validationSchema={Yup.object().shape({
										name: Yup.string()
											.required("Name is required")
											.matches(/^[A-Za-z]+([\ A-Za-z]+)*/, "Name is not valid"),
										email: Yup.string()
											.email("Must be a valid email")
											.max(255)
											.required("Email is required"),
										birthDate: Yup.string().required("DOB is required"),
										profession: Yup.string()
											.required("profession is required")
											.matches(
												/^[A-Za-z]+([\ A-Za-z]+)*/,
												"Profession is not valid"
											),

										password: Yup.string()
											.matches(
												/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
												"Password must contain at least 8 characters, one uppercase, one number and one special case character"
											)
											.required("Password is required"),
									})}
									onSubmit={async (
										values,
										{ setErrors, setStatus, setSubmitting }
									) => {
										try {
											if (scriptedRef.current) {
												setStatus({ success: true });
												updateFormData(values);
												setSubmitting(false);
											}
										} catch (err) {
											console.error(err);
											if (scriptedRef.current) {
												setStatus({ success: false });
												setErrors({ submit: err.message });
												setSubmitting(false);
											}
										}
									}}
								>
									{({
										errors,
										handleBlur,
										handleSubmit,
										handleChange,
										isSubmitting,
										touched,
										values,
									}) => (
										<form
											className="flex flex-col gap-4"
											noValidate
											onSubmit={handleSubmit}
										>
											<div className="flex flex-col gap-4 text-black items-center font-bold">
												User Update
											</div>
											<div>
												<div className=" block">
													<Flowbite.Label htmlFor="name" value="Full Name" />
												</div>
												<Flowbite.TextInput
													type="text"
													placeholder="Full Name"
													name="name"
													value={values.name}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{touched.name && errors.name && (
													<p error className="text-red-700 font-bold">
														{errors.name}
													</p>
												)}
											</div>
											<div>
												<div className=" block">
													<Flowbite.Label htmlFor="email1" value="Email" />
												</div>
												<Flowbite.TextInput
													type="text"
													placeholder="Email"
													name="email"
													value={values.email}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{touched.email && errors.email && (
													<p error className="text-red-700 font-bold">
														{errors.email}
													</p>
												)}
											</div>
											<div>
												<div className=" block">
													<Flowbite.Label htmlFor="dob" value="Date of Birth" />
												</div>
												<Flowbite.TextInput
													type="date"
													name="birthDate"
													value={values.birthDate}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{touched.birthDate && errors.birthDate && (
													<p error className="text-red-700 font-bold">
														{errors.birthDate}
													</p>
												)}
											</div>
											<div>
												<div className=" block">
													<Flowbite.Label
														htmlFor="profession"
														value="Profession"
													/>
												</div>
												<Flowbite.TextInput
													type="text"
													placeholder="Profession"
													name="profession"
													value={values.profession}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{touched.profession && errors.profession && (
													<p error className="text-red-700 font-bold">
														{errors.profession}
													</p>
												)}
											</div>
											<div>
												<div className=" block">
													<Flowbite.Label htmlFor="Password" value="Password" />
												</div>
												<Flowbite.TextInput
													type="password"
													placeholder="Password"
													name="password"
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{touched.password && errors.password && (
													<p error className="text-red-700 font-bold">
														{errors.password}
													</p>
												)}
											</div>

											<div className="mt-4 flex space-x-3 lg:mt-6 items-center">
												<Flowbite.Button
													color="success"
													type="submit"
													disabled={isSubmitting}
													value="Update"
												>
													Update
												</Flowbite.Button>
												<Flowbite.Button
													color="dark"
													type="button"
													value="no"
													onClick={() => setEditModal(false)}
												>
													Cancel
												</Flowbite.Button>
											</div>
										</form>
									)}
								</Formik>
							</Flowbite.Card>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
