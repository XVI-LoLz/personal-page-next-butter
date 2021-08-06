import PropTypes from "prop-types";

import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { getAllPostsWithSlug, getPostAndMorePosts } from "lib/buttercms";

import usePostMetadata from "hooks/use-post-metadata";
import { fiveMinutes } from "utils/revalidation";

import Page from "components/Page";
import TableOfContents from "components/TableOfContents";
import PostHeader from "components/PostHeader";
import PostBody from "components/PostBody";
import MorePosts from "components/MorePosts";
import PostBreadcrumbs from "components/PostBreadcrumbs";
import Whitespace from "components/Whitespace";

import style from "components/Page/blog[slug].module.scss";

export default function BlogPost({ post, morePosts }) {
  const { t } = useTranslation("common");
  const { improved, toc } = usePostMetadata(post);
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post?.title} | Blog</title>
        <meta property="og:image" content={post?.featured_image} />
      </Head>

      <Page>
        <div className={style.content}>
          <TableOfContents content={toc} />
          <article className={style.article}>
            <PostBreadcrumbs post={post} />
            <PostHeader {...post} />
            <PostBody content={improved} />
            {morePosts?.length > 0 && (
              <section className="more-posts">
                <h1>{t`moreArticles`}</h1>
                <MorePosts posts={morePosts} />
              </section>
            )}
          </article>
        </div>
        <Whitespace />
      </Page>
    </>
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

export async function getStaticProps({ params, preview = null }) {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post,
      morePosts,
    },
    revalidate: fiveMinutes,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/blog/${post?.slug}`) || [],
    fallback: "blocking",
  };
}
