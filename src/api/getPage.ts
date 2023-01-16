import notion from "./notion";

export default async function getPage(pageId: string) {
  if (pageId.length < 36) return null;

  const page = await notion.pages.retrieve({
    page_id: pageId,
  });

  return page;
}
