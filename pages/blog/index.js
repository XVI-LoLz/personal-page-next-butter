import Card from "components/Card";
import Page from "components/Page";
import Link from "next/link";

import { getAllBlogCategories, getAllPostsWithSlug } from "lib/buttercms";

import style from "styles/modifiers/blog.module.scss";
import { Header } from "styled-components";
import PostCard from "components/PostCard";

export default function Blog({ posts, categories }) {
  return (
    <Page className={style}>
      {categories.map(({ name, slug }) => (
        <section key={slug}>
          <Header>{name}</Header>
          <div className="posts-container">
            {posts
              .filter((post) => post.categories.find((c) => c.slug === slug))
              .map((post) => (
                <PostCard key={post.created} {...post} />
              ))}
          </div>
        </section>
      ))}
    </Page>
  );
}

export const getStaticProps = async () => {
  const posts = (await getAllPostsWithSlug()) || [];
  const categories = (await getAllBlogCategories()) || [];

  return {
    props: { posts, categories },
  };
};
