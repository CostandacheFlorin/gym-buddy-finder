import Select from "@/components/Select";
import XIcon from "@/icons/XIcon";
import { Interest } from "@/types/interests";
import { useState } from "react";

const InterestsList = ({
  interests = [],
  setInterests,
  allPossibleInterests,
  loading,
}: {
  interests: Interest[];
  allPossibleInterests: Interest[];
  setInterests: any;
  loading?: boolean;
}) => {
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  const removeInterest = (interestId: string) => {
    setInterests((oldInterests: Interest[]) =>
      oldInterests.filter((oldInterest) => oldInterest._id !== interestId)
    );
  };

  const addInterest = (interestId: string) => {
    const foundInterest = allPossibleInterests.find(
      (interestItem) => interestItem._id === interestId
    );
    setInterests((oldInterests: Interest[]) => [
      ...oldInterests,
      foundInterest,
    ]);
  };
  const userInterestIds = new Set(interests.map((interest) => interest._id));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap -mx-2">
        {interests.map((interest: Interest) => (
          <div
            key={interest._id}
            className="bg-white px-4 py-2 rounded-md shadow-sm m-2 flex items-center justify-between"
          >
            <div className="text-black">{interest.name}</div>
            <button
              className="text-red-500 ml-2 rounded-full p-2 transition-colors flex items-center justify-center"
              onClick={() => removeInterest(interest._id)}
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
          loading={loading}
          onChange={(value) => {
            addInterest(value);
            setSelectedInterest(null);
          }}
          options={allPossibleInterests
            .filter((interest) => !userInterestIds.has(interest._id))
            .map((interest) => ({
              label: interest.name,
              value: interest._id,
            }))}
        />
      </div>
    </div>
  );
};

export default InterestsList;
