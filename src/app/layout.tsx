import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import { TableOfContents } from '@/components/ui/TableOfContents';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zero-Code Testing for Go Gin & MongoDB Apps with Keploy | Developer Guide',
  description:
    'Learn how to use Keploy eBPF engine to automatically generate integration tests and database mocks for Go Gin and MongoDB applications without writing code.',
  keywords: [
    'Keploy',
    'Go',
    'Golang',
    'Gin',
    'MongoDB',
    'eBPF',
    'Integration Testing',
    'Zero Code Testing',
    'Mocking',
    'Documentation',
  ],
  authors: [{ name: 'DevRel Candidate', url: 'https://keploy.io' }],
  openGraph: {
    title: 'Zero-Code Testing for Go Gin & MongoDB Apps with Keploy',
    description:
      'Step-by-step developer tutorial on auto-generating integration test suites and MongoDB mocks using Keploy eBPF.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 antialiased`}>
        <Providers>
          <Header />
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex gap-8">
            <Sidebar />
            <main className="flex-1 min-w-0 max-w-4xl">
              {children}
            </main>
            <TableOfContents />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
