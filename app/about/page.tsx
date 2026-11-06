import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Award, HeartHandshake, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us | Preserving 400 Years of Indian Textile Craftsmanship',
  description:
    'Learn about SareeHub: our mission to support 1,200+ master weavers across 15+ Indian states, preserve traditional handlooms, and deliver 100% Silk Mark certified sarees.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About SareeHub | Handloom Heritage & Master Weavers',
    description:
      'Learn about SareeHub: our mission to support 1,200+ master weavers across 15+ Indian states.',
    url: `${SITE_CONFIG.domain}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-4 py-1 rounded-full">
            The SareeHub Legacy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-maroon-950 leading-tight">
            Discover the Beauty of India, One Saree at a Time.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            SareeHub was founded with a singular sacred devotion: to create a unified online sanctuary where connoisseurs, modern women, and brides can explore and cherish authentic, master-woven sarees from every state of India.
          </p>
        </div>

        {/* Feature Image Grid */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400/40">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80"
            alt="Handloom Weaving Craftsmanship"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 text-white">
            <div>
              <span className="text-xs text-gold-300 font-bold uppercase tracking-wider block">
                Generational Heritage
              </span>
              <h3 className="font-serif text-2xl font-bold">
                From Varanasi Pitlooms to Kanchipuram Korvai Looms
              </h3>
            </div>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-maroon-950">100% Silk Mark Authenticity</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every mulberry, katan, tussar, and muga saree in our collection carries the official Silk Mark Organization of India tag, guaranteeing zero synthetic blends and lab-tested gold-silver zari.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-maroon-950">Direct Weaver Empowerment</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              By working directly with master weavers across 15+ Indian states without middlemen, we ensure artisans receive fair compensation while customers get genuine heirloom craftsmanship.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-maroon-950">Pan-India Cultural Preservation</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              From the geometric mathematical marvels of Telangana&apos;s Pochampally double ikat to Kashmir&apos;s needlecraft and Bengal&apos;s muslin Jamdani, every weave preserves centuries of regional culture.
            </p>
          </div>
        </div>

        {/* Craftsmanship Narrative */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
            The Philosophy of SareeHub
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              In an era dominated by fast fashion and polyester imitations, an authentic Indian handloom saree stands as a defiant monument to human skill, patience, and timeless grace. A single Kanchipuram Korvai or Banarasi Kadwa can require two master weavers to collaborate over 20 to 45 days, interlacing pure silk warp threads with genuine gold-silver zari wefts.
            </p>
            <p>
              SareeHub bridges the ancient handloom clusters of India—from Kanchipuram and Dharmavaram in the South, Yeola and Patan in the West, Shantipur and Sambalpur in the East, to Varanasi and Kaithun in the North—with discerning women worldwide who cherish genuine handwoven artistry.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-maroon-900 hover:bg-maroon-950 text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-md"
            >
              Shop Handloom Sarees
            </Link>
            <Link
              href="/states"
              className="bg-cream-100 hover:bg-gold-50 text-maroon-950 border border-gold-300 font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition"
            >
              Explore Indian States
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
