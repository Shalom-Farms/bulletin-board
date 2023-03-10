import Blocks from "@/src/components/Blocks";
import getPageBlocks from "@/src/api/getPageBlocks";
import { RichTexts } from "@/src/components/Block";
import { format, parseISO } from "date-fns";
import { Announcement as AnnouncementType, Block } from "@/src/types";
import { Suspense } from "react";
import getPage from "@/src/api/getPage";
import LoadingContent from "@/src/components/LoadingContent";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import Labels from "@/src/components/Labels";

export const revalidate = 30;

const TitleContent = async (props: { promise: Promise<AnnouncementType> }) => {
  const page = await props.promise;

  if (!page) return null;

  return (
    <div className="mb-6">
      {page.icon?.emoji && (
        <div className="h3-mktg mb-2">{page.icon.emoji}</div>
      )}
      <h1 className="h3-mktg">
        <RichTexts rich_text={page.properties.Title.title} />
      </h1>
      <div className="f3">
        {format(parseISO(page.properties.Date.date.start), "PPP")}
      </div>
      <Labels labels={page.properties.Tags.multi_select} />
    </div>
  );
};

const BlockContent = async (props: { promise: Promise<Block[]> }) => {
  const blocks = await props.promise;

  if (!blocks) return null;

  return <Blocks blocks={blocks} />;
};

export default async function Announcement(props: { params: { id: string } }) {
  // @ts-ignore
  const blocks: Promise<Block[]> = getPageBlocks(props.params.id);
  // @ts-ignore
  const page: Promise<AnnouncementType> = getPage(props.params.id);

  return (
    <>
      <Breadcrumbs
        links={[{ url: "/announcements", label: "📢 Announcements" }]}
      />
      <main className="container p-md-0 p-3 clearfix f4">
        <Suspense fallback={<LoadingContent count={3} />}>
          {/* @ts-ignore */}
          <TitleContent promise={page} />
        </Suspense>
        <Suspense fallback={<LoadingContent count={18} />}>
          {/* @ts-ignore */}
          <BlockContent promise={blocks} />
        </Suspense>
      </main>
    </>
  );
}
