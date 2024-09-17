import { User, UserUpdateProfilePayload } from "@/types/users";
import apiClient from "./axiosConfig";
import { Match, MatchStatus } from "@/types/match";
import { MessageStatus } from "@/types/messages";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> => {
  try {
    await apiClient.post(
      `/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await apiClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const register = async (payload: Partial<User>): Promise<void> => {
  try {
    await apiClient.post(`/auth/register`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};

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

export const sendMessage = async ({
  sender,
  receiver,
  content,
}: {
  sender: string;
  receiver: string;
  content: string;
}) => {
  try {
    const { data } = await apiClient.post(
      `/messages`,
      {
        sender,
        receiver,
        content,
        status: MessageStatus.SENT,
      },
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

export const upload = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post(`/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
