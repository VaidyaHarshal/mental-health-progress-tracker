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
  AppBar,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/system";
import Dashboard from "./Dashboard";

const Header = styled(Box)({
  backgroundImage: "url(https://source.unsplash.com/1600x900/?nature,water)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  textAlign: "center",
  padding: "80px 20px",
  borderBottom: "5px solid #fff",
  minHeight: "300px", // Ensure enough height for visibility
});

const MainContent = styled(Container)({
  marginTop: "20px",
  paddingBottom: "80px", // Space for the footer
});

const Footer = styled(Box)({
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#1976d2",
  color: "white",
  position: "fixed",
  width: "100%",
  bottom: "0",
  left: "0",
});

const Home = () => {
  const { user } = useUser();

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Mental Health Progress Tracker</Typography>
        </Toolbar>
      </AppBar>
      {/* <Header>
        <Typography variant="h2" gutterBottom>
          Welcome to Your Mental Health Journey
        </Typography>
        <Typography variant="h5">
          Track your progress and insights to stay on top of your well-being.
        </Typography>
      </Header> */}
      <MainContent maxWidth="lg">
        <Auth />
        {user && (
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <div>
              <DailyLogForm user={user} />
              <DataVisualization user={user} />
            </div>
          </Paper>
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
