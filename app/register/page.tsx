"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "../lib/mutations";
import { Gender } from "@/types/users";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons
import Link from "next/link";
import validatePassword from "../../utils/validatePassword";
import validator from "validator";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<string>("");
  const [ageError, setAgeError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = false;
    setError(null);
    setPasswordError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setAgeError(null);
    setEmailError(null);

    if (firstName.length < 3) {
      setFirstNameError("First name must be at least 3 characters long.");
      errors = true;
    }

    if (lastName.length < 3) {
      setLastNameError("Last name must be at least 3 characters long.");
      errors = true;
    }

    if (!validator.isEmail(email.trim())) {
      setEmailError("Please enter a valid email address.");
      errors = true;
    }

    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    if (age < 0) {
      setAgeError("Blud thinks he is born in the future.");
      errors = true;
    } else if (age < 13) {
      setAgeError("You must be at least 13 years old to register.");
      errors = true;
    } else if (age > 100) {
      setAgeError(
        "Bro at your age just chill out, no one trying to get benched by someone who is over 100 years old 💀"
      );
      errors = true;
    }

    if (isNaN(age)) {
      setAgeError("Please select your age!");
      errors = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one number."
      );
      errors = true;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      errors = true;
    }
    if (errors) {
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
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                firstNameError ? "border-red-500" : "border-gray-700"
              } rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm`}
            />

            {firstNameError && (
              <p className="text-red-500 text-sm py-2">{firstNameError}</p>
            )}
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
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                lastNameError ? "border-red-500" : "border-gray-700"
              } rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm`}
            />

            {lastNameError && (
              <p className="text-red-500 text-sm py-2">{lastNameError}</p>
            )}
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
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                ageError ? "border-red-500" : "border-gray-700"
              } rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm appearance-none`}
              style={{
                colorScheme: "dark", // This ensures the calendar itself matches a dark theme.
              }}
            />
            {ageError && (
              <p className="text-red-500 text-sm py-2">{ageError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-400"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                emailError ? "border-red-500" : "border-gray-700"
              } rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm`}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
                className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                  passwordError ? "border-red-500" : "border-gray-700"
                } rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm`}
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
                className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
                  passwordError ? "border-red-500" : "border-gray-700"
                } rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 text-green-400 sm:text-sm`}
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
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          {error && <p className="text-red-500 text-sm py-2">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
