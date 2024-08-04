export enum MatchStatus {
  MATCHED = "matched",
  REJECTED = "rejected",
  PENDING = "pending",
}

export type Match = {
  user1: string;
  user2: string;
  initiator: string;
  user1Status: MatchStatus;
  user2Status: MatchStatus;
  status: MatchStatus;
  matched_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
