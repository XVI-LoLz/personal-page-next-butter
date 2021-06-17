import Card from "components/Card";
import Page from "components/Page";
import Link from "next/link";
import { getTypesAndOccurrences } from "utils/page";
import { getCondensedDatabase } from "utils/queries";

import style from "styles/modifiers/blog.module.scss";

export default function Blog({ posts, types }) {
  return (
    <Page className={style}>
      {types.map(([name, occurrences]) => (
        <section key={name}>
          <h1>{name}</h1>
          <h2>
            {occurrences} {occurrences > 1 ? "Artículos" : "Artículo"}
          </h2>
          <div className={style.postsContainer}>
            {posts
              .filter(({ type }) => type === name)
              .map((post) => (
                <Link
                  key={post.id}
                  href="/blog/[slug]"
                  as={`/blog/${post.slug}`}
                >
                  <a title="Ir al artículo">
                    <Card header={post.title}>{post.description}</Card>
                  </a>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </Page>
  );
}

export const getStaticProps = async () => {
  try {
    const posts = await getCondensedDatabase({
      id: process.env.NOTION_BLOG_ID,
    });

    const publishedPosts = posts.filter(({ published }) => published);
    const types = getTypesAndOccurrences(publishedPosts);

    return {
      props: {
        posts: publishedPosts,
        types,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: { posts: [] },
  };
};
