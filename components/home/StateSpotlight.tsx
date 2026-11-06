'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StateCollection } from '@/lib/types';
import { MapPin, ArrowRight, Compass } from 'lucide-react';

interface StateSpotlightProps {
  states: StateCollection[];
}

export default function StateSpotlight({ states }: StateSpotlightProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-cream-50 to-white relative overflow-hidden">
      {/* Decorative Gold Rings */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-maroon-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-maroon-800 uppercase tracking-widest bg-maroon-50 border border-maroon-200/50 px-3.5 py-1 rounded-full">
              <Compass className="w-3.5 h-3.5 text-gold-600" />
              <span>Pan-India Cultural Odyssey</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 tracking-tight">
              Explore Sarees Across India
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every Indian state possesses an ancient weaving destiny. Click any state to discover its indigenous looms, traditional weaves, and GI-tagged heirlooms.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/states"
              className="inline-flex items-center space-x-2 text-maroon-900 hover:text-maroon-950 font-semibold text-sm group"
            >
              <span>View All 15+ State Collections</span>
              <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* States Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {states.slice(0, 6).map((st) => (
            <div
              key={st.id}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all duration-300 flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src={st.image}
                  alt={`Traditional Handloom Sarees of ${st.name}, India`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[10px] text-gold-300 font-bold uppercase tracking-wider block">
                      {st.region}
                    </span>
                    <h3 className="font-serif text-xl font-bold tracking-wide">
                      {st.name}
                    </h3>
                  </div>
                  <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-gold-500 group-hover:text-maroon-950 transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* State Weaves Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-3">
                    {st.description}
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      Signature Saree Weaves
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {st.signatureSarees.slice(0, 3).map((weave, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-cream-100 text-stone-800 font-medium px-2.5 py-0.5 rounded-full border border-gold-200/60"
                        >
                          {weave}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/states/${st.slug}`}
                    className="text-xs font-bold text-maroon-900 hover:text-maroon-950 flex items-center space-x-1 group-hover:underline"
                  >
                    <span>Discover {st.name} Sarees</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                  </Link>

                  <span className="text-[11px] text-stone-400">Capital: {st.capital}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* State Quick Pills Bar */}
        <div className="mt-10 p-6 bg-cream-100/70 border border-gold-200/80 rounded-3xl">
          <p className="text-xs font-bold text-maroon-950 uppercase tracking-wider mb-3 text-center sm:text-left">
            Quick Browse Indian Saree States
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {states.map((s) => (
              <Link
                key={s.id}
                href={`/states/${s.slug}`}
                className="text-xs bg-white hover:bg-maroon-900 hover:text-white text-stone-700 font-medium px-3.5 py-1.5 rounded-full border border-stone-200 transition shadow-sm"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
