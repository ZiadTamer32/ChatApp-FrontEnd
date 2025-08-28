import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import FullSpinner from "./FullSpinner";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated, checkAuth, isAuthenticating } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticating && isAuthenticated !== "authenticated") {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthenticating, navigate]);

  if (isAuthenticating) {
    return <FullSpinner />;
  }

  return isAuthenticated === "authenticated" ? children : null;
};

export default ProtectedRoute;
