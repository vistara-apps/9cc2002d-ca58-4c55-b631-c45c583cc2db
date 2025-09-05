import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Know Your Rights Bot',
  description: 'Empower employees with essential workplace legal knowledge, gamified.',
  keywords: ['workplace rights', 'employee rights', 'legal education', 'gamification'],
  authors: [{ name: 'Know Your Rights Bot' }],
  openGraph: {
    title: 'Know Your Rights Bot',
    description: 'Empower employees with essential workplace legal knowledge, gamified.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Know Your Rights Bot',
    description: 'Empower employees with essential workplace legal knowledge, gamified.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
