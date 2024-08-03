import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider, useUser } from "./contexts/userContext";
import { DataProvider } from "./contexts/dataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const { user } = useUser();

  return (
    <DataProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </DataProvider>
  );
};

export default App;
