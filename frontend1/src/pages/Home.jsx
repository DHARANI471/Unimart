import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/hero.css";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  // SIMPLE AUTH CHECK
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleSearchProducts = () => {
    if (!isLoggedIn()) {
      toast.warn("Please login to search products 🔒");
      return;
    }
    navigate("/products");
  };

  const handlePostItem = () => {
    if (!isLoggedIn()) {
      toast.warn("Please login to post an item 🔒");
      return;
    }

    // ✅ MAKE SURE THIS PATH EXISTS IN App.jsx
    navigate("/add-product");
  };

  return (
    <>
      <Navbar />

      <section className="navy-hero">
        {/* Animated background layers */}
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>

        {/* Particles */}
        <ul className="navy-particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>

        {/* Content */}
        <div className="navy-content">
          <h1 className="navy-title">
            <span>Buy</span>
            <span>Sell</span>
            <span className="accent">Save</span>
          </h1>

          <p className="navy-desc">
            A campus-based marketplace to trade books and essentials   
            simple, safe, and student-first.
          </p>

          <div className="navy-actions">
            <button
              type="button"
              className="navy-btn primary"
              onClick={handleSearchProducts}
            >
              🔍 Search Products
            </button>

            <button
              type="button"
              className="navy-btn secondary"
              onClick={handlePostItem}
            >
              ➕ Post an Item
            </button>
          </div>
        </div>

        {/* Floating cards */}
        <div className="navy-card card-1">📘 Used Books</div>
        <div className="navy-card card-2">🎒 Stationery</div>
        <div className="navy-card card-3">🎓 Verified Listings</div>
      </section>
    </>
  );
}

export default Home;
