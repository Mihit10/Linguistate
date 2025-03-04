import { useEffect, useRef, useState } from "react";

const SketchfabEmbed = () => {
  const iframeRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadSketchfab = () => {
      if (!iframeRef.current) return;
      const iframe = iframeRef.current;
      const client = new window.Sketchfab(iframe);

      client.init("d5eda2d597674142983a771fe16226f4", {
        success: function (api) {
          console.log("Sketchfab API initialized");

          api.load(function () {
            console.log("Viewer preloaded");
          });

          api.start();
          api.addEventListener("viewerready", function () {
            console.log("Sketchfab model is fully ready");

            // Disable interactions
            api.setUserInteraction(false);

            // Start auto-rotation around the Z-axis
            // api.startAutospin(1); // Speed of rotation

            // Delay before showing model
            setTimeout(() => {
              setIsReady(true);
            }, 1500);
          });
        },
        error: function () {
          console.log("Sketchfab API failed to initialize");
        },
      });
    };

    if (!window.Sketchfab) {
      const script = document.createElement("script");
      script.src =
        "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
      script.onload = loadSketchfab;
      document.body.appendChild(script);
    } else {
      loadSketchfab();
    }
  }, []);

  return (
    <div className="sketchfab-container">
      {!isReady && <p>Loading 3D model...</p>}
      <iframe
        ref={iframeRef}
        title="Sketchfab Model"
        width="100%"
        height="500px"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/d5eda2d597674142983a771fe16226f4/embed?autospin=1"
        style={{ display: isReady ? "block" : "none" }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default SketchfabEmbed;
