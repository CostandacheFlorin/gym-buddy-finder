import { Interest } from "./interests";

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
  gender: Gender;
  country: string;
  city: string;
  description: string;
  gyms: string[];
  password?: string;
  hashed_password?: string;
  gymRelatedInterests: Interest[];
  nonGymRelatedInterests: Interest[];
  onboarding_completed?: boolean;
  pictures: [{ _id: string; url: string }];
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export type UserUpdateProfilePayload = {
  _id?: string;
  gyms?: string[];
  gymRelatedInterests?: string[];
  nonGymRelatedInterests?: string[];
  country?: string;
  city?: string;
  description?: string;
  pictures?: [{ _id: string; url: string }];
};
