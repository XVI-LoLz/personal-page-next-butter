/* eslint-disable jsx-a11y/alt-text */
import CodeHighlighter from "components/CodeHighlighter";
import Zoomable from "components/Zoomable";

const components = {
  img: (props) => (
    <Zoomable>
      <img {...props} />
    </Zoomable>
  ),
  pre: (props) => {
    const { children } = props;
    if (children.props.mdxType === "code") {
      const language = children.props.className?.split("-")?.[1] || "text";
      const code = children.props.children || "";
      return <CodeHighlighter language={language} code={code} />;
    }
    return <pre {...props} />;
  },
};

export default components;
