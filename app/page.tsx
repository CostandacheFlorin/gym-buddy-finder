import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="h-full bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-4xl font-extrabold text-gray-900">
              Welcome to Gym Buddy Match
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Find Your Perfect Gym Buddy Today
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mt-4 text-gray-700">
              Whether you’re looking for a romantic partner who shares your
              passion for fitness or simply a friend to motivate you at the gym,
              our app has got you covered.
            </p>
            <p className="mt-4 text-gray-700">
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Personalized Matches: Connect with like-minded individuals based
                on your preferences.
              </li>
              <li>
                Safe and Secure: Your privacy and security are our top priority.
              </li>
              <li>
                Easy to Use: Simple and intuitive interface to get you started
                quickly.
              </li>
              <li>
                Community Events: Join community events and meet-ups organized
                by our users.
              </li>
            </ul>
            <p className="mt-4 text-gray-700">
              Sign up now and find your gym buddy who will help you stay
              motivated and achieve your fitness goals!
            </p>
            <div className="mt-6">
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
