import { useState } from "react";
import "../styles/modal.css";

function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  const contactDetails = {
    phone: "+91-9003626034",
    email: "maheshgarlands@gmail.com",
    address: "2/74,Raja Street,Veerapandi,Salem-636308",
    whatsapp: "https://wa.me/919003626034?text=Hello%20Sai%20Mahes%20Garlands!%20I%20want%20to%20know%20more%20about%20your%20products.",
    instagram: "https://instagram.com/saimahesgarlands",
  };

  return (
    <>
      <button 
        className="contact-btn"
        onClick={() => setIsOpen(true)}
      >
        📞 Contact Us
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h2>Contact Details</h2>

            <div className="contact-item">
              <span>📱 Phone:</span>
              <a href={`tel:${contactDetails.phone}`}>
                {contactDetails.phone}
              </a>
            </div>

            <div className="contact-item">
              <span>✉️ Email:</span>
              <a href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </div>

            <div className="contact-item">
              <span>📍 Address:</span>
              <p>{contactDetails.address}</p>
            </div>

            <div className="social-links">
              <a
                href={contactDetails.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp"
              >
                💬 WhatsApp Chat
              </a>

              <a
                href={contactDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram"
              >
                📸 Instagram
              </a>

              <a
                href={`https://www.youtube.com/channel/UCA7D9OGARM6ON82H07Q-QSg`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn youtube"
              >
                ▶️ YouTube Channel
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactModal;
