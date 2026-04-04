import Link from 'next/link';
import { blogSource } from '@/lib/source';

export default function HomePage() {
  const posts = blogSource.getPages();

  return (
    <main className="container max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-fd-foreground">
        Strausmann HomeLab Blog
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-12">
        Einblicke in das HomeLab-Projekt: Proxmox, Docker, Netzwerk, Microsoft 365 und mehr.
      </p>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="block p-6 border border-fd-border rounded-xl hover:bg-fd-accent transition-colors group"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-fd-primary transition-colors">
              {post.data.title}
            </h2>
            {post.data.description && (
              <p className="text-fd-muted-foreground text-sm">
                {post.data.description}
              </p>
            )}
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="text-fd-muted-foreground">Noch keine Beiträge vorhanden.</p>
        )}
      </div>

      <footer className="mt-24 pt-8 border-t border-fd-border text-center text-fd-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Strausmann HomeLab GmbH · Maschen, Seevetal</p>
      </footer>
    </main>
  );
}
