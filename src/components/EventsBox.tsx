import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Event } from "../types";
import { RichTexts } from "./Block";

export default function EventsBox(props: {
  events: Event[];
  showViewAll?: boolean;
  next?: string;
  prev?: string;
}) {
  const { events, showViewAll, next, prev } = props;
  return (
    <div className="Box mt-5">
      <div className="Box-header clearfix">
        <h2 className="h2 float-left">🗓 Events</h2>
        {showViewAll && (
          <div className="float-right">
            <Link className="btn btn-secondary mr-1" href="/events">
              View All
            </Link>
          </div>
        )}
      </div>
      {events.map((event, i) => (
        <div className="Box-row" key={`event-${i}`}>
          <div className="f3">
            {event.icon?.emoji}{" "}
            <RichTexts rich_text={event.properties.Name.title} />
          </div>
          <div className="f4-light color-fg-subtle">
            <span className="f6 mr-2">{"🗓"}</span>
            {format(parseISO(event.properties.Date.date.start), "PPP")}
          </div>
          <div className="f4-light color-fg-subtle">
            <span className="f6 mr-2">{"⏰"}</span>
            {<RichTexts rich_text={event.properties.Time.rich_text} />}
          </div>
          <div className="f4-light color-fg-subtle">
            <span className="f6 mr-2">{"📍"}</span>
            <RichTexts rich_text={event.properties.Location.rich_text} />
          </div>
          <div className="f4-light mt-1">
            <RichTexts rich_text={event.properties.Description.rich_text} />
          </div>
        </div>
      ))}
      {(next || prev) && (
        <div className="Box-footer">
          <nav className="paginate-container" aria-label="Pagination">
            <div className="pagination">
              <Link
                className="previous_page"
                rel="prev"
                href={prev || "#"}
                aria-disabled={!prev}
                aria-label="Previous Page"
              >
                Previous
              </Link>
              <Link
                className="next_page"
                rel="next"
                href={next || "#"}
                aria-disabled={!next}
                aria-label="Next Page"
              >
                Next
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
