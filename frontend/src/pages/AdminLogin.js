import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/auth.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/api/auth/admin/login', { email, password });
            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('adminUser', JSON.stringify(res.data.user));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Note: Only Admin accounts are allowed.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '40px',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                transform: 'translateY(0)',
                animation: 'fadeUp 0.6s ease-out forwards',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <style>{`
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .admin-input {
                        width: 100%; padding: 12px 15px; margin-bottom: 20px; borderRadius: 8px; border: 1px solid #cbd5e1; outline: none; transition: 0.3s; font-size: 1rem;
                    }
                    .admin-input:focus {
                        border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
                    }
                    .admin-btn {
                        width: 100%; padding: 14px; background: linear-gradient(90deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px;
                    }
                    .admin-btn:hover {
                        transform: translateY(-2px); box-shadow: 0 8px 15px rgba(37, 99, 235, 0.3);
                    }
                `}</style>
                <div style={{ marginBottom: '20px' }}>
                    <a href="/" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: '500', transition: '0.3s' }}>← Back to Home</a>
                </div>
                
                <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '30px', fontSize: '2rem', fontWeight: '800' }}>
                    <span style={{ color: '#3b82f6' }}>Admin</span> Portal
                </h2>
                
                {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '10px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', border: '1px solid #fca5a5' }}>
                    {error}
                </div>}
                
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Admin Email" 
                        className="admin-input"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="admin-input"
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="admin-btn">Login to Dashboard 🚀</button>
                    
                    <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
                        Need an admin account? <a href="/admin/signup" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Register Here</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
