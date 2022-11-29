export interface ReadingPostFrontMatter {
  title: string;
  publishDate: string;
  name: string;
  description: string;
  tags: string[];
  urlToContent: string;
}

export interface ReadingPostPreviewInformation extends ReadingPostFrontMatter {
  url: string;
}

export type ReadingPostTag = "Git" | "Adonis" | "Node" | undefined;
