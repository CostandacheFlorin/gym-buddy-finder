import { useUserContext } from "@/context/UserContext";
import { updateUser } from "@/app/lib/mutations";
import { UserUpdateProfilePayload } from "@/types/users";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const useMyProfile = () => {
  const {
    loggedInUser,
    country,
    setCountry,
    city,
    setCity,
    description,
    userGymRelatedInterests,
    userGymUnrelatedInterests,
    userGyms,
    countries,
    cities,
    setCities,
  } = useUserContext();

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success(`You have updated your profile!`, {
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

  const selectCountry = (name: string) => {
    setCountry(name);
    setCity(undefined);
    const foundCountry = countries.find((country) => country.name === name);
    setCities(cities.filter((city) => city.country === foundCountry?.name));
  };

  const selectCity = (id: string) => {
    setCity(id);
  };

  const submitUpdateUserProfile = () => {
    if (!loggedInUser) {
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

    updateUserMutation({ user_id: loggedInUser._id, payload });
  };

  return {
    selectCountry,
    selectCity,
    submitUpdateUserProfile,
  };
};

export default useMyProfile;
