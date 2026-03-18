import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ContactMapSection from "./components/ContactMapSection";
import YouTubePage from "./pages/YouTube";
import CartSlideout from "./components/CartSlideout";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <CartSlideout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactMapSection />} />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
