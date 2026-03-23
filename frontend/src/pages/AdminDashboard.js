import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchOrders();
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            const res = await API.get('/api/orders/all');
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch orders array");
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await API.put(`/api/orders/${id}/status`, { status: newStatus });
            // Refresh orders naturally
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
            alert("Order status updated successfully!");
        } catch (err) {
            alert("Failed to update status.");
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return '#f59e0b';
            case 'Accepted': return '#3b82f6';
            case 'Shipped': return '#8b5cf6';
            case 'Delivered': return '#10b981';
            default: return '#64748b';
        }
    }

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading orders...</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', margin: 0 }}>Admin Dashboard - Order Management</h2>
                <button 
                  onClick={logout} 
                  style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', minHeight: '44px' }}>
                  Logout
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>Date</th>
                            <th style={{ padding: '15px' }}>Customer</th>
                            <th style={{ padding: '15px' }}>Items & Price</th>
                            <th style={{ padding: '15px' }}>Payment</th>
                            <th style={{ padding: '15px' }}>Current Status</th>
                            <th style={{ padding: '15px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No orders found</td></tr>
                        ) : (
                            orders.map(o => (
                                <tr key={o._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{o.orderId || 'N/A'}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{new Date(o.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <strong>{o.customerName}</strong><br/>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{o.phone}</span><br/>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{o.address}</span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{o.productName}</div>
                                        <strong>₹{o.price}</strong> <span style={{ fontSize: '0.8rem', color: '#64748b' }}>(+₹{o.deliveryCharge} dlry)</span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '12px', background: o.paymentMethod === 'UPI' ? '#dbeafe' : '#f1f5f9', color: o.paymentMethod === 'UPI' ? '#1e40af' : '#475569', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            {o.paymentMethod}
                                        </span>
                                        {o.transactionId && <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#64748b' }}>TXN: {o.transactionId}</div>}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '20px', background: `${getStatusColor(o.status)}20`, color: getStatusColor(o.status), fontWeight: 'bold', fontSize: '0.85rem' }}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <select 
                                            value={o.status} 
                                            onChange={(e) => updateStatus(o._id, e.target.value)}
                                            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '44px' }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
