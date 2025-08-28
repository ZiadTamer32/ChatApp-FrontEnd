import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  return (
    <div className="border-b border-base-300 w-full p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          className="size-10 object-cover rounded-full"
        />
        <div className="">
          <h1 className="font-semibold">{selectedUser.fullName}</h1>
          <p className={`text-xs ${isOnline ? "text-primary" : ""}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => setSelectedUser(null)}>
        <X className="w-6 h-6 transition-colors hover:text-primary" />
      </div>
    </div>
  );
};

export default ChatHeader;
