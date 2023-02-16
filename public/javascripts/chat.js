const name = prompt("State your name:");

const socket = io();

const messages = document.querySelector("#messages");
const chatForm = document.querySelector("#chat-form");
const chatMes = document.querySelector("#chat-mes");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = chatMes.value;
  socket.emit("on-chat", {
    name: name,
    message: message,
  });
  chatMes.value = "";
});

socket.on("user-chat", (message) => {
  const chatItem = document.createElement("li");
  chatItem.textContent = `${message.name}: ${message.message}`;
  messages.appendChild(chatItem);
});
