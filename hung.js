const sendtext = document.querySelector(".btn-send");
const chatinput = document.querySelector(".chat-foot1 input");
const chattin = document.querySelector(".chatbox-body");
const presslogo = document.querySelector(".logochatbot");
const close1 = document.querySelector(".btn1");
const chatbot = document.querySelector(".chat-box");
presslogo.addEventListener("click", () => {
  chatbot.classList.remove("hidden");
});
close1.addEventListener("click", () => {
  chatbot.classList.add("hidden");
});
sendtext.addEventListener("click", sendtin);
chatinput.addEventListener("keydown", (a) => {
  if (a.key === "Enter") {
    sendtin();
  }
});
function sendtin() {
  const content = chatinput.value.trim();
  if (content) {
    appendtin("user", content);
    fullChatHistory.push({ role: "user", content });
    chatinput.value = "";
    getBotResponse(content);
  }
}
let fullChatHistory = [];

function appendtin(Object1, new1) {
  const newelement = document.createElement("div");
  newelement.classList.add("message", Object1);
  newelement.textContent = new1;
  chattin.appendChild(newelement);
  chattin.scrollTop = chattin.scrollHeight;
}
function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("chat-short");
  typingDiv.setAttribute("id", "typing-indicator");
  typingDiv.innerHTML = `
    <img src="chatbox-removebg-preview.png" alt="" />
    <div class="message bot">
      <div class="think">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  `;
  chattin.appendChild(typingDiv);
  chattin.scrollTop = chattin.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

async function getBotResponse(userMessage) {
  const apiKey =
    "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";
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
  showTypingIndicator();
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",

        messages: fullChatHistory,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    removeTypingIndicator();
    appendtin("bot", botMessage);
    fullChatHistory.push({ role: "assistant", content: botMessage });
  } catch (error) {
    console.error("Error fetching bot response:", error);
    appendtin("bot", "Sorry, something went wrong. Please try again.");
  }
}
