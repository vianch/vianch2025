import { ReactElement } from "react";

const XTwitter = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
  <svg
    aria-hidden="true"
    className={className}
    fill={fill}
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="M17.5 3h3l-7.2 8.2L22 21h-6.4l-5-6.6L4.8 21H1.8l7.7-8.8L2 3h6.6l4.5 6zm-1.1 16h1.7L7.7 4.8H5.9z" />
  </svg>
);

export default XTwitter;
