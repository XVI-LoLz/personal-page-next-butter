import Page from "components/Page";
import Tool from "components/Tool";

import { getCondensedDatabase } from "utils/queries";
import { getTypesAndOccurrences } from "utils/page";

import style from "./style.module.scss";

export default function Herramientas({ tools, types }) {
  return (
    <Page className={style}>
      <p>
        En esta sección encontrarás recomendaciones de software para realizar
        diversas tareas.
      </p>
      <div>
        {types.map(([name, occurrences]) => (
          <section key={name} className={style.toolSection}>
            <h1>Software para {name}</h1>
            <h4>Herramientas {occurrences}</h4>
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
