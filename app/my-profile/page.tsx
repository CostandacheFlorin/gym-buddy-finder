"use client";
import { useState } from "react";
import Image from "next/image";
import InterestsList from "@/components/InterestsList";
import TextArea from "@/components/TextArea";
import { Interest } from "@/types/interests";
import Select from "@/components/Select";
import { CITIES, COUNTRIES, DUMMY_INTERESTS } from "@/dummy-data";
import StringsList from "@/components/StringsList";

export default function MyProfile() {
  const [description, setDescription] = useState("Descriere random");
  const [country, setCountry] = useState<string | null>();
  const [city, setCity] = useState<string>();

  const [countries, setCountries] = useState(COUNTRIES);
  const [cities, setCities] = useState(CITIES);

  const [userRelatedInterests, setUserRelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);
  const [allGymRelatedInterests, setAllGymRelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);
  const [myGymUnrelatedInterests, setMyGymUnrelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);
  const [allGymUnrelatedInterests, setAllGymUnrelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);

  const [userGyms, setUserGyms] = useState<string[]>([]);
  const [allGyms, setAllGyms] = useState<string[]>([
    "StayFit Galati",
    "Stayfit Bucuresti",
    "Stayfit Braila",
  ]);

  const selectCountry = (id: string) => {
    setCountry(id);
    setCity(undefined);
    const foundCountry = COUNTRIES.find((country) => country.id === id);
    setCities(CITIES.filter((city) => city.country === foundCountry?.name));
  };

  const selectCity = (id: string) => {
    setCity(id);
  };

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
            width={200}
            height={150}
          />
        </div>

        <div className="space-y-4">
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
                value: country.id,
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
                value: city.id,
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
            interests={userRelatedInterests}
            setInterests={setUserRelatedInterests}
            allPossibleInterests={allGymRelatedInterests}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">
            Gym Unrelated Interests
          </h2>
          <InterestsList
            interests={myGymUnrelatedInterests}
            setInterests={setMyGymUnrelatedInterests}
            allPossibleInterests={allGymUnrelatedInterests}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">Goals</h2>
          <StringsList
            strings={userGyms}
            setStrings={setUserGyms}
            allPossibleStrings={allGyms}
            name="gym"
          />
        </div>

        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors">
          Save Profile
        </button>
      </div>
    </main>
  );
}
