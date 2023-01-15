import Link from "next/link";

export default function({ children }: {
    children: React.ReactNode;
  }) {
    return <><nav className="container" aria-label="Pagination">
    <div className="pagination">
      <Link className="previous_page" rel="next" href="/" aria-label="Go home">Back to board</Link>
    </div>
  </nav>
  {children}
  </>
}