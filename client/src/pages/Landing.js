import "./Landing.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const bubbleTexts = [
  "Need a 2BHK ASAP! 👋",
  "किराया कितना है?",
  "મારે મલાડમાં ઘર જોઈએ છે",
  "माझे बजेट 3 कोटी आहे",
  "మీరు వసతి శుక్రవారంను షెడ్యూల్ చేయవచ్చా?",
  "Wow, impressive! 🤩",
  "Nice to meet you! 🤝",
  "Exciting times ahead! 🌈",
];

const generateBubble = () => {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FDCB6E", "#6C5CE7", "#FF8A5B"];
  const isLeft = Math.random() < 0.5;

  return {
    id: Math.random().toString(36).substr(2, 9),
    text: bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    left: isLeft ? Math.random() * 40 : 60 + Math.random() * 40,
    isLeft: isLeft,
    delay: Math.random() * 5,
  };
};

const Landing = () => {
  const [bubbles, setBubbles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prevBubbles) => {
        const updatedBubbles = prevBubbles
          .filter((bubble) => bubble.top !== -100)
          .map((bubble) => ({ ...bubble, top: (bubble.top || window.innerHeight * 0.25) - 10 }));

        if (updatedBubbles.length < 10) {
          updatedBubbles.push({ ...generateBubble(), top: window.innerHeight * 0.25 });
        }

        return updatedBubbles;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      <video autoPlay loop muted className="background-video">
        <source src="/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Logo pushed to the top */}
      <div className="logo-container">
        <img src="/logo.png" alt="Linguistate Logo" className="w-64 h-auto" />
      </div>

      {/* Chat Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.left}%`,
            backgroundColor: bubble.color,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          {bubble.text}
        </div>
      ))}

      {/* Main Content */}
      <div className="content">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-200 mb-4 to-yellow-600 tracking-tight">
        Welcome to Linguistate
      </h1>
        <p className="text-xl font-medium text-blue-200 italic tracking-wide">
        Bridging Languages, Uniting People
      </p>
        <div className="button-container">
          <button onClick={() => navigate("/test")}>Are you a Broker?</button>
          <button onClick={() => navigate("/clienthome")}>Are you a User?</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
