import Link from "next/link";

import Page from "components/Page";
import Banner from "components/Banner";
import ProjectCard from "components/ProjectCard";
import Card from "components/Card";

import { getPageInfo } from "utils/page";
import { getCondensedDatabase } from "utils/queries";

import style from "styles/modifiers/home.module.scss";

// TODO Add banner carousel functionality
// TODO Add top tags functionality

export default function Home({ posts }) {
  return (
    <Page
      className={style}
      banner={<Banner />}
      sidebar={<Sidebar />}
      hideWhitespace
    >
      <h1>Del blog</h1>
      <section className={style.postsContainer}>
        {posts.map((post) => (
          <Link key={post.id} href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a title="Ir al artículo">
              <Card header={post.title}>{post.description}</Card>
            </a>
          </Link>
        ))}
      </section>
    </Page>
  );
}

const Sidebar = () => (
  <>
    <h1>Otros proyectos</h1>
    <section>
      <ProjectCard
        href="https://proyecto-jp.netlify.app/"
        src="images/proyecto-jp.jpg"
        label="Proyecto JP"
      />
    </section>
  </>
);

export const getStaticProps = async () => {
  try {
    const pages = await getCondensedDatabase({
      id: process.env.NOTION_BLOG_ID,
    });

    const posts = pages.map((page) => getPageInfo(page));
    const publishedPosts = posts.filter(({ published }) => published);

    return {
      props: { posts: publishedPosts },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: { posts: [] },
  };
};
