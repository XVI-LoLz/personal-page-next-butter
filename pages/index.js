import { getAllPostsForHome, getProjectsForHome } from "lib/buttercms";

import Page from "components/Page";
import Banner from "components/Banner";
import ProjectCard from "components/ProjectCard";
import MorePosts from "components/MorePosts";
import Header from "styled-components/Header";

import style from "styles/modifiers/home.module.scss";

// TODO Add banner carousel functionality
// TODO Add top tags functionality

export default function Home({ allPosts, projects }) {
  return (
    <Page
      className={style}
      banner={<Banner />}
      sidebar={<Sidebar projects={projects} />}
      hideWhitespace
    >
      <Header>Del blog</Header>
      <MorePosts posts={allPosts} />
    </Page>
  );
}

const Sidebar = ({ projects = [] }) => (
  <section>
    <Header>Otros proyectos</Header>
    <div className="projects-container">
      {projects.map((project) => (
        <ProjectCard key={project.meta.id} {...project} />
      ))}
    </div>
  </section>
);

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPostsForHome(preview)) || [];
  const projects = (await getProjectsForHome()) || [];
  return {
    props: { allPosts, preview, projects },
  };
}
