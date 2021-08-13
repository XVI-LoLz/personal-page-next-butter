import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import { transform } from "./transform";

import style from "./style.module.scss";

export default function PostBody({ content }) {
  return (
    <div className={style.PostBody}>
      {ReactHtmlParser(content, { transform })}
    </div>
  );
}

PostBody.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PostBody.defaultProps = {
  content: "",
};
