import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blogSource } from '@/lib/source';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← Zurück zum Blog
        </Link>
      </div>

      <header className="mb-8 pb-8 border-b border-fd-border">
        <div className="flex items-center gap-3 text-sm text-fd-muted-foreground mb-4">
          <time dateTime={String(page.data.date)}>
            {new Date(page.data.date).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          {page.data.author && (
            <>
              <span>·</span>
              <span>{page.data.author}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl font-bold text-fd-foreground mb-4">
          {page.data.title}
        </h1>

        {page.data.description && (
          <p className="text-lg text-fd-muted-foreground">
            {page.data.description}
          </p>
        )}

        {page.data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {page.data.tags.map((tag) => (
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
      </header>

      {page.data.toc.length > 0 && (
        <div className="mb-8 p-4 border border-fd-border rounded-lg bg-fd-secondary">
          <p className="text-sm font-semibold mb-3 text-fd-foreground">Inhaltsverzeichnis</p>
          <InlineTOC items={page.data.toc} />
        </div>
      )}

      <article className="prose prose-fd min-w-0 max-w-none">
        <MDX components={defaultMdxComponents} />
      </article>

      <footer className="mt-12 pt-8 border-t border-fd-border">
        <Link
          href="/blog"
          className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← Zurück zum Blog
        </Link>
      </footer>
    </div>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://blog.strausmann.cloud';

  return {
    title: `${page.data.title} – Strausmann HomeLab`,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      publishedTime: new Date(page.data.date).toISOString(),
      authors: page.data.author ? [page.data.author] : undefined,
      tags: page.data.tags,
      url: `${baseUrl}/blog/${slug}`,
    },
    authors: page.data.author ? [{ name: page.data.author }] : undefined,
  };
}
