import { Message } from "./messages";
import { User } from "./users";

export type LatestChat = {
  lastMessage: Message;
  otherUser: User;
};
