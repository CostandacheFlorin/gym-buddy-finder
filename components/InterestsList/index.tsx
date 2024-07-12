import Select from "@/components/Select";
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
    <div>
      <div>
        {interests.map((interest: Interest) => (
          <div key={interest.id} className="flex gap-3">
            <div className="">{interest.name}</div>
            <button className="" onClick={() => removeInterest(interest.id)}>
              X
            </button>
          </div>
        ))}
      </div>

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
  );
};

export default InterestsList;
