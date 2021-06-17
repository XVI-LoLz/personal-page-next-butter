import Page from "components/Page";
import Tool from "components/Tool";

import { getCondensedDatabase } from "utils/queries";
import { getTypesAndOccurrences } from "utils/page";

import { Info, HL } from "styles/components";
import style from "styles/modifiers/herramientas.module.scss";

export default function Herramientas({ tools, types }) {
  return (
    <Page className={style}>
      <Info align="center">
        En esta sección encontrarás <HL>recomendaciones de software</HL> para
        realizar diversas tareas.
      </Info>
      <div>
        {types.map(([name, occurrences]) => (
          <section key={name} className={style.toolSection}>
            <h1>Software para {name}</h1>
            <h2>
              {occurrences} {occurrences > 1 ? "Herramientas" : "Herramienta"}
            </h2>
            <div className={style.toolContainer}>
              {tools
                .filter((tool) => tool.type === name)
                .map((tool) => (
                  <Tool key={tool.id} {...tool} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  try {
    const tools = await getCondensedDatabase({
      id: process.env.NOTION_TOOLS_ID,
    });

    const publishedTools = tools.filter(({ published }) => published);
    const types = getTypesAndOccurrences(publishedTools);

    return {
      props: {
        tools: publishedTools,
        types,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    props: { posts: [] },
  };
};
