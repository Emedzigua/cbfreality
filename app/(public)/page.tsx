'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import CustomSortDropdown, { SortOption } from '@/components/public/CustomSortDropdown';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  offerType: 'sale' | 'rent';
  propertyType: 'apartment' | 'house' | 'land' | 'commercial';
  beds?: number;
  baths?: number;
  area: number;
  imgUrl: string;
  badge?: string;
  description: string;
  features: {
    pool?: boolean;
    garage?: boolean;
    balcony?: boolean;
    ac?: boolean;
    elevator?: boolean;
  };
}

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const ponukaRef = useRef<HTMLDivElement>(null);

  // Stavy filtrov
  const [offerType, setOfferType] = useState<'sale' | 'rent'>('sale');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(500000);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Špecifikácie
  const [features, setFeatures] = useState<Record<string, boolean>>({
    pool: false,
    garage: false,
    balcony: false,
    ac: false,
    elevator: false,
  });

  // Režim zobrazenia a radenie
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Stránkovanie
  const [currentPage, setCurrentPage] = useState(1);

  // NAČÍTANIE DÁT
  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          offerType,
          types: selectedTypes.join(','),
          maxPrice: priceRange.toString(),
          minArea,
          maxArea,
          sortBy,
          location: searchLocation,
          pool: features.pool ? 'true' : 'false',
          garage: features.garage ? 'true' : 'false',
          balcony: features.balcony ? 'true' : 'false',
          ac: features.ac ? 'true' : 'false',
          elevator: features.elevator ? 'true' : 'false',
        });

        const res = await fetch(`/api/properties?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error('Chyba pri načítavaní z databázy:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
    setCurrentPage(1);
  }, [
    offerType,
    selectedTypes,
    priceRange,
    minArea,
    maxArea,
    sortBy,
    searchLocation,
    features,
  ]);

  // SCROLL PO ZMENE STRÁNKY AŽ PO PREKRESLENÍ
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ponukaRef.current) {
        ponukaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((t) => t !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleFeature = (key: string) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setPriceRange(500000);
    setMinArea('');
    setMaxArea('');
    setSearchLocation('');
    setFeatures({
      pool: false,
      garage: false,
      balcony: false,
      ac: false,
      elevator: false,
    });
  };

  const scrollToPonuka = () => {
    if (ponukaRef.current) {
      ponukaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* 1. HERO SEKCIA (100% VÝŠKY OBRAZOVKY) */}
      <section className="relative h-screen w-full flex items-center justify-center border-b border-slate-200">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/public/images/pozadie.jpeg"
            alt="CBF REALITY Pozadie"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale-[15%]"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/65" />
        </div>

        <div className="max-w-5xl w-full mx-auto px-4 text-center space-y-8 z-10">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              Ponúkame vám <span className="text-[#8EC63F]">20 rokov</span> našich skúseností
            </h1>
            <p className="text-slate-300 text-xs sm:text-base font-semibold uppercase tracking-widest">
              Centrum bývania a financovania
            </p>
          </div>

          <div className="bg-white p-2.5 rounded-none shadow-2xl max-w-3xl mx-auto border border-slate-200">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex bg-slate-100 p-1 w-full sm:w-auto rounded-none">
                <button
                  type="button"
                  onClick={() => setOfferType('sale')}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-none ${
                    offerType === 'sale' ? 'bg-[#0F172A] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kúpa
                </button>
                <button
                  type="button"
                  onClick={() => setOfferType('rent')}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-none ${
                    offerType === 'rent' ? 'bg-[#0F172A] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Prenájom
                </button>
              </div>

              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Zadajte lokalitu (Michalovce, Šírava, Centrum...)"
                className="w-full px-4 py-3 text-xs text-slate-800 bg-transparent focus:outline-none font-medium"
              />

              <button
                type="button"
                onClick={scrollToPonuka}
                className="w-full sm:w-auto bg-[#108243] hover:bg-[#0d6b37] text-white text-xs font-bold px-8 py-3.5 rounded-none flex items-center justify-center gap-2 uppercase tracking-wider transition-none flex-shrink-0"
              >
                <Icons.Search /> Hľadať
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={scrollToPonuka}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest border-b border-white/30 hover:border-white pb-1 transition-none"
            >
              <span>Zobraziť ponuku & filtre</span>
              <svg className="w-4 h-4 fill-current animate-bounce" viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PONUKA NEHNUTEĽNOSTÍ */}
      <section ref={ponukaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-300">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Ponuka nehnuteľností</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Nájdených {properties.length} nehnuteľností
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Zoradiť:</span>
              <CustomSortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <div className="flex bg-white border border-slate-300 p-1 rounded-none shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-none ${
                  viewMode === 'grid' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 transition-none ${
                  viewMode === 'list' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M3 4h18v4H3zm0 6h18v4H3zm0 6h18v4H3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* 3. AUTOMATICKÝ FILTER */}
          <aside className="bg-white p-6 border border-slate-200 shadow-sm space-y-6 lg:sticky lg:top-24 rounded-none">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Filtrovať</h3>
              <button 
                type="button" 
                onClick={handleResetFilters} 
                className="text-[10px] font-bold text-slate-400 hover:text-[#108243] uppercase tracking-widest transition-none"
              >
                Reset
              </button>
            </div>

            {/* Transakcia */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Transakcia</label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setOfferType('sale')}
                  className={`py-2 text-xs font-bold uppercase transition-none ${
                    offerType === 'sale' ? 'bg-[#0F172A] text-white' : 'text-slate-600'
                  }`}
                >
                  Kúpa
                </button>
                <button
                  type="button"
                  onClick={() => setOfferType('rent')}
                  className={`py-2 text-xs font-bold uppercase transition-none ${
                    offerType === 'rent' ? 'bg-[#0F172A] text-white' : 'text-slate-600'
                  }`}
                >
                  Prenájom
                </button>
              </div>
            </div>

            {/* Typ nehnuteľnosti */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Typ nehnuteľnosti</label>
              <div className="space-y-2">
                {[
                  { id: 'apartment', label: 'Byty' },
                  { id: 'house', label: 'Rodinné domy' },
                  { id: 'land', label: 'Pozemky' },
                  { id: 'commercial', label: 'Komerčné priestory' },
                ].map((item) => {
                  const isChecked = selectedTypes.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTypeToggle(item.id)}
                      className={`w-full flex items-center gap-3 p-2.5 border text-xs font-bold uppercase tracking-wider transition-none rounded-none text-left ${
                        isChecked
                          ? 'border-[#108243] bg-[#108243] text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 rounded-none ${
                        isChecked ? 'border-white bg-white text-[#108243]' : 'border-slate-400'
                      }`}>
                        {isChecked && (
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </div>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max cena */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max. cena</label>
                <span className="text-xs font-extrabold text-[#108243]">{priceRange.toLocaleString()} €</span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#108243] cursor-pointer"
              />
            </div>

            {/* Rozloha */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Rozloha (m²)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Od"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-none text-xs font-semibold focus:outline-none focus:border-[#108243]"
                />
                <span className="text-slate-300">-</span>
                <input
                  type="number"
                  placeholder="Do"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-none text-xs font-semibold focus:outline-none focus:border-[#108243]"
                />
              </div>
            </div>

            {/* Vybavenie */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Vybavenie</label>
              <div className="space-y-1.5">
                {[
                  { id: 'pool', label: 'Bazén', Icon: Icons.Pool },
                  { id: 'garage', label: 'Garáž', Icon: Icons.Garage },
                  { id: 'balcony', label: 'Balkón / Terasa', Icon: Icons.Balcony },
                  { id: 'ac', label: 'Klimatizácia', Icon: Icons.AC },
                  { id: 'elevator', label: 'Výťah', Icon: Icons.Elevator },
                ].map(({ id, label, Icon }) => {
                  const active = features[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleFeature(id)}
                      className={`w-full flex items-center gap-2.5 p-2 border text-xs font-semibold rounded-none transition-none ${
                        active
                          ? 'border-[#108243] bg-[#108243]/10 text-[#108243]'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      <Icon />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* 4. MAIN OBSAH */}
          <main className="lg:col-span-3 space-y-8">
            <div className={`transition-opacity duration-200 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              
              {!loading && paginatedProperties.length === 0 ? (
                <div className="py-24 text-center text-xs font-bold uppercase tracking-widest text-slate-400 bg-white border border-slate-200">
                  Žiadne nehnuteľnosti nezodpovedajú zvoleným kritériám.
                </div>
              ) : viewMode === 'grid' ? (
                
                /* MRIEŽKA */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProperties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white border border-slate-200 rounded-none hover:border-slate-400 transition-none flex flex-col group"
                    >
                      <div className="relative h-48 w-full bg-slate-100 border-b border-slate-200">
                        {property.badge && (
                          <span className="absolute top-3 left-3 z-10 bg-[#0F172A] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-none">
                            {property.badge}
                          </span>
                        )}
                        <Image
                          src={property.imgUrl}
                          alt={property.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
                        <div>
                          <span className="text-[10px] font-extrabold text-[#108243] uppercase tracking-wider block">
                            📍 {property.location}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#108243] leading-snug mt-1">
                            {property.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                          {property.beds && (
                            <span className="flex items-center gap-1">
                              <Icons.Bed /> {property.beds}
                            </span>
                          )}
                          {property.baths && (
                            <span className="flex items-center gap-1">
                              <Icons.Bath /> {property.baths}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Icons.Area /> {property.area} m²
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-lg font-black text-slate-900">
                            {property.price.toLocaleString()} €
                          </span>
                          <Link
                            href={`/nehnutelnost/${property.id}`}
                            className="bg-slate-100 hover:bg-[#0F172A] hover:text-white text-slate-900 text-[11px] font-bold px-3.5 py-2 uppercase tracking-wider rounded-none transition-none"
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              ) : (

                /* RIADKY */
                <div className="space-y-4">
                  {paginatedProperties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white border border-slate-200 rounded-none hover:border-slate-400 transition-none flex flex-col sm:flex-row group"
                    >
                      <div className="relative h-56 sm:h-auto sm:w-64 bg-slate-100 border-b sm:border-b-0 sm:border-r border-slate-200 flex-shrink-0">
                        {property.badge && (
                          <span className="absolute top-3 left-3 z-10 bg-[#0F172A] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-none">
                            {property.badge}
                          </span>
                        )}
                        <Image
                          src={property.imgUrl}
                          alt={property.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 256px"
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-extrabold text-[#108243] uppercase tracking-wider block">
                              📍 {property.location}
                            </span>
                            <span className="text-xl font-black text-slate-900 sm:hidden">
                              {property.price.toLocaleString()} €
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#108243] leading-snug mt-1">
                            {property.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                            {property.description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                            {property.beds && (
                              <span className="flex items-center gap-1.5">
                                <Icons.Bed /> {property.beds} izby
                              </span>
                            )}
                            {property.baths && (
                              <span className="flex items-center gap-1.5">
                                <Icons.Bath /> {property.baths} kúpeľňa
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <Icons.Area /> {property.area} m²
                            </span>
                          </div>

                          <div className="flex items-center gap-4 justify-between sm:justify-end">
                            <span className="text-2xl font-black text-slate-900 hidden sm:inline-block">
                              {property.price.toLocaleString()} €
                            </span>
                            <Link
                              href={`/nehnutelnost/${property.id}`}
                              className="bg-[#0F172A] hover:bg-[#108243] text-white text-xs font-bold px-5 py-2.5 uppercase tracking-wider rounded-none transition-none"
                            >
                              Zobraziť detail
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

              )}

            </div>

            {/* STRÁNKOVANIE */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-9 h-9 flex items-center justify-center bg-white border border-slate-300 text-slate-700 hover:border-slate-900 disabled:opacity-30 disabled:hover:border-slate-300 rounded-none transition-none"
                  title="Predchádzajúca strana"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 border text-xs font-bold rounded-none transition-none ${
                      currentPage === page
                        ? 'bg-[#108243] border-[#108243] text-white'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-9 h-9 flex items-center justify-center bg-white border border-slate-300 text-slate-700 hover:border-slate-900 disabled:opacity-30 disabled:hover:border-slate-300 rounded-none transition-none"
                  title="Ďalšia strana"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </button>
              </div>
            )}

          </main>

        </div>
      </section>

    </div>
  );
}