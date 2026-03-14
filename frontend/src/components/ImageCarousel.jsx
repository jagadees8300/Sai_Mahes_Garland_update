import { useState, useEffect } from "react";
import "../styles/carousel.css";

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/weight1.jpg",
    "/images/weight2.jpg",
    "/images/weight3.jpg",
    "/images/weight4.jpg",
    "/images/weight5.jpg",
    "/images/arcit4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img src={img} alt={`Garland ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="carousel-welcome">
        🌸 Welcome to Sai Mahes Garlands 🌸
      </div>
    </div>
  );
}

export default ImageCarousel;
