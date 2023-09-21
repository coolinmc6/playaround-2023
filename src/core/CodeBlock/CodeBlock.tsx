// https://blog.logrocket.com/guide-syntax-highlighting-react/
import React, { useEffect } from "react";
import Prism from "prismjs";

type CodeBlockProps = {
  children: React.ReactNode;
  language: string;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);
  return (
    <pre>
      <code className={`language-${language}`}>
        {children}
      </code>
    </pre>
  );
};

export default CodeBlock;

