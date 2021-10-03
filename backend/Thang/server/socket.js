const express = require('express');
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const mongoose = require("mongoose");
const Msg = require("./modules/message");
const user = require("./modules/user");
const io = new Server(server,{
    cors: "*",
});

const URL = "mongodb+srv://vanthang559:0353880152Thang@socketdb.djpab.mongodb.net/message-database?retryWrites=true&w=majority"
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// CONNECT DB
async function connect() {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('connected');
        })
    }catch(error){console.log("Connect Failed");};
}
connect();

app.get('/',(req, res) => {
    res.sendFile(__dirname+"./public/login.html")
})

app.get('/messager',(req, res) => {
    res.sendFile(__dirname+"./client/public/messages/index.html");
})




io.on('connection', socket => {

    // socket.broadcast.emit('chat message','User connected');
    
    // FIND DB
    Msg.find().then(data => { socket.emit('output-message', data);});

    // INPUT DB
    socket.on("chat message", message => {
        socket.broadcast.emit("chat message",message);

        const msgData = new Msg({ content: message })
        msgData.save().then(() => {
            io.emit('message', message);
        })
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("chat message", `User disconnected ${socket.id}`)
    })
})

const PORT = 3500;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
