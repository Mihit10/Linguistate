const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update with frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/chatApp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Message Schema
const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  text: String,
  textEnglish: String,
  language: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async ({ room }) => {
    console.log(`User joined room: ${room}`);
    socket.join(room);

    // Send past messages
    const messages = await Message.find({ room });
    socket.emit("loadMessages", messages);
    console.log("messages sent");
  });

  socket.on("updateStatus", (status) => {
    brokerVariable = status;
    socket.broadcast.emit("statusChanged", status);
    console.log("broadcast");
  });

  socket.on("sendMessage", async ({ room, sender, text, language }) => {
    console.log(
      `Message received from ${sender}: ${text}    lang: ${language}`
    );

    try {
      // Call Python endpoint for translation
      const response = await axios.post(
        "https://macaque-awake-implicitly.ngrok-free.app/refine",
        {
          text: text,
          brokerLanguage: language,
          clientLanguage: "en-IN",
        }
      );

      const translatedText = response.data.translated_text || text; // Assuming response contains 'translated_text'

      // Save both original and translated text
      const message = new Message({
        room,
        sender,
        text,
        textEnglish: translatedText,
        language: language,
      });
      await message.save();

      // Emit original and translated message
      io.to(room).emit("receiveMessage", {
        ...message.toObject(),
        textEnglish: translatedText,
      });
    } catch (error) {
      console.error("Error translating message:", error.message);
    }
    // const message = new Message({ room, sender, text });
    // await message.save();

    // io.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Socket.io server is running.");
});

const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
