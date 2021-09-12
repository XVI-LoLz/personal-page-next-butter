import PropTypes from "prop-types";
import useTranslation from "next-translate/useTranslation";

import Page from "components/Page";
import PostCard from "components/PostCard";
import { Header } from "styled";

import style from "components/Page/blog.module.scss";
import { getAllBlogPosts, sortAllByLocale } from "lib/blogPosts";

export default function BlogPage({ posts, categories }) {
  return (
    <Page title="Blog">
      <div className={style.content}>
        <Posts posts={posts} categories={categories} />
      </div>
    </Page>
  );
}

BlogPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.string),
};

BlogPage.defaultProps = {
  posts: [],
  categories: [],
};

const Posts = ({ posts, categories }) => {
  const { t } = useTranslation("common");

  const getHeader = (category) => {
    const string = `categories.${category}`;
    return t(string);
  };

  return (
    <div className={style.posts}>
      {categories?.map((category) => {
        const occurrences = posts.filter((post) => post.category === category);
        return (
          <section key={category}>
            {occurrences.length > 0 ? (
              <>
                <Header>{getHeader(category)}</Header>
                <div className="post-subheader">
                  {t("articlesSubheader", { count: occurrences.length })}
                </div>
              </>
            ) : null}
            <div className="posts-container">
              {occurrences?.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.string),
};

Posts.defaultProps = {
  posts: [],
  categories: [],
};

export const getStaticProps = async ({ locale }) => {
  const allPosts = getAllBlogPosts();
  const sortedPosts = sortAllByLocale(allPosts, locale);
  const categories = [...new Set(sortedPosts.map((el) => el.category))] || [];

  return {
    props: { posts: sortedPosts, categories },
  };
};
