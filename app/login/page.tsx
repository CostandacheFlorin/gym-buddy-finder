"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "../lib/mutations";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { refetchLatestChats, refetchGetMe } = useUserContext();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      refetchLatestChats();
      refetchGetMe();
      router.push("/browse");
    },
    onError: (error: any) => {
      setError(error.response?.data.message || "Login failed");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-green-400">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-400"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <HiEyeOff className="h-5 w-5 text-green-400" />
              ) : (
                <HiEye className="h-5 w-5 text-green-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${
              isPending
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-center text-sm text-green-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="text-green-400 hover:text-green-300 underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
