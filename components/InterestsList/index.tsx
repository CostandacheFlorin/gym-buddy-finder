import Select from "@/components/Select";
import XIcon from "@/icons/XIcon";
import { Interest } from "@/types/interests";
import { useState } from "react";

const InterestsList = ({
  interests,
  setInterests,
  allPossibleInterests,
}: {
  interests: Interest[];
  allPossibleInterests: Interest[];
  setInterests: any;
}) => {
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  const removeInterest = (interestId: string) => {
    setInterests((oldInterests: Interest[]) =>
      oldInterests.filter((oldInterest) => oldInterest.id !== interestId)
    );
  };

  const addInterest = (interestId: string) => {
    const foundInterest = allPossibleInterests.find(
      (interestItem) => interestItem.id === interestId
    );
    setInterests((oldInterests: Interest[]) => [
      ...oldInterests,
      foundInterest,
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap -mx-2">
        {interests.map((interest: Interest) => (
          <div
            key={interest.id}
            className="bg-white px-4 py-2 rounded-md shadow-sm m-2 flex items-center justify-between"
          >
            <div className="text-black">{interest.name}</div>
            <button
              className="text-red-500 rounded-full p-2 hover:bg-red-100 transition-colors flex items-center justify-center"
              onClick={() => removeInterest(interest.id)}
            >
              <XIcon fill="red" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <h3>Select to add a new interest </h3>
        <Select
          showSearch
          placeholder="Select an interest"
          value={selectedInterest}
          onChange={(value) => {
            addInterest(value);
            setSelectedInterest(null);
          }}
          options={allPossibleInterests
            .filter((interestItem) => !interests.includes(interestItem))
            .map((interest) => {
              return { label: interest.name, value: interest.id };
            })}
        />
      </div>
    </div>
  );
};

export default InterestsList;
