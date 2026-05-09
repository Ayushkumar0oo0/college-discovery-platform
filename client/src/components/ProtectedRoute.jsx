// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // If no user exists in storage, kick them back to login
  return userInfo ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;