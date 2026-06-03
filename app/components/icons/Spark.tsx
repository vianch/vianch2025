import { ReactElement } from "react";

const Spark = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={height}
    onClick={onClick}
    stroke={fill}
    strokeWidth="1.6"
    viewBox="0 0 24 24"
    width={width}
  >
    <path
      d="M12 3c.4 3.2 1.8 4.6 5 5-3.2.4-4.6 1.8-5 5-.4-3.2-1.8-4.6-5-5 3.2-.4 4.6-1.8 5-5Z"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 13.5c.2 1.5.9 2.2 2.5 2.5-1.6.3-2.3 1-2.5 2.5-.2-1.5-.9-2.2-2.5-2.5 1.6-.3 2.3-1 2.5-2.5Z"
      strokeLinejoin="round"
    />
  </svg>
);

export default Spark;
