import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext"; // Adjust the import path as needed

const ProtectedRoute = ({ element }) => {
  const { user } = useUser();

  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
