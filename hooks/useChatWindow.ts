import { sendMessage } from "@/app/lib/mutations";
import { getChatByUserId } from "@/app/lib/queries";
import { QueryKeys } from "@/app/lib/queryKeys";
import { useUserContext } from "@/context/UserContext";
import { Message } from "@/types/messages";
import { User } from "@/types/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { io } from "socket.io-client";

const useChatWindow = ({ userChatId }: { userChatId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const { loggedInUser, setLatestChats, refetchLatestChats } = useUserContext();

  useEffect(() => {
    if (loggedInUser?._id && otherUser?._id) {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        query: { userId: loggedInUser._id, otherUserId: otherUser?._id },
      });

      setSocket(newSocket);

      // Listen for incoming messages
      newSocket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage.message]);
      });
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
        newSocket.off("receiveMessage");
        newSocket.off("updateLatestChats");
        newSocket.disconnect();
      };
    }
  }, [loggedInUser?._id, otherUser?._id]);

  const {
    data: current_chat_data,
    error: current_chat_error,
    isLoading: current_chat_isLoading,
  } = useQuery({
    queryKey: [QueryKeys.getMessagesBetweenUsers, userChatId],
    queryFn: () => getChatByUserId(userChatId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (createdMessage) => {
      if (socket) {
        socket.emit("sendMessage", createdMessage);
        setMessage("");
      }
    },
    onError: (error: any) => {
      toast.error(`Sending your message failed, try again later!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  useEffect(() => {
    if (current_chat_data) {
      setMessages(current_chat_data.messages);
      setOtherUser(current_chat_data.user2);
    }
  }, [current_chat_data]);

  const showError = useCallback((error: Error, entity: string) => {
    toast.error(`Error fetching ${entity}: ${error.message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []);
  useEffect(() => {
    if (current_chat_error) {
      showError(current_chat_error, "user");
    }
  }, [current_chat_error, showError]);

  const sendMessageHandler = () => {
    if (!otherUser) {
      showError(new Error("Unable to retrieve the recipient!"), "recipient");
      return;
    }

    mutate({
      // @ts-ignore
      sender: loggedInUser._id,
      receiver: otherUser._id,
      content: message,
    });
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessageHandler();
    }
  };

  return {
    current_chat_isLoading,
    current_chat_error,
    otherUser,
    loggedInUser,
    messages,
    handleEnterKeyPress,
    message,
    setMessage,
    sendMessageHandler,
  };
};

export default useChatWindow;
