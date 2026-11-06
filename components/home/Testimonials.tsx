'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya & Karthik',
    city: 'Chennai, Tamil Nadu',
    occasion: 'Bridal Muhurtham',
    quote: 'Finding an authentic Korvai Kanchipuram with pure gold zari online seemed impossible until we discovered SareeHub. The Silk Mark QR check was seamless and our wedding priest remarked on the traditional sanctity of the weave.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    saree: 'Crimson Kanchipuram Pure Silk',
  },
  {
    name: 'Dr. Radhika Sen',
    city: 'Kolkata / Delhi',
    occasion: 'Durga Puja Celebrations',
    quote: 'The Kadwa Banarasi and Dhakai Jamdani I purchased are museum-quality. The backside of the Banarasi is completely neat without loose floats. You are genuinely doing God&apos;s work for Indian handloom weavers.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    saree: 'Royal Banarasi Katan Silk',
  },
  {
    name: 'Snehal Deshmukh',
    city: 'Pune, Maharashtra',
    occasion: 'Ganesh Utsav & Reception',
    quote: 'My Yeola Paithani arrived in a gorgeous keepsake box with a certificate of authenticity. The tapestry Morbangadi peacock pallu glimmers like real jewelry under evening lights.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1610030469668-932d56a29e46?auto=format&fit=crop&w=400&q=80',
    saree: 'Maharashtrian Royal Paithani',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 border border-gold-200 px-3.5 py-1 rounded-full">
            Customer Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 tracking-tight">
            Loved by Saree Connoisseurs & Brides
          </h2>
          <p className="text-stone-600 text-sm">
            Read real stories from families who celebrated life&apos;s most sacred moments draped in SareeHub heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-cream-50/70 rounded-3xl p-7 border border-gold-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-gold-300/40 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center space-x-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold-400 flex-shrink-0 shadow-sm">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <span title="Verified Customer">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-500">{t.city}</p>
                  <span className="text-[10px] text-maroon-800 font-semibold block mt-0.5">
                    Draped: {t.saree}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
