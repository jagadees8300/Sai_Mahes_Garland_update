import { useState } from "react";
import "../styles/auth.css";
import API from "../services/api";

function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await API.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // Use a better visual alert or just a prompt
        alert(`Login Successful! Welcome back, ${user.name} 🎉`);
        window.dispatchEvent(new Event('auth-change'));
      } else {
        const res = await API.post('/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        alert(`Account created successfully! Welcome, ${user.name} 🎉`);
        window.dispatchEvent(new Event('auth-change'));
      }
      setFormData({ email: "", password: "", name: "" });
      setIsOpen(false);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Auth failed';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="auth-btn" onClick={() => setIsOpen(true)}>
        👤 Login / Sign Up
      </button>

      {isOpen && (
        <div className="auth-overlay" onClick={() => setIsOpen(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="auth-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className={`submit-btn ${isLogin ? 'login' : 'signup'}`} disabled={loading}>
                {loading ? 'Please wait...' : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="toggle-auth">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-btn"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
