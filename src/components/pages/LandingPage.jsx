import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaStore, FaTruck, FaBookOpen, FaMortarPestle, FaSeedling, FaBullhorn, FaLeaf
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/LandingPage.css';

// ⭐ Testimonials data
const testimonials = [
  {
    quote: "The quality of the Malabar pepper and Kashmiri saffron is unlike anything I could source on my own. My customers are thrilled!",
    name: "Anjali Kumar",
    location: "Kochi, Kerala",
    image: "https://source.unsplash.com/100x100/?indian-woman-portrait"
  },
  {
    quote: "Our signature Chai Masala blend is a local bestseller. The training and recipes provided were invaluable to our early success.",
    name: "Rohan Patel",
    location: "Mumbai, Maharashtra",
    image: "https://source.unsplash.com/100x100/?indian-man-portrait"
  },
  {
    quote: "My shop has become the go-to place for authentic spices in my city. The brand recognition made a huge difference from day one.",
    name: "Priya Singh",
    location: "Jaipur, Rajasthan",
    image: "https://source.unsplash.com/100x100/?woman-portrait-smile"
  }
];

function LandingPage() {
  return (
    <div className="landing-container">

      {/* ======================= Hero Section ======================= */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>A World of Flavor, A World of Opportunity</h1>
          <p>
            Join our family of passionate entrepreneurs and share the rich, authentic taste 
            of globally-sourced spices. Your franchise journey starts here.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* ======================= Features Section ======================= */}
      <section className="features-section">
        <h2 data-aos="fade-up">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <FaLeaf className="feature-icon" />
            <h4>Authentic Quality</h4>
            <p>Direct access to the world's finest, ethically-sourced spices, ensuring premium quality for your customers.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <FaMortarPestle className="feature-icon" />
            <h4>Signature Blend Recipes</h4>
            <p>Exclusive, time-tested spice blend recipes your customers will love.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <FaBookOpen className="feature-icon" />
            <h4>Comprehensive Training</h4>
            <p>From spice knowledge to business operations, our training equips you for success.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="400">
            <FaStore className="feature-icon" />
            <h4>Proven Business Model</h4>
            <p>Leverage our trusted brand, operational expertise, and recognition to grow fast.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="500">
            <FaTruck className="feature-icon" />
            <h4>Supply Chain Mastery</h4>
            <p>We handle logistics so you can focus on customers and growth.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="600">
            <FaBullhorn className="feature-icon" />
            <h4>Marketing Support</h4>
            <p>National campaigns and materials to boost your franchise visibility.</p>
          </div>
        </div>
      </section>

      {/* ======================= Video Section ======================= */}
      <section className="video-section">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="https://www.pexels.com/video/assorted-herbs-and-spices-for-flavoring-4902155/" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="video-content" data-aos="zoom-in">
          <h2>A Global Network of Authentic Flavors</h2>
          <p>Our franchise model connects spice lovers worldwide with tradition, quality, and innovation.</p>
        </div>
      </section>

      {/* ======================= Info Form Section ======================= */}
      <section className="info-section" data-aos="fade-up">
        <div className="info-content">
          <h2>Start Your Franchise Journey Today</h2>
          <p>Fill out the form and our team will guide you through the application process.</p>
        </div>
        <div className="info-form">
          <form>
            <input type="text" placeholder="Business Name" required />
            <div className="form-row">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <input type="tel" placeholder="Phone Number" required />
            <input type="email" placeholder="Email" required />
            <button type="submit" className="btn-get-started">Get Started</button>
          </form>
          <p className="form-footer-link">
            Already a member? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>

      {/* ======================= Testimonials Section ======================= */}
      <section className="testimonials-section" data-aos="fade-up">
        <h2>What Our Franchisees Say</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="testimonial-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ======================= Call to Action Section ======================= */}
      <section className="cta-section" data-aos="zoom-in">
        <h2>Ready to Share the World of Spices?</h2>
        <p>Bring authentic flavors to your community. Let’s build success together.</p>
        <Link to="/signup" className="btn-get-started">Apply Now</Link>
      </section>
    </div>
  );
}

export default LandingPage;
