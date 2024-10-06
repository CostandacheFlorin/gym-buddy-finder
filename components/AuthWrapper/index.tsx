"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUserContext } from "../../context/UserContext";

const PUBLIC_ROUTES = ["/login", "/register", "/", "/about", "/contact"];
const AUTH_ROUTES = ["/login", "/register"];

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedInUser, is_loading_user_data, refetchGetMe } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (is_loading_user_data) return;

    if (isInitialLoad) {
      refetchGetMe();
      setIsInitialLoad(false);
      return;
    }

    if (!loggedInUser && !PUBLIC_ROUTES.includes(pathname)) {
      router.push("/login");
    } else if (loggedInUser && AUTH_ROUTES.includes(pathname)) {
      router.push("/browse");
    }
  }, [
    loggedInUser,
    is_loading_user_data,
    pathname,
    router,
    isInitialLoad,
    refetchGetMe,
  ]);

  if (is_loading_user_data || isInitialLoad) {
    return (
      <div className="h-screen w-screen bg-gray-900 p-0 m-0 overflow-hidden">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
