import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with Google
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Handle successful authentication here
    console.log("result is", result);
    return result;
  } catch (error) {
    console.log("Error is", error);
    if (error.code === "auth/popup-closed-by-user") {
      // User closed the popup; show a message or handle it differently
      alert("You closed the sign-in popup. Please try signing in again.");
    } else {
      // Handle other errors
      console.error("Error during sign-in:", error);
      alert("An error occurred during sign-in. Please try again.");
    }
    throw error; // Re-throw error if needed
  }
};

// Sign out the user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Sign out failed. Please try again.");
  }
};

// Set up authentication state listener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// Update user email
export const emailUpdate = async (email) => {
  if (!email) return;

  try {
    await updateEmail(auth.currentUser, email);
  } catch (error) {
    console.error("Error updating email:", error);
    throw new Error("Email update failed. Please try again.");
  }
};
