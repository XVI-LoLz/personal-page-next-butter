import { notionAPI } from "./client";
import { getPageInfo } from "./page";

const queryDatabase = async ({ id, condensed }) => {
  const { results } = await notionAPI.databases.query({
    database_id: id,
  });
  if (condensed) {
    return results.map((res) => getPageInfo(res));
  }
  return results;
};

const getDatabaseList = async () => {
  const { results } = await notionAPI.search({
    filter: { property: "object", value: "database" },
  });
  return results;
};

export { queryDatabase, getDatabaseList };
