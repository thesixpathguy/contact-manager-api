const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../../controllers/userController");
const verifyJWT = require("../../middleware/verifyJWT");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(verifyJWT, currentUser);

module.exports = router;
