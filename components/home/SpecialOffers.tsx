'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Copy, Check, ArrowRight, Clock } from 'lucide-react';

export default function SpecialOffers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const offers = [
    {
      code: 'UTSAV10',
      badge: 'Festive Season',
      title: 'Flat 10% OFF',
      subtitle: 'On handlooms above ₹3,999 across all categories',
      color: 'from-amber-700 via-amber-800 to-amber-950',
    },
    {
      code: 'BRIDAL20',
      badge: 'Grand Wedding Muhurtham',
      title: 'Flat 20% OFF',
      subtitle: 'On luxury Kanchipuram & Banarasi bridal silks above ₹14,999',
      color: 'from-maroon-900 via-maroon-800 to-maroon-950',
    },
    {
      code: 'ROYAL500',
      badge: 'First Purchase Gift',
      title: 'Flat ₹500 OFF',
      subtitle: 'Welcome privilege on orders above ₹2,999 for all new members',
      color: 'from-emerald-800 via-emerald-900 to-emerald-950',
    },
  ];

  return (
    <section className="py-20 bg-cream-100/60 border-y border-gold-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold-700 uppercase tracking-widest bg-gold-200/50 px-3.5 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 text-gold-600" />
            <span>Special Offers & Privileges</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 tracking-tight">
            Grand Utsav Festive Privileges
          </h2>
          <p className="text-stone-600 text-sm">
            Save on authentic pure handlooms with certified Silk Mark authenticity directly at checkout.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.code}
              className={`rounded-3xl p-6 bg-gradient-to-br ${offer.color} text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-gold-400/30 group hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Pattern Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl" />

              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-full text-gold-200 mb-4 backdrop-blur-sm">
                  {offer.badge}
                </span>

                <h3 className="font-serif text-3xl font-black text-white mb-1">
                  {offer.title}
                </h3>

                <p className="text-xs text-stone-200 font-light leading-relaxed mb-6">
                  {offer.subtitle}
                </p>
              </div>

              {/* Coupon Code Pill */}
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                    Use Coupon Code
                  </span>
                  <span className="font-mono font-bold text-base text-gold-300 tracking-wider">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => copyToClipboard(offer.code)}
                  className="bg-gold-500 hover:bg-gold-400 text-maroon-950 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between shadow-2xl border border-gold-500/30 gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-gold-400" />
              <span>Limited Festive Window</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold">
              Complimentary Pure Muslin Saree Keepsake Box
            </h4>
            <p className="text-xs text-stone-300 max-w-lg">
              Every bridal and pure silk purchase is gift-wrapped in an artisan muslin storage envelope preserving your silk zari for decades.
            </p>
          </div>

          <Link
            href="/shop"
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-950 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition whitespace-nowrap shadow-lg flex items-center space-x-1.5"
          >
            <span>Shop With Offers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
