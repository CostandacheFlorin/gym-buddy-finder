"use client";

import { User } from "@/types/users";

import apiClient from "./axiosConfig";

export const fetchUsersToMatch = async ({
  user_id,
  skip,
  limit,
}: {
  user_id: string;
  skip: number;
  limit: number;
}): Promise<User[]> => {
  try {
    console.log("FETCHED");
    const { data } = await apiClient.get(
      `/users/matching-list?user_id=${user_id}&skip=${skip}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};
