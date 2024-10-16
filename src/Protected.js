import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ children }) {
  const isSignedIn = sessionStorage.getItem("token");
  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
export default Protected;
