import React from "react";
import Auth from "../components/Auth";
import { useUser } from "../contexts/userContext";
import DailyLogForm from "../components/DailyLogForm";
import DataVisualization from "../components/DataVisualization";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import HeaderComponent from "../components/Layout/HeaderComponent";

const MainContent = styled(Container)(({ theme }) => ({
  marginTop: "20px",
  paddingBottom: "120px",
}));

const Footer = styled(Box)({
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#1976d2",
  color: "white",
  position: "fixed",
  width: "100%",
  bottom: "0",
  left: "0",
  zIndex: 1300,
});

const Home = () => {
  const { user, loading } = useUser();

  return (
    <div>
      <HeaderComponent />
      <MainContent
        maxWidth="lg"
        style={{
          display: loading ? "flex" : "block",
          justifyContent: loading ? "center" : "flex-start",
          alignItems: loading ? "center" : "flex-start",
          minHeight: loading ? "80vh" : "auto",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
            <Typography variant="body1" style={{ marginTop: "20px" }}>
              Loading, please wait...
            </Typography>
          </div>
        ) : (
          <>
            <Auth />
            {user && (
              <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                <div>
                  <DailyLogForm user={user} />
                  <DataVisualization user={user} />
                </div>
              </Paper>
            )}
          </>
        )}
      </MainContent>
      <Footer>
        <Typography>
          © 2024 Mental Health Progress Tracker. All rights reserved.
        </Typography>
      </Footer>
    </div>
  );
};

export default Home;
