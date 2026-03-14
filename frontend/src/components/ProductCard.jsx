import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

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
      <p className="price">₹{product.price}</p>

      <button onClick={() => navigate(`/product/${product.id}`)}>
        View Product
      </button>
    </div>
  );
}

export default ProductCard;
