type DBRow = {
  id: string;
  icon: {
    emoji: string;
    type: string;
  };
};

type DBCol = {
  type: string;
  id: string;
};

type TitleCol = DBCol & {
  title: RichText[];
};

type RichTextCol = DBCol & {
  rich_text: RichText[];
};

type CheckboxCol = DBCol & {
  checkbox: boolean;
};

type DateCol = DBCol & {
  date: {
    start: string;
    end: string;
    timezone: string;
  };
};

type NumberCol = DBCol & {
  number: number;
};

export type SelectCol = DBCol & {
  select: {
    id: string;
    name: string;
    color: string;
  };
};

type MultiSelectCol = DBCol & {
  multi_select: SelectCol["select"][];
};

type UrlCol = DBCol & {
  url: string;
};

export type Announcement = DBRow & {
  properties: {
    Title: TitleCol;
    Date: DateCol;
    Published: CheckboxCol;
    Tags: MultiSelectCol;
  };
};

export type Resource = DBRow & {
  properties: {
    Name: TitleCol;
    Type: SelectCol;
    Priority: NumberCol;
    Published: CheckboxCol;
    Tags: MultiSelectCol;
    Description: RichTextCol;
  };
};

export type ResourceLink = DBRow & {
  properties: {
    Name: TitleCol;
    Url: UrlCol;
    Priority: NumberCol;
    Description: RichTextCol;
    Tags: MultiSelectCol;
  };
};

export type Event = DBRow & {
  properties: {
    Date: DateCol;
    Name: TitleCol;
    Description: RichTextCol;
    Location: RichTextCol;
    Published: CheckboxCol;
    Time: RichTextCol;
  };
};

export type RichText = {
  type: "text";
  text: {
    content: string;
    link: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string;
};

export type BlockTypes =
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "paragraph"
  | "column_list"
  | "quote"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "callout"
  | "column"
  | "image"
  | "child_database";

export type BlockDetails = {
  rich_text?: RichText[];
  text?: RichText[];
  icon?: {
    type: "emoji";
    emoji: string;
  };
  color: string;
  caption?: string[];
  type?: string;
  external?: {
    url: string;
  };
  file?: {
    url: string;
  };
  title?: string;
};

type BlockTypeDetails = {
  [key in BlockTypes]: BlockDetails;
};

export type Block = BlockTypeDetails & {
  object: "block";
  id: string;
  has_children: boolean;
  archived: boolean;
  type: BlockTypes;
  children?: Block[];
  list_items?: RichText[][];
};
