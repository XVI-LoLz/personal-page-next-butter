import PropTypes from "prop-types";
import { MDXRemote } from "next-mdx-remote";

import components from "./mdxComponents";

import style from "./style.module.scss";

export default function PostBody({ content }) {
  return (
    <div className={style.PostBody}>
      <MDXRemote {...content} components={components} />
    </div>
  );
}

PostBody.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PostBody.defaultProps = {
  content: "",
};
