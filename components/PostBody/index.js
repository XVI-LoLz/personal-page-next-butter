import PropTypes from "prop-types";

import style from "./style.module.scss";

export default function PostBody({ content }) {
  return (
    <div
      className={style.PostBody}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

PostBody.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PostBody.defaultProps = {
  content: "",
};