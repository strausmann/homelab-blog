import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://blog.strausmann.cloud';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Strausmann HomeLab Blog',
    template: '%s – Strausmann HomeLab',
  },
  description:
    'Einblicke in das HomeLab-Projekt: Proxmox, Docker, Netzwerk, Microsoft 365 und mehr.',
  openGraph: {
    siteName: 'Strausmann HomeLab Blog',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    types: {
      'application/rss+xml': `${baseUrl}/blog/rss.xml`,
    },
  },
};

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
