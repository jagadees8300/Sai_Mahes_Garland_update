import ProductCard from "../components/ProductCard";
import ImageCarousel from "../components/ImageCarousel";
import SocialLinks from "../components/SocialLinks";
import products from "../data/products";
import MapSection from "../components/MapSection";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Advanced Hero Banner */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Elegance in Every <span className="highlight">Garland</span></h1>
          <p className="hero-subtitle">Handcrafted with love and devotion since 1999. Discover our premium collection for your special occasions.</p>
          <button className="hero-btn" onClick={() => window.scrollTo({ top: document.querySelector('.products-section').offsetTop, behavior: 'smooth' })}>
            Explore Collection
          </button>
        </div>
      </div>

      {/* Carousel Section with Animation */}
      <section className="carousel-section">
        <ImageCarousel />
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Our Premium Garland Collection</h2>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <MapSection />
      </section>

      {/* Social Links Floating */}
      <SocialLinks />
    </div>
  );
}

export default Home;
