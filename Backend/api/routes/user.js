const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const checkToken = require("../middleware/check-auth");
const cors = require("cors");

// User Registeration Route
router.post("/signup", UserController.user_signup);

// User Authentication Route
router.post("/login", UserController.user_login);

// Get User's Details: Allow only the loggedin user ro get his/her details
router.get("/:email", checkToken, UserController.user_details);

// Update User's Details: Allow only the loggedin user ro Edit his/her details
router.patch("/:userID", checkToken, UserController.update_user);

// User Deletion Route: allow only the loggedin user to delete his/her account
router.delete("/:userID", checkToken, UserController.user_delete);

module.exports = router;
