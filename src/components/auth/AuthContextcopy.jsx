import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../../config/firebase"; // Import your Firebase auth instance

import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

// Create a context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [UserData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // Set Firebase Auth persistence to LOCAL (keeps user logged in after closing browser)
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
