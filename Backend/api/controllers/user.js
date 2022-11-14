require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const checkToken = require("../middleware/check-auth");

// User registeration controller
exports.user_signup = (req, res) => {
	User.findOne({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user) {
				return res.status(409).json({
					// status(404): indicating a conflict
					message: "User Already Exist!",
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const user = new User({
							name: req.body.name,
							email: req.body.email,
							birthDate: req.body.birthDate,
							profession: req.body.profession,
							password: hash,
						});

						user.save((err, data) => {
							if (err) {
								res.status(500).json({
									error: err,
								});
							} else {
								return (
									data,
									res.status(201).json({
										message: "User Registration Successful",
									})
								);
							}
						});
					}
				});
			}
		});
};

// User Authentication Controller
exports.user_login = (req, res) => {
	User.findOne({ email: req.body.email })
		.exec()
		.then((user) => {
			if (!user) {
				// 401: Unauthorized
				return res.status(401).json({
					message: "User doesn't exist!",
				});
			}
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: "Authentication failed!",
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user.email,
							userID: user._id,
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h",
						}
					);
					return res.status(200).json({
						message: "Authentication Successful",
						token: token,
						userEmail: user.email,
					});
				}
				return res.status(401).json({
					message: "Password Didn't Match !",
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

// Get individual user's Detail
exports.user_details = (req, res) => {
	const email = req.params.email;
	const userEmail = req.userData.email.toString();
	console.log(userEmail);
	if (email != userEmail) {
		return res
			.status(403)
			.json({ message: "Forbidded, You must be a valid user !" });
	}
	if (checkToken) {
		User.find({ email: email })
			.select(" _id name email birthDate profession profileImage")
			.exec()
			.then((doc) => {
				if (doc) {
					res.status(200).json({
						user: doc,
					});
				}
			})
			.catch((err) => {
				res.status(500).json({
					error: err,
				});
			});
	}
};

// Update User's Detail
exports.update_user = (req, res) => {
	const id = req.params.userID;
	const userID = req.userData.userID.toString();
	if (userID != id) {
		return res
			.status(403)
			.json({ message: "Forbidded, You must be a valid user !" });
	}
	if (checkToken) {
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
				return res.status(500).json({
					error: err,
				});
			} else {
				let id = req.params.userID;
				let data = {
					_id: req.body._id,
					name: req.body.name,
					email: req.body.email,
					birthDate: req.body.birthDate,
					profession: req.body.profession,
					password: hash,
				};
				User.findByIdAndUpdate(id, data, function (err) {
					if (!err) {
						res.status(200).json({
							message: "User Updated Sucessfully",
						});
					} else {
						res.status(500).json({
							error: err,
						});
					}
				});
			}
		});
	}
};

// User Deletion controller
exports.user_delete = (req, res) => {
	const id = req.params.userID;
	const userID = req.userData.userID.toString();
	if (userID != id) {
		return res
			.status(403)
			.json({ message: "Forbidded, You must be a valid user !" });
	}
	if (checkToken) {
		User.deleteOne({ _id: id })
			.exec()
			.then((result) => {
				res.status(200).json({
					message: "User Deletion Successful",
				});
			})
			.catch((err) => {
				res.status(500).json({
					error: err,
				});
			});
	} else {
		res.status(401).json({
			message: "You must be logged in to delete you Account !",
		});
	}
};
