import { Chat } from "@/types/chat";
import Image from "next/image";

const ChatItem = ({ chat }: { chat: Chat }) => {
  const currentUserId = "1";
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div className=" shadow-lg p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            width={40}
            height={30}
            src={chat.users[1].image}
            alt={`${chat.users[1].first_name} ${chat.users[1].first_name}'s picture`}
            className="rounded-full"
          />

          <p>{`${chat.users[1].first_name} ${chat.users[1].last_name}`}</p>
        </div>

        <p>{chat.last_message_date.toDateString()}</p>
      </div>

      <div>
        {lastMessage.userId === currentUserId ? (
          <p>You: {lastMessage.text}</p>
        ) : (
          <p>{`${chat.users[1].first_name}: ${lastMessage.text}`}</p>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
