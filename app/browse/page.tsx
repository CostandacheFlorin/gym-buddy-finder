"use client";

import UserProfile from "@/components/UserProfile";
import SkeletonUserProfile from "@/components/SkeletonUserProfile";

import useBrowseUsers from "@/hooks/useBrowseUsers";

export default function Browse() {
  const {
    users,
    currentUserIndex,
    onNext,
    onPrevious,
    onMatch,
    onReject,
    isLoading,
  } = useBrowseUsers();

  if (isLoading) {
    return <SkeletonUserProfile />;
  }

  return (
    <div>
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
