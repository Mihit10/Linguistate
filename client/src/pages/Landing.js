import "./Landing.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const bubbleTexts = [
  "Need a 2BHK ASAP! 👋",
  "\u0915\u093f\u0930\u093e\u092f\u093e \u0915\u093f\u0924\u0928\u093e \u0939\u0948?",
  "\u0aae\u0abe\u0ab0\u0ac7 \u0aae\u0ab2\u0abe\u0aa1\u0aae\u0abe\u0a82 \u0a98\u0ab0 \u0a9c\u0acb\u0aaf\u0ac7 \u0a9b\u0ac7",
  "\u092e\u093e\u091d\u0947 \u092c\u091c\u0947\u091f 3 \u0915\u094b\u091f\u0940 \u0906\u0939\u0947",
  "\u0c2e\u0c40\u0c30\u0c41 \u0c35\u0c38\u0c4d\u0c2f \u0c36\u0c41\u0c15\u0c4d\u0c30\u0c35\u0c3e\u0c30\u0c02 \u0c38\u0c02\u0c26\u0c30\u0c4d\u0c36\u0c28\u0c28\u0c41 \u0c37\u0c46\u0c21\u0c4d\u0c2f\u0c42\u0c32\u0c4d \u0c1a\u0c47\u0c2f\u0c35\u0c1a\u0c4d\u0c1a\u0c41",
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
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`chat-bubble ${bubble.isLeft ? 'chat-bubble-left' : 'chat-bubble-right'}`}
          style={{
            left: `${bubble.left}%`,
            top: `${bubble.top}px`,
            backgroundColor: bubble.color,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          {bubble.text}
        </div>
      ))}

      <div className="content text-center">
       
    <img 
      src="/logo.png" 
      alt="Linguistate Logo" 
      className="mx-auto -mb-12 w-64 h-auto" 
    />
        <h1>Welcome to Linguistate</h1>
        <p>Your tagline or description goes here.</p>
        <div className="button-container">
          <button onClick={() => navigate("/test")}>Are you a Broker?</button>
          <button onClick={() => navigate("/clienthome")}>Are you a User?</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
