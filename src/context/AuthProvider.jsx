import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import app from "../firebase/firebase.init";

// Create Context
export const AuthContext = createContext();

// Get Firebase Auth instance
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // token
 const getToken = async () => {
  const user = auth.currentUser;
  console.log("user information", user);
  
  if (user) {
    const token = await user.getIdToken();
    console.log("✅ ID Token:", token); // 👈 এটা দেখাবে token
    return token;
  }
  return null;
};


  // Register
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track Firebase User + fetch MongoDB user with retry logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let attempts = 0;
        let data = null;

        while (attempts < 5) {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`);
            data = await res.json();

            if (data?.role) break;
          } catch (err) {
            console.error("Retrying user fetch...", err);
          }

          await new Promise((resolve) => setTimeout(resolve, 500)); // wait 0.5s
          attempts++;
        }

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          role: data?.role || "student",
          name: data?.name || "No Name",
          photoURL: data?.image || "",
          mongoId: data?._id || "",
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    logout,
    getToken,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
