"use client";
import Image from "next/image";
import InterestsList from "@/components/InterestsList";
import TextArea from "@/components/TextArea";
import Select from "@/components/Select";
import StringsList from "@/components/StringsList";
import calculateAge from "@/utils/getAgeFromBirthDate";
import SkeletonProfile from "@/components/MyProfileSkeleton";
import useMyProfile from "@/hooks/useMyProfile";
import { useUserContext } from "@/context/UserContext";

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

  const { selectCountry, selectCity, submitUpdateUserProfile } = useMyProfile();
  if (is_loading_user_data || !loggedInUser) {
    return <SkeletonProfile />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#FFF5E1]">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-center text-[#0C1844] text-2xl font-bold mb-4">
          My Profile
        </h1>

        <div className="w-full flex items-center justify-center mb-6">
          <Image
            src="/images/cat.jpeg"
            alt="Profile"
            width={550}
            height={550}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl">{`${firstName} ${calculateAge(
            new Date(birthDate)
          )}`}</h2>

          <h2 className="text-black font-bold text-lg">Location</h2>
          <div className="space-y-2">
            <h3 className="text-gray-700">Country</h3>
            <Select
              showSearch
              placeholder="Choose a country"
              value={country}
              onChange={selectCountry}
              options={countries.map((country) => ({
                label: country.name,
                value: country.name,
              }))}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-gray-700">City</h3>
            <Select
              showSearch
              placeholder="Choose a city"
              value={city}
              onChange={selectCity}
              options={cities.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">Description</h2>
          <TextArea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">
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
          <h2 className="text-black font-bold text-lg">
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
          <h2 className="text-black font-bold text-lg">Gyms</h2>
          <StringsList strings={userGyms} setStrings={setUserGyms} name="gym" />
        </div>

        <button
          onClick={submitUpdateUserProfile}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Save Profile
        </button>
      </div>
    </main>
  );
}
