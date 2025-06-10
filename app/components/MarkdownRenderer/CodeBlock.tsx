import { FC, useMemo, ReactElement } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";

const languageExtensions = {
  js: javascript,
  javascript: javascript,
  jsx: javascript,
  ts: javascript,
  typescript: javascript,
  tsx: javascript,
  html: html,
  css: css,
  scss: css,
  md: markdown,
  markdown: markdown,
};

type CodeBlockProps = {
  children: string;
  language?: keyof typeof languageExtensions | string | undefined;
};

const CodeBlock: FC<CodeBlockProps> = ({ language, children }): ReactElement => {
  const extensions = useMemo(() => {
    const langExtension = language
      ? languageExtensions[language as keyof typeof languageExtensions]
      : null;

    return langExtension ? [langExtension()] : [];
  }, [language]);

  return (
    <CodeMirror
      value={children.trim()}
      height="auto"
      theme={oneDark}
      extensions={extensions}
      editable={false}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: false,
        foldGutter: true,
      }}
    />
  );
};

export default CodeBlock;
