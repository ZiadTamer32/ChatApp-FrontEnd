import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

const AppLayout = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <main className="pt-16 ">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
