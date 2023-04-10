// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define a schema for each collection you'd like to validate.
const writingCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      publishDate: z.string(),
      description: z.string(),
    })
    .strict(),
});
const projectCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      imageName: z.string(),
      publishDate: z.string(),
      githubRepoUrl: z.string().url(),
      peopleCounter: z.number(),
      tags: z.string().array(),
      productionUrl: z.string().url().optional(),
      is42Project: z.boolean().optional(),
    })
    .strict(),
});
const noteCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      publishDate: z.string(),
    })
    .strict(),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  writings: writingCollection,
  projects: projectCollection,
  notes: noteCollection,
};
