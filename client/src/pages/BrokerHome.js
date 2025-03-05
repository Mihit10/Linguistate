import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognitionComponent from "./Recognition";
import socket from "./socket";

const BrokerHome = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [animatedText, setAnimatedText] = useState("");

  const brokerInfo = {
    name: "Mihit Singasane",
    language: "English",
    specialization: "Real Estate Broker",
    uniqueCode: "112233",
    email: "mihit.singasane@realestate.com",
    phone: "+91 98765 43210",
  };

  useEffect(() => {
    console.log("🔗 Connecting WebSocket...");
    socket.connect(); // Explicitly connect on mount

    socket.on("connect", () => {
      console.log("✅ WebSocket Connected!", socket.id);
    });
    socket.on("statusChanged", (status) => {
      console.log("Broker variable updated:", status);
      setIsJoined(status);
    });
  }, []);

  const welcomeMessage = "Waiting for Your Client to Join";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 flex flex-col">
      {/* Broker Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-indigo-500 text-white rounded-full flex items-center justify-center text-5xl font-bold mb-4 md:mb-0 ring-4 ring-indigo-300 shadow-lg">
                {brokerInfo.name.charAt(0)}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>

            {/* Broker Details */}
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-3xl font-bold text-indigo-900 mb-2">
                {brokerInfo.name}
              </h2>
              <div className="space-y-2 text-indigo-700">
                <p className="text-lg">{brokerInfo.specialization}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm">
                    Languages: {brokerInfo.language}
                  </span>
                  <span className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-800">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-600">
                  <span>{brokerInfo.email}</span>
                  <span>{brokerInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Unique Code */}
            <div className="mt-4 md:mt-0">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg px-6 py-4 text-center">
                <span className="block text-sm text-indigo-600 mb-2">
                  Unique Session Code
                </span>
                <span className="text-3xl font-bold text-indigo-900">
                  {brokerInfo.uniqueCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {!isJoined ? (
        <div className="flex-grow flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-4">
            {animatedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto mb-8 text-center">
            Share your unique code with your client to start the translation
            session
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <div className="text-center mb-4">
                <p className="text-indigo-800 font-semibold mb-2">
                  Waiting for Client to Enter Code
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
              <button
                disabled
                className="w-full bg-indigo-300 text-indigo-700 py-3 rounded-lg cursor-not-allowed font-semibold"
              >
                Waiting for Client Connection
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <SpeechRecognitionComponent room="112233" username="broker" />
      )}
    </div>
  );
};

export default BrokerHome;
