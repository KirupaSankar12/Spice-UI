// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

// Import Pages & Components
import LandingHome from "./components/pages/LandingPage";
import UserDashboard from "./components/pages/UserDashboard"; // ✅ Correct import
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ApplyForm from "./components/pages/ApplyForm";
import DisplaySpiceMerchant from "./components/pages/DisplaySpiceMerchant";
import EditMerchant from "./components/pages/EditMerchant";
import NavBar from "./components/NavBar";
import SuccessPage from "./components/pages/SuccessPage";
import Footer from "./components/Footer";

// ⭐ Newly added pages
import AboutUsPage from "./components/pages/AboutUsPage";
import FAQPage from "./components/pages/FAQPage";
import MyApplications from "./components/pages/MyApplication";

function AppLogic() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  const handleLogin = (newToken, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);

    if (newRole === "ROLE_ADMIN") {
      navigate("/manage-merchants");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/");
  };

  return (
    <div className="app-container">
      <NavBar onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          {/* Root path always shows Landing page */}
          <Route path="/" element={<LandingHome />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Common Dashboard */}
          <Route
            path="/dashboard"
            element={
              token ? <UserDashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* USER-only Routes */}
          <Route
            path="/home"
            element={
              token && role === "ROLE_USER" ? (
                <UserDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/apply"
            element={
              token && role === "ROLE_USER" ? (
                <ApplyForm />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/success"
            element={
              token && role === "ROLE_USER" ? (
                <SuccessPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/my-applications"
            element={
              token && role === "ROLE_USER" ? (
                <MyApplications />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ADMIN-only Routes */}
          <Route
            path="/manage-merchants"
            element={
              token && role === "ROLE_ADMIN" ? (
                <DisplaySpiceMerchant />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/edit-merchant/:id"
            element={
              token && role === "ROLE_ADMIN" ? (
                <EditMerchant />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Extra Routes (any logged-in user) */}
          <Route
            path="/about-us"
            element={token ? <AboutUsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/faq"
            element={token ? <FAQPage /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        <AppLogic />
      </Router>
    </>
  );
}

export default App;
