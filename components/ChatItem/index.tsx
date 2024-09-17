import { useUserContext } from "@/context/UserContext";
import { LatestChat } from "@/types/chat";
import formatMessageTime from "@/utils/formatMessageTime";

import Image from "next/image";

const ChatItem = ({ chat }: { chat: LatestChat }) => {
  const { loggedInUser } = useUserContext();

  return (
    <div className=" shadow-lg p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            width={40}
            height={30}
            src={
              chat.otherUser.pictures?.[0]?.url || "/images/default-avatar.jpg"
            }
            alt={`${chat.otherUser.first_name} ${chat.otherUser.first_name}'s picture`}
            className="rounded-full"
          />

          <p>{`${chat.otherUser.first_name} ${chat.otherUser.last_name}`}</p>
        </div>

        <p>
          {chat.lastMessage
            ? formatMessageTime(chat.lastMessage.timestamp)
            : null}
        </p>
      </div>

      <div>
        {chat?.lastMessage ? (
          chat.lastMessage.sender === loggedInUser?._id ? (
            <p className="truncate">You: {chat.lastMessage.content}</p>
          ) : (
            <p className="truncate">{`${chat.otherUser.first_name}: ${chat.lastMessage.content}`}</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default ChatItem;
