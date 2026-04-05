import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      nav={{ title: 'Strausmann HomeLab' }}
      links={[{ text: 'Blog', url: '/blog' }]}
      githubUrl="https://github.com/strausmann/homelab-blog"
    >
      {children}
    </HomeLayout>
  );
}
