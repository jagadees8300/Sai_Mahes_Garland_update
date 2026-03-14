import { useState } from 'react';
import API from '../services/api';

function OrderTracking() {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.get(`/api/orders/user/${phone}`);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
            alert("Could not fetch orders. Please try again later.");
        } finally {
            setLoading(false);
            setSearched(true);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return '#f59e0b';
            case 'Accepted': return '#3b82f6';
            case 'Shipped': return '#8b5cf6';
            case 'Delivered': return '#10b981';
            default: return '#64748b';
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Track Your Order</h2>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter the 10-digit mobile number used for the order"
                        required
                        style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                    />
                    <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {loading ? 'Searching...' : 'Track'}
                    </button>
                </form>
            </div>

            {searched && (
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Your Orders ({orders.length})</h3>
                    {orders.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', color: '#64748b' }}>
                            We couldn't find any orders for the number: {phone}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {orders.map(o => (
                                <div key={o._id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ padding: '15px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Order Date</span>
                                            <strong>{new Date(o.createdAt).toLocaleDateString()}</strong>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Total Amount</span>
                                            <strong>₹{(o.price || 0) + (o.deliveryCharge || 0)}</strong>
                                        </div>
                                        <div>
                                            <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', background: `${getStatusColor(o.status)}20`, color: getStatusColor(o.status), fontWeight: 'bold' }}>
                                                {o.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ marginBottom: '15px' }}>
                                            <strong style={{ color: 'var(--text-dark)' }}>Items Ordered:</strong>
                                            <p style={{ marginTop: '5px', color: '#475569' }}>{o.productName}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '40px', fontSize: '0.9rem', color: '#475569' }}>
                                            <div>
                                                <strong>Payment Method:</strong> {o.paymentMethod}
                                            </div>
                                            <div>
                                                <strong>Delivery Address:</strong> {o.address.substring(0, 50)}...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrderTracking;
