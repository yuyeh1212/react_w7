import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogoutComponent = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/" replace />;
};

export default LogoutComponent;
