'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface FilterState {
  category: string;
  state: string;
  fabric: string;
  color: string;
  occasion: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minDiscount: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  statesList: string[];
  categoriesList: string[];
  fabricsList: string[];
  colorsList: string[];
  occasionsList: string[];
}

export default function ProductFilters({
  filters,
  onChange,
  onReset,
  statesList,
  categoriesList,
  fabricsList,
  colorsList,
  occasionsList,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-6 text-xs text-stone-700">
      {/* Title & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center space-x-2 text-maroon-950 font-bold font-serif text-base">
          <SlidersHorizontal className="w-4 h-4 text-gold-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-stone-400 hover:text-maroon-900 transition flex items-center space-x-1 text-[11px] font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          Price Range (₹)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min={0}
            max={filters.maxPrice}
            step={500}
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: Number(e.target.value) })}
            placeholder="Min"
            className="w-1/2 p-2 bg-cream-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
          />
          <span className="text-stone-400">-</span>
          <input
            type="number"
            min={filters.minPrice}
            max={60000}
            step={1000}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            placeholder="Max"
            className="w-1/2 p-2 bg-cream-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
          />
        </div>
        <div className="flex justify-between text-[10px] text-stone-400">
          <span>₹{filters.minPrice.toLocaleString('en-IN')}</span>
          <span>₹{filters.maxPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Indian State of Origin */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          State of Origin
        </label>
        <select
          value={filters.state}
          onChange={(e) => onChange({ state: e.target.value })}
          className="w-full p-2.5 bg-cream-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
        >
          <option value="">All Indian States</option>
          {statesList.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Saree Category */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          Saree Type / Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="w-full p-2.5 bg-cream-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
        >
          <option value="">All Categories</option>
          {categoriesList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Fabric */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          Fabric
        </label>
        <select
          value={filters.fabric}
          onChange={(e) => onChange({ fabric: e.target.value })}
          className="w-full p-2.5 bg-cream-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
        >
          <option value="">All Fabrics</option>
          {fabricsList.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Colour */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          Colour
        </label>
        <div className="flex flex-wrap gap-1.5">
          {colorsList.map((c) => {
            const isSelected = filters.color.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ color: isSelected ? '' : c })}
                className={`text-xs px-2.5 py-1 rounded-full border transition flex items-center space-x-1 ${
                  isSelected
                    ? 'bg-maroon-900 text-white border-maroon-900 font-bold shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-gold-300'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-gold-300" />}
                <span>{c}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          Occasion
        </label>
        <div className="flex flex-wrap gap-1.5">
          {occasionsList.map((occ) => {
            const isSelected = filters.occasion.toLowerCase() === occ.toLowerCase();
            return (
              <button
                key={occ}
                type="button"
                onClick={() => onChange({ occasion: isSelected ? '' : occ })}
                className={`text-xs px-2.5 py-1 rounded-full border transition ${
                  isSelected
                    ? 'bg-gold-500 text-maroon-950 border-gold-600 font-bold shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-gold-300'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="space-y-2">
        <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
          Minimum Discount
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[10, 20, 25].map((disc) => (
            <button
              key={disc}
              type="button"
              onClick={() => onChange({ minDiscount: filters.minDiscount === disc ? 0 : disc })}
              className={`py-1.5 rounded-xl border text-center transition font-semibold ${
                filters.minDiscount === disc
                  ? 'bg-maroon-900 text-white border-maroon-900'
                  : 'bg-cream-50 text-stone-700 border-stone-200 hover:bg-gold-50'
              }`}
            >
              {disc}%+ OFF
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-center space-x-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 text-maroon-900 rounded border-stone-300 focus:ring-maroon-800"
          />
          <span className="font-medium text-stone-800">In Stock Sarees Only</span>
        </label>
      </div>
    </div>
  );
}
