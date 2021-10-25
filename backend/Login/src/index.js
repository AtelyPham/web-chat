const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const path = require("path");
const app = express();
const db = require("./Database/data");
const NewRouter = require("./routes/newRouter");
const loginUser = require("./models/login");
const registerUser = require("./models/register");
require("dotenv").config();
const passport = require("passport");
app.use(passport.initialize());

db.connect();
// passport.use(localStrategy);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", NewRouter);

const PORT = 3500;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
