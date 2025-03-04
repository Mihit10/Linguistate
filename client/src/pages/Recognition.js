import React, { useState, useRef, useEffect } from "react";

const SpeechRecognitionComponent = () => {
  const [text, setText] = useState(""); // Stores full transcribed text
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN"); // Default to English (India)
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(new Set()); // Set to track unique transcribed sentences
  const lastTranscriptRef = useRef(""); // Stores last recognized sentence

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecognition = () => {
    if (isListening) {
      console.warn("Speech recognition is already running.");
      return;
    }

    try {
      console.log("Initializing speech recognition...");
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("Speech recognition not supported in this browser.");
        setText("Speech recognition not supported in this browser.");
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language;
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started:", language);
        finalTranscriptRef.current.clear(); // Reset previous transcript tracking
        lastTranscriptRef.current = "";
      };

      recognitionRef.current.onresult = (event) => {
        let newSentence = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript.trim();
          if (event.results[i].isFinal) {
            newSentence = transcript;
          }
        }

        if (
          newSentence.length > 0 &&
          !finalTranscriptRef.current.has(newSentence)
        ) {
          finalTranscriptRef.current.add(newSentence);
          lastTranscriptRef.current = newSentence;
          setText(Array.from(finalTranscriptRef.current).join(" ")); // Join unique sentences
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Error occurred:", event);
        setText("Error occurred. Please try again.");
        stopRecognition();
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended.");
        if (isListening) {
          console.log("Restarting speech recognition...");
          setTimeout(() => {
            if (recognitionRef.current) recognitionRef.current.start();
          }, 500); // Restart with a slight delay (fix for mobile browsers)
        }
      };

      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      setText("Speech recognition failed.");
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      console.log("Stopping speech recognition...");
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Language Selection Dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded"
        disabled={isListening} // Prevent changing language while speaking
      >
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi (हिन्दी)</option>
        <option value="mr-IN">Marathi (मराठी)</option>
        <option value="gu-IN">Gujarati (ગુજરાતી)</option>
        <option value="ta-IN">Tamil (தமிழ்)</option>
        <option value="bn-IN">Bengali (বাংলা)</option>
        <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
      </select>

      {/* Mic Indicator */}
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full text-white font-bold text-lg ${
          isListening ? "bg-red-500 animate-pulse" : "bg-gray-300"
        }`}
      >
        {isListening ? "🎤" : "🔴"}
      </div>

      {/* Start Button */}
      <button
        onClick={startRecognition}
        disabled={isListening} // Disable if already listening
        className={`px-6 py-2 rounded text-white font-semibold transition-all ${
          isListening ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isListening ? "Listening..." : "Start Recording"}
      </button>

      {/* Stop Button */}
      <button
        onClick={stopRecognition}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all"
      >
        Stop Recording
      </button>

      {/* Transcription Output */}
      <p className="border p-4 w-96 min-h-[50px] text-center text-lg bg-gray-100 rounded">
        {text || "Speak something..."}
      </p>
    </div>
  );
};

export default SpeechRecognitionComponent;
