import Link from "next/link";
import { Resource } from "../types";
import { RichTexts } from "./Block";
import Labels from "./Labels";

const ICONS: { [key: string]: string } = {
  "Important Documents": "🔖",
  "Fun Finds": "✨",
  Resource: "💭",
};

const sortOrder: { [key: string]: number } = {
  "Important Documents": 0,
  "Fun Finds": 2,
  Resource: 1,
};

export default function ResourcesBox(props: {
  resources: Resource[];
  showViewAll?: boolean;
}) {
  const { resources, showViewAll } = props;

  const groupedResources = resources.reduce(
    (result: { [key: string]: Resource[] }, resource: Resource) => {
      const type = resource.properties.Type.select.name;
      if (!result[type]) {
        result[type] = [resource];
      } else {
        result[type].push(resource);
      }

      return result;
    },
    {}
  );

  return (
    <nav className="SideNav border mt-5 rounded-2">
      <div className="SideNav-item">
        <h2 className="h2">ℹ️ Resources</h2>
      </div>
      {Object.keys(groupedResources)
        .sort((a, b) => sortOrder[a] - sortOrder[b])
        .map((type, i) => (
          <>
            <div
              key={`resource-${i}`}
              id={type.replace(" ", "-")}
              className="SideNav-item color-bg-default h4"
            >
              {ICONS[type]} {type}
            </div>
            <nav className="SideNav color-bg-default border-top fade-out">
              <div
                className="py-4"
                style={
                  props.showViewAll
                    ? { maxHeight: "300px", overflowY: "scroll" }
                    : undefined
                }
              >
                {groupedResources[type].map((resource, j) => (
                  <Link
                    key={`resource-${resource.id}`}
                    href={`/resources/${resource.id}`}
                    className="SideNav-subItem color-fg-default hover-bg pl-md-6 pl-3 pr-3 pr-md-6 py-2"
                    style={{ textDecoration: "none", color: "rgb(36,41,47)" }}
                  >
                    <div className="text-semibold">
                      <RichTexts rich_text={resource.properties.Name.title} />
                    </div>
                    <div className="color-fg-subtle">
                      <RichTexts
                        rich_text={resource.properties.Description.rich_text}
                      />
                    </div>
                    <Labels labels={resource.properties.Tags.multi_select} />
                  </Link>
                ))}{" "}
              </div>
            </nav>
          </>
        ))}

      {showViewAll && (
        <div className="SideNav-item text-right color-bg-default">
          <Link className="btn btn-secondary mr-1" href="/resources">
            View All
          </Link>
        </div>
      )}
    </nav>
  );
}
