import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaStore, FaTruck, FaBookOpen } from "react-icons/fa";
import "../css/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const { name, ...signupData } = formData; // Send only backend-expected fields
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (res.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const msg = await res.text();
        toast.error(msg || "Signup failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Signup error", err);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="light-signup-container">
      {/* Left Panel: Features / Info */}
      <div className="signup-info-panel">
        <div className="info-content">
          <h1 data-aos="fade-down">Grow Your Spice Business with Us</h1>
          <ul className="features-list">
            <li className="feature-item" data-aos="fade-down" data-aos-delay="100">
              <FaStore className="feature-icon" />
              <div>
                <h4>Proven Business Model</h4>
                <p>Leverage our established brand and operational expertise.</p>
              </div>
            </li>
            <li className="feature-item" data-aos="fade-down" data-aos-delay="200">
              <FaTruck className="feature-icon" />
              <div>
                <h4>Supply Chain Mastery</h4>
                <p>Access premium, direct-from-farm spice suppliers.</p>
              </div>
            </li>
            <li className="feature-item" data-aos="fade-down" data-aos-delay="300">
              <FaBookOpen className="feature-icon" />
              <div>
                <h4>Comprehensive Training</h4>
                <p>Complete guidance on products, sales, and business management.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel: Signup Form */}
      <div className="signup-form-panel">
        <div className="signup-card" data-aos="fade-up">
          <div className="signup-logo">SPICE MERCHANTS</div>
          <h2>Create a free account</h2>
          <form onSubmit={handleSubmit}>
            <div className="floating-input-group">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="name">Full Name</label>
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="floating-input-group">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="email">Email</label>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="floating-input-group">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="password">Password</label>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="floating-input-group">
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button type="submit" className="signup-submit-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="login-link-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
