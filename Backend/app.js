const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing the routes to shorten and use in middleware
const UserRoutes = require("./api/routes/user");

// middleware to log incoming request
app.use(morgan("dev"));

// parse incoming request with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: false }));

// extract json data
app.use(bodyParser.json());

// CORS: Cross Origin Resource Sharing
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);

// database Connection
mongoose.connect(
	"mongodb+srv://restuser:restpswd@userauthentication.5thmeyo.mongodb.net/test",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// Setting up middleware
app.use("/user", UserRoutes);

// Error handling using predefined error object
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

// Handling all errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
