import Link from "next/link";
import { Resource } from "../types";
import { RichTexts } from "./Block";
import Labels from "./Labels";

export default function ResourcesBox(props: {
  resources: Resource[];
  showViewAll?: boolean;
}) {
  const { resources, showViewAll } = props;
  return (
    <div className="Box mt-5">
      <div className="Box-header">
        <h2 className="h2">ℹ️ Resources</h2>
      </div>
      {resources.map((resource) => (
        <Link
          key={`resource-${resource.id}`}
          href={`/resources/${resource.id}`}
          style={{ textDecoration: "none", color: "rgb(36,41,47)" }}
        >
          <div className="Box-row">
            <div className="f2">
              {resource.icon?.emoji}{" "}
              {resource.properties.Name.title[0].plain_text}
            </div>
            <div className="f4-light color-fg-subtle">
              {<RichTexts rich_text={resource.properties.Description.rich_text}/>}
            </div>
            {!!resource.properties.Tags.multi_select.length && (
              <div className="mt-1">
                <Labels labels={resource.properties.Tags.multi_select} />
              </div>
            )}
          </div>
        </Link>
      ))}
      {showViewAll && (
        <div className="Box-footer text-right">
          <Link className="btn btn-secondary mr-1" href="/resources">
            View All
          </Link>
        </div>
      )}
    </div>
  );
}
