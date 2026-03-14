import { useState, useEffect, useContext } from "react";
import AuthModal from "./AuthModal";
import ContactModal from "./ContactModal";
import { CartContext } from "../context/CartContext";
import "../styles/navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const { getCartCount, setIsCartOpen } = useContext(CartContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for custom auth event to update nav without refresh
    const handleAuth = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('auth-change', handleAuth);
    return () => window.removeEventListener('auth-change', handleAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🌸</span>
          <h1 className="brand-text">Sai Mahes Garlands <span className="since-text" style={{ fontSize: '0.4em', verticalAlign: 'middle', marginLeft: '8px', opacity: 0.8 }}>Since 2005</span></h1>
        </div>

        <div className="navbar-actions" style={{ alignItems: 'center' }}>
          <a href="/youtube" className="nav-link" style={{ marginRight: 20 }}>YouTube</a>
          <a href="/admin/login" className="nav-link" style={{ 
            marginRight: 20, 
            fontWeight: '900', 
            background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #f43f5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(236, 72, 153, 0.3)',
            letterSpacing: '0.5px',
            fontSize: '1.05rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none'
          }}>
            <span>🛡️</span>
            Admin Portal
            <span>✨</span>
          </a>
          <ContactModal />

          {/* Cart Icon */}
          <button
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem', marginRight: '10px' }}
          >
            🛒
            {getCartCount() > 0 && (
              <span className="cart-badge" style={{
                position: 'absolute',
                top: '-5px',
                right: '-10px',
                background: 'var(--secondary-color)',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {getCartCount()}
              </span>
            )}
          </button>

          {user ? (
            <div className="user-profile">
              <span className="user-logo">👤</span>
              <span className="user-name">Hi, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <AuthModal />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
