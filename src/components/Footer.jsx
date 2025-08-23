import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Branding & Social Section */}
        <div className="footer-section brand-section">
          <h3 className="footer-logo">SPICE MERCHANTS</h3>
          <p>Sharing the authentic taste of globally-sourced spices since 2024.</p>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h4>Our Company</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/franchise-info">Franchise Info</Link></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Get in Touch</h4>
          <p>Feel free to reach out with any questions.</p>
          <p>📧 <a href="mailto:sales@spicemerchants.com">sales@spicemerchants.com</a></p>
          <p>📞 +91 987 654 3210</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2025 Spice Merchants | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
