const XIcon = ({ fill = "currentColor", size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      width={size}
      height={size}
    >
      <path
        fill={fill}
        d="M0,264.84L335.16,600L0,935.16L264.84,1200L600,864.84L935.16,1200L1200,935.16L864.84,600L1200,264.84L935.16,0L600,335.16L264.84,0L0,264.84z"
      />
    </svg>
  );
};

export default XIcon;
