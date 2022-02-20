import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = auth.getCurrentUser();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
