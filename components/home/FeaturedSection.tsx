'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Saree } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { ArrowRight, Flame, Sparkles, Crown, Award } from 'lucide-react';

interface FeaturedSectionProps {
  products: Saree[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'trending' | 'bridal'>('bestseller');
  const [quickViewProduct, setQuickViewProduct] = useState<Saree | null>(null);

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'bridal') return p.isBridal;
    return true;
  });

  const displayList = filteredProducts.slice(0, 8);

  const tabs = [
    { id: 'bestseller', label: 'Best-Selling Sarees', icon: Award },
    { id: 'new', label: 'New Arrivals', icon: Sparkles },
    { id: 'trending', label: 'Trending Sarees', icon: Flame },
    { id: 'bridal', label: 'Bridal Heritage', icon: Crown },
  ] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 border border-gold-200 px-3.5 py-1 rounded-full">
            Heirloom Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 tracking-tight">
            Handpicked Saree Selections
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            From regal bridal muhurtham drapes to effortless daily handlooms, discover our most cherished creations.
          </p>

          {/* Tab Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-maroon-900 text-white shadow-lg shadow-maroon-950/20 scale-105'
                      : 'bg-stone-100 text-stone-600 hover:bg-cream-100 hover:text-maroon-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-maroon-900 to-maroon-800 hover:from-maroon-950 hover:to-maroon-900 text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 text-sm tracking-wide"
          >
            <span>Explore All Sarees</span>
            <ArrowRight className="w-4 h-4 text-gold-300" />
          </Link>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </section>
  );
}
