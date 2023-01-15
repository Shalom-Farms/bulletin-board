import notion from "./notion"
import { Block as BlockType } from '../types'

const listBlockChildren = async (blockId: string, start_cursor?: string) => {
    return await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
        start_cursor
    })
}

const getChildren = async (blocks: BlockType[] ) => {
    for(let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if(block.has_children) {
            const children = await listBlockChildren(block.id)
            // @ts-ignore
            block.children = await getChildren(children.results)
        }
    }

    return blocks;
}

const mergeLists = (blocks: BlockType[]) => {
    const updatedBlocks = [];
    let listBlock = null;

    for(let i = 0; i < blocks.length; i++) {
        const block = blocks[i]
        if(block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
            if(!listBlock) {
                listBlock = block
                // @ts-ignore
                listBlock.list_items = [block[block.type].rich_text]
            } else if (listBlock.type !== block.type) {
                updatedBlocks.push(listBlock)
                listBlock = block
                // @ts-ignore
                listBlock.list_items = [block[block.type].rich_text]
            } else {
                // @ts-ignore
                listBlock.list_items.push(block[block.type].rich_text)
            }
        } else if (listBlock) {
            updatedBlocks.push(listBlock)
            listBlock = null
            updatedBlocks.push(block)
        } else {
            updatedBlocks.push(block)
        }        
    }

    if(listBlock) updatedBlocks.push(listBlock)

    return updatedBlocks;

}

export default async function getPageBlocks(pageId: string) {

    let hasNext = true
    let cursor
    let blocks: BlockType[] = []

    while(hasNext) {
        // @ts-ignore
        const pageContent = await listBlockChildren(pageId, cursor);
        blocks = blocks.concat(pageContent.results)
        hasNext = pageContent.has_more
        cursor = pageContent.next_cursor
    }

    blocks = await getChildren(blocks)
    blocks = mergeLists(blocks)

    return blocks
  }