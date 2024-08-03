import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useUser } from "../contexts/userContext";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const AuthBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px 0",
});

const AuthButton = styled(Button)({
  marginTop: "20px",
  width: "100%",
  maxWidth: "300px",
});

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSignedIn(!!user);
  }, [user]);

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          console.error("Popup closed by user.");
        } else {
          console.error("Error signing in with Google: ", error);
        }
        setLoading(false);
      });
  };

  // const handleSignOut = () => {
  //   setLoading(true);
  //   signOut(auth)
  //     .then(() => {
  //       setUser(null);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out: ", error);
  //       setLoading(false);
  //     });
  // };

  return (
    <AuthBox>
      {isSignedIn ? (
        <>
          <Typography variant="h6">
            Hello, {user ? user.displayName : "User"}
          </Typography>
          {/* <AuthButton
            variant="contained"
            color="secondary"
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign out"}
          </AuthButton> */}
        </>
      ) : (
        <AuthButton
          variant="contained"
          color="primary"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
        </AuthButton>
      )}
    </AuthBox>
  );
};

export default Auth;
