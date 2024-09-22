"use client";
import { useRouter } from "next/navigation";

import UserProfile from "@/components/UserProfile";
import SkeletonUserProfile from "@/components/SkeletonUserProfile";

import useBrowseUsers from "@/hooks/useBrowseUsers";
import { useUserContext } from "@/context/UserContext";
import MatchModal from "@/components/MatchModal";

export default function Browse() {
  const router = useRouter();

  const {
    users,
    currentUserIndex,
    onNext,
    onPrevious,
    onMatch,
    onReject,
    isLoading,
    showSuccessfulMatchModal,
    setShowSuccesfulMatchModal,
  } = useBrowseUsers();

  const redirectToMatchedPartner = () => {
    router.push(`/chat/${users[currentUserIndex]._id}`);
  };

  const { loggedInUser, is_loading_user_data, latest_chats_isLoading } =
    useUserContext();

  if (isLoading || is_loading_user_data || latest_chats_isLoading) {
    return <SkeletonUserProfile />;
  }

  if (!loggedInUser?.onboarding_completed) {
    router.push("/my-profile");
  }

  return (
    <div>
      <MatchModal
        isOpen={showSuccessfulMatchModal}
        onClose={() => {
          setShowSuccesfulMatchModal(false);
        }}
        matchName={users[currentUserIndex]?.first_name}
        matchAvatar={users[currentUserIndex]?.pictures[0]?.url}
        userAvatar={
          loggedInUser?.pictures[0]?.url ?? "images/default-avatar.jpg"
        }
        onStartMessaging={redirectToMatchedPartner}
      />
      {users.length > 0 && (
        <UserProfile
          onNext={onNext}
          onPrevious={onPrevious}
          onMatch={onMatch}
          onReject={onReject}
          key={users[currentUserIndex]?._id}
          user={users[currentUserIndex]}
        />
      )}
    </div>
  );
}
