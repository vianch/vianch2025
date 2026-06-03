import { ReactElement } from "react";

const LinkedIn = ({ className, fill, height, onClick, width }: Icon): ReactElement => (
  <svg
    aria-hidden="true"
    className={className}
    fill={fill}
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.65 4.75 6.1V21H17.6v-5.3c0-1.3 0-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
  </svg>
);

export default LinkedIn;
