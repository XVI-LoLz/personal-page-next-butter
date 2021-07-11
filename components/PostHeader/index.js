import Image from "next/image";
import PropTypes from "prop-types";

import Date from "components/Date";
import PostTitle from "components/PostTitle";

export default function PostHeader({
  title,
  updated,
  tags,
  featured_image: ftImage,
  featured_image_alt: ftImageAlt,
}) {
  return (
    <div>
      <PostTitle>{title}</PostTitle>
      <div className="post-subtitle">
        {updated && <Date dateString={updated} />}
        <div className="tags-container">
          {tags?.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
      {ftImage ? <img src={ftImage} alt={ftImageAlt} layout="fill" /> : null}
    </div>
  );
}

PostHeader.propTypes = {
  title: PropTypes.string,
  updated: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({})),
  featured_image: PropTypes.string,
  featured_image_alt: PropTypes.string,
};

PostHeader.defaultProps = {
  title: "",
  updated: "",
  tags: [],
  featured_image: "",
  featured_image_alt: "",
};
