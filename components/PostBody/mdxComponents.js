/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */

import kebabCase from "lodash.kebabcase";

import CodeHighlighter from "components/CodeHighlighter";
import Zoomable from "components/Zoomable";

const Heading1 = (props) => {
  const { children } = props || {};
  return <h1 id={kebabCase(children)} {...props} />;
};
const Heading2 = (props) => {
  const { children } = props || {};
  return <h2 id={kebabCase(children)} {...props} />;
};
const Heading3 = (props) => {
  const { children } = props || {};
  return <h3 id={kebabCase(children)} {...props} />;
};
const Heading4 = (props) => {
  const { children } = props || {};
  return <h4 id={kebabCase(children)} {...props} />;
};
const Heading5 = (props) => {
  const { children } = props || {};
  return <h5 id={kebabCase(children)} {...props} />;
};
const Heading6 = (props) => {
  const { children } = props || {};
  return <h6 id={kebabCase(children)} {...props} />;
};

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
