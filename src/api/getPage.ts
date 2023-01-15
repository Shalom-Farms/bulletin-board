import notion from "./notion";

export default async function getPage(pageId: string) {
    const page = await notion.pages.retrieve({
        page_id: pageId
    })

    return page
}