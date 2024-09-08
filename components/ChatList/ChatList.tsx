import ChatItem from "../ChatItem";
import { LatestChat } from "@/types/chat";

const ChatList = ({
  chats,
  onClick,
}: {
  chats: LatestChat[];
  onClick: (chat: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {chats.map((chat) => {
        return (
          <button
            key={chat.otherUser._id}
            onClick={() => {
              onClick(chat.otherUser._id);
            }}
          >
            <ChatItem chat={chat} />
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
