import PropTypes from "prop-types";
import { getAllResources } from "lib/buttercms";
import { fiveMinutes } from "utils/revalidation";

import Page from "components/Page";
import Resource from "components/Resource";
import { Header } from "styled-components";

export default function RecursosPage({ allResources }) {
  const platforms = allResources.filter((el) => el.type === "platform");
  const channels = allResources.filter((el) => el.type === "channel");

  return (
    <Page>
      <Header>Plataformas</Header>
      <div className="posts-container">
        {platforms?.map((platform) => (
          <Resource {...platform} />
        ))}
      </div>
      <Header>Canales</Header>
      <div className="posts-container">
        {channels?.map((platform) => (
          <Resource {...platform} />
        ))}
      </div>
    </Page>
  );
}

RecursosPage.propTypes = {
  allResources: PropTypes.arrayOf(PropTypes.shape({})),
};

RecursosPage.defaultProps = {
  allResources: [],
};

export async function getStaticProps() {
  const allResources = (await getAllResources()) || [];
  return {
    props: { allResources },
    revalidate: fiveMinutes,
  };
}
