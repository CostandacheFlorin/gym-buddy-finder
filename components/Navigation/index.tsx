"use client";

import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Users, MessageSquare, User, Moon, Sun, LogOut } from "lucide-react";
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // to be refactored
  const pathname = usePathname();
  const { loggedInUser, logoutMutation } = useUserContext();

  const routes = [
    { name: "Browse", href: "/browse", icon: Users },
    { name: "Chats", href: "/chat", icon: MessageSquare },
  ];
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logoutMutation();
  };

  // Don't render navigation on login page or when not authenticated
  if (pathname === "/login" || !loggedInUser) {
    return null;
  }

  return (
    <nav className="bg-gray-900 h-16 text-white shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                width={32}
                height={32}
                src={"/images/default-avatar.jpg"}
                alt={`Logo picture`}
                className="rounded-full"
              />
            </div>
            <div className="ml-4 flex items-baseline space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === route.href
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <route.icon
                    className="inline-block w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">{route.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
              </button>
              {isMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    href="/my-profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    <User className="inline-block w-5 h-5 mr-2" />
                    Your Profile
                  </Link>
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    {theme === "dark" ? (
                      <Sun className="inline-block w-5 h-5 mr-2" />
                    ) : (
                      <Moon className="inline-block w-5 h-5 mr-2" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    <LogOut className="inline-block w-5 h-5 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
