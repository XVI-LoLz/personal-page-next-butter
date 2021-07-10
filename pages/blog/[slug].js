import { useEffect, useState } from "react";
import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";

import { getAllPostsWithSlug, getPostAndMorePosts } from "lib/buttercms";

import Page from "components/Page";
import PostHeader from "components/PostHeader";
import PostBody from "components/PostBody";
import MorePosts from "components/MorePosts";

import style from "styles/modifiers/blog.module.scss";
import Link from "next/link";
import useScrollToHashOnLoad from "hooks/use-hash-on-load";
import PostBreadcrumbs from "components/PostBreadcrumbs";

export default function NotionPage({ post, morePosts, preview }) {
  const [improved, setImproved] = useState(post);
  const [toc, setTOC] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (post?.body) {
      const nodes = [];
      const doc = new DOMParser().parseFromString(post?.body, "text/html");
      const headers = doc.querySelectorAll("h1,h2,h3,h4,h5,h6");

      headers.forEach((h, i) => {
        // eslint-disable-next-line no-param-reassign
        h.id = kebabCase(i + h.innerHTML);
        nodes.push({
          type: h.nodeName,
          label: h.innerHTML,
          slug: h.id,
          indent: h.nodeName.replace("H", ""),
        });
      });
      setTOC(nodes);
      setImproved(doc.body.innerHTML);
    }
  }, [post.body]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta property="og:image" content={post.featured_image} />
      </Head>

      <Page className={style} sidebar={<TableOfContents content={toc} />}>
        <article>
          <PostBreadcrumbs post={post} />
          <PostHeader {...post} />
          <PostBody content={improved} />
        </article>
        {morePosts.length > 0 && (
          <section className="more-posts">
            <h1>Más artículos</h1>
            <MorePosts posts={morePosts} />
          </section>
        )}
      </Page>
    </>
  );
}

const TableOfContents = ({ content }) => {
  useScrollToHashOnLoad();

  return (
    <nav className="table-of-contents">
      <header>Tabla de Contenido</header>
      <ul>
        {content.map(({ type, label, slug, indent }, i) => (
          <li key={slug} className={type}>
            <Link href={{ hash: slug }} replace>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export async function getStaticProps({ params, preview = null }) {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post,
      morePosts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts.map((post) => `/blog/${post.slug}`) || [],
    fallback: true,
  };
}
