import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Student Seminar Management',
  description: 'Manage and track student seminar topics and teams',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-xl font-bold">
                Seminar Portal
              </Link>
              <div className="flex space-x-8">
                <Link href="/" className="text-foreground/60 hover:text-foreground">
                  Home
                </Link>
                <Link href="/topics" className="text-foreground/60 hover:text-foreground">
                  Topics
                </Link>
                {/* <Link href="/students" className="text-foreground/60 hover:text-foreground">
                  Students
                </Link> */}
              </div>
            </div>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}