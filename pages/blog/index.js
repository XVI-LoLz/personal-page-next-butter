import PropTypes from "prop-types";
import useTranslation from "next-translate/useTranslation";

import { getAllBlogCategories, getAllPostsWithSlug } from "lib/buttercms";

import Page from "components/Page";
import PostCard from "components/PostCard";
import { Header } from "styled-components";

import { fiveMinutes } from "utils/revalidation";
import { getFilteredCategories } from "utils/locales";

import style from "components/Page/blog.module.scss";

export default function BlogPage({ posts, categories }) {
  return (
    <Page>
      <div className={style.content}>
        <Posts posts={posts} categories={categories} />
      </div>
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

const Posts = ({ posts, categories }) => {
  const { t } = useTranslation("common");

  return (
    <div className={style.posts}>
      {categories?.map(({ name, slug }) => {
        const occurrences = posts.filter((post) =>
          post.categories.find((c) => c.slug === slug)
        );
        return (
          <section key={slug}>
            {occurrences.length > 0 ? (
              <>
                <Header>{name}</Header>
                <div className="post-subheader">
                  {t("articlesSubheader", { count: occurrences.length })}
                </div>
              </>
            ) : null}
            <div className="posts-container">
              {occurrences?.map((post) => (
                <PostCard key={post.created} {...post} />
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
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

Posts.defaultProps = {
  posts: [],
  categories: [],
};

export const getStaticProps = async ({ locale }) => {
  const sortByLocale = (a, b) => {
    if (a.categories.some((el) => el.slug === locale)) return -1;
    if (b.categories.some((el) => el.slug === locale)) return 1;
    return 0;
  };

  const posts = (await getAllPostsWithSlug()) || [];
  const categories = (await getAllBlogCategories()) || [];

  const sortedPosts = posts.sort(sortByLocale);
  const filteredCategories = getFilteredCategories(categories);

  return {
    props: { posts: sortedPosts, categories: filteredCategories },
    revalidate: fiveMinutes,
  };
};
