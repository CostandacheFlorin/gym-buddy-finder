import ChatItem from "../ChatItem";
import { Chat } from "@/types/chat";

const ChatList = ({
  chats,
  onClick,
}: {
  chats: Chat[];
  onClick: (chat: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {chats.map((chat) => {
        return (
          <button
            key={chat.otherUser._id}
            onClick={() => {
              // @ts-expect-error fix types
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
