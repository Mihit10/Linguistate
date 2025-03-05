import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Globe, Clock } from "lucide-react";
import socket from "./socket";
import axios from "axios";

const SpeechRecognitionComponent = ({ room, username }) => {
  const [text, setText] = useState("");
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN");
  const [sessionDuration, setSessionDuration] = useState(0);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const lastFinalSegmentRef = useRef("");
  const sessionIntervalRef = useRef(null);

  const [joined, setJoined] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (room.trim() !== "" && username.trim() !== "") {
      socket.emit("joinRoom", { room });
      console.log("Emitting joinRoom event with room:", room); // Debugging
      setJoined(true);
    }
    console.log(messages);
  };

  useEffect(() => {
    const translateLastMessage = async () => {
      if (messages.length === 0) return; // Prevent running on initial render

      const lastMessage = messages[messages.length - 1]; // Get the most recent message
      if (!lastMessage.textEnglish) return; // Ensure there is text to translate

      try {
        const response = await axios.post(
          "https://macaque-awake-implicitly.ngrok-free.app/refine",
          {
            text: lastMessage.textEnglish,
            brokerLanguage: "en-IN",
            clientLanguage: language,
          }
        );

        const translatedText = response.data.translated_text;

        // Update the latest message with translated text
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === lastMessage._id ? { ...msg, translatedText } : msg
          )
        );
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    translateLastMessage();
    console.log(messages);
  }, [messages]);

  // Ensure the user joins the room when username and room are available
  useEffect(() => {
    if (room.trim() !== "" && username.trim() !== "") {
      console.log("Joining room:", room);
      socket.emit("joinRoom", { room });
      setJoined(true);
    }
  }, [room, username]);

  useEffect(() => {
    console.log(transcriptLines);
  }, [transcriptLines]);

  // socket wala backend
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

  useEffect(() => {
    if (transcriptLines.length > 0) {
      const latestMessage = transcriptLines[transcriptLines.length - 1];
      console.log("Sending:", {
        room,
        sender: username,
        text: latestMessage,
        language: language,
      });
      socket.emit("sendMessage", {
        room,
        sender: username,
        text: latestMessage,
        language: language,
      });
    }
  }, [transcriptLines]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Sending:", {
        room,
        sender: username,
        text: message,
        language: language,
      });
      socket.emit("sendMessage", {
        room,
        sender: username,
        text: message,
        language: language,
      });
      setMessage("");
    }
  };

  // Optimize text breaking
  const breakLongText = useCallback((text, maxLength = 40) => {
    if (text.length <= maxLength) return [text];

    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          socket.emit("sendMessage", {
            room,
            sender: username,
            text: message,
            language: language,
          });
        }
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
      console.log(currentLine);
    }
    return lines;
  }, []);

  // A helper to normalize text
  const normalize = (str, lang) => {
    if (lang.startsWith("en")) {
      return str
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    }
    return str.trim();
  };

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
    };
  }, []);

  // Start session timer
  const startSessionTimer = () => {
    setSessionDuration(0);
    sessionIntervalRef.current = setInterval(() => {
      setSessionDuration((prev) => prev + 1);
    }, 1000);
  };

  // Stop session timer
  const stopSessionTimer = () => {
    if (sessionIntervalRef.current) {
      clearInterval(sessionIntervalRef.current);
      sessionIntervalRef.current = null;
    }
  };

  // Optimized recognition internal method
  const startRecognitionInternal = () => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setText("Speech recognition not supported in this browser.");
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started:", language);
        lastFinalSegmentRef.current = "";
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let newFinalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript.trim();

          if (event.results[i].isFinal) {
            if (
              normalize(transcript, language) !==
              normalize(lastFinalSegmentRef.current, language)
            ) {
              newFinalTranscript += transcript + " ";
              lastFinalSegmentRef.current = transcript;

              // Break long text and add lines
              const brokenLines = breakLongText(transcript);
              setTranscriptLines((prev) => {
                const updated = [...prev, ...brokenLines];
                return updated.slice(-3); // Keep last 3 lines
              });
            }
          } else {
            interimTranscript += transcript + " ";
          }
        }

        if (newFinalTranscript) {
          finalTranscriptRef.current = (
            finalTranscriptRef.current +
            " " +
            newFinalTranscript
          ).trim();
        }

        setText((finalTranscriptRef.current + " " + interimTranscript).trim());
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event);
        setText("Error occurred. Please try again.");
        stopRecognition();
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          setTimeout(() => {
            startRecognitionInternal();
          }, 300);
        }
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      setText("Speech recognition failed.");
    }
  };

  const startRecognition = () => {
    if (isListening) return;

    finalTranscriptRef.current = "";
    setText("");
    setTranscriptLines([]);
    setIsListening(true);
    startRecognitionInternal();
    startSessionTimer();
  };

  const stopRecognition = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    stopSessionTimer();
  };

  // Generate visual placeholders for additional context
  const generatePlaceholders = () => {
    return (
      <div className="text-center opacity-20 space-y-1 py-2">
        <div className="h-0.5 bg-white/20 mx-auto w-1/2 rounded"></div>
        <div className="h-0.5 bg-white/10 mx-auto w-1/3 rounded"></div>
        <div className="h-0.5 bg-white/5 mx-auto w-1/4 rounded"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/10 bg-gradient-to-br from-blue-900 to-indigo-900 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-white/20 relative"
      >
        {/* Header with Language and Duration */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 w-full">
            <Globe className="text-blue-300 flex-shrink-0" size={24} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-indigo-800/70 text-white p-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-300 transition w-full"
              disabled={isListening}
            >
              <option value="en-IN">English (India)</option>
              <option value="hi-IN">Hindi (हिन्दी)</option>
              <option value="mr-IN">Marathi (मराठी)</option>
              <option value="gu-IN">Gujarati (ગુજરાતી)</option>
              <option value="ta-IN">Tamil (தமிழ்)</option>
              <option value="bn-IN">Bengali (বাংলা)</option>
              <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
            </select>
          </div>

          {/* Session Duration */}
          <div className="flex items-center space-x-2 text-white ml-2">
            <Clock className="text-blue-300" size={20} />
            <span className="font-mono text-lg">
              {formatDuration(sessionDuration)}
            </span>
          </div>
        </div>

        {/* Transcription Area */}
        <div className="h-64 relative overflow-hidden rounded-lg mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 pointer-events-none z-10"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
            <div className="space-y-2 max-h-full overflow-hidden">
              <AnimatePresence>
                {transcriptLines.length === 0 ? (
                  <motion.p
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-center text-white/50 italic"
                  >
                    Start transcribing...
                  </motion.p>
                ) : (
                  transcriptLines.map((line, index) => (
                    <motion.p
                      key={`line-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: index === transcriptLines.length - 1 ? 1 : 0.4,
                        y: 0,
                        scale: index === transcriptLines.length - 1 ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-center text-white px-2 break-words"
                    >
                      {line}
                    </motion.p>
                  ))
                )}
              </AnimatePresence>
            </div>
            {/* Visual Placeholders */}
            {transcriptLines.length > 0 && generatePlaceholders()}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecognition}
            disabled={isListening}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white font-semibold transition-all ${
              isListening
                ? "bg-gray-600/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Mic size={20} />
            <span>{isListening ? "Listening..." : "Start Transcribing"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopRecognition}
            className="bg-red-500/80 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-all flex items-center space-x-2"
          >
            <MicOff size={20} />
            <span>Stop</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeechRecognitionComponent;
