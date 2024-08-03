import { useState } from "react";
import XIcon from "@/icons/XIcon";
import Select from "@/components/Select";

const StringsList = ({
  strings,
  setStrings,
  allPossibleStrings,
  name,
}: {
  strings: string[];
  setStrings: React.Dispatch<React.SetStateAction<any[]>>;
  allPossibleStrings: string[];
  name: string;
}) => {
  const [selectedString, setSelectedString] = useState<string | null>(null);

  const removeString = (stringToRemove: string) => {
    setStrings((oldStrings: string[]) =>
      oldStrings.filter((oldString) => oldString !== stringToRemove)
    );
  };

  const addString = (stringToAdd: string) => {
    if (!strings.includes(stringToAdd)) {
      setStrings((oldStrings: string[]) => [...oldStrings, stringToAdd]);
    }
    setSelectedString(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap -mx-2">
        {strings.map((string: string) => (
          <div
            key={string}
            className="bg-white px-4 py-2 rounded-md shadow-sm m-2 flex items-center justify-between"
          >
            <div className="text-black">{string}</div>
            <button
              className="text-red-500 rounded-full p-2 hover:bg-red-100 transition-colors flex items-center justify-center"
              onClick={() => removeString(string)}
            >
              <XIcon fill="red" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <h3>{`Select to add a new ${name}`} </h3>
        <Select
          showSearch
          placeholder={`Select a ${name}`}
          value={selectedString}
          onChange={(value) => {
            addString(value);
          }}
          options={allPossibleStrings
            .filter((stringItem) => !strings.includes(stringItem))
            .map((string) => {
              return { label: string, value: string };
            })}
        />
      </div>
    </div>
  );
};

export default StringsList;
