import { getProducts, getCategories, getStates } from '@/lib/db';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import StateSpotlight from '@/components/home/StateSpotlight';
import FeaturedSection from '@/components/home/FeaturedSection';
import SpecialOffers from '@/components/home/SpecialOffers';
import Testimonials from '@/components/home/Testimonials';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebSiteJsonLd } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 0; // always fresh data from DB

export default async function HomePage() {
  const [products, categories, states] = await Promise.all([
    getProducts(),
    getCategories(),
    getStates(),
  ]);

  const organizationJsonLd = getOrganizationJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={webSiteJsonLd} />

      <div className="space-y-0">
        {/* 1. Hero Banner */}
        <HeroBanner />

        {/* 2. Trust Seals Banner */}
        <section aria-label="Brand Authenticity Guarantees" className="bg-white border-b border-stone-200/80 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">Silk Mark India</h4>
                  <p className="text-[11px] text-stone-500">Government Certified Pure Silk</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">Direct from Artisans</h4>
                  <p className="text-[11px] text-stone-500">Supporting 1200+ Master Weavers</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">Tested Pure Zari</h4>
                  <p className="text-[11px] text-stone-500">Silver-Gilt & 24K Gold Electroplate</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 border border-gold-200">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">7-Day Doorstep Pickup</h4>
                  <p className="text-[11px] text-stone-500">100% Hassle-Free Returns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Explore Sarees Across India (States Collection) */}
        <StateSpotlight states={states} />

        {/* 4. Featured Collections (Best Sellers, New Arrivals, Trending, Bridal) */}
        <FeaturedSection products={products} />

        {/* 5. Saree Categories Grid */}
        <CategoryGrid categories={categories} />

        {/* 6. Artisan Heritage Story Section */}
        <section aria-labelledby="heritage-heading" className="py-20 bg-maroon-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#dab33b_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold text-gold-300 uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full border border-gold-500/30">
                  Our Weaving Heritage
                </span>
                <h2 id="heritage-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Preserving 400 Years of Indian Textile Craftsmanship
                </h2>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                  At SareeHub, we do not merely retail sarees—we preserve living Indian heritage. From the rhythmic clatter of pit-looms in Kanchipuram and Varanasi to the mathematical genius of Pochampally double-ikat tie-dye, our mission is to deliver authentic, heirloom-grade textiles directly from master artisans to your wardrobe.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="border-l-2 border-gold-400 pl-4">
                    <span className="font-serif text-3xl font-bold text-gold-300">0%</span>
                    <p className="text-xs text-stone-300 mt-1">Intermediary markups, ensuring fair wages for handloom weavers</p>
                  </div>
                  <div className="border-l-2 border-gold-400 pl-4">
                    <span className="font-serif text-3xl font-bold text-gold-300">100%</span>
                    <p className="text-xs text-stone-300 mt-1">GI Tagged authenticity verification & pure natural fibers</p>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-950 font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-lg"
                  >
                    <span>Read The SareeHub Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-gold-500/30 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                    alt="Indian Handloom Master Weaver at Loom"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Overlapping Callout */}
                <div className="absolute -bottom-6 -left-6 bg-white text-stone-900 p-5 rounded-2xl shadow-2xl border border-gold-300 max-w-xs hidden sm:block">
                  <p className="font-serif font-bold text-maroon-950 text-sm">
                    &ldquo;A saree is not just 6 yards of fabric; it is the soul of India draped with grace.&rdquo;
                  </p>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-2 block font-semibold">
                    SareeHub Foundation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Special Offers & Discounts */}
        <SpecialOffers />

        {/* 8. Customer Testimonials */}
        <Testimonials />
      </div>
    </>
  );
}
