import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

const images = [
  "2.jpg",
  "1.jpg",
  "3.jpg",
  "5.jpg",
  "4.jpg",
  "6.jpg",
];

function HomePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1 className="logo">Care&Connect</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            {/*<Link to="/dashboard">Dashboard</Link>*/}
            
            <div className="auth-buttons">
              <button onClick={() => navigate("/signin")} className="signin-btn">SignIn</button>
              <button onClick={() => navigate("/signup")} className="signup-btn">SignUp</button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="body-container">
        <section className="hero">
          <h2 className="hero-title">Care and Connect - Food and Cloth Donation Site</h2>
          <p className="hero-subtitle">
            Your small act of kindness can create a big impact. Join us in making a difference.
          </p>
          <div className="cta-buttons">
            <button onClick={() => navigate("/donate")} className="donate-btn">Donate Now</button>
          </div>

          {/* Image Slider Below Donate Button */}
          <div className="slider-container">
            <img
              src={images[currentIndex]}
              alt="Donation Awareness"
              className="w-full h-64 object-cover rounded-lg shadow-lg transition-opacity duration-500"
            />
          </div>
        </section>

        {/* Donation Steps */}
        <section className="donation-steps">
          <h3>Guided Step</h3>
          <p>Steps to facilitate donations, ensuring proper category sorting for food and cloth donations.</p>
        </section>

        {/* Categories Section */}
        <section className="features">
          <div className="feature">
            <img src="food.jpg" alt="Food Donation" />
            <h4>Food Donation</h4>
            <p>Donate essential food items to help those in need.</p>
            <button onClick={() => navigate("/food-donation")}>Donate Us</button>
          </div>
          <div className="feature">
            <img src="cloth.jpg" alt="Clothing Donation" />
            <h4>Clothing Donation</h4>
            <p>Provide warm clothing to families in need.</p>
            <button onClick={() => navigate("/cloth-donation")}>Donate Us</button>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          {/* About Us Section */}
          <div className="footer-section about">
            <h4>About Us</h4>
            <p>We are committed to making a difference through food, cloth donations.</p>
            <p>Address: 123 Charity Street, City</p>
            <p>Email: support@donationsite.com</p>
          </div>

          {/* Priority Section */}
          <div className="footer-section priority">
            <h4>Priority</h4>
            <ul>
              <li><a href="#">Our Goals</a></li>
              <li><a href="#">Get Involved</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Volunteer</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>&copy; 2025 DonateCare | All Rights Reserved</p>
          <div className="social-icons">
            <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
            <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
            <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
