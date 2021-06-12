import React from "react";
import Head from "next/head";

import { getPageTitle } from "notion-utils";
import { NotionRenderer } from "react-notion-x";
import { queryDatabase } from "utils/queries";
import { getPageInfo } from "utils/page";
import { notionX } from "utils/client";
import Page from "components/Page";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export default function NotionPage({ recordMap }) {
  if (!recordMap) {
    return null;
  }

  const title = getPageTitle(recordMap);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Page>
        <NotionRenderer recordMap={recordMap} fullPage darkMode={false} />
      </Page>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const pages = await queryDatabase({
    id: process.env.NOTION_BLOG_ID,
    condensed: true,
  });

  const match = pages.find(({ slug }) => slug === params.slug);
  const recordMap = await notionX.getPage(match.id);

  return {
    props: {
      recordMap,
    },
    revalidate: 10800,
  };
};

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  try {
    const pages = await queryDatabase({
      id: process.env.NOTION_BLOG_ID,
    });

    const posts = pages.map((page) => getPageInfo(page));
    const publishedPosts = posts.filter(({ published }) => published);
    const paths = publishedPosts.map((el) => el.slug);
    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.error(e);
  }

  return {
    paths: [],
    fallback: true,
  };
}
