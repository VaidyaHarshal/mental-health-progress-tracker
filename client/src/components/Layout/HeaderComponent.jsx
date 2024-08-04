import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useUser } from "../../contexts/userContext";

const HeaderContainer = styled(Box)({
  flexGrow: 1,
});

const AuthButton = styled(Button)({
  marginLeft: "auto",
  color: "white",
});

const HeaderComponent = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Mental Health Progress Tracker
          </Typography>
          {user && (
            <AuthButton
              variant="contained"
              color="error"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign out"}
            </AuthButton>
          )}
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  );
};

export default HeaderComponent;
