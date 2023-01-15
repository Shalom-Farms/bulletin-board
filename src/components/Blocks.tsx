import { Block as BlockType } from "../types";
import Block from "./Block";

export default function Blocks(props: { blocks: BlockType[] }) {
    return <>{props.blocks.map(block => (
        <Block block={block} />
    ))}</>
}