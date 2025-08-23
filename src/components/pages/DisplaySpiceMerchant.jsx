import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../components/css/DisplaySpiceMerchant.css";

function DisplaySpiceMerchant() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch merchants
  const fetchMerchants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/getAllSpiceMerchants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const merchantsWithStatus = data.map((m) => ({
        ...m,
        status: m.status || "PENDING",
      }));
      setMerchants(merchantsWithStatus);
    } catch (err) {
      toast.error("Failed to fetch merchants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  // Delete merchant
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:8080/delete/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.warn("Merchant application deleted 🗑️");
        fetchMerchants();
      } catch (err) {
        toast.error("Failed to delete merchant.");
      }
    }
  };

  // Approve/Reject merchant
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/updateStatus/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // ✅ send as JSON
      });
      toast.success(`Merchant has been ${newStatus.toLowerCase()}!`);
      fetchMerchants();
    } catch (err) {
      toast.error(`Failed to ${newStatus.toLowerCase()} merchant.`);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color={"#d35400"} size={50} />
        <p>Loading Applications...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Merchant Applications</h1>
        <p>Review, approve, and manage all submitted franchise applications.</p>
      </div>

      {merchants.length === 0 ? (
        <div className="empty-state">
          <h3>No Applications Found</h3>
          <p>When a new user applies for a franchise, it will show up here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Spices</th>
                <th>Location</th>
                <th>Experience (yrs)</th> {/* ✅ Added header */}
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.spices}</td>
                  <td>{m.storeLocation}</td>
                  <td>{m.experience}</td> {/* ✅ Added cell */}
                  <td>
                    <span
                      className={`status-badge status-${m.status.toLowerCase()}`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {m.status === "PENDING" && (
                      <>
                        <button
                          title="Approve"
                          className="action-btn approve-btn"
                          onClick={() => handleUpdateStatus(m.id, "APPROVED")}
                        >
                          <FaCheck />
                        </button>
                        <button
                          title="Reject"
                          className="action-btn reject-btn"
                          onClick={() => handleUpdateStatus(m.id, "REJECTED")}
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    <Link to={`/edit-merchant/${m.id}`} title="Edit">
                      <button className="action-btn edit-btn">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      title="Delete"
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(m.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DisplaySpiceMerchant;
