import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognitionComponent from "./Recognition";
import socket from "./socket";

const ClientHome = () => {
  const [room, setRoom] = useState("");
  const [isCodeMatched, setIsCodeMatched] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const welcomeMessage =
    "LangState: Breaking Language Barriers, Connecting Conversations";

  // Typing animation effect
  useEffect(() => {
    let currentText = "";
    let index = 0;

    const typingEffect = setInterval(() => {
      if (index < welcomeMessage.length) {
        currentText += welcomeMessage[index];
        setAnimatedText(currentText);
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);

    return () => clearInterval(typingEffect);
  }, []);

  const handleCodeSubmit = () => {
    // Implement your code matching logic here
    // This is a placeholder - replace with actual verification
    if (room.trim() === "112211") {
      setIsCodeMatched(true);
      setShowTour(true);
      socket.emit("updateStatus", true);
      console.log("Broker variable updated:", true);
    } else {
      alert("Invalid Broker Code");
    }
  };

  const TourModal = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
          How LangState Works
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </span>
            <p>Ensure you're on a call with your broker</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </span>
            <p>Click "Start Transcribe" when ready</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </span>
            <p>Watch real-time translated conversation</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowTour(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Transcribing
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">
          {animatedText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl text-blue-700 max-w-2xl mx-auto">
          Seamless communication across language barriers with real-time
          translation
        </p>
      </motion.div>

      {!isCodeMatched ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter Your Broker Code"
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <button
              onClick={handleCodeSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Connect with Broker
            </button>
          </div>
        </motion.div>
      ) : (
        <SpeechRecognitionComponent room={room} username="client" />
      )}

      <AnimatePresence>{showTour && <TourModal />}</AnimatePresence>
    </div>
  );
};

export default ClientHome;
