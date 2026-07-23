import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The four teaching sections, in display order. Kept as a const tuple so the
// schema can validate against it and other code can import the list. The
// "completing sentence" lead phrase for each ("The Doctrine of…") lives only in
// the Teachings index, so the stored data stays clean.
export const CATEGORIES = [
  'The Foundations of the Faith',
  'The Revealed Mysteries',
  'Prophecy & the End Time',
  "The Believer's Walk",
] as const;

const teachings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/teachings' }),
  schema: z.object({
    title: z.string(),
    // Short phrase that completes the section banner on the Teachings index
    // (e.g. "the Godhead" → "The Doctrine of the Godhead"). Falls back to
    // `title` when absent. The full `title` is still used for the doctrine
    // page <h1>, the category badge, and prev/next.
    indexTitle: z.string().optional(),
    category: z.enum(CATEGORIES),
    summary: z.string(),
    keyScriptures: z.array(z.string()).default([]),
    sermonReferences: z
      .array(
        z.object({
          title: z.string(),
          date: z.string().optional(), // ISO date, e.g. "1960-12-04"
          reference: z.string(), // tape number + paragraph, e.g. "60-1204M, para. 12"
        }),
      )
      .default([]),
    order: z.number().default(999),
    draft: z.boolean().default(false),
  }),
});

export const collections = { teachings };
