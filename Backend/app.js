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

// making the upload folder static: available to all
app.use("/uploads", express.static("uploads"));

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
mongoose.connect("mongodb://127.0.0.1:27017/user", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Adjust the Header payload to prevent CORS(Cross-Origin Resourse Sharing) error
// app.use((req, res, next) => {
// 	res.header("Allow-Control-Allow_Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
// 	);

// Checking for allowed http methods
// 	if (req.method === "OPTIONS") {
// 		res.header(
// 			"Access-Control-Allowed-Methods",
// 			"PUT, POST, PATCH, DELETE, GET"
// 		);
// 		return res.status(200).json({});
// 	}
// 	next();
// });

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
