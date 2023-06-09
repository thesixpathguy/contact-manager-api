const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
@desc register a user
@route POST /api/user/register
@access public
*/
const registerUser = asyncHandler(async (req, res) => {
  if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
    res.status(400);
    throw new Error("All fields are required to register a user.");
  }
  const { username, email, password } = req.body;
  const userAvailable = await User.findOne({ email: email }).exec();
  if (userAvailable) {
    res.status(400);
    throw new Error("User alreasy registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({ _id: newUser._id, email: newUser.email });
});

/*
@desc get current user
@route GET /api/user/current
@access private
*/
const currentUser = asyncHandler(async (req, res) => {
  if (!req?.email) {
    res.status(400);
    throw new Error("could not validate");
  }
  const user = await User.findOne({ email: req.email }).exec();
  res.status(200).json(user);
});

/*
@desc login a user
@route GET /api/user/login
@access public
*/
const loginUser = asyncHandler(async (req, res) => {
  if (!req?.body?.email || !req?.body?.password) {
    res.status(400);
    throw new Error("All fields are required to login a user.");
  }
  const { email, password } = req.body;
  const userAvailable = await User.findOne({ email: email }).exec();
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        username: userAvailable.username,
        email: userAvailable.email,
        id: userAvailable._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Credentials are wrong.");
  }
  res.sendStatus(200);
});

module.exports = { registerUser, currentUser, loginUser };
