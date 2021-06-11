import { NotionAPI } from "notion-client";

import { Client } from "@notionhq/client";

const notionAPI = new Client({
  auth: process.env.NOTION_SECRET,
});

const notionX = new NotionAPI({ authToken: process.env.NOTION_TOKEN });

export { notionAPI, notionX };
