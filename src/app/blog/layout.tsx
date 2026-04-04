import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { blogSource } from '@/lib/source';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={blogSource.pageTree}
      nav={{ title: 'Strausmann HomeLab' }}
      links={[{ text: 'Blog', url: '/blog' }]}
      githubUrl="https://github.com/strausmann/homelab-blog"
      sidebar={{ defaultOpenLevel: 0 }}
    >
      {children}
    </DocsLayout>
  );
}
