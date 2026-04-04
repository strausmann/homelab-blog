import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs: blog, meta: blogMeta } = defineDocs({
  dir: 'content/blog',
});

export default defineConfig();
