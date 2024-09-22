import { Message } from "@/types/messages";
import { Input } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useChatWindow from "@/hooks/useChatWindow";

const ChatComponent = ({ userChatId }: { userChatId: string }) => {
  const {
    current_chat_isLoading,
    current_chat_error,
    loggedInUser,
    otherUser,
    messages,
    setMessage,
    handleEnterKeyPress,
    message,
    sendMessageHandler,
  } = useChatWindow({
    userChatId,
  });

  if (current_chat_isLoading || current_chat_error) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="flex flex-col p-4 bg-gray-700"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="flex gap-3 items-center mb-4">
        <Image
          width={40}
          height={30}
          src={otherUser?.pictures?.[0]?.url || "/images/default-avatar.jpg"}
          alt={`${otherUser?.first_name} ${otherUser?.last_name}'s picture`}
          className="rounded-full"
        />
        <p className="font-bold text-green-500">{`${otherUser?.first_name} ${otherUser?.last_name}`}</p>
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
              className={`shadow-md px-2 py-3 rounded-xl min-w-20 max-w-[80%] ${
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
          className="flex-grow custom-input"
          onKeyUp={handleEnterKeyPress}
        />
        <button
          className="bg-green-500 w-28 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
