import { ReactElement } from "react";

const Camera = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
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
      d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.2l1-1.6A1.5 1.5 0 0 1 9 3.7h6a1.5 1.5 0 0 1 1.3.7l1 1.6h1.2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12.5" r="3.4" />
  </svg>
);

export default Camera;
