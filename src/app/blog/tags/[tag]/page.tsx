import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allPosts = blogSource.getPages();
  const posts = allPosts
    .filter((p) => p.data.tags.includes(decodedTag))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  if (posts.length === 0) notFound();

  return (
    <main className="container max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8 flex gap-4">
        <Link
          href="/blog"
          className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← Blog
        </Link>
        <span className="text-sm text-fd-muted-foreground">/</span>
        <Link
          href="/blog/tags"
          className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          Tags
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2 text-fd-foreground">
        #{decodedTag}
      </h1>
      <p className="text-fd-muted-foreground mb-12">
        {posts.length} {posts.length === 1 ? 'Beitrag' : 'Beiträge'}
      </p>

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
              <p className="text-fd-muted-foreground text-sm">{post.data.description}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const posts = blogSource.getPages();
  const tags = new Set(posts.flatMap((p) => p.data.tags));
  return [...tags].map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag} – Strausmann HomeLab Blog`,
    description: `Alle Beiträge zum Thema "${decodedTag}" im Strausmann HomeLab Blog.`,
  };
}
