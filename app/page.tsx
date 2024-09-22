import Image from "next/image";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900 text-white">
      <div className="h-full w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <Dumbbell className="h-16 w-16 text-green-400" />
            </div>
            <h1 className="mt-6 text-center text-4xl font-extrabold text-green-400">
              Welcome to Gym Bro Finder
            </h1>
            <p className="mt-2 text-center text-sm text-gray-400">
              Find Your Perfect Gym Bro Today
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <p className="mt-4 text-gray-300">
              Looking for a workout partner to push you to your limits? Our app
              connects you with like-minded gym bros who share your passion for
              gains and fitness.
            </p>
            <p className="mt-4 text-gray-300">
              <strong className="text-green-400">Features:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              <li>
                Bro Matches: Connect with gym bros based on your workout style
                and goals.
              </li>
              <li>
                Secure Spotting: Your privacy and safety are our top priority.
              </li>
              <li>
                Easy to Use: Simple interface to get you connected and lifting
                quickly.
              </li>
              <li>
                Gym Events: Join local workout sessions and protein shake
                meetups.
              </li>
            </ul>
            <p className="mt-4 text-gray-300">
              Sign up now and find your gym bro who will help you crush your PRs
              and achieve beast mode!
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                Get Swole Together
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
