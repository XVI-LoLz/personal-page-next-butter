import Head from "next/head";
import cn from "classnames";

import Layout from "components/Layout";
import Whitespace from "components/Whitespace";

import style from "./style.module.scss";

export default function Page({
  className,
  title,
  banner,
  children,
  sidebar,
  hideWhitespace,
}) {
  return (
    <Layout>
      <Head>
        <title>{title || "XVI"}</title>
      </Head>
      <main className={cn("page -single-column", style, className)}>
        {banner ? <section className="banner">{banner}</section> : null}
        <div className="content">
          {children}
          {hideWhitespace ? null : <Whitespace />}
        </div>
        {sidebar ? <aside className="sidebar">{sidebar}</aside> : sidebar}
      </main>
    </Layout>
  );
}

Page.propTypes = {};

Page.defaultProps = {};
