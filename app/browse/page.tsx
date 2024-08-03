"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../lib/queryKeys";
import { fetchUsersToMatch } from "../lib/queries";
import UserProfile from "@/components/UserProfile";
import { useEffect, useState } from "react";
import SkeletonUserProfile from "@/components/SkeletonUserProfile";
import { Bounce, toast } from "react-toastify";
import { User } from "@/types/users";

export default function Browse() {
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(2);
  const [loggedInUser, setLoggedInUser] = useState({
    _id: "66939839c3410c07e2a76c6c",
  });
  const queryClient = useQueryClient();
  const {
    data: fetchedUsers = [],
    error,
    isLoading,
    isError,
    refetch: refetchUsersToMatch,
  } = useQuery({
    queryKey: [QueryKeys.browseMatchingUsers],
    queryFn: () => {
      return fetchUsersToMatch({
        user_id: loggedInUser._id,
        skip,
        limit,
      });
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 100,
  });

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
    }
  }, [fetchedUsers]);

  console.log({ currentUserIndex });
  console.log({ length: users.length });

  console.log({ fetchedUsers });

  console.log("skip", skip);
  useEffect(() => {
    if (currentUserIndex > users.length - 1) {
      console.log("USE EFFECT INCREMENT SKIP");

      setSkip((prevSkip) => prevSkip + 1);
      setLimit((prevLimit) => prevLimit + 1);
    }
  }, [currentUserIndex, users.length]);

  // useEffect(() => {
  //   refetchUsersToMatch();
  //   console.log("USE EFFECT REFETCH");
  // }, [skip, limit, refetchUsersToMatch]);

  const showError = (error: Error) =>
    toast.error(
      `There has been an error fetching the users to match! ${error.message}`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );

  const onNext = () => {
    if (currentUserIndex < users?.length - 1) {
      setCurrentUserIndex((prevUser) => prevUser + 1);
    } else {
      toast.info(`There are no users left to check at this time !`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const onPrevious = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex((prevUser) => prevUser - 1);
    } else {
      toast.info(`There are no previous users to go back to !`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const removeUserFromUsersList = (user_id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== user_id));
  };

  const onMatch = (user_id: string) => {
    console.log("matched with", user_id);
    removeUserFromUsersList(user_id);
  };

  const onReject = (user_id: string) => {
    console.log("rejected with", user_id);
    removeUserFromUsersList(user_id);
  };

  console.log({ users });
  if (isLoading) {
    return <SkeletonUserProfile />;
  }
  if (isError) {
    showError(error);
  }

  return (
    <div>
      <UserProfile
        onNext={onNext}
        onPrevious={onPrevious}
        onMatch={onMatch}
        onReject={onReject}
        key={users[currentUserIndex]?._id}
        user={users[currentUserIndex]}
      />
    </div>
  );
}
