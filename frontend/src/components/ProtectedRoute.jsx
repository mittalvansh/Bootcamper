import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  console.log(user.isAuthenticated);

  if (user.isAuthenticated === true) {
    return <>{children}</>;
  }
  if (user.isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (user.isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FontAwesomeIcon
          style={{
            fontSize: "2rem",
          }}
          icon={faSpinner}
          spin
        />
      </div>
    );
  }
};

export default ProtectedRoute;
