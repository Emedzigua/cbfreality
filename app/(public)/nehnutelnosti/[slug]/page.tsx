import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!property) {
    notFound();
  }

  const conditionLabels: Record<string, string> = {
    new_building: 'Novostavba',
    fully_renovated: 'Kompletná rekonštrukcia',
    partial_renovated: 'Čiastočná rekonštrukcia',
    original: 'Pôvodný stav',
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Hlavička */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-[#108243]/10 text-[#108243] text-xs font-semibold rounded-full mb-2 uppercase tracking-wide">
              {property.offer_type === 'sale' ? 'Na predaj' : 'Na prenájom'}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-500 text-sm mt-1">📍 {property.city} {property.district ? `– ${property.district}` : ''}</p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-3xl font-extrabold text-[#E32328]">
              {property.price.toLocaleString('sk-SK')} €
            </div>
            <span className="text-xs text-gray-400">vrátane provízie a právneho servisu</span>
          </div>
        </div>

        {/* Hlavný obrázok / Galéria */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <Image alt="{property.title}" className="object-cover" fill priority src="{property.main_image}"/>
        </div>

        {/* Mriežka: Detaily + Kontaktný box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ľavý stĺpec: Špecifikácia a Popis */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Kľúčové parametre */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-500">Plocha</span>
                <span className="font-bold text-gray-800">{property.area_usable} m²</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-500">Izby</span>
                <span className="font-bold text-gray-800">{property.rooms || '-'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-500">Kúpeľne</span>
                <span className="font-bold text-gray-800">{property.bathrooms}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="block text-xs text-gray-500">Stav</span>
                <span className="font-bold text-gray-800 text-xs sm:text-sm">
                  {conditionLabels[property.condition] || property.condition}
                </span>
              </div>
            </div>

            {/* Popis nehnuteľnosti */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Popis nehnuteľnosti</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
                {property.description}
              </div>
            </div>
          </div>

          {/* Pravý stĺpec: Kontakt na kanceláriu */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Máte záujem o obhliadku?</h3>
              <p className="text-xs text-gray-500 mb-6">
                Kontaktujte CBF REALITY pre dohodnutie termínu alebo viac informácií.
              </p>

              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Vaše meno"
                  className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E32328]"
                />
                <input
                  type="email"
                  placeholder="Váš e-mail"
                  className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E32328]"
                />
                <input
                  type="tel"
                  placeholder="Telefónne číslo"
                  className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E32328]"
                />
                <textarea
                  rows={3}
                  defaultValue={`Dobrý deň, mám záujem o nehnuteľnosť: ${property.title}`}
                  className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E32328]"
                ></textarea>
                <button
                  type="button"
                  className="w-full bg-[#E32328] hover:bg-[#c81e22] text-white font-bold py-3 rounded-xl transition shadow-md"
                >
                  Odoslať žiadosť
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}