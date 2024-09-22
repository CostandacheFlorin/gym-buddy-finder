"use client";

import { useParams, useRouter } from "next/navigation";

import ChatList from "@/components/ChatList/ChatList";
import ChatComponent from "@/components/ChatComponent";
import { useUserContext } from "@/context/UserContext";

export default function ChatPageByUserId() {
  const { userId } = useParams();
  const router = useRouter();

  const { latestChats } = useUserContext();

  const redirectToChatUserId = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      className="flex w-screen bg-gray-900"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      {/* Sidebar for chats */}
      <div className="w-1/4 p-4 overflow-y-auto">
        <h2 className="text-md font-bold mb-4 text-green-400">Chats</h2>
        <ChatList chats={latestChats} onClick={redirectToChatUserId} />
      </div>

      {/* Main chat area */}
      <div className="w-3/4 bg-gray-100 overflow-y-auto">
        <ChatComponent userChatId={userId as string} />
      </div>
    </div>
  );
}
