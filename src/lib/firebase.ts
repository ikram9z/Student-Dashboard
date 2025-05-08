import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuQFngdAicDZkpNoXwTEhx3m658mMWFb0",
  authDomain: "fir-9a589.firebaseapp.com",
  projectId: "fir-9a589",
  storageBucket: "fir-9a589.appspot.com",
  messagingSenderId: "1006817414906",
  appId: "1:1006817414906:web:a123b123c123d123e123f1", // Replace with your actual appId if available
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Sign in with email and password
export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Login error:", error);
    return { user: null, error: error as Error };
  }
};

// Create new user with email and password
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Registration error:", error);
    return { user: null, error: error as Error };
  }
};

// Sign out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: error as Error };
  }
};

// Custom hook to get the current auth state
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up subscription
    return unsubscribe;
  }, []);

  return { currentUser, loading };
};
