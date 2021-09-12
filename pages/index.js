import useTranslation from "next-translate/useTranslation";
import PropTypes from "prop-types";

import { getProjectsForHome } from "lib/buttercms";
import { getAllBlogPosts, sortAllByLocale } from "lib/blogPosts";

import Page from "components/Page";
import Banner from "components/Banner";
import ProjectCard from "components/ProjectCard";
import MorePosts from "components/MorePosts";
import Header from "styled/Header";

import style from "components/Page/home.module.scss";

export default function Home({ posts, projects }) {
  const { t } = useTranslation("home");

  return (
    <Page>
      <Banner />
      <div className={style.content}>
        <div className={style.cardsContainer}>
          <Header>{t`blogHeader`}</Header>
          <MorePosts posts={posts} />
        </div>

        <Sidebar projects={projects} />
      </div>
    </Page>
  );
}

const Sidebar = ({ projects = [] }) => {
  const { t } = useTranslation("home");
  return (
    <section className={style.Sidebar}>
      <Header>{t`projectsHeader`}</Header>
      <div className={style.projectsContainer}>
        {projects?.map((project) => (
          <ProjectCard key={project.meta.id} {...project} />
        ))}
      </div>
    </section>
  );
};

Sidebar.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
};
Sidebar.defaultProps = {
  projects: [],
};

export async function getStaticProps({ locale }) {
  const allPosts = getAllBlogPosts();
  const sortedPosts = sortAllByLocale(allPosts, locale);
  const projects = (await getProjectsForHome()) || [];
  return {
    props: { posts: sortedPosts, projects },
  };
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  projects: PropTypes.arrayOf(PropTypes.shape({})),
};
Home.defaultProps = {
  posts: [],
  projects: [],
};
