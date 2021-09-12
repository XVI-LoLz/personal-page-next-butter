/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */

import kebabCase from "lodash.kebabcase";

import CodeHighlighter from "components/CodeHighlighter";
import Zoomable from "components/Zoomable";

const Heading1 = (props) => <h1 id={kebabCase(props.children)} {...props} />;
const Heading2 = (props) => <h2 id={kebabCase(props.children)} {...props} />;
const Heading3 = (props) => <h3 id={kebabCase(props.children)} {...props} />;
const Heading4 = (props) => <h4 id={kebabCase(props.children)} {...props} />;
const Heading5 = (props) => <h5 id={kebabCase(props.children)} {...props} />;
const Heading6 = (props) => <h6 id={kebabCase(props.children)} {...props} />;

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
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
};

export default components;
