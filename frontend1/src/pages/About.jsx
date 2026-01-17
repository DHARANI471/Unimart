import Navbar from "../components/Navbar";
import "../styles/about.css";

function About() {
  return (
    <>
      <Navbar />

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-image">
          <img
            src="https://res.cloudinary.com/dwxw9wkad/image/upload/v1768472842/3afeb6c5-8f8a-4754-b101-689300eeb9c4_mqscei.png"
            alt="About"
          />
        </div>

        <div className="about-content">
          <h2>We Are UniMart</h2>
          <p>
            UniMart is a student focused marketplace where you can buy and sell
            books, gadgets, and study essentials.
            Connect directly with sellers, get affordable prices, and make
            student life easier.
          </p>

          
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-box">
          <h3>Contact Us</h3>
          <p>📍 Campus Location</p>
          <p>📞 +91 94XXXXXXXX</p>
          <p>✉️ unimart@gmail.com</p>
        </div>

        <div className="footer-box">
          <h3>UniMart</h3>
          <p>
            Making student buying & selling simple, fast, and reliable.
          </p>

          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🔗</span>
          </div>
        </div>

        <div className="footer-box">
          <h3>Online Marketplace</h3>
          <p>🛒Buy & sell from anywhere</p>
          
        </div>
      </footer>
    </>
  );
}

export default About;