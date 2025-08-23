// src/components/pages/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEye, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../css/Home.css';

function UserDashboard() {
  const userName = "Franchisee"; // 🔑 Replace later with actual user data from backend/profile API

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user applications on mount
  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8080/my-applications", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        } else {
          toast.error("Could not fetch application statuses ❌");
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        toast.error("A network error occurred ⚠️");
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  // Count application statuses
  const pendingCount = applications.filter(app => app.status === 'PENDING').length;
  const approvedCount = applications.filter(app => app.status === 'APPROVED').length;
  const rejectedCount = applications.filter(app => app.status === 'REJECTED').length;

  return (
    <div className="user-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <FaUserCircle className="user-avatar" />
        <div className="welcome-message">
          <h1>Welcome Back, {userName}!</h1>
          <p>This is your central hub to manage your franchise applications.</p>
        </div>
      </header>

      {/* Actions */}
      <section className="dashboard-actions">
        <Link to="/apply" className="action-card" data-aos="fade-up">
          <FaPlusCircle className="action-icon" />
          <div>
            <h3>Apply for a New Franchise</h3>
            <p>Start a new application to expand your spice empire.</p>
          </div>
        </Link>
        <Link
          to="/my-applications"
          className="action-card"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <FaEye className="action-icon" />
          <div>
            <h3>View My Applications</h3>
            <p>Track the status of your submitted applications.</p>
          </div>
        </Link>
      </section>

      {/* Status Overview */}
      <section className="dashboard-status" data-aos="fade-up">
        <h3>Application Status Overview</h3>
        <div className="status-summary">
          <div className="status-item">
            <span className="status-number">{loading ? '...' : pendingCount}</span>
            <span className="status-label">Pending Review</span>
          </div>
          <div className="status-item">
            <span className="status-number">{loading ? '...' : approvedCount}</span>
            <span className="status-label">Approved</span>
          </div>
          <div className="status-item">
            <span className="status-number">{loading ? '...' : rejectedCount}</span>
            <span className="status-label">Rejected</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
