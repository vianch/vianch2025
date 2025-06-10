import { FC, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Components
import CustomLink from "./CustomLink";
import MarkdownCode from "./MarkdownCode";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content, className = "" }): ReactElement => {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          a: CustomLink as React.ElementType,
          code: MarkdownCode as React.ElementType,
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
