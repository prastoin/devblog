// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
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
      title: z.string().optional(),
      publishDate: z.string().optional(),
    })
    .strict(),
});

const readingCollection = defineCollection({
  schema: z
    .object({
      articleLink: z.string().url(),
      description: z.string(),
      articleDate: z.string(),
      date: z.string(),
      tags: z.string().array(),
      author: z.string(),
      title: z.string()
    }).strict()
})
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  writings: writingCollection,
  projects: projectCollection,
  notes: noteCollection,
  reading: readingCollection
};
