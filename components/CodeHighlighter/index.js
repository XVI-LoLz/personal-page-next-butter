import { FaCopy } from "react-icons/fa";
import SyntaxHighlighter from "react-syntax-highlighter";
import editorStyle from "./editorStyle";

import style from "./style.module.scss";

export default function CodeHighlighter({ code, language, options }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={style.CodeHighlighter}>
      <button
        type="button"
        className={style.copyButton}
        onClick={copyToClipboard}
      >
        <FaCopy />
      </button>
      <SyntaxHighlighter
        language={language}
        style={editorStyle}
        showLineNumbers
        wrapLongLines
        {...options}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
