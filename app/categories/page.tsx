import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db';
import { Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function CategoriesDirectoryPage() {
  const categories = await getCategories();

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-900 uppercase tracking-widest bg-gold-100 border border-gold-300 px-4 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Complete Weaves Compendium</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-maroon-950 tracking-tight">
            All 23 Saree Categories
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From ancient sacred pitloom weaves to contemporary couture silhouettes, explore the definitive encyclopedia of Indian saree varieties available at SareeHub.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name.replace(' Sarees', ''))}`}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">
                    Origin: {cat.stateOrigin}
                  </span>
                  <h2 className="font-serif text-lg font-bold">
                    {cat.name}
                  </h2>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                  <span className="font-bold text-stone-700 block text-[10px] uppercase">Popular Fabric</span>
                  <span>{cat.popularFabric}</span>
                </div>

                <div className="pt-1 text-xs font-bold text-maroon-900 group-hover:text-maroon-950 flex items-center space-x-1">
                  <span>Shop {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
