import { Type } from "typescript";
import notion from "./notion";

export const TABLES = {
  events: "EVENTS",
  announcements: "ANNOUNCEMENTS",
  resources: "RESOURCES",
};

const DATABASE_IDS: { [key: string]: string } = {
  EVENTS: process.env.NOTION_EVENTS_ID || "",
  ANNOUNCEMENTS: process.env.NOTION_ANNOUNCEMENTS_ID || "",
  RESOURCES: process.env.NOTION_RESOURCES_ID || "",
};

export default async function queryDb<T>(
  table: (typeof TABLES)[keyof typeof TABLES],
  filter?: {},
  sorts?: { property: string; direction: string }[],
  page_size?: number,
  start_cursor?: string
): Promise<{
  results: T[];
  hasMore: boolean | undefined;
  nextCursor: string | null | undefined;
}> {
  const database_id = DATABASE_IDS[table];

  let hasNext = true;
  let res;
  let results: T[] = [];

  while (hasNext) {
    res = await notion.databases.query({
      database_id,
      // @ts-ignore
      filter,
      // @ts-ignore
      sorts,
      start_cursor,
      page_size,
    });

    if (page_size && page_size > 100) {
      hasNext = res.has_more;
    } else {
      hasNext = false;
    }

    // @ts-ignore
    results = results.concat(res.results);
  }

  return {
    // @ts-ignore
    results,
    hasMore: res?.has_more,
    nextCursor: res?.next_cursor,
  };
}
