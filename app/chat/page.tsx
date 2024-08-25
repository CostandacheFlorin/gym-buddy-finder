"use client";

import ChatList from "@/components/ChatList/ChatList";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const { latestChats } = useUserContext();
  const router = useRouter();

  const redirectToChatUserId = (id: string) => {
    router.push(`/chat/${id}`);
  };
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/4 p-4 overflow-y-auto">
        <h2 className="text-md font-bold mb-4">Chats</h2>
        <ChatList chats={latestChats} onClick={redirectToChatUserId} />
      </div>
    </div>
  );
}
