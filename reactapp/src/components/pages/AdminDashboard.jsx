import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [merchants, setMerchants] = useState([]);

  const fetchMerchants = async () => {
    const res = await fetch("http://localhost:8080/getAllSpiceMerchants");
    const data = await res.json();
    setMerchants(data);
  };

  useEffect(() => { fetchMerchants(); }, []);

  const handleApprove = async (id) => {
    await fetch(`http://localhost:8080/merchants/${id}/approve`, { method: "PUT" });
    toast.success("Merchant Approved ✅");
    fetchMerchants();
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:8080/merchants/${id}/reject`, { method: "PUT" });
    toast.error("Merchant Rejected ❌");
    fetchMerchants();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/merchants/${id}`, { method: "DELETE" });
    toast.warn("Merchant Deleted 🗑️");
    fetchMerchants();
  };

  const handleEdit = async (id, updatedData) => {
    await fetch(`http://localhost:8080/merchants/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    toast.info("Merchant Updated ✏️");
    fetchMerchants();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Spices</th><th>Experience</th><th>Location</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.spices}</td>
              <td>{m.experience}</td>
              <td>{m.storeLocation}</td>
              <td>{m.status}</td>
              <td>
                {m.status === "PENDING" && (
                  <>
                    <button onClick={() => handleApprove(m.id)}>Approve</button>
                    <button onClick={() => handleReject(m.id)}>Reject</button>
                  </>
                )}
                <button onClick={() => handleEdit(m.id, { ...m, name: "Updated Name" })}>Edit</button>
                <button onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
