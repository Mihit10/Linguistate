import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import socket from "./socket";

// const socket = io("https://macaque-awake-implicitly.ngrok-free.app"); // Connect to backend

const Chat = () => {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log("🔗 Connecting WebSocket...");
    socket.connect(); // Explicitly connect on mount

    socket.on("connect", () => {
      console.log("✅ WebSocket Connected!", socket.id);
    });

    // Clear previous listeners before setting new ones
    socket.off("loadMessages").on("loadMessages", (pastMessages) => {
      console.log("📩 Messages received:", pastMessages);
      setMessages(pastMessages);
    });

    socket.off("receiveMessage").on("receiveMessage", (newMessage) => {
      console.log("🔴 New message received:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      console.log("⚠️ Cleaning up listeners");
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const joinRoom = () => {
    if (room.trim() !== "" && username.trim() !== "") {
      socket.emit("joinRoom", { room });
      console.log("Emitting joinRoom event with room:", room); // Debugging
      setJoined(true);
    }
    console.log(messages);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Sending:", { room, sender: username, text: message });
      socket.emit("sendMessage", { room, sender: username, text: message });
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!joined ? (
        <div>
          <h2>Join a Chat Room</h2>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room Code"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <div>
          <h2>Chat Room: {room}</h2>
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
