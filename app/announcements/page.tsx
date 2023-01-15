import queryDb, { TABLES } from "@/src/api/queryDb";
import AnnouncementsBox from "@/src/components/AnnouncementsBox";
import { Announcement } from "@/src/types";

export const revalidate = 3600;

export default async function Announcements(props: { searchParams: { start?: string, prev?: string } }) {
    const pageSize = 25
    const { start, prev } = props.searchParams

    const { results: announcements, nextCursor, hasMore } = await queryDb<Announcement>(
        TABLES.announcements,
        { property: "Published", checkbox: { equals: true }},
        [{ property: "Date", direction: "descending" }],
        pageSize,
        start || undefined
    )

    return <main className="container p-md-0 p-3 clearfix f4">
        <AnnouncementsBox announcements={announcements} 
            next={hasMore ? `/events/?start=${nextCursor}` + (`&prev=${encodeURIComponent(`/events/` + (start ? `?start=${start}` : "") + (prev ? `&prev=${prev}` : ""))}`) : undefined }
            prev={prev}
        />
    </main>
}