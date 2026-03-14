import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import "../styles/cart.css";

function CartSlideout() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutData, setCheckoutData] = useState({ phone: "", address: "", paymentMethod: "UPI", transactionId: "" });
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [orderSuccess, setOrderSuccess] = useState(null);

    if (!isCartOpen) return null;

    const handleProceed = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            alert("Please login to proceed to checkout.");
            return;
        }
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        setIsCheckingOut(true);
        setTimer(300); // reset timer on checkout
        
        // Timer countdown logic
        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        // Clean up interval if component unmounts or user navigates away...
        return () => clearInterval(countdown);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleBackToCart = () => {
        setIsCheckingOut(false);
        setCheckoutData({ ...checkoutData, paymentMethod: "UPI", transactionId: "" });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : { name: "Guest" };

            const productNames = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");
            const total = getCartTotal();
            const deliveryCharge = checkoutData.paymentMethod === "COD" ? 50 : 0;
            const finalTotal = total + deliveryCharge;

            if (checkoutData.paymentMethod === "UPI" && !checkoutData.transactionId) {
                alert("Please enter the UPI transaction ID");
                setLoading(false);
                return;
            }

            // 1. Generate Order ID
            const orderId = `SMG-${Math.floor(1000 + Math.random() * 9000)}`;

            // 2. Save to Backend Database
            await API.post('/api/orders', {
                productName: productNames,
                price: finalTotal,
                customerName: user.name,
                phone: checkoutData.phone,
                address: checkoutData.address,
                orderDate: new Date(),
                status: "Pending",
                paymentMethod: checkoutData.paymentMethod,
                transactionId: checkoutData.transactionId,
                deliveryCharge: deliveryCharge,
                orderId: orderId // Saving ID to backend if needed in future, but primarily for SMS right now
            });

            // 3. Generate Notification Message with item breakdown
            const itemizedList = cart.map(i => `- ${i.name} (x${i.quantity})`).join('\n');
            const message = `Hello ${user.name}!\n\nYour payment has been successfully received and your Order ID ${orderId} is now confirmed. We are processing your order for:\n${itemizedList}\n\nTotal Paid: ₹${finalTotal}\n\nThank you for shopping with Sai Mahes Garlands!`;
            const encodedMessage = encodeURIComponent(message);

            // 4. Automatically open WhatsApp to the CUSTOMER's phone number
            // Remove spaces/special chars from user input phone
            const cleanPhone = checkoutData.phone.replace(/\D/g, ''); 
            // Default to India country code if not provided
            const finalPhone = cleanPhone.length <= 10 ? `91${cleanPhone}` : cleanPhone;
            
            window.open(`https://wa.me/${finalPhone}?text=${encodedMessage}`, '_blank');
            
            // 5. Generate and Download Receipt HTML
            const receiptHtml = `
            <html>
                <head>
                    <title>Receipt - ${orderId}</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #f8fafc; color: #1e293b; }
                        .receipt-card { background: white; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
                        .header { text-align: center; border-bottom: 2px dashed #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; }
                        .header h1 { color: #8b5cf6; margin: 0 0 10px 0; }
                        .details { margin-bottom: 30px; line-height: 1.6; }
                        .items table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .items th { text-align: left; padding: 12px; background: #f1f5f9; }
                        .items td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
                        .total { text-align: right; font-size: 1.2rem; font-weight: bold; color: #ec4899; }
                        .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 0.9rem; }
                        @media print { body { padding: 0; background: white; } .receipt-card { box-shadow: none; padding: 0; } }
                    </style>
                </head>
                <body>
                    <div class="receipt-card">
                        <div class="header">
                            <h1>Sai Mahes Garlands</h1>
                            <p>Official Order Receipt</p>
                            <h3>Order ID: ${orderId}</h3>
                        </div>
                        <div class="details">
                            <strong>Date:</strong> ${new Date().toLocaleDateString()}<br/>
                            <strong>Customer Name:</strong> ${user.name}<br/>
                            <strong>Phone Number:</strong> ${checkoutData.phone}<br/>
                            <strong>Payment Method:</strong> ${checkoutData.paymentMethod} ${checkoutData.transactionId ? `(Txn: ${checkoutData.transactionId})` : ''}
                        </div>
                        <div class="items">
                            <table>
                                <tr><th>Item</th><th>Qty</th><th style="text-align:right">Price</th></tr>
                                ${cart.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td style="text-align:right">₹${i.price * i.quantity}</td></tr>`).join('')}
                                ${checkoutData.paymentMethod === 'COD' ? `<tr><td>Delivery Charge (COD)</td><td>1</td><td style="text-align:right">₹50</td></tr>` : ''}
                            </table>
                            <div class="total">Total Paid: ₹${finalTotal}</div>
                        </div>
                        <div class="footer">
                            <p>Thank you for shopping with us!</p>
                            <button onclick="window.print()" style="padding:10px 20px; background:#8b5cf6; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; margin-top:20px;">🖨️ Print Receipt</button>
                        </div>
                    </div>
                </body>
            </html>
            `;
            
            setOrderSuccess({ orderId, receiptHtml });
            clearCart();
        } catch (err) {
            console.error(err);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
            <div className={`cart-slideout ${isCartOpen ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>{orderSuccess ? "Order Confirmed" : isCheckingOut ? "Checkout" : "Your Cart"}</h2>
                    <button className="close-btn" onClick={() => { setIsCartOpen(false); setIsCheckingOut(false); setOrderSuccess(null); setCheckoutData({ phone: "", address: "", paymentMethod: "UPI", transactionId: "" }); }}>✕</button>
                </div>

                <div className="cart-items">
                    {orderSuccess ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
                            <h2 style={{ color: '#16a34a', marginBottom: '10px' }}>Order Placed!</h2>
                            <p style={{ color: '#475569', marginBottom: '30px' }}>WhatsApp notification sent. Your order <strong>{orderSuccess.orderId}</strong> has been successfully confirmed!</p>
                            
                            <button 
                                onClick={() => {
                                    const receiptWindow = window.open('', '_blank');
                                    receiptWindow.document.write(orderSuccess.receiptHtml);
                                    receiptWindow.document.close();
                                }}
                                style={{
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    padding: '14px 20px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginBottom: '15px',
                                    width: '100%',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            >
                                🖨️ Download Receipt
                            </button>
                            
                            <button 
                                onClick={() => {
                                    setOrderSuccess(null);
                                    setIsCheckingOut(false);
                                    setCheckoutData({ phone: "", address: "", paymentMethod: "UPI", transactionId: "" });
                                    setIsCartOpen(false);
                                }}
                                style={{
                                    background: '#f1f5f9',
                                    color: '#475569',
                                    padding: '12px 20px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    width: '100%',
                                    fontWeight: '500'
                                }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : isCheckingOut ? (
                        <form onSubmit={handlePlaceOrder} className="checkout-form">
                            <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Delivery Details</h3>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={checkoutData.phone}
                                    onChange={e => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                                    placeholder="Enter your mobile number"
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Delivery Address</label>
                                <textarea
                                    required
                                    value={checkoutData.address}
                                    onChange={e => setCheckoutData({ ...checkoutData, address: e.target.value })}
                                    placeholder="Enter full delivery address"
                                    rows="4"
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', resize: 'none' }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Payment Method</label>
                                <select 
                                    value={checkoutData.paymentMethod} 
                                    onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                >
                                    <option value="UPI">UPI Payment</option>
                                    <option value="COD">Cash on Delivery (+₹50)</option>
                                </select>
                            </div>

                            {checkoutData.paymentMethod === "UPI" && (
                                <div style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Scan to Pay</p>
                                    <img src="/upi_qr.jpg" alt="UPI QR Code" style={{ width: '200px', height: '200px', marginBottom: '10px', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"; }} />
                                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>UPI ID: jagadees0818@okicici</p>
                                    
                                    <div style={{ margin: '15px 0', fontSize: '1.2rem', fontWeight: 'bold', color: timer > 60 ? 'var(--primary-color)' : 'red' }}>
                                        Time remaining: {formatTime(timer)}
                                    </div>

                                    <input
                                        type="text"
                                        required
                                        value={checkoutData.transactionId}
                                        onChange={e => setCheckoutData({ ...checkoutData, transactionId: e.target.value })}
                                        placeholder="Enter 12-digit UPI Transaction ID"
                                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            )}

                            <div className="cart-total" style={{ marginBottom: '15px' }}>
                                <span>Total to Pay:</span>
                                <span style={{ color: 'var(--secondary-color)' }}>
                                    ₹{getCartTotal() + (checkoutData.paymentMethod === "COD" ? 50 : 0)}
                                </span>
                            </div>
                            <button type="submit" className="checkout-btn" disabled={loading} style={{ background: 'var(--primary-color)' }}>
                                {loading ? "Placing Order..." : "Confirm Final Order"}
                            </button>
                            <button type="button" onClick={handleBackToCart} style={{ width: '100%', marginTop: '10px', background: '#f1f5f9', color: '#475569' }}>
                                Back to Cart
                            </button>
                        </form>
                    ) : cart.length === 0 ? (
                        <p className="empty-cart">Your cart is perfectly empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p className="cart-item-price">₹{item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                {!isCheckingOut && !orderSuccess && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>₹{getCartTotal()}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleProceed} disabled={cart.length === 0}>
                            Proceed to Delivery
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartSlideout;
