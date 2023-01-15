import queryDb, { TABLES } from "@/src/api/queryDb";
import EventsBox from "@/src/components/EventsBox";
import { Event } from "@/src/types";
import { formatISO} from "date-fns";

export const revalidate = 300;

export default async function Announcements(props: { searchParams?: { start?: string, prev?: string } }) {
    const pageSize = 25
    const start = props.searchParams?.start
    const prev = props.searchParams?.prev
    
    const { results: events, hasMore, nextCursor } = await queryDb<Event>(
        TABLES.events,
        { and: [
            { property: "Published", checkbox: { equals: true } },
            { property: "Date", date: { on_or_after: formatISO(new Date(), { representation: 'date' }) } }
        ]},
        [{ property: "Date", direction: "ascending" }],
        pageSize,
        start || undefined
    
    )

    return <main className="container p-md-0 p-3 clearfix f4">
        <EventsBox events={events} 
            next={hasMore ? `/events/?start=${nextCursor}` + (`&prev=${encodeURIComponent(`/events/` + (start ? `?start=${start}` : "") + (prev ? `&prev=${prev}` : ""))}`) : undefined }
            prev={prev}
        />
    </main>
}