import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../lib/constants";
import { useRef } from "react";
import { useEffect } from "react";

const MessageList = () => {
  const { messages, selectedUser } = useChatStore();
  const { user } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (messages && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <p className="text-center text-zinc-400 flex-1 flex items-center justify-center">
        No messages yet
      </p>
    );
  }

  return (
    <div className="flex-1 space-y-2 overflow-auto p-2">
      {messages.map((message, index) => {
        const isOwn = message.sender === user?._id;
        const avatarSrc = isOwn
          ? user.profilePic || "/avatar.png"
          : selectedUser?.profilePic || "/avatar.png";

        const isLastMessage = index === messages.length - 1;

        return (
          <div
            key={message._id}
            className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
            ref={isLastMessage ? scrollRef : null}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="avatar" src={avatarSrc} />
              </div>
            </div>

            {message.createdAt && (
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            )}

            <div className="bg-base-200 p-3 rounded-lg flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
