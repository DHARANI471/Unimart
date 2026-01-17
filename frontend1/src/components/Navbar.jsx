// Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../styles/navbar.css";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  // ✅ FORCE HOME REFRESH (even if already on home)
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          UniMart
        </div>

        <div className="nav-right">
          {/* NAV LINKS */}
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about">About</NavLink>
            </li>

            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/products"></NavLink>
                </li>
                <li>
                  <NavLink to="/add-product"></NavLink>
                </li>
              </>
            )}
          </ul>

          {/* LOGIN / REGISTER */}
          {!isAuthenticated && (
            <div className="auth-combined-btn">
              <span onClick={() => navigate("/login")} className="auth-link">
                Login
              </span>
              <span className="slash"> / </span>
              <span onClick={() => navigate("/register")} className="auth-link">
                Register
              </span>
            </div>
          )}

          {/* THREE DOT MENU ICON */}
          {isAuthenticated && (
            <span
              className="three-dot-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ⋮
            </span>
          )}
        </div>
      </nav>

      {/* DROPDOWN MENU */}
      {isAuthenticated && menuOpen && (
        <div className="three-dot-menu" ref={menuRef}>
          <div onClick={() => navigate("/profile")}>Profile</div>
          <div onClick={() => navigate("/my-products")}>My Products</div>
          <div onClick={() => navigate("/cart")}>Cart</div>

          <div className="menu-divider"></div>

          <div className="logout-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
