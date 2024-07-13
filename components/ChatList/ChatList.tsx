import ChatItem from "../ChatItem";
import { Chat } from "@/types/chat";

const ChatList = ({
  chats,
  onClick,
}: {
  chats: Chat[];
  onClick: (chat: Chat) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {chats.map((chat) => {
        return (
          <button key={chat.id} onClick={() => onClick(chat)}>
            <ChatItem chat={chat} />
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
