import Card from "components/Card";
import Page from "components/Page";
import Link from "next/link";
import { getTypesAndOccurrences } from "utils/page";
import { getCondensedDatabase } from "utils/queries";

import style from "./blogPage.module.scss";

export default function Blog({ posts, types }) {
  return (
    <Page className={style}>
      {types.map(([name, occurrences]) => (
        <section key={name}>
          <header>
            <h1>{name}</h1>
            <h4>Artículos: {occurrences}</h4>
          </header>
          <div className={style.postsContainer}>
            {posts
              .filter(({ type }) => type === name)
              .map((post) => (
                <Link
                  key={post.id}
                  href="/blog/[slug]"
                  as={`/blog/${post.slug}`}
                >
                  <a>
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
        posts,
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
