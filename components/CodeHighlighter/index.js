import SyntaxHighlighter from "react-syntax-highlighter";
import style from "./style";

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
