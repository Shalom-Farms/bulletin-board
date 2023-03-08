import getPage from "@/src/api/getPage";
import getPageBlocks from "@/src/api/getPageBlocks";
import { RichTexts } from "@/src/components/Block";
import Blocks from "@/src/components/Blocks";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import LoadingContent from "@/src/components/LoadingContent";
import { Block, Resource as ResourceType } from "@/src/types";
import { Suspense } from "react";

export const revalidate = 30;

const TitleContent = async (props: { promise: Promise<ResourceType> }) => {
  const page = await props.promise;

  if (!page) return null;

  return (
    <div className="my-6">
      {page.icon?.emoji && (
        <div className="h3-mktg mb-2">{page.icon.emoji}</div>
      )}
      <h1 className="h3-mktg">
        <RichTexts rich_text={page.properties.Name.title} />
      </h1>
      <p className="f4-light color-fg-subtle mt-2">
        <RichTexts rich_text={page.properties.Description.rich_text} />
      </p>
    </div>
  );
};

const BlockContent = async (props: { promise: Promise<Block[]> }) => {
  const blocks = await props.promise;
  if (!blocks) return null;

  return <Blocks blocks={blocks} />;
};

export default async function Resource(props: { params: { id: string } }) {
  // @ts-ignore
  const blocks: Promise<Block[]> = getPageBlocks(props.params.id);
  // @ts-ignore
  const page: Promise<ResourceType> = getPage(props.params.id);

  return (
    <>
      <Breadcrumbs links={[{ url: "/resources", label: "ℹ️ Resources" }]} />
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
