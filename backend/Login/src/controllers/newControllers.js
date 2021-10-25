const user = require("../routes/newRouter");
const registerUser = require("../models/register");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

// ENDECODE
const encodedToken = (userID) => {
  return JWT.sign(
    {
      sub: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_SECRET
  );
};

// AUTH GOOGLE
const authGoogle = async (req, res, next) => {
  const token = encodedToken(req.user._id);

  res.setHeader("Authorization", token);
  return res.status(200).json({ success: true });
};

// SECRET
const secret = async (req, res, next) => {
  return res.status(200).json({ resource: true });
};

//[User] LOGIN
const login = async (req, res, next) => {
  console.log("Called to SignIn function");
  return res.status(200).json({ resource: true });
};

// [User] REGISTER
const register = async (req, res, next) => {
  console.log("Called to SignUp function");

  const { email, password: plainTextPassword } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  // CHECK EMAIL IN DB
  const foundUser = await registerUser.findOne({ email }).exec();
  console.log("foundUser : ", foundUser);
  if (foundUser) {
    return res.status(403).json({
      error: { message: "Email is already" },
    });
  }

  // REGISTER IN MONGODB
  try {
    const newUser = new registerUser({
      email: req.body.email,
      password: req.body.password,
      verify: false,
    });

    console.log("User created successfully: ", newUser);
    const token = encodedToken(newUser._id);
    res.setHeader("Authorization", token);
    console.log(token);

    await newUser
      .save()
      .then((user) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred",
        });
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  secret,
  login,
  register,
  authGoogle,
};
