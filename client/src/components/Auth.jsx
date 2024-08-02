import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const Auth = ({ setUser }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
      setUser(user);
    });
    return () => unregisterAuthObserver();
  }, [setUser]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
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
