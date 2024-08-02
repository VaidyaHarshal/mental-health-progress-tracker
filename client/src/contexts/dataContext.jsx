import React, { createContext, useContext, useState } from "react";

// Create a context for data
const DataContext = createContext();

// Provider component to wrap around the components that need access to the context
export const DataProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  return (
    <DataContext.Provider value={{ logs, setLogs }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
