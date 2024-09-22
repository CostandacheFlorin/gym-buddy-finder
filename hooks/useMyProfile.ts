import { useUserContext } from "@/context/UserContext";
import { updateUser } from "@/app/lib/mutations";
import { UserUpdateProfilePayload } from "@/types/users";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUploadFile } from "./useUploadFile";

const useMyProfile = () => {
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

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
    refetchGetMe,
  } = useUserContext();

  useEffect(() => {
    if (loggedInUser && !loggedInUser.onboarding_completed) {
      handleOnboardingOpenModal();
    }
  }, [loggedInUser]);

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
      handleOnboardingCloseModal();
      refetchGetMe();
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

  const handleOnboardingOpenModal = () => {
    setIsOnboardingModalOpen(true);
  };

  const handleOnboardingCloseModal = () => {
    setIsOnboardingModalOpen(false);
  };
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
    if (
      !city ||
      !country ||
      !userGyms.length ||
      !userGymRelatedInterests.length ||
      !userGymUnrelatedInterests.length
    ) {
      toast.error(`Please fill in all the fields.`, {
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
      onboarding_completed: true,
      pictures: newImageUrl
        ? [{ url: newImageUrl }]
        : loggedInUser.pictures.length
        ? [loggedInUser.pictures[0]]
        : [],
    };

    updateUserMutation({ user_id: loggedInUser._id, payload });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      uploadFile(event.target.files[0]);
    }
  };
  const { mutate: uploadFile, isPending: loadingUploadingFile } = useUploadFile(
    (data: any) => {
      setNewImageUrl(data.url);
    },
    () => {}
  );

  return {
    selectCountry,
    selectCity,
    submitUpdateUserProfile,
    handleOnboardingCloseModal,
    handleOnboardingOpenModal,
    isOnboardingModalOpen,
    uploadFile,
    loadingUploadingFile,
    handleFileChange,
    newImageUrl,
  };
};

export default useMyProfile;
