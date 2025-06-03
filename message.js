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
    if (message) {
      appendMessage(message, "user"); // Sent message
      userInput.value = "";
      setTimeout(() => {
        appendMessage("Hello, Welcome to Bunny Chatbox", "bot"); // Received message
      }, 1000);
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
