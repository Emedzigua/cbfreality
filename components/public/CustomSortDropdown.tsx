// components/CustomSortDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

interface Props {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

const options: { id: SortOption; label: string }[] = [
  { id: 'newest', label: 'Najnovšie' },
  { id: 'price-asc', label: 'Cena: Od najlacnejších' },
  { id: 'price-desc', label: 'Cena: Od najdrahších' },
];

export default function CustomSortDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.id === value)?.label || 'Najnovšie';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-slate-300 hover:border-slate-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-none transition-none shadow-sm"
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-900 shadow-xl z-30 rounded-none">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-none ${
                value === option.id
                  ? 'bg-[#0F172A] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}