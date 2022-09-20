export interface ProjectFrontmatter {
    title: string
    // Please not that the imageName must not includes the file extension
    // For the moment we will only be using .jpg file
    // See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    imageName: string
    publishDate: string
    githubRepoUrl: string
    peopleCounter?: number
    productionUrl?: string
    tags: string[]
    is42Project: boolean
}