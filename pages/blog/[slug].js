import fs from "fs";
import yaml from "js-yaml";

import PropTypes from "prop-types";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";

import {
  getAllBlogPosts,
  getPostLocaleBySlug,
  getTableOfContents,
  sortAllByLocale,
} from "lib/blogPosts";
import { locales } from "utils/locales";
import matter from "gray-matter";

import Page from "components/Page";
import Meta from "components/Meta";
import TableOfContents from "components/TableOfContents";
import PostHeader from "components/PostHeader";
import PostBody from "components/PostBody";
import Whitespace from "components/Whitespace";

import style from "components/Page/blog[slug].module.scss";

export default function BlogPost({ content, metadata, toc }) {
  const router = useRouter();

  if (!router.isFallback && !metadata.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Page title="Blog">
      <Meta {...metadata} />
      <div className={style.content}>
        <TableOfContents content={toc} />
        <article className={style.article}>
          <PostHeader {...metadata} />
          <PostBody content={content} />
        </article>
      </div>
      <Whitespace />
    </Page>
  );
}

BlogPost.propTypes = {
  content: PropTypes.shape({}),
  metadata: PropTypes.shape({}),
  toc: PropTypes.arrayOf(PropTypes.shape({})),
};

BlogPost.defaultProps = {
  content: {},
  metadata: {},
  toc: [],
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const locale = getPostLocaleBySlug(slug);
  const source = fs.readFileSync(`content/blog/${locale}/${slug}.md`, "utf8");

  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });
  const mdxSource = await serialize(content, { scope: data });

  const toc = getTableOfContents(content);

  return { props: { content: mdxSource, metadata: data, toc } };
}

export async function getStaticPaths({ locale }) {
  const allPosts = getAllBlogPosts();
  const sortedPosts = sortAllByLocale(allPosts, locale);
  const paths = sortedPosts.map((post) => `/blog/${post.slug}`);

  return {
    paths,
    fallback: "blocking",
  };
}
