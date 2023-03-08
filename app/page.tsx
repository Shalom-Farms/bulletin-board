import { Announcement, Event, Resource } from "@/src/types";
import queryDb, { TABLES } from "@/src/api/queryDb";
import AnnouncementsBox from "@/src/components/AnnouncementsBox";
import EventsBox from "@/src/components/EventsBox";
import { formatISO } from "date-fns";
import ResourcesBox from "@/src/components/ResourcesBox";

export const revalidate = 30;

export default async function Home() {
  const { results: announcements, hasMore: hasMoreAnnouncements } =
    await queryDb<Announcement>(
      TABLES.announcements,
      { property: "Published", checkbox: { equals: true } },
      [{ property: "Date", direction: "descending" }],
      5
    );

  const { results: events, hasMore: hasMoreEvents } = await queryDb<Event>(
    TABLES.events,
    {
      and: [
        { property: "Published", checkbox: { equals: true } },
        {
          property: "Date",
          date: {
            on_or_after: formatISO(new Date(), { representation: "date" }),
          },
        },
      ],
    },
    [{ property: "Date", direction: "ascending" }],
    3
  );

  const { results: resources, hasMore: hasMoreResources } =
    await queryDb<Resource>(
      TABLES.resources,
      { and: [{ property: "Published", checkbox: { equals: true } }] },
      [{ property: "Priority", direction: "ascending" }],
      100
    );

  return (
    <main className="container pt-3 px-md-0 px-3">
      <nav
        className="UnderlineNav UnderlineNav--right mb-5"
        style={{
          position: "sticky",
          top: "0px",
          background: "#fff",
          zIndex: 500,
        }}
      >
        <a className="UnderlineNav-item" href="#announcements">
          📢 Announcements
        </a>
        <a className="UnderlineNav-item" href="#events">
          🗓 Events
        </a>
        <a className="UnderlineNav-item" href="#resources">
          ℹ️ Resources
        </a>
      </nav>
      <div id="announcements">
        <AnnouncementsBox
          announcements={announcements}
          showViewAll={hasMoreAnnouncements}
        />
      </div>
      <div id="events" className="pt-5">
        <EventsBox events={events} showViewAll={hasMoreEvents} />
      </div>
      <div id="resources" className="pt-5">
        <ResourcesBox resources={resources} showViewAll={true} />
      </div>
    </main>
  );
}
