const name = prompt("State your name:");

const socket = io();

const messages = document.querySelector("#messages");
const chatForm = document.querySelector("#chat-form");
const chatMes = document.querySelector("#chat-mes");
const priceSpan = document.querySelector("#bitcoin-price");

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

let previousPrice = 0;
socket.on("bitcoin-price", (data) => {
  const currentPrice = data.price;
  console.log(data);
  console.log(currentPrice);
  if (currentPrice > previousPrice) {
    priceSpan.className = "up-price";
  } else {
    priceSpan.className = "down-price";
  }
  priceSpan.textContent = `${currentPrice} USD`;
  // update previousPrice
  previousPrice = currentPrice;
});
