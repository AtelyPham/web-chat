var sendBtn = document.querySelector('#send');
var sendValue = document.querySelector('#message');
var wrapText = document.querySelector('.chats');
var url = "http://localhost:3000/texts";
//=========================================================
// axios.get(url,{})
// .then(res => {
//     res.data.map(msg =>{
//         var text = document.createTextNode(msg.text);
//         var span = document.createElement('span');
//         span.appendChild(text);
//         span.setAttribute('class', 'u1 chat');
//         wrapText.appendChild(span);
//         console.log(wrapText);
//         console.log(msg);
//     })
// })
// .catch(err => {
//     console.error(err); 
// })
//=========================================================
var user;
socket.on('renderListText',(res)=>{
    res.docs.map(msg =>{
        var text = document.createTextNode(msg.text);
        var span = document.createElement('span');
        span.appendChild(text);
        if(msg.userID == res.user_auth[0].username)
        span.setAttribute('class', 'u2 chat');
        else{
            span.setAttribute('class', 'u1 chat');
        }
        wrapText.appendChild(span);
    })
    user = res.user_auth[0].username;
    autoScroll();
})
sendData = () => {
    var value = sendValue.value;
    if(/^\s+$/.test(value))
    {
        return;
    }
    socket.emit('sendData', {value, user});
    var text = document.createTextNode(sendValue.value);
    var span = document.createElement('span');
    span.appendChild(text);
    span.setAttribute('class', 'u2 chat');
    wrapText.appendChild(span);
    console.log('clicked');
    sendValue.value = " ";
    wrapText.scrollTop = wrapText.scrollHeight;
}
sendBtn.addEventListener('click',sendData);

socket.on('renderData', (data) => {
    var text = document.createTextNode(data);
    var span = document.createElement('span');
    span.appendChild(text);
    span.setAttribute('class', 'u1 chat');
    wrapText.appendChild(span);
    playNotification();
    autoScroll();
})
//=====================================================
autoScroll = () => {
    wrapText.scrollTop = wrapText.scrollHeight;
}
var input = document.getElementById("message");
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("send").click();
    }
  });
playNotification = () =>{
    var x = document.getElementById("myAudio"); 
    x.play();
}
// autoScroll();
// typing = () => {
//     var keyup = document.querySelector("#message");
//         socket.emit("typing", keyup.value);
// }
// socket.on('typer',(data)=>{
//     var check = document.querySelector(".typing");
//     var text = createTextNode(data[0].username);
//     check.appendChild(text);
//     console.log(data[0].username);
// })
