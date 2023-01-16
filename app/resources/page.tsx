import queryDb, { TABLES } from "@/src/api/queryDb";
import ResourcesBox from "@/src/components/ResourcesBox";
import { Resource } from "@/src/types";
import { formatISO} from "date-fns";
import Link from "next/link";

export const revalidate = 300;

export default async function Announcements(props: { searchParams?: { start?: string, prev?: string } }) {
    const pageSize = 25
    const start = props.searchParams?.start
    const prev = props.searchParams?.prev
    
    const { results: resources } = await queryDb<Resource>(
        TABLES.resources,
        { and: [
           { property: "Published", checkbox: { equals: true } },
        ]},
        [{ property: "Priority", direction: "ascending" }],
        100
      )

    return <main className="container p-md-0 p-3 clearfix f4">
        <nav className="UnderlineNav UnderlineNav--right mb-5" style={{ position: "sticky", top: "0px", background: "#fff", zIndex: 500 }}>
        <div className="UnderlineNav-actions">
    <div className="pagination">
      <Link className="previous_page" rel="next" href="/" aria-label="Go home">Back to board</Link>
    </div>
  </div>
          <a className="UnderlineNav-item" href="#Important-Documents">🔖 Documents</a>
          <a className="UnderlineNav-item" href="#Resource">💭 Resource</a>
          <a className="UnderlineNav-item" href="#Fun-Finds">✨ Fun Finds</a>
        </nav>
        <ResourcesBox resources={resources} 
        />
    </main>
}