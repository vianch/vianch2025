import { ReactElement } from "react";

const Instagram = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
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
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1.1" fill={fill} stroke="none" />
  </svg>
);

export default Instagram;
