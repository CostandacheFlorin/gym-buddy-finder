"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUserContext } from "../../context/UserContext";

const PUBLIC_ROUTES = ["/login", "/register", "/", "/about", "/contact"];

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedInUser, is_loading_user_data } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !is_loading_user_data &&
      !loggedInUser &&
      !PUBLIC_ROUTES.includes(pathname)
    ) {
      router.push("/login");
    }
  }, [loggedInUser, is_loading_user_data, pathname, router]);

  if (is_loading_user_data) {
    return (
      <div className="h-screen w-screen bg-gray-900 p-0 m-0 overflow-hidden">
        <LoadingSpinner />;
      </div>
    );
  }

  return <>{children}</>;
}
