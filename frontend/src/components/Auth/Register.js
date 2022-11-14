import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import useScriptRef from "../../hooks/useScriptRef";
import * as Yup from "yup";
import * as Flowbite from "flowbite-react";
import { registration } from "../../accessApi/userApi";
export default function Register() {
	const scriptedRef = useScriptRef();
	const navigate = useNavigate();
	const [error, setError] = useState();
	const [showAlert, setShowAlert] = useState();
	const registers = (userData) => {
		const formdata = new FormData();
		formdata.append("name", userData.name);
		formdata.append("email", userData.email);
		formdata.append("birthDate", userData.birthDate);
		formdata.append("profession", userData.profession);
		formdata.append("password", userData.password);

		registration(formdata).then(
			(response) => {
				if (!response.status === 200) {
					throw new Error(response.status);
				} else {
					navigate("/login");
				}
			},
			(error) => {
				setError(error.response.data.message);
				setShowAlert(true);
			}
		);
	};
	return (
		<div className="h-screen w-screen overflow-hidden flex justify-center items-center from-gray-800 via-teal-900 to-gray-800 bg-gradient-to-r scroll-auto overflow-y-auto">
			<div className="container h-100 w-96 bg-opacity-60 bg-gray-900 rounded-2xl shadow-5xl hover:shadow-violet-900 mt-16">
				<div className="max-w-sm">
					<Flowbite.Card>
						<Formik
							initialValues={{
								name: "",
								email: "",
								birthDate: "",
								profession: "",
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
										registers(values);
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
										{showAlert ? (
											<div
												className={
													"text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
												}
											>
												<span className="text-xl inline-block mr-5 align-middle">
													<i className="fas fa-bell" />
												</span>
												<span className="inline-block align-middle mr-8">
													<b className="capitalize">{error}</b>
												</span>
												<button
													className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
													onClick={() => setShowAlert(false)}
												>
													<span>×</span>
												</button>
											</div>
										) : (
											<h3 className="font-bold">User Registration</h3>
										)}
									</div>

									<div>
										<div className=" block">
											<Flowbite.Label htmlFor="name" value="Full Name" />
										</div>
										<Flowbite.TextInput
											type="text"
											placeholder="Full Name"
											name="name"
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
											<Flowbite.Label htmlFor="profession" value="Profession" />
										</div>
										<Flowbite.TextInput
											type="text"
											placeholder="Profession"
											name="profession"
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
											<Flowbite.Label htmlFor="password" value="Password" />
										</div>
										<Flowbite.TextInput
											type="password"
											name="password"
											placeholder="Password"
											onBlur={handleBlur}
											onChange={handleChange}
										/>
										{touched.password && errors.password && (
											<p error className="text-red-700 font-bold">
												{errors.password}
											</p>
										)}
									</div>
									<Flowbite.Button
										type="submit"
										className="mx-16 hover:bg-orange-400 rounded-3xl"
										disabled={isSubmitting}
										value="Register"
									>
										Register
									</Flowbite.Button>
									<p className="text-black text-sm items-center">
										Already Registered?{" "}
										<Link to={`/login`}>
											<b className="hover:text-orange-400">Sign in Now!</b>
										</Link>
									</p>
								</form>
							)}
						</Formik>
					</Flowbite.Card>
				</div>
			</div>
		</div>
	);
}
