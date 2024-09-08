import { MessageStatus } from "./messages";
import { User } from "./users";

export type LatestChat = {
  lastMessage: {
    content: string;
    createdAt: Date;
    edited: boolean;
    receiver: string;
    sender: string;
    status: MessageStatus;
    timestamp: Date;
    updatedAt: Date;
    _id: string;
  };
  otherUser: User;
};
