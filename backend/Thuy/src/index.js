//================Require================
const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const db = require("./config/database")
const text = require("./models/readText")
const user = require("./models/readUser")

//========================================
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: "*",
})
//==================USE=====================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//==================DATA handler======================
db.connect()
//==================PROGRAM=====================
var user_auth = []

/*---------------START----------------------*/
app.get("/", (req, res, next) => {
  //   if(user_auth.length == 0 )
  res.sendFile(__dirname + "/public/login.html")
})

/*---------------Singup----------------------*/
app.get("/singup", (req, res, next) => {
  //   if(user_auth.length == 0 )
  app.use(express.static(__dirname + "/public"))
  res.sendFile(__dirname + "/public/singup.html")
})

app.post("/singup", (req, res, next) => {
  var username = req.body.username
  console.log(req.body.username)
  var password = req.body.pw
  user.findOne({ username: username }, (err, item) => {
    if (item == null) {
      // nếu trông thì do chưa có ai tạo tài khoản này
      user.create({ username: username, pw: password }, function (err, small) {
        if (err) return handleError(err)
      })
      res.sendFile(__dirname + "/public/createSuccess.html")
      req = null
    } else {
      res.sendFile(__dirname + "/public/createFail.html")
    }
  })
})

/*---------------Chat Product------------------*/
app.get("/chat", (req, res, next) => {
  res.sendFile(__dirname + "/public/login.html")
})
app.post("/chat", (req, res) => {
  user.find({ username: req.body.username, pw: req.body.pw }, (err, docs) => {
    if (docs !== user_auth) user_auth = docs
    console.log(user_auth.length)
    if (user_auth.length !== 0) {
      app.use(express.static(__dirname + "/public"))
      res.sendFile(__dirname + "/public/index.html")
    } else {
      res.sendFile(__dirname + "/public/faillogin.html")
    }
  })
})

/*---------------APIS----------------------*/
app.get("/texts", function (req, res) {
  text.find({}, function (err, docs) {
    res.json(docs)
  })
})
app.get("/users", function (req, res) {
  user.find({}, (err, users) => {
    res.json(users)
  })
})

const userId = "asdfasdfwerfgasfasdf"

//===============SOCKET================
io.on("connection", socket => {
  console.log("a user connected")

  socket.on("init", () => {
    text.find((error, data) => {
      socket.emit("init", data)
    })
  })

  socket.on("sendData", ({ userId, message }) => {
    if (!userId) {
      socket.emit("error", { errorMsg: "UserId must provided!" })
    }

    const newMessage = new text({
      text: message,
      userId: userId,
      createdAt: Date.now(),
    })

    socket.broadcast.emit("renderData", newMessage)

    newMessage.save()
  })

  socket.on("typing", data => {
    console.log(data)
    socket.emit("typer", user_auth)
  })
})

//================================
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log("App listening on port " + PORT)
})
