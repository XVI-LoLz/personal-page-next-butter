import useTranslation from "next-translate/useTranslation";

import { getAllPostsForHome, getProjectsForHome } from "lib/buttercms";

import Page from "components/Page";
import Banner from "components/Banner";
import ProjectCard from "components/ProjectCard";
import MorePosts from "components/MorePosts";
import Header from "styled-components/Header";

import style from "styles/modifiers/home.module.scss";
import { fiveMinutes } from "utils/revalidation";

export default function Home({ allPosts, projects }) {
  const { t } = useTranslation("home");

  return (
    <Page className={style} sidebar={<Sidebar projects={projects} />}>
      <Banner />
      <Header>{t`blogHeader`}</Header>
      <MorePosts posts={allPosts} />
    </Page>
  );
}

const Sidebar = ({ projects = [] }) => {
  const { t } = useTranslation("home");
  return (
    <section>
      <Header>{t`projectsHeader`}</Header>
      <div className="projects-container">
        {projects?.map((project) => (
          <ProjectCard key={project.meta.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export async function getStaticProps({ preview = null, locale = "es" }) {
  const slugLocale = locale.toLowerCase();
  const allPosts = (await getAllPostsForHome(preview, slugLocale)) || [];
  const projects = (await getProjectsForHome()) || [];
  return {
    props: { allPosts, preview, projects },
    revalidate: fiveMinutes,
  };
}
