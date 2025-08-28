import { create } from "zustand";
import { axiosInstance, globalError } from "../lib/constants";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: null,
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setMessage: (message) => set({ message }),
  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data.users });
    } catch (error) {
      console.error(globalError(error));
      toast.error(globalError(error));
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (messageId) => {
    try {
      set({ isMessagesLoading: true });
      const response = await axiosInstance.get(`/message/${messageId}`);
      set({ messages: response.data.messages });
    } catch (error) {
      console.error(globalError(error));
      toast.error(globalError(error));
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    try {
      set({ isSendingMessage: true });
      const { selectedUser } = get();
      const response = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...get().messages, response.data.newMessage] });
    } catch (error) {
      console.error(globalError(error));
      toast.error(globalError(error));
    } finally {
      set({ isSendingMessage: false });
    }
  },
  subscribeToRealMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket_io;
    socket.on("newMessage", (newMessage) => {
      if (newMessage.sender !== selectedUser._id) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unSubscribeToRealMessages: () => {
    const socket = useAuthStore.getState().socket_io;
    socket.off("newMessage");
  },
}));
