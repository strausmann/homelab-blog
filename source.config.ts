import { defineCollections, frontmatterSchema, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    date: z.string().date().or(z.date()),
    author: z.string().default('Stefan Strausmann'),
    tags: z.array(z.string()).default([]),
  }),
});

export default defineConfig();
