import queryDb, { TABLES } from "@/src/api/queryDb";
import ResourcesBox from "@/src/components/ResourcesBox";
import { Resource } from "@/src/types";
import Link from "next/link";

export const revalidate = 300;

export default async function Announcements() {
  const { results: resources } = await queryDb<Resource>(
    TABLES.resources,
    { and: [{ property: "Published", checkbox: { equals: true } }] },
    [{ property: "Priority", direction: "ascending" }],
    1000
  );

  return (
    <main className="container p-md-0 p-3 clearfix f4">
      <nav
        className="UnderlineNav UnderlineNav--right mb-5"
        style={{
          position: "sticky",
          top: "0px",
          background: "#fff",
          zIndex: 500,
        }}
      >
        <div className="UnderlineNav-actions">
          <div className="pagination">
            <Link
              className="previous_page"
              rel="next"
              href="/"
              aria-label="Go home"
            >
              Back to board
            </Link>
          </div>
        </div>
        <span className="Truncate">
          <a className="UnderlineNav-item" href="#Important-Documents">
            🔖 <span className="hide-sm">&nbsp;Documents</span>
          </a>
          <a className="UnderlineNav-item" href="#Resource">
            💭 <span className="hide-sm">&nbsp;Resource</span>
          </a>
          <a className="UnderlineNav-item" href="#Fun-Finds">
            ✨<span className="hide-sm">&nbsp;Fun Finds</span>
          </a>
        </span>
      </nav>

      <ResourcesBox resources={resources} showFilter />
    </main>
  );
}
