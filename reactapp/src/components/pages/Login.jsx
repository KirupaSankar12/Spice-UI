import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShieldAlt } from "react-icons/fa";
import "../css/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState("USER");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://spice-backend-f6cq.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // Role mismatch check
        if (
          (loginType === "ADMIN" && data.role !== "ROLE_ADMIN") ||
          (loginType === "USER" && data.role !== "ROLE_USER")
        ) {
          toast.error(`You are not registered as a ${loginType.toLowerCase()}.`);
          setIsLoading(false);
          return;
        }

        // Save token & role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        toast.success("Login Successful 🎉");
        onLogin(data.token, data.role);

        // Navigate based on role
        navigate(data.role === "ROLE_ADMIN" ? "/manage-merchants" : "/dashboard");
      } else {
        toast.error("Invalid credentials ❌");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="light-login-container">
      {/* Left Panel: Info / Illustration */}
      <div className="login-info-panel">
        <div className="info-content">
          <h1 data-aos="fade-down">Welcome to the Spice Merchant Community</h1>
          <p data-aos="fade-down" data-aos-delay="100">
            Log in to manage your franchise, track applications, and access exclusive resources
            for your journey in the world of authentic flavors.
          </p>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="login-form-panel">
        <div className="login-card" data-aos="fade-up">
          {/* Logo */}
          <div className="login-logo">SPICE MERCHANTS</div>

          {/* User/Admin Toggle */}
          <div className="login-type-selector">
            <button
              type="button"
              className={loginType === "USER" ? "active" : ""}
              onClick={() => setLoginType("USER")}
            >
              <FaUser /> User Portal
            </button>
            <button
              type="button"
              className={loginType === "ADMIN" ? "active" : ""}
              onClick={() => setLoginType("ADMIN")}
            >
              <FaShieldAlt /> Admin Portal
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="floating-input-group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="floating-input-group">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="login-submit-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Signup link */}
          <p className="signup-link-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
