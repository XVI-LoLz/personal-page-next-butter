import { notionAPI } from "./client";

const queryDatabase = async ({ id }) => {
  const { results } = await notionAPI.databases.query({
    database_id: id,
  });
  return results;
};

const getDatabaseList = async () => {
  const { results } = await notionAPI.search({
    filter: { property: "object", value: "database" },
  });
  return results;
};

export { queryDatabase, getDatabaseList };
