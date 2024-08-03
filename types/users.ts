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
  gymRelatedInterests: Interest[];
  nonGymRelatedInterests: Interest[];
  pictures: [{ _id: string; url: string }];
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
