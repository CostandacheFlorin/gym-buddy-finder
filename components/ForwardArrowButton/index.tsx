import React from "react";

interface IconProps {
  size?: number; // Size of the icon
  color?: string; // Color of the icon
  onClick?: () => void; // Click event handler
}

const ForwardArrowIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#000000",
  onClick,
}) => (
  <svg
    onClick={onClick}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: "pointer", transform: "scaleX(-1)" }}
  >
    <path
      fillRule="evenodd"
      d="M4.2971,11.707085 L0.59,7.999975 L4.2971,4.292875 C4.6876,3.902375 5.3208,3.902375 5.7113,4.292875 C6.10183,4.683375 6.10183,5.316575 5.7113,5.707075 L4.4184,6.999975 L14.0042,6.999975 C14.55649,6.999975 15.0042,7.447695 15.0042,7.999975 C15.0042,8.552255 14.55649,8.999975 14.0042,8.999975 L4.4184,8.999975 L5.7113,10.292865 C6.10183,10.683395 6.10183,11.316555 5.7113,11.707085 C5.3208,12.097605 4.6876,12.097605 4.2971,11.707085 Z"
    />
  </svg>
);

export default ForwardArrowIcon;
