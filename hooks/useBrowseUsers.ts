import { matchUser } from "@/app/lib/mutations";
import { fetchUsersToMatch } from "@/app/lib/queries";
import { QueryKeys } from "@/app/lib/queryKeys";
import { MatchStatus } from "@/types/match";
import { User } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

const useBrowseUsers = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);

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
        skip,
        limit,
      });
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 100,
  });

  const { mutate: matchUserMutation } = useMutation({
    mutationFn: matchUser,
    onSuccess: (data) => {
      if (data.status === MatchStatus.MATCHED) {
        // TODO: to redirect to the chat

        toast.success(`You have matched!`, {
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
    },
    onError: () => {
      toast.error(`Error  trying to match! Try again later! `, {
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
    },
  });

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
    }
  }, [fetchedUsers]);

  useEffect(() => {
    if (isError) {
      showError(error);
    }
  }, [isError, error]);

  // TODO: INFINITE SCROLLING

  // useEffect(() => {
  //   if (currentUserIndex > users.length - 1) {
  //     console.log("USE EFFECT INCREMENT SKIP");

  //     setSkip((prevSkip) => prevSkip + 1);
  //     setLimit((prevLimit) => prevLimit + 1);
  //   }
  // }, [currentUserIndex, users.length]);

  // useEffect(() => {
  //   refetchUsersToMatch();
  //   console.log("USE EFFECT REFETCH");
  // }, [skip, limit, refetchUsersToMatch]);

  const showError = (error: Error) =>
    toast.error(
      `There has been an error fetching the users to match! Try again later`,
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
    matchUserMutation({ user_id, status: MatchStatus.MATCHED });
    removeUserFromUsersList(user_id);
    onNext();
  };

  const onReject = (user_id: string) => {
    matchUserMutation({ user_id, status: MatchStatus.REJECTED });
    removeUserFromUsersList(user_id);
    onNext();
  };

  return {
    users,
    currentUserIndex,
    onNext,
    onPrevious,
    onMatch,
    onReject,
    isLoading,
    isError,
    error,
    showError,
  };
};

export default useBrowseUsers;
