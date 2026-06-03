import { ReactElement } from "react";

const Code = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
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
    <path d="m8 7-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m16 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m13.5 4-3 16" strokeLinecap="round" />
  </svg>
);

export default Code;
