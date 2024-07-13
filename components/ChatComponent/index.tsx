import { Chat } from "@/types/chat";
import { Input } from "antd";
import { format } from "date-fns";
import Image from "next/image";

const ChatComponent = ({ chat }: { chat: Chat }) => {
  const currentUserId = "1"; // Replace with the actual current user ID

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="flex gap-3 items-center mb-4">
        <Image
          width={40}
          height={30}
          src={chat.users[0].image}
          alt={`${chat.users[0].first_name} ${chat.users[1].last_name}'s picture`}
          className="rounded-full"
        />
        <p className="font-bold">{`${chat.users[1].first_name} ${chat.users[1].last_name}`}</p>
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.userId === currentUserId ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`shadow-md p-2 rounded-xl max-w-[80%] ${
                message.userId === currentUserId
                  ? "bg-teal-300 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <p className="text-sm text-left ">{message.text}</p>
              <p className="text-xs text-gray-400 text-right ">
                {format(message.date, "HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Input className="flex-grow" />
        <button className="border rounded-lg p-2 bg-yellow-400">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
