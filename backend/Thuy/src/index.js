//================Require================
const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const db = require('./config/database');
const text = require('./models/readText');
const user = require('./models/readUser');

//========================================
const app = express();
const server = http.createServer(app);
const io = new Server(server);
//==================USE=====================
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
//==================DATA handler======================
db.connect();
//==================PROGRAM=====================
var user_auth = [];

/*---------------START----------------------*/
app.get('/', (req, res, next) => {
//   if(user_auth.length == 0 )
  res.sendFile(__dirname+"/public/login.html");
})

/*---------------Singup----------------------*/
app.get('/singup', (req, res, next) => {
//   if(user_auth.length == 0 )
  app.use(express.static(__dirname+"/public"));
  res.sendFile(__dirname+"/public/singup.html");
})

app.post('/singup', (req, res, next) => {
  var username = req.body.username;
  console.log(req.body.username)
  var password = req.body.pw;
  user.findOne({"username":username},(err, item) => {
    if(item == null) // nếu trông thì do chưa có ai tạo tài khoản này
    {
        user.create({ "username": username , "pw": password}, function (err, small) {
            if (err) return handleError(err);
        });
      res.sendFile(__dirname+"/public/createSuccess.html");
      req = null;
    }
    else
    {
      res.sendFile(__dirname+"/public/createFail.html");
    }
  })
})

/*---------------Chat Product------------------*/
app.get('/chat', (req, res, next) => {
  res.sendFile(__dirname+"/public/login.html");
})
app.post('/chat', (req, res) => {
  user.find({"username":req.body.username, "pw" :req.body.pw},(err, docs) => {
    if(docs !== user_auth)
      user_auth = docs;
    console.log(user_auth.length);
    if(user_auth.length !== 0)
    {
      app.use(express.static(__dirname+"/public"));
      res.sendFile(__dirname+"/public/index.html");
    }
    else{
      res.sendFile(__dirname+"/public/faillogin.html");
    }
  })
})

/*---------------APIS----------------------*/
app.get("/texts", function(req, res)
{
    text.find({}, function (err, docs) {
        res.json(docs);
      });
})
app.get("/users", function(req, res)
{
  user.find({},(err, users)=>{
    res.json(users);
  })
})



//===============SOCKET================
io.on('connection', (socket) => {
    console.log('a user connected');
    text.find({}, function (err, docs) {
      socket.emit('renderListText', {docs,user_auth});
    })
    socket.on('sendData', (data) => {
      console.log(data);
      text.create({ "text": data.value , "userID": data.user}, function (err, small) {
        if (err) return handleError(err);
      });
      socket.broadcast.emit('renderData', data.value);
    });
    socket.on('typing', (data)=>{
      console.log(data);
      socket.emit('typer',user_auth);
    });
});

//================================
server.listen(process.env.PORT||3000, ()=>{
    console.log("App listening");
}); 
