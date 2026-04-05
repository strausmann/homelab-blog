import { Feed } from 'feed';
import { blogSource } from '@/lib/source';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://blog.strausmann.cloud';

export function GET() {
  const feed = new Feed({
    title: 'Strausmann HomeLab Blog',
    description:
      'Einblicke in das HomeLab-Projekt: Proxmox, Docker, Netzwerk, Microsoft 365 und mehr.',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'de',
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Strausmann HomeLab GmbH`,
    feedLinks: {
      rss2: `${baseUrl}/blog/rss.xml`,
    },
  });

  const posts = blogSource
    .getPages()
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  for (const post of posts) {
    feed.addItem({
      id: `${baseUrl}${post.url}`,
      title: post.data.title,
      description: post.data.description ?? '',
      link: `${baseUrl}${post.url}`,
      date: new Date(post.data.date),
      author: post.data.author
        ? [{ name: post.data.author }]
        : [{ name: 'Strausmann HomeLab' }],
      category: post.data.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
