import { updateUser } from "@/app/lib/mutations";
import { fetchInterestsByType, fetchLoggedInUser } from "@/app/lib/queries";
import { QueryKeys } from "@/app/lib/queryKeys";
import { CITIES, COUNTRIES } from "@/dummy-data";
import { Interest, InterestType } from "@/types/interests";
import { UserUpdateProfilePayload } from "@/types/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

const useMyProfile = () => {
  const [description, setDescription] = useState("Descriere random");
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const [countries, setCountries] = useState(COUNTRIES);
  const [cities, setCities] = useState(CITIES);

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

  const {
    data: user_data,
    error,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [QueryKeys.getMe],
    queryFn: () => {
      // TODO: to be removed when all the requests will have bearer token
      return fetchLoggedInUser("token");
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 100,
  });

  const {
    data: gym_related_interests_data,
    error: gym_related_interests_error,
    isLoading: gym_related_interests_isLoading,
  } = useQuery({
    queryKey: [QueryKeys.fetchGymRelatedInterests],
    queryFn: () => {
      return fetchInterestsByType(InterestType.GYM_RELATED);
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 100,
  });

  const {
    data: gym_unrelated_interests_data,
    error: gym_unrelated_interests_error,
    isLoading: gym_unrelated_interests_isLoading,
  } = useQuery({
    queryKey: [QueryKeys.fetchGymUnrelatedInterests],
    queryFn: () => {
      return fetchInterestsByType(InterestType.GYM_UNRELATED);
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 100,
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      refetchUser();
      toast.success(`You have updated your profile !`, {
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
    },
    onError: () => {
      toast.error(`Error updating profile! Try again later!`, {
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
    },
  });

  useEffect(() => {
    if (user_data) {
      setCity(user_data.city);
      setCountry(user_data.country);
      setDescription(user_data.description);
      setUserGymRelatedInterests(user_data.gymRelatedInterests);
      setUserGymUnrelatedInterests(user_data.nonGymRelatedInterests);
      setUserGyms(user_data.gyms);
      setBirthDate(user_data.birth_date);
      setFirstName(user_data.first_name);
      setLastName(user_data.last_name);
    }
  }, [user_data]);

  useEffect(() => {
    if (gym_related_interests_data) {
      setAllGymRelatedInterests(gym_related_interests_data);
    }
    if (gym_unrelated_interests_data) {
      setAllGymUnrelatedInterests(gym_unrelated_interests_data);
    }
  }, [gym_related_interests_data, gym_unrelated_interests_data]);

  const showError = (error: Error, entity: string) =>
    toast.error(
      `There has been an error fetching the ${entity}! ${error?.message}`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );

  useEffect(() => {
    if (error) {
      showError(error, "user");
    }

    if (gym_related_interests_error) {
      showError(gym_related_interests_error, "gym related interests");
    }

    if (gym_unrelated_interests_error) {
      showError(gym_unrelated_interests_error, "gym unrelated interests");
    }
  }, [error, gym_related_interests_error, gym_unrelated_interests_error]);

  const selectCountry = (name: string) => {
    setCountry(name);
    setCity(undefined);
    const foundCountry = COUNTRIES.find((country) => country.name === name);
    setCities(CITIES.filter((city) => city.country === foundCountry?.name));
  };

  const selectCity = (id: string) => {
    setCity(id);
  };

  const submitUpdateUserProfile = () => {
    if (!user_data) {
      toast.error(`Your profile couldn't be fetched.`, {
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
      return;
    }

    const payload: UserUpdateProfilePayload = {
      city,
      country,
      gyms: userGyms,
      description,
      gymRelatedInterests: userGymRelatedInterests.map(
        (interest) => interest._id
      ),
      nonGymRelatedInterests: userGymUnrelatedInterests.map(
        (interest) => interest._id
      ),
    };

    updateUserMutation({ user_id: user_data._id, payload });
  };

  return {
    isLoading,
    user_data,
    firstName,
    birthDate,
    country,
    selectCountry,
    countries,
    city,
    selectCity,
    cities,
    description,
    setDescription,
    userGymRelatedInterests,
    setUserGymRelatedInterests,
    allGymRelatedInterests,
    gym_related_interests_isLoading,
    userGymUnrelatedInterests,
    setUserGymUnrelatedInterests,
    allGymUnrelatedInterests,
    gym_unrelated_interests_isLoading,
    userGyms,
    setUserGyms,
    submitUpdateUserProfile,
  };
};

export default useMyProfile;
