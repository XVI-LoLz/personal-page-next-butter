import Page from "components/Page";
import Resource from "components/Resource";

import { getTypesAndOccurrences } from "utils/page";
import { getCondensedDatabase } from "utils/queries";

import { Info, HL } from "styles/components";
import style from "styles/modifiers/recursos.module.scss";

const getLabel = (occurrences, name) => {
  const multiple = occurrences > 1;
  const getName = () => {
    if (name === "Canales") return multiple ? "Canales" : "Canal";
    if (name === "Plataformas") return multiple ? "Plataformas" : "Plataforma";
    return null;
  };
  return `${occurrences} ${getName()}`;
};

export default function Recursos({ resources, types }) {
  return (
    <Page className={style}>
      <Info align="center">
        En esta sección encontrarás links a{" "}
        <HL>plataformas, canales y otros sitios</HL> que pueden ayudarte a{" "}
        <HL>aprender</HL> y <HL>practicar</HL> conceptos de programación
      </Info>
      {types.map(([name, occurrences]) => (
        <section key={name}>
          <h1>{name}</h1>
          <h2>{getLabel(occurrences, name)}</h2>
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
