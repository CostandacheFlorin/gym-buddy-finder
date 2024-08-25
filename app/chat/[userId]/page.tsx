"use client";

import { useParams, useRouter } from "next/navigation";

import ChatList from "@/components/ChatList/ChatList";
import ChatComponent from "@/components/ChatComponent";
import { Chat } from "@/types/chat"; // Importing the Chat type
import { useUserContext } from "@/context/UserContext";

export default function ChatPageByUserId() {
  const { userId } = useParams(); // Get the dynamic segment (userid) from the URL
  const router = useRouter();

  const { latestChats } = useUserContext();

  const redirectToChatUserId = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar for chats */}
      <div className="w-1/4 p-4 overflow-y-auto">
        <h2 className="text-md font-bold mb-4">Chats</h2>
        <ChatList chats={latestChats} onClick={redirectToChatUserId} />
      </div>

      {/* Main chat area */}
      <div className="w-3/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chat Window</h2>
        <ChatComponent userChatId={userId as string} />
      </div>
    </div>
  );
}
