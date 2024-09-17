import { useState } from "react";
import XIcon from "@/icons/XIcon";

const StringsList = ({
  strings,
  setStrings,
  name,
}: {
  strings: string[];
  setStrings: React.Dispatch<React.SetStateAction<any[]>>;
  name: string;
}) => {
  const [newString, setNewString] = useState<string>("");

  const removeString = (stringToRemove: string) => {
    setStrings((oldStrings: string[]) =>
      oldStrings.filter((oldString) => oldString !== stringToRemove)
    );
  };

  const addString = (stringToAdd: string) => {
    if (!strings.includes(stringToAdd)) {
      setStrings((oldStrings: string[]) => [...oldStrings, stringToAdd]);
    }
    setNewString("");
  };

  const handleAddClick = () => {
    if (newString.trim()) {
      addString(newString.trim());
    }
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

      <div className="flex gap-3 flex-col items-center md:flex-row:">
        <h3>{`Add a new ${name}`}</h3>
        <input
          type="text"
          value={newString}
          onChange={(e) => setNewString(e.target.value)}
          placeholder={`Type a new ${name}`}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default StringsList;
