"use client";

import { FC, ReactElement } from "react";

// Components
import CodeBlock from "./CodeBlock";

type MarkdownCodeProps = {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
};

const MarkdownCode: FC<MarkdownCodeProps> = ({
  inline,
  className,
  children,
  ...props
}: MarkdownCodeProps): ReactElement => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : undefined;

  // if is inline or just one word the children
  if (inline || (typeof children === "string" && !children.includes("\n"))) {
    return <code className={className}>{children}</code>;
  }

  if (!inline) {
    return (
      <CodeBlock language={language} {...props}>
        {String(children).replace(/\n$/, "")}
      </CodeBlock>
    );
  }

  return <div>{children}</div>;
};

export default MarkdownCode;
