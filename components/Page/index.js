import Head from "next/head";
import PropTypes from "prop-types";

import Layout from "components/Layout";

import style from "./style.module.scss";

export default function Page({ title, children, sidebar }) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={style.Page}>{children}</main>
      {sidebar ? <aside className={style.Sidebar}>{sidebar}</aside> : sidebar}
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
  title: "16th",
  children: null,
  sidebar: null,
};
