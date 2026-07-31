window.addEventListener("DOMContentLoaded", () => {
    // Create bubble
    const bubble = document.createElement("div");
    bubble.innerHTML = "💬";
    bubble.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #4a90e2;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,.3);
        z-index: 9999;
        user-select: none;
    `;

    // Create chat window
    const chat = document.createElement("div");
    chat.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 320px;
        height: 420px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,.3);
        display: none;
        flex-direction: column;
        overflow: hidden;
        z-index: 9999;
        font-family: Arial, sans-serif;
    `;

    chat.innerHTML = `
        <div style="
            background:#4a90e2;
            color:white;
            padding:15px;
            font-weight:bold;">
            Chat
        </div>

        <div id="messages" style="
            flex:1;
            padding:10px;
            overflow-y:auto;
            background:#f5f5f5;">
        </div>

        <div style="
            display:flex;
            border-top:1px solid #ddd;">
            <input id="chatInput"
                placeholder="Type a message..."
                style="
                    flex:1;
                    border:none;
                    padding:12px;
                    outline:none;">
            <button id="sendBtn"
                style="
                    border:none;
                    background:#4a90e2;
                    color:white;
                    padding:0 20px;
                    cursor:pointer;">
                Send
            </button>
        </div>
    `;

    document.body.appendChild(chat);
    document.body.appendChild(bubble);

    bubble.onclick = () => {
        chat.style.display = chat.style.display === "flex" ? "none" : "flex";
    };

    const input = chat.querySelector("#chatInput");
    const send = chat.querySelector("#sendBtn");
    const messages = chat.querySelector("#messages");

    function addMessage(sender, text) {
        const div = document.createElement("div");
        div.style.marginBottom = "10px";
        div.innerHTML = `<strong>${sender}:</strong> ${text}`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function sendMessage() {
        if (input.value.trim() === "") return;

        addMessage("You", input.value);

        // Fake bot reply
        setTimeout(() => {
            addMessage("Bot", "You said: " + input.value);
        }, 500);

        input.value = "";
    }

    send.onclick = sendMessage;

    input.addEventListener("keypress", e => {
        if (e.key === "Enter") sendMessage();
    });
});