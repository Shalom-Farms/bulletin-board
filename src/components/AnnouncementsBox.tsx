import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Announcement } from "../types";

export default function AnnouncementsBox(props: { announcements: Announcement[], showViewAll?: boolean, next?: string, prev?: string }) {
    const { announcements, showViewAll, next, prev } = props;
    return <div className="Box">
    <div className="Box-header">
      <h2 className="h2">📢 Announcements</h2>
    </div>
    {announcements.map((announcement, i) => (
      <Link key={`announce-${i}`} href={`/announcements/${announcement.id}`} style={{ textDecoration: "none", color: "rgb(36,41,47)"}}>
        <div className="Box-row">
          <div className="f2">{announcement.icon?.emoji} { announcement.properties.Title.title[0].plain_text }</div>
          <div className="f4-light color-fg-subtle">{format(parseISO(announcement.properties.Date.date.start), 'PPP')}</div>
        </div>
      </Link>
    ))}
    {showViewAll && <div className="Box-footer text-right">
        <Link className="btn btn-secondary mr-1" href="/announcements">
            View All
        </Link>
    </div>}
  </div>
}