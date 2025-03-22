import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/app/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '1acre.in Frontend Assignment',
  description: 'Property listings with map integration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
