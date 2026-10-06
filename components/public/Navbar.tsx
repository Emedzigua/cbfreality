'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo načítané zo súboru /public/images/logo.png */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="CBF REALITY Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Link 
              href="/" 
              className="text-[#108243] border-b-2 border-[#108243] pb-1 transition-none"
            >
              Domov
            </Link>
            <Link 
              href="/o-nas" 
              className="hover:text-[#108243] hover:border-b-2 hover:border-[#108243] pb-1 transition-none"
            >
              O nás
            </Link>
            <Link 
              href="/kontakt" 
              className="hover:text-[#108243] hover:border-b-2 hover:border-[#108243] pb-1 transition-none"
            >
              Kontakt
            </Link>
          </nav>

          {/* Tlačidlo akcie */}
          <div className="flex items-center gap-4">
            <Link
              href="/kontakt"
              className="bg-[#0F172A] hover:bg-[#108243] text-white text-xs font-bold px-5 py-3 rounded-none uppercase tracking-wider transition-none hidden sm:inline-block"
            >
              Dohodnúť obhliadku
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}