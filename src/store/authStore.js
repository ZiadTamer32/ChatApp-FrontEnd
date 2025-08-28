import { create } from "zustand";
import { axiosInstance, globalError } from "../lib/constants";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useChatStore } from "./chatStore";

export const useAuthStore = create((set, get) => ({
  user: null,
  socket_io: null,
  onlineUsers: [],
  isSigningup: false,
  isLogining: false,
  isAuthenticating: true,
  isUploading: false,
  isAuthenticated: "unAuthenticated",
  signup: async (data) => {
    try {
      set({ isSigningup: true });
      const response = await axiosInstance.post("/auth/signup", data);
      set({ user: response.data.user, isAuthenticated: "authenticated" });
      toast.success("Account created successfully");
      get().socketConnect();
    } catch (error) {
      set({ user: null, isAuthenticated: "unAuthenticated" });
      toast.error(globalError(error));
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogining: true });
      const response = await axiosInstance.post("/auth/login", data);
      set({ user: response.data.user, isAuthenticated: "authenticated" });
      toast.success("Login successful");
      get().socketConnect();
    } catch (error) {
      set({ user: null, isAuthenticated: "unAuthenticated" });
      toast.error(globalError(error));
    } finally {
      set({ isLogining: false });
    }
  },
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/checkAuth");
      set({ user: response.data.user, isAuthenticated: "authenticated" });
      get().socketConnect();
    } catch (error) {
      set({ user: null, isAuthenticated: "unAuthenticated" });
      console.error(globalError(error));
    } finally {
      set({ isAuthenticating: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isAuthenticated: "unAuthenticated", onlineUsers: [] });
      toast.success("Logout successful");
      const selectedUser = useChatStore.getState().selectedUser;
      if (selectedUser) useChatStore.getState().setSelectedUser(null);
      get().socketDisconnect();
    } catch (error) {
      toast.error(globalError(error));
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUploading: true });
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ user: response.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(globalError(error));
      toast.error(globalError(error));
    } finally {
      set({ isUploading: false });
    }
  },
  socketConnect: () => {
    const { user, socket_io } = get();
    if (!user && socket_io?.connected) return;
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      query: { userId: user?._id },
    });
    socket.connect();
    set({ socket_io: socket });
    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  socketDisconnect: () => {
    const { socket_io } = get();
    if (!socket_io?.connected) return;
    socket_io.disconnect();
  },
}));
