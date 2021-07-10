import PropTypes from "prop-types";
import Date from "components/Date";
import PostTitle from "components/PostTitle";

export default function PostHeader({ title, updated, tags }) {
  return (
    <div>
      <PostTitle>{title}</PostTitle>
      <footer className="post-subtitle">
        {updated && <Date dateString={updated} />}
        <div className="tags-container">
          {tags?.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

PostHeader.propTypes = {
  title: PropTypes.string,
  updated: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({})),
};

PostHeader.defaultProps = {
  title: "",
  updated: "",
  tags: [],
};
