import Page from "components/Page";
import Resource from "components/Resource";

import { getTypesAndOccurrences } from "utils/page";
import { getCondensedDatabase } from "utils/queries";

import style from "./style.module.scss";

export default function Recursos({ resources, types }) {
  return (
    <Page className={style}>
      <p>
        En esta sección encontrarás recomendaciones de{" "}
        <span>plataformas, canales y otros sitios</span> que pueden ayudarte a{" "}
        <span>aprender</span> y <span>practicar</span> conceptos de
        programación.
      </p>
      {types.map(([name, occurences]) => (
        <section key={name}>
          <h1>{name}</h1>
          <h4>{occurences}</h4>
          <div className={style.resourcesContainer}>
            {resources
              .filter(({ type }) => type === name)
              .map((platform) => (
                <Resource key={platform.id} {...platform} />
              ))}
          </div>
        </section>
      ))}
    </Page>
  );
}

export const getStaticProps = async () => {
  try {
    const resources = await getCondensedDatabase({
      id: process.env.NOTION_RESOURCES_ID,
    });

    const publishedResources = resources.filter(({ published }) => published);
    const types = getTypesAndOccurrences(publishedResources);

    return {
      props: {
        resources,
        types,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: { resources: [], types: [] },
  };
};
