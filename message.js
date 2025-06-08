document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  function appendMessage(content, sender = "user") {
    const messageDiv = document.createElement("div");
    const senderClass = sender === "user" ? "user-message" : "bot-message";
    messageDiv.classList.add("message", senderClass);

    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message === "Hi" || "hi" || "HI") {
      appendMessage(message, "user"); // Sent message
      setTimeout(() => {
        appendMessage("Hi , How are you?", "bot"); // Received message
      }, 1000);
      userInput.value = "";
      
    }
  });
  sendBtn.addEventListener("click",()=>{
    const message = userInput.value.trim();
    if (message) {
      appendMessage(message, "user"); // Sent message
      setTimeout(() => {
        appendMessage("Welcome to my chat box ! , How can I help you ?", "bot"); // Received message
      }, 1000);
      userInput.value = "";
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});

const pubnub = new PubNub({
  publishKey: "your-publish-key",
  subscribeKey: "your-subscribe-key",
});

pubnub.subscribe({ channels: ["chat"] });

pubnub.addListener({
  message: function (event) {
    appendMessage(event.message.text, "bot");
  },
});

function sendMessage(content) {
  pubnub.publish({
    channel: "chat",
    message: { text: content },
  });
}
