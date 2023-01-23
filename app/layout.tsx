import "styles/root.css";
import "@primer/css/index.scss";
import Auth from "@/src/components/Auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Auth>
          {children}
          <footer className="pb-10"></footer>
        </Auth>
      </body>
    </html>
  );
}
