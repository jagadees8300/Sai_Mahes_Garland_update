import React, { useState } from "react";
import MapSection from "./MapSection";
import "../styles/home.css";

// Featured video and channel
const featuredVideoId = "DHaOe3w1V4k"; // provided video id from https://youtu.be/DHaOe3w1V4k
const channelUrl = "https://youtube.com/@jackscraft330?si=DloaLr3TeEbGIn2t";

function ContactMapSection() {
	const [currentVideoId, setCurrentVideoId] = useState(null);

	const thumbnailUrl = `https://img.youtube.com/vi/${featuredVideoId}/hqdefault.jpg`;

	return (
		<div className="container" style={{ padding: 20 }}>
			<h2 style={{ textAlign: "center", marginBottom: 12 }}>Contact & Location</h2>

			<div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
				<div style={{ flex: 1, minWidth: 300 }}>
					<MapSection />
				</div>

				<div style={{ width: 420, minWidth: 300 }}>
					<h3 style={{ marginBottom: 8, textAlign: "center" }}>Featured Video</h3>

					{/* Clickable thumbnail */}
					<div style={{ cursor: "pointer", position: "relative" }} onClick={() => setCurrentVideoId(featuredVideoId)}>
						<img src={thumbnailUrl} alt="Featured video" style={{ width: "100%", display: "block", borderRadius: 6 }} />
						<div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
							<div style={{ background: "rgba(0,0,0,0.6)", borderRadius: "50%", padding: 12 }}>
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M8 5v14l11-7L8 5z" fill="#fff" />
								</svg>
							</div>
						</div>
					</div>

					<p style={{ textAlign: "center", marginTop: 10 }}>
						<a href={channelUrl} target="_blank" rel="noopener noreferrer">
							Open our YouTube channel
						</a>
					</p>

					{/* Embedded player shows after click */}
					{currentVideoId && (
						<div style={{ marginTop: 12 }}>
							<div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
								<iframe
									title="Featured Video Player"
									src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
									style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</div>
					)}

					<h3 style={{ marginTop: 18, marginBottom: 8, textAlign: "center" }}>Our Webpage</h3>
					<div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
						<iframe
							title="Sai Mahes Garlands Webpage"
							src={channelUrl}
							style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "1px solid #ddd" }}
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactMapSection;
