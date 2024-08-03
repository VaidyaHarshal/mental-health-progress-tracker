import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useUser();

  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
