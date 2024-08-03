import React from "react";

const SkeletonUserProfile: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 min-h-screen max-w-max flex items-center p-4 flex-col">
        {/* Skeleton for Image */}
        <div className="w-[550px] h-[550px] bg-gray-300  mb-4 animate-pulse"></div>

        <div className="w-full p-4 flex gap-4 flex-col">
          {/* Skeleton for Name and Age */}
          <div className="w-[550px] h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>

          {/* Skeleton for Location */}
          <div className="w-[350px] h-8 bg-gray-300 rounded mb-4 animate-pulse"></div>

          {/* Skeleton for Description */}
          <div className="w-[550px] h-24 bg-gray-300 rounded mb-4 animate-pulse"></div>

          {/* Skeleton for Interests */}
          <div className="w-full h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>
          <div className="w-full h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>
          <div className="w-full h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>

          {/* Skeleton for Buttons */}
          <div className="flex gap-4 w-full justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserProfile;
