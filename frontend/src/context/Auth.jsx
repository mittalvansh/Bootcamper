import axios from "axios";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    isAuthenticated: null,
    token: null,
    userData: null,
  });
  const getUser = async () => {
    const token = await window.localStorage.getItem("token");
    try {
      if (token) {
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
          token: token,
          userData: response.data.data,
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        setUser({
          isAuthenticated: false,
          token: null,
          userData: null,
        });
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
