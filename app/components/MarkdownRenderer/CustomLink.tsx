import { ReactElement } from "react";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

const CustomLink = ({ href, children, ...props }: CustomLinkProps): ReactElement => {
  const isExternal = href && (href.startsWith("http") || href.startsWith("//"));

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default CustomLink;
