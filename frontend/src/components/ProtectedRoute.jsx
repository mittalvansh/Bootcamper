import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Flex, Loader } from "@mantine/core";
import AuthContext from "../context/Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user?.isAuthenticated === true) {
    return <>{children}</>;
  } else if (user?.isAuthenticated === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Loader size={40} />
      </Flex>
    );
  }
};

export default ProtectedRoute;
