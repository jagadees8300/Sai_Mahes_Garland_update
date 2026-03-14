import React from "react";
import "../styles/home.css";

function YouTubePage() {
  // Provided values
  const apiKey = "AIzaSyB0iG5XrQ-HpV3E4CkscHlyEEaMGOu1MG0";
  const channelId = "UCA7D9OGARM6ON82H07Q-QSg";
  const videoId = "UCA7D9OGARM6ON82H07Q-QSg"; // using same id as provided

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h2>Our YouTube Channel</h2>

      <p>
        Channel: <a href={`https://www.youtube.com/channel/${channelId}`} target="_blank" rel="noopener noreferrer">Open in YouTube</a>
      </p>

      <div style={{ maxWidth: 900, marginTop: 16 }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            title="Sai Mahes Garlands Video"
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 14, color: "#666" }}>
        (Embedded using the provided API key and IDs.)
      </p>
    </div>
  );
}

export default YouTubePage;
