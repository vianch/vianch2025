import { ReactElement } from "react";

const Mail = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
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
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Mail;
