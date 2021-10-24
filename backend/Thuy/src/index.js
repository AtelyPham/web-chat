//================Require================
const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const db = require("./config/database")
const text = require("./models/readText")
const user = require("./models/readUser")
var jwt = require('jsonwebtoken');

//========================================
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: "*",
})
var JwtSecret = '123'
//==================USE=====================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//==================DATA handler======================
db.connect()


//===============SOCKET================
io.on("connection", socket => {
  socket.on("init", (token) => {
    jwt.verify(token, JwtSecret, function(err, decoded) {
      userId = decoded.userId;
      text.find((error, data) => {
        socket.emit("init", {data,userId})
      })
    });
  })

  socket.on("sendData", ({ userId, message }) => {
    if (!userId) {
      socket.emit("error", { errorMsg: "UserId must provided!" })
    }
    else
    {
      jwt.verify(userId,JwtSecret, function(err, decoded){
        const newMessage = new text({
          text: message,
          userId: decoded.userId,
          createdAt: Date.now(),
        })
        socket.broadcast.emit("renderData", newMessage.text)
      newMessage.save()
      })
    }
  })
})

//================================
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log("App listening on port " + PORT)
})
