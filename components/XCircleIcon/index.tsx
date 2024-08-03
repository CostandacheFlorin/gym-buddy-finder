import React from "react";

interface IconProps {
  size?: number; // Size of the icon
  color?: string; // Color of the icon
  onClick?: any; // Click event handler
}

const XCircledIcon: React.FC<IconProps> = ({
  size = 24,
  color = "black",
  onClick,
}) => (
  <svg
    onClick={onClick}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: "pointer" }}
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <line x1="8" y1="8" x2="16" y2="16" stroke={color} strokeWidth="2" />
    <line x1="16" y1="8" x2="8" y2="16" stroke={color} strokeWidth="2" />
  </svg>
);

export default XCircledIcon;
