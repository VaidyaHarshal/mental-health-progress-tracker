import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    const handleLogUpdate = (newLog) => {
      setLogs((prevLogs) => [...prevLogs, newLog]);
    };

    socket.on("logUpdate", handleLogUpdate);

    return () => {
      socket.off("logUpdate", handleLogUpdate); // Unsubscribe from the event
      socket.disconnect();
    };
  }, []);

  return (
    <DataContext.Provider value={{ logs, setLogs }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
