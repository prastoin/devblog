// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define a schema for each collection you'd like to validate.
const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    description: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postCollection,
};
