import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import Auth from "../components/Auth"; // Import your Auth component

const LoginContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const Login = () => {
  return (
    <LoginContainer>
      <Auth />
    </LoginContainer>
  );
};

export default Login;
