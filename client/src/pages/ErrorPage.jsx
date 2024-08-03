import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const ErrorContainer = styled(Container)({
  textAlign: "center",
  padding: "50px",
});

const BackButton = styled(Button)({
  marginTop: "20px",
});

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <ErrorContainer>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6">
        The page you are looking for does not exist.
      </Typography>
      <BackButton
        variant="contained"
        color="primary"
        onClick={handleBackToHome}
      >
        Back to Home
      </BackButton>
    </ErrorContainer>
  );
};

export default ErrorPage;
