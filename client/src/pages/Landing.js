import "./Landing.css"; // Ensure you create this CSS file for styling
//import videoBg from "./landing.mp4"; // Replace with the actual video file path
import React, { useState, useEffect } from "react";
const bubbleTexts = [
  "Hello there! 👋",
  "Welcome aboard! 🚀",
  "Cool website! 😎",
  "Amazing design! 🎨",
  "Check this out! 🌟",
  "Wow, impressive! 🤩",
  "Nice to meet you! 🤝",
  "Exciting times ahead! 🌈",
];
const generateBubble = () => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FDCB6E",
    "#6C5CE7",
    "#FF8A5B",
  ];
  return {
    id: Math.random().toString(36).substr(2, 9),
    text: bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    left: Math.random() * 100,
    delay: Math.random() * 5,
  };
};

const Landing = () => {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    // Generate new bubbles periodically
    const interval = setInterval(() => {
      setBubbles((prevBubbles) => {
        // Remove old bubbles and add new ones
        const updatedBubbles = prevBubbles
          .filter((bubble) => bubble.top !== -100)
          .map((bubble) => ({
            ...bubble,
            top: (bubble.top || window.innerHeight * 0.25) - 10,
          }));

        // Add a new bubble every few seconds
        if (updatedBubbles.length < 10) {
          updatedBubbles.push({
            ...generateBubble(),
            top: window.innerHeight * 0.25,
          });
        }

        return updatedBubbles;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="landing-container">
      {/* <video autoPlay loop muted playsInline className="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="chat-bubble"
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

      <div className="content">
        <h1>Welcome to My Website</h1>
        <p>Your tagline or description goes here.</p>
      </div>
    </div>
  );
};

export default Landing;
