import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    isAuthenticated: null,
    userData: null,
  });

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setUser({
        isAuthenticated: true,
        userData: response.data.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUser({
          isAuthenticated: false,
          userData: null,
        });
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setUser({
        isAuthenticated: false,
        userData: null,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
