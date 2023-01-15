import { Block, RichText, BlockDetails, BlockTypes } from "../types"

const RichText = (props: RichText) => {
    const annotations = props.annotations
    let content = <>{props.text.content}</>

    if(annotations.bold) {
        content = <strong>{content}</strong>
    }

    if(annotations.italic) {
        content = <em>{content}</em>
    }

    if(annotations.underline) {
        content = <u>{content}</u>
    }

    if(annotations.strikethrough) {
        content = <s>{content}</s>
    }

    if(annotations.color !== 'default') {
        content = <span style={{ color: annotations.color }}>{content}</span>
    }

    if(props.href) {
        return <a href={props.href} target="_blank">{content}</a>
    }

    return content;
}

export const RichTexts = (props: { rich_text?: RichText[] }) => {
    return <>
        {props.rich_text?.map((text, i) => (
            <RichText key={`rich-text-${i}`} {...text} />
        ))}
    </>
}

const ColumnList = (props: { blocks: Block[]}) => {
    return <div className="container-lg clearfix"> 
        <div className="col-md-6 float-md-left pr-md-2"><Column blocks={props.blocks[0].children} /></div>
        <div className="col-md-6 float-md-left pl-md-2"><Column blocks={props.blocks[1].children} /></div>
    </div>
}

const Column = (props: { blocks?: Block[]}) => {
    return <>{props.blocks?.map((block, i) => (
        <BlockComponent key={`column-block-${block.id}`} block={block} />
    ))}</>
}

const Paragraph = (props: BlockDetails) => {
    return <p>
        <RichTexts rich_text={props.rich_text} />
    </p>
}

const Heading1 = (props: BlockDetails) => {
    return <h1 className="h1"><RichTexts rich_text={props.rich_text} /></h1>
}

const Heading2 = (props: BlockDetails) => {
    return <h2 className="h2"><RichTexts rich_text={props.rich_text} /></h2>
}

const Heading3 = (props: BlockDetails) => {
    return <h3 className="h3"><RichTexts rich_text={props.rich_text} /></h3>
}

const Callout = (props: BlockDetails) => {
    return <div className="flash my-3"><RichTexts rich_text={props.rich_text} /></div>
}

const Quote = (props: BlockDetails) => {
    return <blockquote style={{ borderWidth: "3px !important" }}className="my-2 pl-4 border-left text-italic color-border-default"><RichTexts rich_text={props.rich_text} /></blockquote>
}

const BulletedList = (props: { list_items: Block["list_items"] }) => {
    return <ul className="m-3">
        {props.list_items?.map((item,i) => (
            <li key={`bulleted-list-${new Date().toString()}-${i}`} className="mb-2"><RichTexts rich_text={item} /></li>
        ))}
    </ul>
 }

 const NumberedList = (props: { list_items: Block["list_items"] }) => {
    return <ol className="m-3">
        {props.list_items?.map((item, i) => (
            <li key={`numbered-list-${new Date().toString()}-${i}`} className="mb-2"><RichTexts rich_text={item} /></li>
        ))}
    </ol>
 }

 const Image = (props: BlockDetails) => {
    return <img style={{maxWidth: "100%", maxHeight: "75vh" }} src={props.file?.url || props.external?.url} />
 }

 const ComponentBlockTypeMap: { [key in BlockTypes]: Function } = {
    numbered_list_item: NumberedList,
    bulleted_list_item: BulletedList,
    paragraph: Paragraph,
    callout: Callout,
    heading_1: Heading1,
    heading_2: Heading2,
    heading_3: Heading3,
    column_list: ColumnList,
    quote: Quote,
    column: Column,
    image: Image
 }

export default function BlockComponent(props: { block: Block }) {
    const { block } = props
    const Component: Function = ComponentBlockTypeMap[props.block.type]

    if(!Component) return <></>

    return <Component {...block[block.type]} list_items={block.list_items} blocks={block.children} />
}