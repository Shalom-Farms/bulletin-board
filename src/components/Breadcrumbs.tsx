"use client";

import Link from "next/link";
import React, { useEffect } from "react";

export default function Breadcrumbs(props: {
  links: { url: string; label: string }[];
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <nav className="pl-2 mb-md-8 mb-2 breadcrumbs" aria-label="Pagination">
      <div className="d-flex flex-items-center">
        <Link
          className="p-2 color-fg-default hover-bg rounded-2"
          style={{ textDecoration: "none" }}
          href="/"
          aria-label="Go home"
        >
          🍃 Board
        </Link>
        <span className="color-fg-subtle f3 p-2" style={{ fontWeight: 100 }}>
          {"   /   "}
        </span>
        {props.links.map(({ url, label }, i) => (
          <React.Fragment key={`breadcrumb-${i}`}>
            <Link
              className="p-2 color-fg-default hover-bg rounded-2"
              style={{ textDecoration: "none" }}
              href={url}
              aria-label={label}
            >
              {label}
            </Link>
            <span
              className="color-fg-subtle f3 p-2"
              style={{ fontWeight: 100 }}
            >
              {"   /   "}
            </span>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
