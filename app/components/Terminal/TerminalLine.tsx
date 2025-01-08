import { FC, ReactNode } from "react";

/* Styles */

type TerminalLineProps = {
  children: ReactNode;
};

const TerminalLine: FC<TerminalLineProps> = ({ children }) => {
  if (typeof children === "string") {
    if (children.includes("<") && children.includes(">")) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: children,
          }}
        />
      );
    }
    return <>{children}</>;
  }
  return <>{children}</>;
};

export default TerminalLine;
