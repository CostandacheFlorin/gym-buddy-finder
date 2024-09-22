import React from "react";

const SkeletonProfile = () => {
  return (
    <main
      className="flex flex-col items-center bg-[#FFF5E1]"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-center text-[#0C1844] text-2xl font-bold mb-4">
          My Profile
        </h1>

        <div className="w-full flex items-center justify-center mb-6">
          <div className="w-[550px] h-[550px] bg-gray-300 animate-pulse rounded-md"></div>
        </div>

        <div className="space-y-4">
          <div className="w-3/4 h-8 bg-gray-300 animate-pulse rounded-md"></div>

          <h2 className="text-black font-bold text-lg">Location</h2>
          <div className="space-y-2">
            <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded-md"></div>
          </div>

          <div className="space-y-2">
            <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">Description</h2>
          <div className="w-full h-32 bg-gray-300 animate-pulse rounded-md"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">
            Gym Related Interests
          </h2>
          <div className="space-y-2">
            <div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-full h-8 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">
            Gym Unrelated Interests
          </h2>
          <div className="space-y-2">
            <div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-full h-8 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-black font-bold text-lg">Gyms</h2>
          <div className="space-y-2">
            <div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-full h-8 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="w-1/2 m-auto h-12 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </main>
  );
};

export default SkeletonProfile;
