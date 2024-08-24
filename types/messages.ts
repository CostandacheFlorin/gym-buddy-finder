export type Message = {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  edited: boolean;
};

export enum MessageStatus {
  SENT = "sent",
  READ = "read",
  DELIVERED = "delivered",
}
