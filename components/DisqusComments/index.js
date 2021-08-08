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
