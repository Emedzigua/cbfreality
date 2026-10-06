import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-slate-800 font-sans">
      
      {/* Hlavný obsah pätičky */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Stĺpec 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#108243] flex items-center justify-center font-black text-white text-sm tracking-tighter rounded-none">
                CBF
              </div>
              <span className="text-lg font-black text-white uppercase tracking-wider">
                CBF REALITY
              </span>
            </div>
            
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Centrum bývania a financovania. Ponúkame vám 20 rokov našich skúseností na realitnom trhu v Michalovciach a okolí.
            </p>

            <span className="inline-block bg-[#108243]/20 text-[#8EC63F] border border-[#108243]/40 text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-none">
              Overená realitná kancelária
            </span>
          </div>

          {/* Stĺpec 2: Rýchle odkazovanie */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
              Navigácia
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-[#8EC63F] transition-none">
                  Hlavná stránka
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-[#8EC63F] transition-none">
                  O nás & naša história
                </Link>
              </li>
              <li>
                <Link href="#ponuka" className="hover:text-[#8EC63F] transition-none">
                  Ponuka nehnuteľností
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-[#8EC63F] transition-none">
                  Kontaktné informácie
                </Link>
              </li>
            </ul>
          </div>

          {/* Stĺpec 3: Lokalita a služby */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
              Naša špecializácia
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-[#108243]">■</span> Predaj a prenájom bytov
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#108243]">■</span> Rodinné domy a pozemky
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#108243]">■</span> Rekreačné chaty Šírava
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#108243]">■</span> Kompletný právny & hypotekárny servis
              </li>
            </ul>
          </div>

          {/* Stĺpec 4: Kontakt */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
              Kontakt
            </h4>
            <div className="space-y-2 text-xs text-slate-400 font-semibold">
              <p className="text-white font-bold">CBF REALITY s.r.o.</p>
              <p>Michalovce a okolie</p>
              <p className="pt-2 text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Telefón:</span>
                +421 9XX XXX XXX
              </p>
              <p className="text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">E-mail:</span>
                info@cbfreality.sk
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Spodná autorská lišta */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-medium gap-2">
          <p>© {new Date().getFullYear()} CBF REALITY. Všetky práva vyhradené.</p>
          <p className="uppercase tracking-widest text-[10px] text-slate-600">
            Centrum bývania a financovania
          </p>
        </div>
      </div>

    </footer>
  );
}