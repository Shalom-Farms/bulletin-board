"use client";

import Link from "next/link";
import { useState } from "react";
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

const Filters = (props: {
  onFilter: Function;
  labels: { color: string; name: string }[];
  filterObj?: { color: string; name: string };
}) => {
  const { labels, filterObj, onFilter } = props;

  const [open, setOpen] = useState<boolean>(false);

  const ClearFilter = (props: { className: string }) => (
    <div className={`d-inline-block ${props.className}`}>
      <a
        onClick={() => onFilter(null)}
        className="color-fg-subtle text-light"
        style={{ textDecoration: "none", cursor: "pointer" }}
      >
        Clear filter
      </a>
    </div>
  );

  return (
    <>
      {filterObj && <ClearFilter className="hide-sm mr-3" />}
      <details
        className="dropdown details-reset details-overlay d-inline-block mt-3 mt-sm-0"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        open={open}
      >
        <summary className="btn" aria-haspopup="true">
          {filterObj && (
            <span
              className={`Label ${
                filterObj.color ? `Label--${filterObj.color}` : ""
              }`}
            >
              {filterObj.name}
            </span>
          )}
          {!filterObj && "Filter"}
          <div className="dropdown-caret"></div>
        </summary>

        <ul
          className="dropdown-menu dropdown-menu-se dropdown-menu-sm-sw"
          style={{ maxHeight: "200px", overflowY: "scroll" }}
        >
          {labels.map((label, i) => (
            <li key={`filter-label-${i}`} style={{ cursor: "pointer" }}>
              <a
                onClick={(e) => {
                  props.onFilter(label);
                }}
                className="dropdown-item"
              >
                <span
                  className={`Label ${
                    label.color ? `Label--${label.color}` : ""
                  }`}
                >
                  {label.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </details>
      {filterObj && <ClearFilter className="hide-lg ml-3" />}
    </>
  );
};

export default function ResourcesBox(props: {
  resources: Resource[];
  showViewAll?: boolean;
  showFilter?: boolean;
}) {
  const { resources, showViewAll } = props;

  const [filter, setFilter] = useState<{
    color: string;
    name: string;
  } | null>();

  const uniqueLabels = Object.values(
    resources.reduce(
      (
        result: { [key: string]: { color: string; name: string } },
        resource: Resource
      ) => {
        resource.properties.Tags.multi_select.forEach((select) => {
          result[select.name] = { name: select.name, color: select.color };
        });

        return result;
      },
      {}
    )
  );

  let filteredResources = resources;
  const filterObj = uniqueLabels.find((label) => label.name === filter?.name);

  if (filter) {
    filteredResources = resources.filter((resource) => {
      return resource.properties.Tags.multi_select.some(
        (select) => select.name === filter.name
      );
    });
  }

  const groupedResources = filteredResources.reduce(
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
    <>
      <nav className="SideNav border mt-5 rounded-2">
        <div className="SideNav-item clearfix">
          <h2
            className={`h2 ${
              props.showFilter ? "float-sm-left" : "float-left"
            }`}
          >
            ℹ️ Resources
          </h2>
          {showViewAll && !props.showFilter && (
            <div className="float-right">
              <Link className="btn btn-secondary mr-1" href="/resources">
                View All
              </Link>
            </div>
          )}
          {props.showFilter && (
            <div className="float-sm-right border-top mt-3 mt-sm-0 border-sm-0">
              <Filters
                labels={uniqueLabels}
                onFilter={setFilter}
                filterObj={filterObj}
              />
            </div>
          )}
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
                        {resource.icon?.emoji}{" "}
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
      </nav>
    </>
  );
}
