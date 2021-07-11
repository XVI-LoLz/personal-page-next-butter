import PropTypes from "prop-types";

import { getAllBlogCategories, getAllPostsWithSlug } from "lib/buttercms";

import Page from "components/Page";
import PostCard from "components/PostCard";
import { Header } from "styled-components";

import style from "styles/modifiers/blog.module.scss";
import { fiveMinutes } from "utils/revalidation";

export default function BlogPage({ posts, categories }) {
  return (
    <Page className={style}>
      {categories?.map(({ name, slug }) => {
        const occurrences = posts.filter((post) =>
          post.categories.find((c) => c.slug === slug)
        );
        return (
          <section key={slug}>
            {occurrences.length > 0 && <Header>{name}</Header>}
            <div className="posts-container">
              {occurrences?.map((post) => (
                <PostCard key={post.created} {...post} />
              ))}
            </div>
          </section>
        );
      })}
    </Page>
  );
}
BlogPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

BlogPage.defaultProps = {
  posts: [],
  categories: [],
};

export const getStaticProps = async () => {
  const posts = (await getAllPostsWithSlug()) || [];
  const categories = (await getAllBlogCategories()) || [];

  return {
    props: { posts, categories },
    revalidate: fiveMinutes,
  };
};
