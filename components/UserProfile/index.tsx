import { User } from "@/types/users";
import calculateAge from "@/utils/getAgeFromBirthDate";
import Image from "next/image";
import ThumbsUpButton from "../ThumbsUpButton";
import XCircledIcon from "../XCircleIcon";
import Tooltip from "../Tooltip";
import ObjectsList from "../ObjectsList";
import BackArrowIcon from "../BackArrowButton";
import ForwardArrowIcon from "../ForwardArrowButton";

const UserProfile = ({
  user,
  onMatch,
  onReject,
  onPrevious,
  onNext,
}: {
  user?: User;
  onMatch: (user_id: string) => void;
  onReject: (user_id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  if (!user) {
    return null;
  }

  return (
    <div
      className="flex mn w-full justify-center bg-gray-900"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="w-full max-w-[550px] flex flex-col bg-gray-800 text-white rounded-2xl">
        <div className="flex-shrink-0 flex justify-center py-4">
          <Image
            width={320}
            height={320}
            src={user.pictures[0]?.url || "/images/cat.jpeg"}
            alt={`user picture`}
            className="w-full h-auto max-w-[320px] rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden p-4">
          <h2 className="text-3xl text-green-400">{`${
            user.first_name
          }, ${calculateAge(new Date(user.birth_date))}`}</h2>
          <h2 className="text-lg mb-4 text-gray-400">{`${user.country}, ${user.city} `}</h2>
          <div className="flex-grow overflow-y-auto overflow-x-hidden">
            <p className="max-w-[550px] mb-4 text-gray-300">
              {user.description}
            </p>
            <ObjectsList
              title={"Gym related interests"}
              list={user.gymRelatedInterests}
              propertyToHover="description"
              propertyToShow="name"
            />
            <ObjectsList
              title={"Other interests"}
              propertyToHover="description"
              list={user.nonGymRelatedInterests}
              propertyToShow="name"
            />
            <ObjectsList
              propertyToShow="none"
              title={"Gyms"}
              list={user.gyms}
            />
          </div>
        </div>
        <div className="flex-shrink-0 p-4">
          <div className="flex gap-4 w-full justify-center">
            <Tooltip text="Previous person">
              <button
                className="cursor-pointer p-4 flex items-center justify-center border-4 border-gray-600 rounded-full max-w-max hover:bg-gray-700 transition-colors"
                onClick={onPrevious}
              >
                <BackArrowIcon size={40} color="#fff" />
              </button>
            </Tooltip>
            <Tooltip text="Reject user">
              <button
                className="p-4 flex items-center justify-center border-2 border-red-500 rounded-full max-w-max hover:bg-red-900 transition-colors"
                onClick={() => onReject(user._id)}
              >
                <XCircledIcon size={40} color="#f56565" />
              </button>
            </Tooltip>
            <Tooltip text="Match user">
              <button
                className="p-4 flex items-center justify-center border-2 border-green-500 rounded-full max-w-max hover:bg-green-900 transition-colors"
                onClick={() => onMatch(user._id)}
              >
                <ThumbsUpButton size={40} color="#48bb78" />
              </button>
            </Tooltip>
            <Tooltip text="Next person">
              <button
                className="p-4 flex items-center justify-center border-4 border-gray-600 rounded-full max-w-max hover:bg-gray-700 transition-colors"
                onClick={onNext}
              >
                <ForwardArrowIcon size={40} color="#fff" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
