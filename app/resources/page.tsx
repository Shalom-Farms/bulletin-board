import queryDb, { TABLES } from "@/src/api/queryDb";
import ResourcesBox from "@/src/components/ResourcesBox";
import { Resource } from "@/src/types";
import Breadcrumbs from "@/src/components/Breadcrumbs";

export const revalidate = 0;

export default async function Resources() {
  const { results: resources } = await queryDb<Resource>(
    TABLES.resources,
    { and: [{ property: "Published", checkbox: { equals: true } }] },
    [{ property: "Priority", direction: "ascending" }],
    1000
  );

  return (
    <>
      <Breadcrumbs links={[]} />
      <main className="container p-md-0 p-3 clearfix f4">
        <ResourcesBox resources={resources} showFilter />
      </main>
    </>
  );
}
