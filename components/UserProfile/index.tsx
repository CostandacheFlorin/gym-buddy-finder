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
    <div className="flex min-h-[90vh] w-full justify-center">
      <div className="bg-gray-100 w-full max-w-[550px] flex flex-col">
        <div className="flex-shrink-0 flex justify-center py-4">
          <Image
            width={320}
            height={320}
            src={user.pictures[0]?.url || "/images/cat.jpeg"}
            alt={`user picture`}
            className="w-full h-auto max-w-[320px]"
          />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden p-4">
          <h2 className="text-3xl">{`${user.first_name} ${calculateAge(
            new Date(user.birth_date)
          )}`}</h2>
          <h2 className="text-lg mb-4">{`${user.country}, ${user.city} `}</h2>
          <div className="flex-grow overflow-y-auto overflow-x-hidden">
            <p className="max-w-[550px] mb-4">{user.description}</p>
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
                className="cursor-pointer p-4 flex items-center justify-center border-2 border-[#000] rounded-full max-w-max"
                onClick={onPrevious}
              >
                <BackArrowIcon size={40} />
              </button>
            </Tooltip>
            <Tooltip text="Reject user">
              <button
                className="p-4 flex items-center justify-center border-2 border-[#ff3300] rounded-full max-w-max"
                onClick={() => onReject(user._id)}
              >
                <XCircledIcon size={40} color="#ff3300" />
              </button>
            </Tooltip>
            <Tooltip text="Match user">
              <button
                className="p-4 flex items-center justify-center border-2 border-[#00ff00] rounded-full max-w-max"
                onClick={() => onMatch(user._id)}
              >
                <ThumbsUpButton size={40} color="#00ff00" />
              </button>
            </Tooltip>
            <Tooltip text="Next person">
              <button
                className="p-4 flex items-center justify-center border-2 border-[#000] rounded-full max-w-max"
                onClick={onNext}
              >
                <ForwardArrowIcon size={40} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
