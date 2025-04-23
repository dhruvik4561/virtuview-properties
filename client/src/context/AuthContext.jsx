import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        // Validate user type
        if (parsedUser && (parsedUser.userType === 'buyer' || parsedUser.userType === 'seller')) {
          setCurrentUser(parsedUser);
        } else {
          console.error("Invalid user type in localStorage");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (data) => {
    if (data && (data.userType === 'buyer' || data.userType === 'seller')) {
      setCurrentUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
