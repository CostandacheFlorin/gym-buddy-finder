"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "../lib/mutations";
import { Gender } from "@/types/users";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons
import Link from "next/link";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Track confirm password visibility
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push("/login"); // Redirect to login page after successful registration
    },
    onError: (error: any) => {
      setError(error.response?.data.message || "Registration failed");
    },
  });

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setPasswordError(null);

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    mutate({
      first_name: firstName,
      last_name: lastName,
      birth_date: new Date(birthDate),
      email,
      gender,
      password,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-green-400">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-green-400"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-green-400"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="birth_date"
              className="block text-sm font-medium text-green-400"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birth_date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              min="1920-01-01"
              max="2010-12-31"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm appearance-none"
              style={{
                colorScheme: "dark", // This ensures the calendar itself matches a dark theme.
              }}
            />
          </div>
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
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-green-400"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-400"
            >
              Password
            </label>
            <div className="relative">
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
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <HiEyeOff className="w-5 h-5 text-green-400" />
                ) : (
                  <HiEye className="w-5 h-5 text-green-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-green-400"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <HiEyeOff className="w-5 h-5 text-green-400" />
                ) : (
                  <HiEye className="w-5 h-5 text-green-400" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isPending
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {isPending ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <p className="text-center text-sm text-green-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-400 hover:text-green-300 underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
