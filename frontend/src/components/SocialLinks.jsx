import "../styles/social.css";

function SocialLinks() {
  const socialLinks = [
    {
      id: 1,
      name: "WhatsApp",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.7 4.3C20.3 2.9 18.4 2 16.3 2 12.1 2 8.8 5.3 8.8 9.5c0 1.3.3 2.6.9 3.7L8 18l4.9-1.6c1.1.6 2.3.9 3.7.9 4.2 0 7.5-3.3 7.5-7.5 0-2.1-.9-4-2.1-5.4z" fill="#fff"/>
        </svg>
      ),
      url: "https://wa.me/919876543210?text=Hello%20Sai%20Mahes%20Garlands!",
      color: "#25D366",
    },
    {
      id: 2,
      name: "Instagram",
      icon: (
        // camera icon for Instagram replacement
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" fill="#fff"/>
          <path d="M20 7.5a2.5 2.5 0 01-2.5-2.5H6.5A2.5 2.5 0 014 7.5v9A2.5 2.5 0 016.5 19h11a2.5 2.5 0 002.5-2.5v-9z" stroke="#fff" strokeWidth="0"/>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#E1306C" />
        </svg>
      ),
      url: "https://instagram.com/saimahesgarlands",
      color: "#E1306C",
    },
    {
      id: 3,
      name: "Phone",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.2c1.2.5 2.6.8 4 .8a1 1 0 011 1V20a1 1 0 01-1 1C9.2 21 3 14.8 3 6a1 1 0 011-1h2.6a1 1 0 011 1c0 1.4.3 2.8.8 4a1 1 0 01-.2 1l-2.6 2.8z" fill="#fff"/>
        </svg>
      ),
      url: "tel:+919876543210",
      color: "#0EA5A4",
    },
    {
      id: 4,
      name: "YouTube",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1-3-.2-7.5-.2-7.5-.2s-4.5 0-7.5.2c-.4 0-1.3.1-2.1 1C.7 4.6.5 6.2.5 6.2S.2 8 .2 9.8v1.4c0 1.8.3 3.6.3 3.6s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.8.1 7.8.2 7.8.2s4.4 0 7.5-.2c.4 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.3-1.8.3-3.6V9.8c0-1.8-.3-3.6-.3-3.6z" fill="#FF0000"/>
          <path d="M9.5 15.5V8.5l6 3.5-6 3.5z" fill="#fff"/>
        </svg>
      ),
      url: "https://www.youtube.com/channel/UCA7D9OGARM6ON82H07Q-QSg",
      color: "#FF0000",
    },
  ];

  return (
    <div className="social-links-container">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-btn"
          style={{ backgroundColor: link.color }}
          title={link.name}
        >
          <span className="social-icon">{link.icon}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
