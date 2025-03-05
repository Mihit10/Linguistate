import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognitionComponent from "./Recognition";
import socket from "./socket";
import { Loader2 } from "lucide-react";

const ClientHome = () => {
  const [room, setRoom] = useState("");
  const [isCodeMatched, setIsCodeMatched] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const welcomeMessage =
    "LinguiState: Breaking Language Barriers, Connecting Conversations";

  // Color Palette
  const colors = {
    background: "#FEFAF6",
    primary: "#102C57",
    secondary: "#DAC0A3",
    accent: "#EADBC8",
    text: "#102C57",
  };

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
    if (room.trim() === "544655") {
      setIsCodeMatched(true);
      setShowTour(true);
      socket.emit("updateStatus", true);
      console.log("Broker variable updated:", true);
    } else {
      alert("Invalid Broker Code");
    }
  };

  const handleGetSummary = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSummary(true);
    }, 3000);
  };

  // Simplified Loading Component
  const SummaryLoading = () => (
    <div className="flex items-center justify-center mt-4">
      <Loader2
        className="mr-2 animate-spin"
        style={{
          height: "1.5rem",
          width: "1.5rem",
          color: colors.primary,
        }}
      />
      <p className="mt-4" style={{ color: colors.primary }}>
        Generating Summary...
      </p>
    </div>
  );

  const TourModal = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4"
      style={{ backgroundColor: "rgba(16, 44, 87, 0.3)" }}
    >
      <div
        className="rounded-2xl p-6 max-w-md w-full shadow-2xl"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.primary,
          borderWidth: 2,
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: colors.primary }}
        >
          How LinguiState Works
        </h2>
        <div className="space-y-4" style={{ color: colors.text }}>
          {[
            "Ensure you're on a call with your broker",
            'Click "Start Transcribe" when ready',
            "Watch real-time translated conversation",
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span
                className="rounded-full w-8 h-8 flex items-center justify-center font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.background,
                }}
              >
                {index + 1}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowTour(false)}
            className="px-6 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
              hover: {
                backgroundColor: colors.secondary,
              },
            }}
          >
            Start Transcribing
          </button>
        </div>
      </div>
    </motion.div>
  );

  const SummaryComponent = () => (
    <div className="min-h-screen p-6 mt-4">
      <div
        className="mx-auto rounded-xl shadow-lg p-6"
        style={{
          backgroundColor: colors.background,
          maxWidth: "42rem",
          color: colors.text,
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          વાર્તાલાપ સારાંશ
        </h2>
        <div className="markdown">
          {/* Summary content remains the same */}
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: colors.primary }}
          >
            📌 મુખ્ય ચર્ચા બિંદુઓ
          </h3>
          <ul className="list-disc pl-5 mb-4" style={{ color: colors.text }}>
            <li>🔹 ગ્રાહક બે કરોડ રૂપિયા સુધીનું ઘર શોધી રહ્યા છે.</li>
            <li>🔹 ગ્રાહકને મલાડમાં બે કે ત્રણ રૂમનું ઘર જોઈએ છે.</li>
            <li>🔹 બ્રોકર પાસે મલાડમાં બે નવી પ્રોપર્ટી ઉપલબ્ધ છે.</li>
          </ul>

          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: colors.primary }}
          >
            🏡 પ્રોપર્ટી વિગતો
          </h3>
          <table
            className="w-full border-collapse mb-4"
            style={{ borderColor: colors.secondary }}
          >
            <thead>
              <tr style={{ backgroundColor: colors.accent }}>
                <th
                  className="border p-2 text-left"
                  style={{ borderColor: colors.secondary }}
                >
                  વિશેષતા
                </th>
                <th
                  className="border p-2 text-left"
                  style={{ borderColor: colors.secondary }}
                >
                  વિગતો
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["🏠 પ્રોપર્ટી પ્રકાર", "ઉલ્લેખ નથી"],
                ["📍 સ્થાન", "મલાડ"],
                ["💰 કિંમત", "બે કરોડ સુધી"],
                ["📏 કદ", "બે કે ત્રણ રૂમ"],
                ["🏗️ સ્થિતિ", "ઉલ્લેખ નથી"],
              ].map(([feature, detail], index) => (
                <tr key={index}>
                  <td
                    className="border p-2"
                    style={{ borderColor: colors.secondary }}
                  >
                    {feature}
                  </td>
                  <td
                    className="border p-2"
                    style={{ borderColor: colors.secondary }}
                  >
                    {detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: colors.primary }}
          >
            📋 આગળના પગલાં
          </h3>
          <ul className="list-disc pl-5 mb-4" style={{ color: colors.text }}>
            <li>✅ ગ્રાહક અને બ્રોકર શુક્રવારે મળશે.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        background: `linear-gradient(to bottom right, ${colors.background}, ${colors.accent})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1
          className="text-3xl md:text-5xl font-extrabold mb-4"
          style={{ color: colors.primary }}
        >
          {animatedText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.text }}>
          Seamless communication across language barriers with real-time
          translation
        </p>
      </motion.div>

      {!isCodeMatched ? (
        <div className="w-full max-w-md">
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter Your Broker Code"
            className="w-full px-4 py-3 rounded-lg mb-4"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.primary,
              borderWidth: 2,
              color: colors.text,
            }}
          />
          <button
            onClick={handleCodeSubmit}
            className="w-full py-3 rounded-lg"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
            }}
          >
            Connect with Broker
          </button>
        </div>
      ) : (
        <>
          <SpeechRecognitionComponent room={room} username="client" />

          <button
            onClick={handleGetSummary}
            className="mt-4 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: colors.primary,
              color: colors.background,
            }}
          >
            Get Summary
          </button>

          {isLoading && <SummaryLoading />}
          {showSummary && !isLoading && <SummaryComponent />}
        </>
      )}

      <AnimatePresence>{showTour && <TourModal />}</AnimatePresence>
    </div>
  );
};

export default ClientHome;
