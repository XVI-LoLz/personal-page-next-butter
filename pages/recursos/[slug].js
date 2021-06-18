import React from "react";
import Head from "next/head";
import { getPageTitle } from "notion-utils";
import { NotionRenderer } from "react-notion-x";

import Page from "components/Page";

import { getCondensedDatabase } from "utils/queries";
import { notionX } from "utils/client";
import { threeHours } from "utils/revalidation";

import style from "styles/modifiers/blog.module.scss";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export default function NotionPage({ post, recordMap }) {
  if (!recordMap && !post) {
    return null;
  }
  const { createdTime, lastEditedTime } = post;
  const [created] = createdTime.split("T");
  const [edited] = lastEditedTime.split("T");

  const title = getPageTitle(recordMap);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Page className={style}>
        <header>
          <h1>{title}</h1>
          <h2 title={`Creado: ${created}`}>
            {created === edited ? `Creado: ${created}` : `Editado: ${edited}`}
          </h2>
        </header>
        <NotionRenderer recordMap={recordMap} fullPage showTableOfContents />
      </Page>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const pages = await getCondensedDatabase({
    id: process.env.NOTION_RESOURCES_ID,
    condensed: true,
  });

  const match = pages.find(({ slug }) => slug === params.slug);
  const recordMap = await notionX.getPage(match.id);

  return {
    props: {
      post: match,
      recordMap,
    },
    revalidate: threeHours,
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
    const posts = await getCondensedDatabase({
      id: process.env.NOTION_RESOURCES_ID,
    });

    const publishedPosts = posts.filter(({ published }) => published);
    const paths = publishedPosts.map(({ slug }) => `/recursos/${slug}`);
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
