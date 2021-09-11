import fs from "fs";
import yaml from "js-yaml";

import PropTypes from "prop-types";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { serialize } from "next-mdx-remote/serialize";

import { getAllBlogPosts } from "lib/blogPosts";

import { fiveMinutes } from "utils/revalidation";

import Page from "components/Page";
import Meta from "components/Meta";
import TableOfContents from "components/TableOfContents";
import PostHeader from "components/PostHeader";
import PostBody from "components/PostBody";
import MorePosts from "components/MorePosts";
import PostBreadcrumbs from "components/PostBreadcrumbs";
import Whitespace from "components/Whitespace";
import DisqusComments from "components/DisqusComments";

import style from "components/Page/blog[slug].module.scss";
import { locales } from "utils/locales";
import matter from "gray-matter";

export default function BlogPost({ content, metadata }) {
  const { t } = useTranslation("common");
  // const { improved, toc } = usePostMetadata(post);
  const router = useRouter();

  if (!router.isFallback && !metadata.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Page title="Blog">
      <Meta {...metadata} />
      <div className={style.content}>
        {/* <TableOfContents content={toc} /> */}
        <article className={style.article}>
          {/* <PostBreadcrumbs post={post} /> */}
          <PostHeader {...metadata} />
          <PostBody content={content} />
          {/* {morePosts?.length > 0 && (
            <section className="more-posts">
              <h1>{t`moreArticles`}</h1>
              <MorePosts posts={morePosts} />
            </section>
          )}
          <DisqusComments post={post} /> */}
        </article>
      </div>
      <Whitespace />
    </Page>
  );
}

BlogPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    featured_image: PropTypes.string,
  }),
  morePosts: PropTypes.arrayOf(PropTypes.shape({})),
  preview: PropTypes.shape({}),
};

BlogPost.defaultProps = {
  post: {},
  morePosts: [],
  preview: {},
};

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  const source = fs.readFileSync(`_content/blog/${locale}/${slug}.md`, "utf8");

  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
  });
  const mdxSource = await serialize(content, { scope: data });
  return { props: { content: mdxSource, metadata: data } };
}

export async function getStaticPaths() {
  const allPosts = getAllBlogPosts();
  const paths = locales
    .map((locale) => allPosts[`${locale}`].map((post) => `/blog/${post.slug}`))
    .flat();
  return {
    paths,
    fallback: "blocking",
  };
}
