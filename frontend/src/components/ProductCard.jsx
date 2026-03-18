import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [ratingData, setRatingData] = useState({ avgRating: 0, totalReviews: 0 });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/${product.id}/summary`)
      .then(res => setRatingData(res.data))
      .catch(() => {});
  }, [product.id]);

  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.name}
        className="card-img"
        onClick={() => navigate(`/product/${product.id}`)}
        title="View Details"
      />

      <h3 style={{ fontSize: "1.2rem", color: "var(--text-dark)", marginBottom: "5px" }}>{product.name}</h3>
      
      {/* Mini Rating Display */}
      {ratingData.totalReviews > 0 && (
        <div className="card-rating">
          <span className="card-rating-badge">
            {ratingData.avgRating} ★
          </span>
          <span className="card-rating-count">
            ({ratingData.totalReviews})
          </span>
        </div>
      )}

      <p className="price">₹{product.price}</p>

      <button onClick={() => navigate(`/product/${product.id}`)}>
        View Product
      </button>
    </div>
  );
}

export default ProductCard;
