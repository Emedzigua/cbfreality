'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filtre
  const [offerType, setOfferType] = useState<'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('Michalovce');
  const [maxPrice, setMaxPrice] = useState('');

  // Vybavenie (vyklikávacie ikonky)
  const [features, setFeatures] = useState<Record<string, boolean>>({
    balcony: false,
    terrace: false,
    elevator: false,
    garage: false,
    parking: false,
    pool: false,
    sauna: false,
    ac: false,
    basement: false,
  });

  const toggleFeature = (key: string) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const featureIcons = [
    { id: 'balcony', label: 'Balkón / Lógia', icon: '🪴' },
    { id: 'terrace', label: 'Terasa', icon: '🌅' },
    { id: 'elevator', label: 'Výťah', icon: '🛗' },
    { id: 'garage', label: 'Garáž', icon: '🚗' },
    { id: 'parking', label: 'Parkovanie', icon: '🅿️️' },
    { id: 'pool', label: 'Bazén', icon: '🏊‍♂️' },
    { id: 'sauna', label: 'Sauna', icon: '🧘‍♀️' },
    { id: 'ac', label: 'Klimatizácia', icon: '❄️' },
    { id: 'basement', label: 'Pivnica', icon: '📦' },
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-slate-200/80 border border-slate-100">
      
      {/* 1. Kúpa / Prenájom prepínač */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setOfferType('sale')}
          className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
            offerType === 'sale'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Kúpa
        </button>
        <button
          type="button"
          onClick={() => setOfferType('rent')}
          className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
            offerType === 'rent'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Prenájom
        </button>
      </div>

      {/* 2. Základné vyhľadávanie */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Typ nehnuteľnosti */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#108243]"
        >
          <option value="">Všetky typy nehnuteľností</option>
          <option value="apartment">Byt</option>
          <option value="house">Rodinný dom</option>
          <option value="land">Pozemok</option>
          <option value="commercial">Komerčný priestor</option>
        </select>

        {/* Lokalita */}
        <input
          type="text"
          placeholder="Lokalita (napr. Michalovce, Šírava...)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#108243]"
        />

        {/* Max cena */}
        <input
          type="number"
          placeholder="Max. cena (€)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#108243]"
        />

        {/* Hľadať tlačidlo */}
        <button
          type="button"
          className="w-full bg-[#108243] hover:bg-[#0d6b37] text-white font-bold p-4 rounded-2xl transition shadow-lg shadow-[#108243]/20 flex items-center justify-center gap-2"
        >
          🔍 Vyhľadať
        </button>
      </div>

      {/* 3. Tlačidlo pre rozbalenie rozšírených filtrov s ikonami */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 flex items-center gap-2"
        >
          <span>{showAdvanced ? '▲ Skryť filtre' : '⚙️ Rozšírené filtre & Vybavenie'}</span>
        </button>
      </div>

      {/* 4. Rozšírené filtre s IKONKAMI */}
      {showAdvanced && (
        <div className="mt-4 pt-4 space-y-4 animate-in fade-in duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vyberte požadované vybavenie:</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {featureIcons.map((item) => {
              const active = features[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFeature(item.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                    active
                      ? 'border-[#108243] bg-[#108243]/10 text-[#108243] shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}