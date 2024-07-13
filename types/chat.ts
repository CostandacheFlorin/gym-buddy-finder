export type Chat = {
  id: string;
  users: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  }[];
  messages: { text: string; date: Date; userId: string; id: string }[];
  last_message_date: Date;
};
