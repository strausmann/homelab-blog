import Link from 'next/link';
import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog – Strausmann HomeLab',
  description: 'Einblicke in das HomeLab-Projekt: Proxmox, Docker, Netzwerk, Microsoft 365 und mehr.',
  openGraph: {
    title: 'Blog – Strausmann HomeLab',
    description: 'Einblicke in das HomeLab-Projekt: Proxmox, Docker, Netzwerk, Microsoft 365 und mehr.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = blogSource
    .getPages()
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const allTags = Array.from(new Set(posts.flatMap((p) => p.data.tags))).sort();

  return (
    <main className="container max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-fd-foreground">
        Strausmann HomeLab Blog
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-6">
        Einblicke in das HomeLab-Projekt: Proxmox, Docker, Netzwerk, Microsoft 365 und mehr.
      </p>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${encodeURIComponent(tag)}`}
              className="px-3 py-1 text-xs font-medium rounded-full bg-fd-accent text-fd-accent-foreground hover:bg-fd-primary hover:text-fd-primary-foreground transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="block p-6 border border-fd-border rounded-xl hover:bg-fd-accent transition-colors group"
          >
            <div className="flex items-center gap-3 text-xs text-fd-muted-foreground mb-3">
              <time dateTime={String(post.data.date)}>
                {new Date(post.data.date).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              {post.data.author && (
                <>
                  <span>·</span>
                  <span>{post.data.author}</span>
                </>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-2 group-hover:text-fd-primary transition-colors">
              {post.data.title}
            </h2>

            {post.data.description && (
              <p className="text-fd-muted-foreground text-sm mb-3">
                {post.data.description}
              </p>
            )}

            {post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-fd-secondary text-fd-secondary-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="text-fd-muted-foreground">Noch keine Beiträge vorhanden.</p>
        )}
      </div>

      <footer className="mt-24 pt-8 border-t border-fd-border text-center text-fd-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Strausmann HomeLab GmbH · Maschen, Seevetal</p>
        <p className="mt-2">
          <Link href="/blog/rss.xml" className="hover:text-fd-foreground transition-colors">
            RSS Feed
          </Link>
        </p>
      </footer>
    </main>
  );
}
