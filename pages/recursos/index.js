import PropTypes from "prop-types";
import useTranslation from "next-translate/useTranslation";

import { getAllResources } from "lib/buttercms";

import Page from "components/Page";
import Resource from "components/Resource";
import { Header } from "styled-components";

import { fiveMinutes } from "utils/revalidation";

export default function RecursosPage({ allResources }) {
  const { t } = useTranslation("resources");
  const platforms = allResources.filter((el) => el.type === "platform");
  const channels = allResources.filter((el) => el.type === "channel");

  return (
    <Page>
      <Header>{t`platformsHeader`}</Header>
      <div className="post-subtitle">
        {t("platformsSubheader", { count: platforms?.length })}
      </div>
      <div className="posts-container">
        {platforms?.map((platform, i) => (
          <Resource key={i} {...platform} />
        ))}
      </div>
      <Header>{t`channelsHeader`}</Header>
      <div className="post-subtitle">
        {t("channelsSubheader", { count: channels?.length })}
      </div>
      <div className="posts-container">
        {channels?.map((channel, i) => (
          <Resource key={i} {...channel} />
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
