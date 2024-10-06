"use client";
import Image from "next/image";
import InterestsList from "@/components/InterestsList";
import TextArea from "@/components/TextArea";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import StringsList from "@/components/StringsList";
import calculateAge from "@/utils/getAgeFromBirthDate";
import SkeletonProfile from "@/components/MyProfileSkeleton";
import useMyProfile from "@/hooks/useMyProfile";
import { useUserContext } from "@/context/UserContext";
import Upload from "@/icons/Upload";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function MyProfile() {
  const {
    loggedInUser,
    is_loading_user_data,
    firstName,
    birthDate,
    country,
    countries,
    city,
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
  } = useUserContext();

  const {
    selectCountry,
    selectCity,
    submitUpdateUserProfile,
    handleOnboardingCloseModal,
    isOnboardingModalOpen,
    loadingUploadingFile,
    newImageUrl,
    handleFileChange,
  } = useMyProfile();

  if (is_loading_user_data || !loggedInUser) {
    return <SkeletonProfile />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-900">
      <div className="w-full max-w-2xl bg-gray-800 shadow-md rounded-lg p-6 space-y-6 text-white">
        <h1 className="text-center text-[#0C1844] text-2xl font-bold mb-4">
          My Profile
        </h1>

        <div className="relative">
          <div className="w-full flex items-center justify-center mb-6">
            {loadingUploadingFile ? (
              <LoadingSpinner />
            ) : (
              <Image
                src={
                  newImageUrl ||
                  loggedInUser?.pictures[0]?.url ||
                  "/images/default-avatar.jpg"
                }
                alt="Profile"
                width={320}
                height={320}
                className="w-full h-auto max-w-[320px]"
              />
            )}
          </div>

          <div className="flex items-center justify-center flex-col w-full">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute bottom-6 opacity-0 cursor-pointer max-w-[320px]"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="absolute flex items-center justify-center bottom-6  bg-white bg-opacity-30 w-[320px] px-4 py-2 rounded cursor-pointer hover:bg-opacity-60"
            >
              <Upload size={40} fill="#0033ff" />
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl text-green-400">{`${firstName}, ${calculateAge(
            new Date(birthDate)
          )}`}</h2>

          <h2 className="text-white font-bold text-lg">Location</h2>
          <div className="space-y-2">
            <h3 className="text-white font-bold">Country</h3>
            <Select
              showSearch
              placeholder="Choose a country"
              value={country}
              onChange={selectCountry}
              options={countries.map((country: any) => ({
                label: country.name,
                value: country.name,
              }))}
              style={{ minWidth: "200px" }}
              className="custom-select"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-bold">City</h3>
            <Select
              showSearch
              placeholder="Choose a city"
              value={city}
              onChange={selectCity}
              style={{ minWidth: "200px" }}
              options={cities.map((city: any) => ({
                label: city.name,
                value: city.name,
              }))}
              className="custom-select"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-white font-bold text-lg">Description</h2>
          <TextArea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full custom-input"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-white font-bold text-lg">
            Gym Related Interests
          </h2>
          <InterestsList
            interests={userGymRelatedInterests}
            setInterests={setUserGymRelatedInterests}
            allPossibleInterests={allGymRelatedInterests}
            loading={gym_related_interests_isLoading}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-white font-bold text-lg">
            Gym Unrelated Interests
          </h2>
          <InterestsList
            interests={userGymUnrelatedInterests}
            setInterests={setUserGymUnrelatedInterests}
            allPossibleInterests={allGymUnrelatedInterests}
            loading={gym_unrelated_interests_isLoading}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-white font-bold text-lg">Gyms</h2>
          <StringsList strings={userGyms} setStrings={setUserGyms} name="gym" />
        </div>

        <button
          onClick={submitUpdateUserProfile}
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-colors"
        >
          Save Profile
        </button>
      </div>

      <Modal
        isOpen={isOnboardingModalOpen}
        onClose={handleOnboardingCloseModal}
        title="You need to finish setting up your profile!"
        content={
          <p>
            Please choose your location, interests and the gyms you are going
            to!
          </p>
        }
      />
    </main>
  );
}
