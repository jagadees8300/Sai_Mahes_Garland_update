import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="details" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>
          Return to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Basic auth check for Flipkart-like experience
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Please login to add items to your cart.");
      // Could open auth modal here in a real app
      return;
    }
    // Add to global cart context
    addToCart(product);
  };

  const handleBuyNow = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Please login to proceed with purchase.");
      return;
    }
    // Add to cart and immediately open checkout (mocked here)
    addToCart(product);
    // Note: addToCart already opens the cart panel
  };

  return (
    <div className="details">
      <div className="details-content">

        {/* Left Side: Large Picture Frame */}
        <div className="details-img-container">
          <img src={product.image} alt={product.name} className="details-img" />
        </div>

        {/* Right Side: Product Info & Actions */}
        <div className="details-info">
          <h2 style={{ fontSize: "2.5rem", color: "var(--primary-color)", marginBottom: "10px" }}>
            {product.name}
          </h2>
          <h3 className="price" style={{ fontSize: "2rem", marginBottom: "20px" }}>
            ₹{product.price}
          </h3>

          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", marginBottom: "30px", borderLeft: "4px solid var(--secondary-color)" }}>
            <h4 style={{ marginBottom: "10px", color: "var(--text-dark)" }}>Product Description</h4>
            <p style={{ color: "var(--text-light)", lineHeight: "1.6" }}>{product.description}</p>
          </div>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: "1",
                minWidth: "200px",
                background: "white",
                color: "var(--secondary-color)",
                border: "2px solid var(--secondary-color)",
                boxShadow: "none"
              }}
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              style={{
                flex: "1",
                minWidth: "200px"
              }}
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
