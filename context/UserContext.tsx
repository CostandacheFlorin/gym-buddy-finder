"use client";
import { User } from "@/types/users";
import { Interest, InterestType } from "@/types/interests";
import { QueryKeys } from "@/app/lib/queryKeys";
import { getMe, fetchInterestsByType, getLatestChats } from "@/app/lib/queries";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { CITIES, COUNTRIES } from "@/dummy-data";
import { Bounce, toast } from "react-toastify";

interface UserContextType {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
  country: string | undefined;
  setCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
  city: string | undefined;
  setCity: React.Dispatch<React.SetStateAction<string | undefined>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  userGymRelatedInterests: Interest[];
  setUserGymRelatedInterests: React.Dispatch<React.SetStateAction<Interest[]>>;
  allGymRelatedInterests: Interest[];
  setAllGymRelatedInterests: React.Dispatch<React.SetStateAction<Interest[]>>;
  userGymUnrelatedInterests: Interest[];
  setUserGymUnrelatedInterests: React.Dispatch<
    React.SetStateAction<Interest[]>
  >;
  allGymUnrelatedInterests: Interest[];
  setAllGymUnrelatedInterests: React.Dispatch<React.SetStateAction<Interest[]>>;
  latestChats: never[];
  setLatestChats: React.Dispatch<React.SetStateAction<never[]>>;
  userGyms: string[];
  setUserGyms: React.Dispatch<React.SetStateAction<string[]>>;
  countries: typeof COUNTRIES;
  cities: typeof CITIES;
  setCities: React.Dispatch<React.SetStateAction<typeof CITIES>>;
  gym_related_interests_isLoading: boolean;
  gym_unrelated_interests_isLoading: boolean;
  latest_chats_isLoading: boolean;
  is_loading_user_data: boolean;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  birthDate: Date;
  setBirthDate: React.Dispatch<React.SetStateAction<Date>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  currentUserIdChat: string | null;
  setCurrentUserIdChat: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [country, setCountry] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [description, setDescription] = useState("Descriere random");
  const [userGymRelatedInterests, setUserGymRelatedInterests] = useState<
    Interest[]
  >([]);
  const [allGymRelatedInterests, setAllGymRelatedInterests] = useState<
    Interest[]
  >([]);
  const [userGymUnrelatedInterests, setUserGymUnrelatedInterests] = useState<
    Interest[]
  >([]);
  const [allGymUnrelatedInterests, setAllGymUnrelatedInterests] = useState<
    Interest[]
  >([]);
  const [userGyms, setUserGyms] = useState<string[]>([]);
  const [cities, setCities] = useState(CITIES);
  const [countries] = useState(COUNTRIES);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [email, setEmail] = useState<string>("");
  const [latestChats, setLatestChats] = useState([]);
  const [currentUserIdChat, setCurrentUserIdChat] = useState<string | null>(
    null
  );

  const {
    data: user_data,
    error: user_error,
    isLoading: is_loading_user_data,
  } = useQuery({
    queryKey: [QueryKeys.getMe],
    queryFn: () => getMe(),
    refetchOnWindowFocus: false,
  });

  const {
    data: gym_related_interests_data,
    error: gym_related_interests_error,
    isLoading: gym_related_interests_isLoading,
  } = useQuery({
    queryKey: [QueryKeys.fetchGymRelatedInterests],
    queryFn: () => fetchInterestsByType(InterestType.GYM_RELATED),
    refetchOnWindowFocus: false,
  });

  const {
    data: latest_chats_data,
    error: latest_chats_error,
    isLoading: latest_chats_isLoading,
  } = useQuery({
    queryKey: [QueryKeys.getLatestChats],
    queryFn: () => getLatestChats(),
    refetchOnWindowFocus: false,
  });

  const {
    data: gym_unrelated_interests_data,
    error: gym_unrelated_interests_error,
    isLoading: gym_unrelated_interests_isLoading,
  } = useQuery({
    queryKey: [QueryKeys.fetchGymUnrelatedInterests],
    queryFn: () => fetchInterestsByType(InterestType.GYM_UNRELATED),
    refetchOnWindowFocus: false,
  });

  // TO DO: Only fetch the basic data when the user is logged in.

  const showError = useCallback((error: Error, entity: string) => {
    toast.error(`Error fetching ${entity}: ${error.message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []);

  useEffect(() => {
    if (user_data) {
      setLoggedInUser(user_data);
      setCity(user_data.city);
      setCountry(user_data.country);
      setDescription(user_data.description);
      setUserGymRelatedInterests(user_data.gymRelatedInterests);
      setUserGymUnrelatedInterests(user_data.nonGymRelatedInterests);
      setUserGyms(user_data.gyms);
      setFirstName(user_data.first_name);
      setLastName(user_data.last_name);
      setBirthDate(user_data.birth_date);
      setEmail(user_data.email);
    }
  }, [user_data]);

  useEffect(() => {
    if (gym_related_interests_data) {
      setAllGymRelatedInterests(gym_related_interests_data);
    }
  }, [gym_related_interests_data]);

  useEffect(() => {
    if (gym_unrelated_interests_data) {
      setAllGymUnrelatedInterests(gym_unrelated_interests_data);
    }
  }, [gym_unrelated_interests_data]);

  useEffect(() => {
    if (latest_chats_data) {
      setLatestChats(latest_chats_data);
    }
  }, [latest_chats_data]);

  useEffect(() => {
    // if (user_error) {
    //   showError(user_error, "user");
    // }

    if (gym_related_interests_error) {
      showError(gym_related_interests_error, "gym related interests");
    }

    if (gym_unrelated_interests_error) {
      showError(gym_unrelated_interests_error, "gym unrelated interests");
    }

    // if (latest_chats_error) {
    //   showError(latest_chats_error, "latest chats");
    // }
  }, [
    user_error,
    gym_related_interests_error,
    gym_unrelated_interests_error,
    latest_chats_error,
    showError,
  ]);

  const contextValue = useMemo(
    () => ({
      loggedInUser,
      setLoggedInUser,
      country,
      setCountry,
      city,
      setCity,
      description,
      setDescription,
      userGymRelatedInterests,
      setUserGymRelatedInterests,
      allGymRelatedInterests,
      setAllGymRelatedInterests,
      userGymUnrelatedInterests,
      setUserGymUnrelatedInterests,
      allGymUnrelatedInterests,
      setAllGymUnrelatedInterests,
      userGyms,
      setUserGyms,
      countries,
      cities,
      setCities,
      gym_related_interests_isLoading,
      gym_unrelated_interests_isLoading,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      birthDate,
      setBirthDate,
      email,
      setEmail,
      is_loading_user_data,
      latestChats,
      setLatestChats,
      latest_chats_isLoading,
      setCurrentUserIdChat,
      currentUserIdChat,
    }),
    [
      loggedInUser,
      country,
      city,
      description,
      userGymRelatedInterests,
      allGymRelatedInterests,
      userGymUnrelatedInterests,
      allGymUnrelatedInterests,
      userGyms,
      countries,
      cities,
      gym_related_interests_isLoading,
      gym_unrelated_interests_isLoading,
      firstName,
      lastName,
      birthDate,
      email,
      is_loading_user_data,
      latestChats,
      latest_chats_isLoading,
      currentUserIdChat,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Custom hook to use the context
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
