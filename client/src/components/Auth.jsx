import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { user, setUser } = useUser();
  // const navigate = useNavigate();

  useEffect(() => {
    setIsSignedIn(!!user);
  }, [user]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      setUser(result.user);
    });
    // navigate("/dailyform");
  };

  return (
    <div>
      {isSignedIn ? (
        <button onClick={() => signOut(auth)}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Auth;
