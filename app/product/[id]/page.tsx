import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductById, getProducts, getReviews } from '@/lib/db';
import ProductGallery from '@/components/product/ProductGallery';
import ReviewSection from '@/components/product/ReviewSection';
import ProductCard from '@/components/product/ProductCard';
import ProductDetailsActions from './ProductDetailsActions';
import JsonLd from '@/components/seo/JsonLd';
import { getProductJsonLd, getBreadcrumbJsonLd, SITE_CONFIG } from '@/lib/seo';
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Heart,
  Share2,
} from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Saree Not Found',
      description: 'The requested Indian handloom saree could not be found on SareeHub.',
    };
  }

  const title = `${product.name} | ${product.state} Handloom`;
  const description = `${product.description.slice(0, 155)}... Pure ${product.fabric} with Silk Mark India certification. Buy online on SareeHub.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      `${product.state} Sarees`,
      product.fabric,
      product.color,
      'Silk Mark Certified',
      'Buy Sarees Online',
    ],
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.domain}/product/${product.slug}`,
      siteName: SITE_CONFIG.name,
      images: product.images.map((img) => ({
        url: img,
        width: 1000,
        height: 1250,
        alt: `${product.name} - Authentic ${product.state} Handloom`,
      })),
      locale: SITE_CONFIG.locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const [allProducts, reviews] = await Promise.all([
    getProducts(),
    getReviews(product.id),
  ]);

  // Related products from the same state or category
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.state === product.state || p.category === product.category)
    )
    .slice(0, 4);

  const productJsonLd = getProductJsonLd(product);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Shop Sarees', url: '/shop' },
    { name: product.state, url: `/states/${product.state.toLowerCase().replace(/\s+/g, '-')}` },
    { name: product.name, url: `/product/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="bg-cream-50/40 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500 mb-6 flex-wrap gap-y-1">
            <Link href="/" className="hover:text-maroon-900 transition">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-maroon-900 transition">Sarees</Link>
            <span>/</span>
            <Link
              href={`/states/${product.state.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-maroon-900 transition"
            >
              {product.state}
            </Link>
            <span>/</span>
            <span className="text-maroon-900 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Product Hero Grid */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
            {/* Left Column: Gallery & Zoom */}
            <div className="lg:col-span-6">
              <ProductGallery product={product} />
            </div>

            {/* Right Column: Specifications, Price & Interactive Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* State & Category Badges */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 border border-gold-200 px-3 py-0.5 rounded-full">
                    {product.state} Handloom
                  </span>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-950 leading-tight">
                  {product.name}
                </h1>

                {/* Client Actions & Pincode Checker */}
                <ProductDetailsActions product={product} />

                {/* Detailed Heritage Description */}
                <section aria-labelledby="artisan-story-heading" className="pt-4 border-t border-stone-100">
                  <h2 id="artisan-story-heading" className="font-serif font-bold text-stone-900 text-sm mb-2">
                    Artisan Weaving Narrative
                  </h2>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {product.description}
                  </p>
                </section>

                {/* Saree Highlights Checklist */}
                <section aria-label="Key Highlights" className="space-y-2 pt-2">
                  <h3 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider text-stone-400">
                    Key Craft Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-1.5">
                    {product.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Comprehensive Saree Specifications Table */}
                <section aria-labelledby="specs-heading" className="pt-4 border-t border-stone-100">
                  <h2 id="specs-heading" className="font-serif font-bold text-stone-900 text-sm mb-3">
                    Product Specifications & Weaving Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs bg-cream-50/70 p-4 rounded-2xl border border-stone-200">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Fabric Material</span>
                      <span className="font-semibold text-stone-800">{product.fabric}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Zari Specification</span>
                      <span className="font-semibold text-stone-800">{product.specifications.zariType}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Saree Length</span>
                      <span className="font-semibold text-stone-800">{product.specifications.sareeLength}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Blouse Piece</span>
                      <span className="font-semibold text-stone-800">{product.specifications.blousePiece} ({product.specifications.blouseLength})</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Weave Technique</span>
                      <span className="font-semibold text-stone-800">{product.specifications.weaveTechnique}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">State of Origin</span>
                      <span className="font-semibold text-stone-800">{product.state}, India</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Wash & Care</span>
                      <span className="font-semibold text-stone-800">{product.specifications.washCare}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Certification</span>
                      <span className="font-semibold text-stone-800">{product.specifications.certification}</span>
                    </div>
                  </div>
                </section>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-center text-[11px] text-stone-600">
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span className="font-medium">100% Pure Silk</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <Truck className="w-4 h-4 text-maroon-900 mx-auto mb-1" />
                    <span className="font-medium">Free Express Delivery</span>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-xl">
                    <RotateCcw className="w-4 h-4 text-gold-600 mx-auto mb-1" />
                    <span className="font-medium">7-Day Easy Return</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Customer Reviews Section */}
          <section aria-label="Customer Reviews" className="mt-12 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
            <ReviewSection
              productId={product.id}
              initialReviews={reviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </section>

          {/* Related Saree Collections */}
          {relatedProducts.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-16 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
                    Similar Weaves
                  </span>
                  <h2 id="related-heading" className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
                    You May Also Cherish
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="text-xs font-bold text-maroon-900 hover:underline"
                >
                  View Full Collection →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
