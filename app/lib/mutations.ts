import { User, UserUpdateProfilePayload } from "@/types/users";
import apiClient from "./axiosConfig";
import { Match, MatchStatus } from "@/types/match";

export const updateUser = async ({
  user_id,
  payload,
}: {
  user_id: string;
  payload: UserUpdateProfilePayload;
}): Promise<User> => {
  try {
    const { data } = await apiClient.patch(`/users/${user_id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const matchUser = async ({
  user_id,
  status,
}: {
  user_id: string;
  status: MatchStatus;
}): Promise<Match> => {
  try {
    const { data } = await apiClient.post(
      `/matches/match`,
      { target_user_id: user_id, status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
