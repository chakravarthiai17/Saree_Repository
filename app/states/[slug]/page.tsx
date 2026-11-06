import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getStateBySlug, getStates, getProducts } from '@/lib/db';
import ProductCard from '@/components/product/ProductCard';
import JsonLd from '@/components/seo/JsonLd';
import { getBreadcrumbJsonLd, SITE_CONFIG } from '@/lib/seo';
import { MapPin, Compass, ArrowLeft, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const stateData = await getStateBySlug(params.slug);

  if (!stateData) {
    return {
      title: 'State Collection Not Found',
      description: 'The requested regional saree collection could not be found.',
    };
  }

  const title = `Traditional Sarees of ${stateData.name} | Handloom Heritage`;
  const description = `Explore authentic handwoven sarees from ${stateData.name}. Discover signature weaves: ${stateData.signatureSarees.join(', ')}. Silk Mark certified, buy online at SareeHub.`;

  return {
    title,
    description,
    keywords: [
      `${stateData.name} Sarees`,
      ...stateData.signatureSarees,
      `${stateData.name} Handlooms`,
      `${stateData.region} Sarees`,
      'Indian Regional Sarees',
    ],
    alternates: {
      canonical: `/states/${stateData.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/states/${stateData.slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: stateData.image,
          width: 1200,
          height: 800,
          alt: `Traditional Sarees and Handlooms of ${stateData.name}`,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [stateData.image],
    },
  };
}

export default async function StateCollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const stateData = await getStateBySlug(params.slug);

  if (!stateData) {
    notFound();
  }

  const [allProducts, allStates] = await Promise.all([
    getProducts(),
    getStates(),
  ]);

  // Filter sarees from this state
  const stateProducts = allProducts.filter(
    (p) =>
      p.state.toLowerCase() === stateData.name.toLowerCase() ||
      stateData.name.toLowerCase().includes(p.state.toLowerCase()) ||
      p.state.toLowerCase().includes(stateData.name.toLowerCase())
  );

  const otherStates = allStates
    .filter((s) => s.slug !== stateData.slug)
    .slice(0, 4);

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Explore States', url: '/states' },
    { name: stateData.name, url: `/states/${stateData.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div className="bg-cream-50/40 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Navigation Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-maroon-900 transition">Home</Link>
            <span>/</span>
            <Link href="/states" className="hover:text-maroon-900 transition">Explore States</Link>
            <span>/</span>
            <span className="text-maroon-900 font-semibold">{stateData.name}</span>
          </nav>

          {/* State Cultural Spotlight Banner */}
          <header className="relative rounded-3xl overflow-hidden bg-maroon-950 text-white shadow-2xl border border-gold-500/30">
            <div className="absolute inset-0">
              <Image
                src={stateData.image}
                alt={`Heritage handloom craft of ${stateData.name}`}
                fill
                className="object-cover opacity-35"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-maroon-950 via-maroon-950/80 to-transparent" />
            </div>

            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gold-500/20 text-gold-300 border border-gold-400/40 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>{stateData.region} • Capital: {stateData.capital}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Traditional Sarees of {stateData.name}
              </h1>

              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed font-light">
                {stateData.heritageStory}
              </p>

              <div className="pt-2">
                <p className="text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-2">
                  GI-Tagged & Signature Weaves:
                </p>
                <div className="flex flex-wrap gap-2">
                  {stateData.signatureSarees.map((sig, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/15 backdrop-blur-md text-white font-medium px-3 py-1 rounded-full border border-white/20"
                    >
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* State Products Section */}
          <section aria-labelledby="catalog-heading">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
              <div>
                <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
                  Artisan Creations
                </span>
                <h2 id="catalog-heading" className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
                  {stateData.name} Handloom Catalog
                </h2>
              </div>
              <span className="text-xs text-stone-500">
                Showing {stateProducts.length} authentic {stateData.name} sarees
              </span>
            </div>

            {stateProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
                <p className="text-stone-600 font-serif text-lg font-bold">
                  More Handlooms from {stateData.name} arriving next week!
                </p>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Our team is currently curating fresh weaves directly from weavers in {stateData.name}. Explore other states or browse all sarees.
                </p>
                <Link
                  href="/shop"
                  className="inline-block mt-2 bg-maroon-900 text-white text-xs font-bold px-6 py-2.5 rounded-full"
                >
                  Browse All Sarees
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stateProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          {/* Explore Other States */}
          <section aria-labelledby="other-states-heading" className="pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 id="other-states-heading" className="font-serif text-xl font-bold text-maroon-950">
                Explore More Indian States
              </h2>
              <Link href="/states" className="text-xs font-bold text-maroon-900 hover:underline">
                View All 15+ States →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {otherStates.map((st) => (
                <Link
                  key={st.id}
                  href={`/states/${st.slug}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-md"
                >
                  <Image
                    src={st.image}
                    alt={`Sarees from ${st.name}`}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-gold-300 font-bold uppercase block">
                      {st.region}
                    </span>
                    <span className="font-serif font-bold text-sm block">
                      {st.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
