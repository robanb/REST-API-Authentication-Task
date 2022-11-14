const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	birthDate: { type: Date, required: true, format: "%m-%d-%y" },
	profession: { type: String },
	password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
