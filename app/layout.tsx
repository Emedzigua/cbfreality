import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CBF REALITY | Vaša realitná kancelária',
  description: 'Predaj, kúpa a prenájom nehnuteľností s kompletným právnym servisom.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900 antialiased`}>
        {/* Navigačná lišta na vrchu */}
        <Navbar />
        
        {/* Hlavný obsah podstránok */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Pätička na spodku */}
        <Footer />
      </body>
    </html>
  );
}