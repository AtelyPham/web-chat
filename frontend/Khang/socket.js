
const express = require("express")
const http = require("http")

const app = express()
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server, {
  cors: "*",
})

const messages = []

io.on("connection", socket => {
  console.log(`New connection with id ${socket.id}`)
  socket.on("thuy", message => {
    messages.push(message)
    console.log(messages)
    socket.broadcast.emit("chat message", message)
  })

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "chat message",
      `A user with id ${socket.id} is disconnected`
    )
  })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log("Server is listening in port " + PORT))