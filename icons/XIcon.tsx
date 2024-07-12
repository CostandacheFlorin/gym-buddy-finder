const XIcon = ({ fill = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        d="M14.646 5.646a.5.5 0 0 0-.708-.708L10 9.293 5.354 4.646a.5.5 0 0 0-.708.708L9.293 10l-4.647 4.646a.5.5 0 0 0 .708.708L10 10.707l4.646 4.647a.5.5 0 0 0 .708-.708L10.707 10l4.647-4.646z"
      />
    </svg>
  );
};

export default XIcon;
