import { Announcement, Event } from '@/src/types'
import queryDb, { TABLES } from '@/src/api/queryDb';
import AnnouncementsBox from '@/src/components/AnnouncementsBox';
import EventsBox from '@/src/components/EventsBox';
import { formatISO } from 'date-fns';

export const revalidate = 300;

export default async function Home() {
  const { results: announcements, hasMore: hasMoreAnnouncements } = await queryDb<Announcement>(
    TABLES.announcements,
    { property: "Published", checkbox: { equals: true }},
    [{ property: "Date", direction: "descending" }],
    5 
  )

  const { results: events, hasMore: hasMoreEvents } = await queryDb<Event>(
    TABLES.events,
    { and: [
       { property: "Published", checkbox: { equals: true } },
       { property: "Date", date: { on_or_after: formatISO(new Date(), { representation: 'date' }) } }
    ]},
    [{ property: "Date", direction: "ascending" }],
    3
  )

  return (
    <>
      <main className="container p-md-0 p-3 clearfix">
        <AnnouncementsBox announcements={announcements} showViewAll={hasMoreAnnouncements} />
        <EventsBox events={events} showViewAll={hasMoreEvents} />        
      </main>
    </>
  )
}
