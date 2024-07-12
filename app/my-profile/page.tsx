"use client";
import { useState } from "react";
import Image from "next/image";

import InterestsList from "@/components/InterestsList";
import TextArea from "@/components/TextArea";
import { Interest } from "@/types/interests";
import Select from "@/components/Select";
import { CITIES, COUNTRIES, DUMMY_INTERESTS } from "@/dummy-data";

export default function MyProfile() {
  const [description, setDescription] = useState("Descriere random");
  const [country, setCountry] = useState<string | null>();
  const [city, setCity] = useState<string>();

  const [countries, setCountries] = useState(COUNTRIES);
  const [cities, setCities] = useState(CITIES);

  const [myGymRelatedInterests, setMyGymRelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);
  const [allGymRelatedInterests, setAllGymRelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);
  const [myGymUnrelatedInterests, setMyGymUnrelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);
  const [allGymUnrelatedInterests, setAllGymUnrelatedInterests] =
    useState<Interest[]>(DUMMY_INTERESTS);

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
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FFF5E1] ">
      <div className="p-8 m-8 min-w-[800px] min-h-screen flex flex-col content-center gap-3 ">
        <h1 className="text-center text-[#0C1844] text-xl font-bold">
          My profile
        </h1>

        <div className="w-full flex items-center justify-center">
          <div className="w-[400px] h-[600px] bg-black"></div>
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Location</h2>
          <div>
            <h3>Country</h3>
            <Select
              showSearch
              placeholder="Choose a country"
              value={country}
              onChange={selectCountry}
              options={countries.map((country) => {
                return { label: country.name, value: country.id };
              })}
            />
          </div>

          <div>
            <h3>City</h3>
            <Select
              showSearch
              placeholder="Choose a city"
              value={city}
              onChange={selectCity}
              options={cities.map((city) => {
                return { label: city.name, value: city.id };
              })}
            />
          </div>
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Description</h2>
          <TextArea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextArea>
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Gym related interests </h2>
          <InterestsList
            interests={myGymRelatedInterests}
            setInterests={setMyGymRelatedInterests}
            allPossibleInterests={allGymRelatedInterests}
          />
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Gym unrelated interests </h2>
          <InterestsList
            interests={myGymUnrelatedInterests}
            setInterests={setMyGymUnrelatedInterests}
            allPossibleInterests={allGymUnrelatedInterests}
          />
        </div>

        <button>Save profile</button>
      </div>
    </main>
  );
}
