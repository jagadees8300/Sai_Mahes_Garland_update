import { useParams } from "react-router-dom";
import products from "../data/products";

function ImagePreview() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <p style={{ textAlign: "center" }}>Image not found</p>;
  }

  return (
    <div style={styles.container}>
      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    maxWidth: "80%",     // ✅ medium width
    maxHeight: "80%",    // ✅ medium height
    objectFit: "contain",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
};

export default ImagePreview;
