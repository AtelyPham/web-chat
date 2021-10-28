const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const path = require("path");
const app = express();
const db = require("./Database/data");
const NewRouter = require("./routes/newRouter");
const text = require('./models/message');
const { Server } = require("socket.io")
const { JWT_SECRET } = require('./config/jwt');
require("dotenv").config();
const passport = require("passport");
app.use(passport.initialize());

const server = http.createServer(app);
const io = new Server(server, {
    cors: "*",
  })

// ------------------------------------------------------------------------------------------
db.connect();
// passport.use(localStrategy);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", NewRouter);

io.on("connection", (socket) => {
  socket.on("init", (token) => {
    console.log(token);
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      emailID = decoded.sub;
      text.find((error, data) => {
        socket.emit("init", { data, emailID });
      });
    });
  });

  socket.on("sendData", ({ emailID, message }) => {
    if (!emailID) {
      socket.emit("error", {  error: "emailID must provided!" });
    } else {
      jwt.verify(emailID, JWT_SECRET, function (err, decoded) {
        const newMessage = new text({
          text: message,
          email: decoded.sub,
          createdAt: Date.now(),
        });
        socket.broadcast.emit("renderData", newMessage.text);
        newMessage.save();
      });
    }
  });
});


const PORT = 3500;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
// ------------------------------------------------------------------------------------------
