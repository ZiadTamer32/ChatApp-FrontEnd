import { useChatStore } from "../store/chatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center">
      <div className="p-0 md:p-4 w-full">
        <div className="bg-base-100 md:rounded-lg md:shadow-lg h-[calc(100vh-64px)] md:h-[calc(100vh-96px)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
