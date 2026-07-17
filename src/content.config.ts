import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The six doctrine categories (see plan §4). Kept as a const tuple so the
// schema can validate against it and other code can import the list.
export const CATEGORIES = [
  'The Godhead & the Word',
  'Salvation & the New Birth',
  'The Fall & the Enemy',
  'The Church & Its History',
  'Prophecy & the End Time',
  'Christian Living & Ordinances',
] as const;

const teachings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/teachings' }),
  schema: z.object({
    title: z.string(),
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
