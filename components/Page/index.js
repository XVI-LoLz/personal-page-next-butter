import Head from "next/head";
import PropTypes from "prop-types";
import cn from "classnames";

import Layout from "components/Layout";

import style from "./style.module.scss";

export default function Page({ className, title, children, sidebar }) {
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
        {children}
      </main>
      {sidebar ? (
        <aside className={cn(style.sidebar, className?.sidebar)}>
          {sidebar}
        </aside>
      ) : (
        sidebar
      )}
    </Layout>
  );
}

Page.propTypes = {
  className: PropTypes.shape({}),
  title: PropTypes.string,
  children: PropTypes.node,
  sidebar: PropTypes.node,
};

Page.defaultProps = {
  className: null,
  title: "XVI",
  children: null,
  sidebar: null,
};
