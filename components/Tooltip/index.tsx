import React from "react";

interface TooltipProps {
  text: string; // Tooltip text
  children: React.ReactNode; // Content that triggers the tooltip
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute left-1/2 bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transform -translate-x-1/2 transition-opacity duration-300">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
