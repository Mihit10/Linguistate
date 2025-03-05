import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import SpeechRecognitionComponent from "./Recognition";
import socket from "./socket";
import img1 from "../img/p1.jpg";
import img2 from "../img/p2.jpg";

// SVG Icons (maintained from original code)
const BudgetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PropertyTypeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SummaryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="16" y2="16" />
  </svg>
);

const Test = () => {
  const [isJoined, setIsJoined] = useState(true);
  const [animatedText, setAnimatedText] = useState("");
  const navigate = useNavigate();

  const brokerInfo = {
    name: "Mihit Singasane",
    language: "English",
    specialization: "Real Estate Broker",
    uniqueCode: "185265",
    email: "mihit.singasane@realestate.com",
    phone: "+91 98765 43210",
  };

  const [transcription, setTranscription] = useState([
    {
      id: 1,
      text: "Hi there, I'm looking for a 2-bedroom apartment.",
      sender: "client",
    },
    {
      id: 2,
      text: "Great! Can you tell me more about your budget and preferred location?",
      sender: "broker",
    },
  ]);

  const customerCriteria = [
    { icon: <BudgetIcon />, text: "Budget: ₹50L - ₹1Cr" },
    { icon: <LocationIcon />, text: "Preferred Locality: Andheri, Mumbai" },
    { icon: <PropertyTypeIcon />, text: "Property Type: 2BHK Apartment" },
    { icon: <BudgetIcon />, text: "Rent: ₹30K - ₹50K/month" },
    { icon: <LocationIcon />, text: "Nearby Schools & Markets Required" },
  ];

  const [propertySuggestions, setPropertySuggestions] = useState([
    {
      id: 1,
      image: img1,
      price: "₹75 Lakhs",
      details: "2 BHK | 1,200 sq ft | Modern Kitchen",
    },
    {
      id: 2,
      image: img2,
      price: "₹92 Lakhs",
      details: "2 BHK | 1,350 sq ft | Balcony View",
    },
  ]);

  useEffect(() => {
    console.log("🔗 Connecting WebSocket...");
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ WebSocket Connected!", socket.id);
    });
    socket.on("statusChanged", (status) => {
      console.log("Broker variable updated:", status);
      setIsJoined(status);
    });

    // Typing animation effect
    let currentText = "Waiting for Your Client to Join";
    let index = 0;
    const typingEffect = setInterval(() => {
      if (index < currentText.length) {
        setAnimatedText(currentText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);

    return () => {
      clearInterval(typingEffect);
    };
  }, []);

  return (
    <div
      className="min-h-screen p-4 bg-[#F5F0E6] flex flex-col space-y-4 container mx-auto"
      style={{ fontFamily: "'Inter', sans-serif", maxWidth: "1440px" }}
    >
      {/* Broker Profile Section - Improved Responsiveness */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white shadow-md rounded-lg"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar - Centered on Mobile */}
            <div className="flex flex-col items-center md:block">
              <div className="relative">
                <div className="w-24 h-24 bg-[#EADBC8] text-amber-900 rounded-full flex items-center justify-center text-4xl font-bold ring-4 ring-amber-900 shadow-md">
                  {brokerInfo.name.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Broker Details - Centered on Mobile */}
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-2xl font-bold text-amber-900 mb-1">
                {brokerInfo.name}
              </h2>
              <div className="space-y-1 text-indigo-700">
                <p className="text-md">{brokerInfo.specialization}</p>
                <div className="flex flex-wrap justify-center md:justify-start space-x-2">
                  <span className="bg-indigo-100 px-2 py-1 rounded-full text-xs mb-1">
                    Languages: {brokerInfo.language}
                  </span>
                  <span className="bg-green-100 px-2 py-1 rounded-full text-xs text-green-800">
                    Available
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-2 text-xs text-gray-600">
                  <span>{brokerInfo.email}</span>
                  <span>{brokerInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Unique Code - Full Width on Mobile */}
            <div className="w-full md:w-auto">
              <div className="bg-[#EADBC8] border-2 border-amber-900 rounded-lg px-4 py-3 text-center">
                <span className="block text-xs text-amber-900 mb-1">
                  Unique Session Code
                </span>
                <span className="text-2xl font-bold text-amber-900">
                  {brokerInfo.uniqueCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rest of the component remains the same, with minor responsive adjustments */}
      {!isJoined ? (
        <div className="flex-grow flex flex-col justify-center items-center p-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900 mb-3 text-center">
            {animatedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-lg text-indigo-700 max-w-2xl mx-auto mb-6 text-center px-4">
            Share your unique code with your client to start the translation
            session
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md px-4"
          >
            <div className="bg-white rounded-xl shadow-xl p-5">
              <div className="text-center mb-3">
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
                className="w-full bg-indigo-300 text-indigo-700 py-2 rounded-lg cursor-not-allowed font-semibold"
              >
                Waiting for Client Connection
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow">
          {/* Left Side: Real-Time Chat and Speech Recognition - Full Width on Mobile */}
          <div className="md:col-span-8 space-y-4">
            <SpeechRecognitionComponent room="185265" username="broker" />
          </div>

          {/* Right Side: Customer Preferences - Full Width on Mobile */}
          <div className="md:col-span-4">
            <Card
              className="bg-white shadow-md rounded-lg"
              style={{ borderColor: "#8B4513" }}
            >
              <CardHeader className="bg-[#D2B48C] text-[#5D4037] p-3">
                <CardTitle className="text-lg font-bold">
                  Customer Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ul className="space-y-2">
                  {customerCriteria.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-[#5D4037]"
                    >
                      <span className="text-[#8B4513]">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Section: Property Suggestions - Grid on Mobile */}
      {isJoined && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold text-[#5D4037] mb-3">
            Property Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {propertySuggestions.map((property) => (
              <Card
                key={property.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={property.image}
                  alt="Property"
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-3">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-2 space-y-2 md:space-y-0">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "#8B4513" }}
                    >
                      {property.price}
                    </h3>
                    <Button className="bg-[#EADBC8] text-amber-900 border border-transparent text-sm font-semibold px-3 py-2 w-full md:w-auto hover:bg-[#EADBC8] hover:border-4 hover:border-amber-900">
                      Send Details
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600">{property.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Section: Calendar and Conversation Summary - Stacked on Mobile */}
      {isJoined && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meeting Scheduler */}
          <Card
            className="bg-white shadow-md rounded-lg"
            style={{ borderColor: "#8B4513" }}
          >
            <CardHeader className="bg-[#D2B48C] text-[#5D4037] p-3 flex items-center">
              <CalendarIcon className="mr-2 text-[#8B4513]" />
              <CardTitle className="text-lg font-bold">
                Schedule Meeting
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-1 rounded hover:bg-[#D2B48C] cursor-pointer"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <Button className="bg-[#EADBC8] text-amber-900 border border-transparent text-sm font-semibold px-3 py-2 w-full md:w-auto hover:bg-[#EADBC8] hover:border-4 hover:border-amber-900">
                Book Slot
              </Button>
            </CardContent>
          </Card>

          {/* Conversation Summary */}
          <Card
            className="bg-white shadow-md rounded-lg"
            style={{ borderColor: "#8B4513" }}
          >
            <CardHeader className="bg-[#D2B48C] text-[#5D4037] p-3 flex items-center">
              <SummaryIcon className="mr-2 text-[#8B4513]" />
              <CardTitle className="text-lg font-bold">
                Conversation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <textarea
                className="w-full h-32 p-2 border rounded text-xs"
                placeholder="Auto-generated summary will appear here..."
                style={{
                  backgroundColor: "#FEFAF6",
                  borderColor: "#8B4513",
                  color: "#5D4037",
                }}
              />
              <Button
                className="bg-[#EADBC8] text-amber-900 border border-transparent text-sm font-semibold px-3 py-2 w-full md:w-auto hover:bg-[#EADBC8] hover:border-4 hover:border-amber-900"
                onClick={() => navigate("/summarizer")}
              >
                Generate Summary
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Test;
