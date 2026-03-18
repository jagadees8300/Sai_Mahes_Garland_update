import "../styles/footer.css";

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Business Info */}
        <div className="footer-business">
          <div className="footer-brand">
            <span className="footer-brand-icon">🌸</span>
            <span className="footer-brand-name">Sai Mahes Garlands</span>
          </div>

          <div className="footer-owner">
            <span className="footer-owner-icon">👤</span>
            Jagadeeswaran V
          </div>

          <div className="footer-address">
            <div className="footer-address-line">
              <span className="footer-address-icon">📍</span>
              <div>
                2/74, Raja Street,<br />
                Veerapandi,<br />
                Salem - 636308
              </div>
            </div>
          </div>

          <div className="footer-contact-item">
            <span>📞</span>
            <a href="tel:+919003626034" style={{ color: 'inherit', textDecoration: 'none' }}>
              +91 9003626034
            </a>
          </div>
          <div className="footer-contact-item">
            <span>✉️</span>
            <a href="mailto:saimahesgarlands@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              saimahesgarlands@gmail.com
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4 className="footer-section-title">Quick Links</h4>
          <a href="/" className="footer-link">
            <span className="footer-link-arrow">▶</span> Home
          </a>
          <a href="/#products" className="footer-link" onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('.products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.location.href = '/';
          }}>
            <span className="footer-link-arrow">▶</span> Our Products
          </a>
          <a href="/youtube" className="footer-link">
            <span className="footer-link-arrow">▶</span> YouTube
          </a>
          <a href="/contact" className="footer-link">
            <span className="footer-link-arrow">▶</span> Contact Us
          </a>
          <a href="/admin/login" className="footer-link">
            <span className="footer-link-arrow">▶</span> Admin Portal
          </a>
        </div>

        {/* Social & More */}
        <div className="footer-social">
          <h4 className="footer-section-title">Connect With Us</h4>

          <div className="footer-social-icons">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="WhatsApp">
              💬
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Instagram">
              📸
            </a>
            {/* <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Facebook">
              📘
            </a> */}
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="YouTube">
              🎬
            </a>
          </div>

          <p className="footer-tagline">
            "Handcrafted with love and devotion since 2005. Making your special occasions memorable with premium garlands."
          </p>

          <div className="footer-hours">
            <p className="footer-hours-title">🕐 Business Hours</p>
            <p className="footer-hours-text">Mon - Sat: 6:00 AM - 9:00 PM</p>
            <p className="footer-hours-text">Sunday: 6:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <p className="footer-copyright">
          © {1999} <span>Sai Mahes Garlands</span>. All rights reserved.
        </p>
        <p className="footer-made-with">
          Made with <span className="heart">❤️</span> in Salem, Tamil Nadu
        </p>
      </div>
    </footer>
  );
}

export default Footer;
