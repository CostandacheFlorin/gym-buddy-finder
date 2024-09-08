import { getChatByUserId } from "@/app/lib/queries";
import { QueryKeys } from "@/app/lib/queryKeys";
import { useUserContext } from "@/context/UserContext";
import { Chat } from "@/types/chat";
import { Message } from "@/types/messages";
import { User } from "@/types/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Bounce, toast } from "react-toastify";
import { sendMessage } from "@/app/lib/mutations";
import io from "socket.io-client";

const ChatComponent = ({ userChatId }: { userChatId: string }) => {
  const { loggedInUser } = useUserContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [user1, setUser1] = useState<User>();
  const [otherUser, setOtherUser] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

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

      // Cleanup on unmount
      return () => {
        newSocket.off("receiveMessage");
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
      setUser1(current_chat_data.user1);
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

  if (current_chat_isLoading || current_chat_error) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="flex gap-3 items-center mb-4">
        <Image
          width={40}
          height={30}
          src={otherUser?.pictures?.[0]?.url || "/images/default-avatar.jpg"}
          alt={`${otherUser?.first_name} ${otherUser?.last_name}'s picture`}
          className="rounded-full"
        />
        <p className="font-bold">{`${otherUser?.first_name} ${otherUser?.last_name}`}</p>
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto">
        {messages.map((message: Message) => (
          <div
            key={message._id}
            className={`flex ${
              message.sender === loggedInUser?._id
                ? "justify-end"
                : "justify-start"
            } mb-2`}
          >
            <div
              className={`shadow-md p-2 rounded-xl max-w-[80%] ${
                message.sender === loggedInUser?._id
                  ? "bg-teal-300 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <p className="text-sm text-left ">{message.content}</p>
              <p className="text-xs text-gray-400 text-right ">
                {format(new Date(message.timestamp), "HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Send a message.."
          className="flex-grow"
          onKeyUp={handleEnterKeyPress}
        />
        <button
          className="border rounded-lg p-2 bg-yellow-400"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
