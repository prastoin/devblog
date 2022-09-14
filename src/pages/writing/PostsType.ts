export interface PostFrontmatter {
    title: string
    publishDate: string
    name: string
    description: string
}

export interface PostPreviewInformation extends PostFrontmatter {
    url: string
}