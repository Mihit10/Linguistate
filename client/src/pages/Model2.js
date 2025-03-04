const SketchfabEmbed2 = () => {
  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title="Bogotá Skyline 01 -RAWscan"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/d5eda2d597674142983a771fe16226f4/embed?autospin=0.5&autostart=1&preload=1&dnt=1"
      ></iframe>
      <p
        style={{
          fontSize: "13px",
          fontWeight: "normal",
          margin: "5px",
          color: "#4A4A4A",
        }}
      ></p>
    </div>
  );
};

export default SketchfabEmbed2;
