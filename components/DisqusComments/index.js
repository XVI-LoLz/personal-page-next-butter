import PropTypes from "prop-types";
import { DiscussionEmbed } from "disqus-react";

export default function DisqusComments({ post }) {
  return (
    <DiscussionEmbed
      shortname="z16th"
      config={{
        url: post.url,
        identifier: post.created,
        title: post.seo_title,
      }}
    />
  );
}

DisqusComments.propTypes = {
  post: PropTypes.shape({
    url: PropTypes.string,
    created: PropTypes.string,
    seo_title: PropTypes.string,
  }),
};

DisqusComments.defaultProps = {
  post: {},
};
