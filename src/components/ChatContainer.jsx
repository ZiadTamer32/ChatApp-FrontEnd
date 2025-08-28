import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useChatStore } from "../store/chatStore";
import { useEffect } from "react";
const ChatContainer = () => {
  const {
    isMessagesLoading,
    selectedUser,
    getMessages,
    subscribeToRealMessages,
    unSubscribeToRealMessages,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToRealMessages();
    return () => unSubscribeToRealMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToRealMessages,
    unSubscribeToRealMessages,
  ]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {isMessagesLoading ? <MessageSkeleton /> : <MessageList />}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
