import React, { useState, useRef, useEffect } from "react";

const SpeechRecognitionComponent = () => {
  const [text, setText] = useState(""); // Accumulated transcript (final + interim)
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN"); // Default language: English (India)
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(""); // Holds the accumulated final transcript
  const lastFinalSegmentRef = useRef(""); // Holds the last final result for duplicate checking

  // Detect mobile devices
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // A helper to normalize text (remove extra spaces, lowercase, strip punctuation if desired)
  const normalize = (str) => str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim().toLowerCase();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  // For both mobile and desktop, we call this to (re)start recognition.
  // On mobile we use segmented mode (continuous false) and chain segments.
  // On desktop we use continuous mode.
  const startRecognitionInternal = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setText("Speech recognition not supported in this browser.");
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = isMobile ? false : true; // segmented mode for mobile

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started:", language);
        // Reset last segment when starting a new recognition instance
        lastFinalSegmentRef.current = "";
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        // Process results from the event starting at resultIndex
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript.trim();
          if (event.results[i].isFinal) {
            // Only append if the normalized final result is different from the previous final segment
            if (normalize(transcript) !== normalize(lastFinalSegmentRef.current)) {
              finalTranscriptRef.current = (finalTranscriptRef.current + " " + transcript).trim();
              lastFinalSegmentRef.current = transcript;
            }
          } else {
            interimTranscript += transcript + " ";
          }
        }
        setText((finalTranscriptRef.current + " " + interimTranscript).trim());
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event);
        setText("Error occurred. Please try again.");
        stopRecognition();
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended.");
        if (isListening) {
          // For mobile (segmented mode), restart after a short delay.
          // On desktop, continuous mode usually won't trigger onend unless there's a pause.
          if (isMobile) {
            setTimeout(() => {
              startRecognitionInternal();
            }, 300);
          }
        }
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      setText("Speech recognition failed.");
    }
  };

  const startRecognition = () => {
    if (isListening) {
      console.warn("Speech recognition is already running.");
      return;
    }
    // Reset accumulated text
    finalTranscriptRef.current = "";
    setText("");
    setIsListening(true);
    startRecognitionInternal();
  };

  const stopRecognition = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Language Selection Dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded"
        disabled={isListening} // Prevent changing language while listening
      >
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi (हिन्दी)</option>
        <option value="mr-IN">Marathi (मराठी)</option>
        <option value="gu-IN">Gujarati (ગુજરાતી)</option>
        <option value="ta-IN">Tamil (தமிழ்)</option>
        <option value="bn-IN">Bengali (বাংলা)</option>
        <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
      </select>

      {/* Mic Indicator (Live Feedback) */}
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
        disabled={isListening}
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
