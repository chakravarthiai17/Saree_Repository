'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=85',
    title: 'Bridal Kanchipuram & Banarasi Silks',
    tagline: 'Imperial Silks Woven with Pure Gold Zari',
    category: 'Bridal Trousseau',
    badge: 'Silk Mark India Certified',
    link: '/shop?bridal=true',
  },
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=85',
    title: 'Explore Sarees Across Every State of India',
    tagline: 'From Varanasi Kadwa to Patan Double Ikat',
    category: 'Pan-India Handlooms',
    badge: '15+ Indian States Heritage',
    link: '/states',
  },
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1920&q=85',
    title: 'Lustrous Mysore & Royal Paithani Weaves',
    tagline: 'Buttery Crepes & Tapestry Peacock Pallus',
    category: 'Royal Heirlooms',
    badge: 'Direct Artisan Masterpieces',
    link: '/shop?category=Paithani',
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative w-full h-[650px] lg:h-[720px] bg-maroon-950 overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={`SareeHub Saree Collection - ${slide.title} | ${slide.tagline}`}
            fill
            priority={index === 0}
            className="object-cover object-center filter brightness-[0.72]"
          />
          {/* Royal Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a040b]/90 via-[#2a040b]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b0207] via-transparent to-transparent opacity-90" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/20 to-gold-600/10 border border-gold-400/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-semibold tracking-wider uppercase animate-in fade-in duration-700">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{heroSlides[currentSlide].badge}</span>
          </div>

          {/* Main Headings */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Discover the Beauty of India,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-amber-400">
                One Saree at a Time.
              </span>
            </h1>
            <p className="text-stone-200 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Explore Beautiful Sarees from Every Corner of India. Authentic Kanchipuram, Banarasi, Paithani, Mysore, and handloom treasures direct from master weavers.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/shop"
              className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-600 hover:to-gold-500 text-maroon-950 font-bold px-7 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm tracking-wide"
            >
              <span>Shop All Sarees</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/states"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 text-sm tracking-wide flex items-center space-x-2"
            >
              <span>Explore by States</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15 max-w-lg">
            <div>
              <p className="font-serif text-2xl font-bold text-gold-300">23+</p>
              <p className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">Saree Categories</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-gold-300">15+</p>
              <p className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">Indian States</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-gold-300">100%</p>
              <p className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">Silk Mark Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute z-20 bottom-8 right-8 flex items-center space-x-3">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicator Dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-gold-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
