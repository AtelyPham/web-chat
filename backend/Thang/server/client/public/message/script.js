const formEl = document.querySelector(".message-box")
const inputEl = document.querySelector(".message-input")
// const roomEl = document.querySelector("#room")
const ulEl = document.querySelector(".messages-content")

const socket = io("http://localhost:3500")

const submitForm = (e) => {
  e.preventDefault();
  if(inputEl.value){
    addNewMesseger(inputEl.value);
    socket.emit('chat message',inputEl.value);
    inputEl.value = '';
  }
}

socket.on('connect', () => {
  // addNewMesseger(`${socket.id}`);
  
  formEl.addEventListener('submit',submitForm);
  socket.on('chat message', message => {
    addNewMesseger(message);
  })
})

socket.on('output-message', (data) => {
  console.log(data);
  if(data.length){
    data.forEach(message => addNewMesseger(message.content));
  }
})

const addNewMesseger = msg => {
  if(!msg) return ;

  const liEl = document.createElement('li');
  liEl.textContent = msg;
  ulEl.appendChild(liEl);
}
