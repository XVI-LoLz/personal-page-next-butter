import Head from "next/head";
import PropTypes from "prop-types";
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
      <main
        className={cn(style.Page, style.singleColumn, {
          [className?.Modifier]: className && className?.Modifier,
        })}
      >
        {banner ? (
          <section className={cn(style.banner, className?.banner)}>
            {banner}
          </section>
        ) : null}
        <div className={cn(style.content, className?.content)}>
          {children}
          {hideWhitespace ? null : <Whitespace />}
        </div>
        {sidebar ? (
          <aside className={cn(style.sidebar, className?.sidebar)}>
            {sidebar}
          </aside>
        ) : (
          sidebar
        )}
      </main>
    </Layout>
  );
}

Page.propTypes = {
  className: PropTypes.shape({}),
  title: PropTypes.string,
  banner: PropTypes.node,
  children: PropTypes.node,
  sidebar: PropTypes.node,
  hideWhitespace: PropTypes.bool,
};

Page.defaultProps = {
  className: null,
  title: "XVI",
  banner: null,
  children: null,
  sidebar: null,
  hideWhitespace: false,
};
