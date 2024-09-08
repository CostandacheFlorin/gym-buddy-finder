"use client";

import ChatList from "@/components/ChatList/ChatList";
import { useUserContext } from "@/context/UserContext";
import { LatestChat } from "@/types/chat";
import { Message } from "@/types/messages";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ChatPage() {
  const [socket, setSocket] = useState<any>(null);

  const { loggedInUser, setLatestChats, refetchLatestChats } = useUserContext();

  useEffect(() => {
    if (loggedInUser?._id) {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        query: { userId: loggedInUser._id },
      });

      setSocket(newSocket);

      // Listen for incoming messages

      newSocket.on("updateLatestChats", (newMessage: Message) => {
        setLatestChats((prevChats) => {
          const chatToUpdate = prevChats.find(
            (chat) =>
              chat.otherUser._id === newMessage.sender ||
              chat.otherUser._id === newMessage.receiver
          );

          // if no chat is being found, that means a new chat has to be fetched
          if (!chatToUpdate) {
            refetchLatestChats();
          }

          // Map through the chats to return a new updated array
          return prevChats.map((chat) =>
            chat.otherUser._id === newMessage.sender ||
            chat.otherUser._id === newMessage.receiver
              ? { ...chat, lastMessage: newMessage }
              : chat
          );
        });
      });

      // Cleanup on unmount
      return () => {
        newSocket.off("updateLatestChats");
        newSocket.disconnect();
      };
    }
  }, [loggedInUser?._id]);

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
