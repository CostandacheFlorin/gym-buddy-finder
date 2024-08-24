"use client";

import ChatList from "@/components/ChatList/ChatList";
import ChatComponent from "@/components/ChatComponent";
import { Chat } from "@/types/chat"; // Importing the Chat type
import { useUserContext } from "@/context/UserContext";

export default function ChatPage() {
  const { setCurrentUserIdChat, currentUserIdChat } = useUserContext();
  const { latestChats } = useUserContext();

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar for chats */}
      <div className="w-1/4 p-4 overflow-y-auto">
        <h2 className="text-md font-bold mb-4">Chats</h2>
        <ChatList chats={latestChats} onClick={setCurrentUserIdChat} />
      </div>

      {/* Main chat area */}
      <div className="w-3/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chat Window</h2>
        {currentUserIdChat && <ChatComponent userChatId={currentUserIdChat} />}
      </div>
    </div>
  );
}
