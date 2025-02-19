import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="w-16 h-16 border-4 border-t-4  border-solid rounded-full animate-spin border-t-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
