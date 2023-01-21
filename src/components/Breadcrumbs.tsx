import Link from "next/link";

export default function Breadcrumbs(props: {
  links: { url: string; label: string }[];
}) {
  return (
    <nav className="pl-2 mb-8 breadcrumbs" aria-label="Pagination">
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
        {props.links.map(({ url, label }) => (
          <>
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
          </>
        ))}
      </div>
    </nav>
  );
}
