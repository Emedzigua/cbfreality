export default function AboutPage() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Úvod */}
      <div className="text-center space-y-4">
        <span className="text-[#108243] font-semibold text-xs tracking-wider uppercase">Spoznajte náš tím</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">O kancelárii CBF REALITY</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          Sme moderná realitná kancelária, pre ktorú je na prvom mieste transparentnosť, dôvera a maximálny komfort pre klienta.
        </p>
      </div>

      {/* Hlavný obsah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">Naša filozofia</h2>
          <p>
            V CBF REALITY veríme, že kúpa alebo predaj nehnuteľnosti je jedným z najdôležitejších krokov v živote. Preto k celému procesu pristupujeme s vysokou zodpovednosťou.
          </p>
          <p>
            Postaráme sa o všetko od úvodnej fotodokumentácie, cez marketing, právny servis až po odovzdanie kľúčov novému majiteľovi.
          </p>
        </div>
        
        <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center border border-gray-200">
          <span className="text-gray-400 font-medium text-sm">[ Fotografia tímu / kancelárie ]</span>
        </div>
      </div>

      {/* Hodnoty */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Dôveryhodnosť</h3>
          <p className="text-xs text-gray-600">Všetky naše ponuky sú preverené a zmluvy pripravené právnikmi.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Inovácie</h3>
          <p className="text-xs text-gray-600">Využívame moderné digitálne nástroje na efektívny predaj.</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Starostlivosť</h3>
          <p className="text-xs text-gray-600">Sme tu pre Vás aj po ukončení obchodu a odovzdaní nehnuteľnosti.</p>
        </div>
      </div>

    </main>
  );
}