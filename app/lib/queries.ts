"use client";

import { User } from "@/types/users";

import apiClient from "./axiosConfig";

// TODO: work on the catch

export const fetchUsersToMatch = async ({
  skip,
  limit,
}: {
  skip: number;
  limit: number;
}): Promise<User[]> => {
  try {
    const { data } = await apiClient.get(
      `/users/matching-list?skip=${skip}&limit=${limit}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const { data } = await apiClient.get(`/users/me`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchInterestsByType = async (gym_related: boolean) => {
  try {
    const { data } = await apiClient.get(
      `/interests/type?gymRelated=${gym_related}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};
