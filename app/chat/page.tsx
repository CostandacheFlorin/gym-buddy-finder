"use client";
import { useState } from "react";

import ChatList from "@/components/ChatList/ChatList";
import ChatComponent from "@/components/ChatComponent";
import { DUMMY_CHATS } from "@/dummy-data";
import { Chat } from "@/types/chat"; // Importing the Chat type

export default function ChatPage() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null); // Use null instead of undefined for initial state
  const [chats, setChats] = useState(DUMMY_CHATS);

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar for chats */}
      <div className="w-1/4 p-4 overflow-y-auto">
        <h2 className="text-md font-bold mb-4">Chats</h2>
        <ChatList chats={chats} onClick={setCurrentChat} />
      </div>

      {/* Main chat area */}
      <div className="w-3/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chat Window</h2>
        {currentChat && <ChatComponent chat={currentChat} />}
      </div>
    </div>
  );
}
