import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  
  if (!userData || userData.role !== requiredRole) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
