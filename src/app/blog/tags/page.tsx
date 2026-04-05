import Link from 'next/link';
import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags – Strausmann HomeLab Blog',
  description: 'Alle Themen und Kategorien im Strausmann HomeLab Blog.',
};

export default function TagsPage() {
  const posts = blogSource.getPages();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const sortedTags = [...tagCounts.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <main className="container max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← Zurück zum Blog
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-fd-foreground">Tags</h1>
      <p className="text-fd-muted-foreground mb-12">
        Alle Themen im Überblick ({sortedTags.length} Tags)
      </p>

      {sortedTags.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/blog/tags/${encodeURIComponent(tag)}`}
              className="flex items-center gap-2 px-4 py-2 border border-fd-border rounded-xl hover:bg-fd-accent transition-colors group"
            >
              <span className="font-medium group-hover:text-fd-primary transition-colors">
                #{tag}
              </span>
              <span className="text-xs text-fd-muted-foreground bg-fd-secondary px-2 py-0.5 rounded-full">
                {count}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-fd-muted-foreground">Noch keine Tags vorhanden.</p>
      )}
    </main>
  );
}
