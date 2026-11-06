'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SareeCategory } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  categories: SareeCategory[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  // Showcase top 8-10 on home page, with CTA to view all 23
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="py-20 bg-cream-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold-700 uppercase tracking-widest bg-gold-100/70 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Master Handloom Weaves</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 tracking-tight">
            Curated Saree Collections
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every thread tells an eternal Indian folklore. Discover iconic regional handlooms from Kanchipuram&apos;s pure silk to Banaras&apos;s golden brocades.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.name.replace(' Sarees', ''))}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <Image
                src={category.image}
                alt={`${category.name} - Traditional Weave of ${category.stateOrigin}`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/95 via-maroon-950/40 to-transparent" />

              {/* Content Box */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex flex-col justify-end">
                <span className="text-[10px] font-bold text-gold-400 tracking-wider uppercase mb-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                  {category.stateOrigin}
                </span>

                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-gold-200 transition line-clamp-1">
                  {category.name}
                </h3>

                <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 hidden sm:block opacity-90 font-light">
                  {category.description}
                </p>

                <div className="mt-3 flex items-center space-x-1 text-gold-300 text-xs font-semibold group-hover:text-white transition">
                  <span>Explore Weaves</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 bg-white hover:bg-gold-50 text-maroon-900 border border-gold-300/80 font-semibold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition text-sm tracking-wide"
          >
            <span>Explore All 23 Saree Categories</span>
            <ArrowRight className="w-4 h-4 text-gold-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
