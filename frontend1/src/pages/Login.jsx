// Login.jsx
//import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/auth.css";
import { toast } from "react-toastify";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed ❌");
        return;
      }

      localStorage.setItem("token", data.token);

      if (setIsAuthenticated) setIsAuthenticated(true);

      toast.success("Login successful 🎉");

      navigate("/");
    } catch (err) {
      setError("Server error. Try again later.");
      toast.error("Server error 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="auth-page">
        <div className="auth-card">
          <h1>Login</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />

            {error && <p style={{ color: "white" }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
