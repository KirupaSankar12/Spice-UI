import { Navigate, Route } from "react-router-dom";
import DisplaySpiceMerchants from "./DisplaySpiceMerchants";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />; // not logged in
  if (allowedRole && role !== allowedRole) return <Navigate to="/home" />; // wrong role

  return children;
};

// Usage in App.js
<Route path="/spiceMerchants" element={
  <ProtectedRoute allowedRole="ADMIN">
    <DisplaySpiceMerchants />
  </ProtectedRoute>
} />
