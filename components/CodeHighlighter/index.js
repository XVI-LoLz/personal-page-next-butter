import SyntaxHighlighter from "react-syntax-highlighter";
import editorStyle from "./editorStyle";

export default function CodeHighlighter({ code, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      showLineNumbers
      wrapLongLines
    >
      {code}
    </SyntaxHighlighter>
  );
}
