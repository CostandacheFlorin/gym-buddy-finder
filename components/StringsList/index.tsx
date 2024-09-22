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
    <div className="space-y-4 p-6 bg-gray-900 roudned-lg">
      <div className="flex flex-wrap -mx-2">
        {strings.map((string: string) => (
          <div
            key={string}
            className="bg-gray-800 hover:bg-gray-700 transition-colors group  px-4 py-2 rounded-md shadow-sm m-2 flex items-center justify-between"
          >
            <div className="text-green-400 font-medium">{string}</div>
            <button
              className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-green-300 p-1 rounded-full hover:bg-gray-600"
              onClick={() => removeString(string)}
            >
              <XIcon fill="red" size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-col md:flex-row:">
        <h3 className="text-green-400 font-semibold">{`Add a new ${name}`}</h3>

        <div className="flex flex-col items-center md:flex-row w-full gap-4 justify-between">
          <input
            type="text"
            value={newString}
            onChange={(e) => setNewString(e.target.value)}
            placeholder={`Type a new ${name}`}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full text-black custom-input"
          />
          <button
            onClick={handleAddClick}
            className="bg-green-500 w-28 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default StringsList;
