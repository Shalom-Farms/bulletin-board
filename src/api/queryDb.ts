import { Type } from "typescript"
import notion from "./notion"

export const TABLES = {
    events: "EVENTS",
    announcements: "ANNOUNCEMENTS"
}

const DATABASE_IDS: { [key: string]: string } = {
    "EVENTS": process.env.NOTION_EVENTS_ID || "",
    "ANNOUNCEMENTS": process.env.NOTION_ANNOUNCEMENTS_ID || "",
}

export default async function queryDb<T>(table: typeof TABLES[keyof typeof TABLES], filter?: {}, sorts?: { property: string, direction: string }[], page_size?: number, start_cursor?: string): Promise<{
    results: T[],
    hasMore: boolean,
    nextCursor: string | null
}> {
    const database_id = DATABASE_IDS[table]
    const res = await notion.databases.query({
        database_id,
        // @ts-ignore
        filter,
        // @ts-ignore
        sorts,
        start_cursor,
        page_size
    })

    
    return { 
        // @ts-ignore   
        results: res.results, 
        hasMore: res.has_more,
        nextCursor: res.next_cursor
    }
}