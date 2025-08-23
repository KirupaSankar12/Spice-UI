import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaStore, FaTruck } from 'react-icons/fa'; // Import icons
import './css/Home.css';

function Home() {
  return (
    <div className="home-page-container">
      {/* ======================= Hero Section ======================= */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>A World of Flavor, A World of Opportunity</h1>
          <p>
            Join our family of passionate entrepreneurs and share the rich, authentic taste 
            of our globally-sourced spices. Your franchise journey starts here.
          </p>
          <div className="hero-buttons">
            <Link to="/apply" className="btn btn-primary">Get Started</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* ======================= Features Section ======================= */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon"><FaLeaf /></div>
            <h3>Authentic Quality</h3>
            <p>
              We provide direct access to the world's finest, ethically-sourced spices, 
              ensuring premium quality for your customers.
            </p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon"><FaStore /></div>
            <h3>Proven Business Model</h3>
            <p>
              Leverage our established brand, operational expertise, and comprehensive 
              training for your success.
            </p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon"><FaTruck /></div>
            <h3>Supply Chain Mastery</h3>
            <p>
              We handle the complex logistics of sourcing and delivery, 
              so you can focus on growing your business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
