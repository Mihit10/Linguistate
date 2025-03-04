import { io } from "socket.io-client";

const socket = io("https://rhino-frank-tightly.ngrok-free.app", {
  transports: ["websocket"], // Ensure WebSocket transport
  reconnectionAttempts: 5, // Retry up to 5 times
  timeout: 20000, // Set 20s timeout
  autoConnect: false, // Prevent auto-connecting before joining a room
});

export default socket;
