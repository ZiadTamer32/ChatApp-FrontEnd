import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import FullSpinner from "./FullSpinner";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAuthenticating, checkAuth } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticating && isAuthenticated === "authenticated") {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isAuthenticating, navigate]);

  if (isAuthenticating) {
    return <FullSpinner />;
  }

  return isAuthenticated !== "authenticated" ? children : null;
};

export default PublicRoute;
