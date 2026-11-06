import { getCategories, getStates, getProducts } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { FolderTree, MapPin, Sparkles, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const [categories, states, products] = await Promise.all([
    getCategories(),
    getStates(),
    getProducts(),
  ]);

  return (
    <div className="p-8 space-y-10">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Categories & State Collections Manager
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review all 23 national saree classifications and 15+ state handloom collection hubs
        </p>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2 text-maroon-950">
            <FolderTree className="w-5 h-5 text-gold-600" />
            <h2 className="font-serif font-bold text-xl">Saree Categories ({categories.length})</h2>
          </div>
          <span className="text-xs text-stone-500">Live on Storefront</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => {
            const count = products.filter((p) => p.category.toLowerCase().includes(c.name.toLowerCase().replace(' Sarees', ''))).length;
            return (
              <div key={c.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center space-x-3.5">
                <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-serif font-bold text-stone-900">{c.name}</h4>
                  <p className="text-[11px] text-stone-500">{c.stateOrigin}</p>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    {count} Live Products
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indian States Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2 text-maroon-950">
            <MapPin className="w-5 h-5 text-gold-600" />
            <h2 className="font-serif font-bold text-xl">State Handloom Hubs ({states.length})</h2>
          </div>
          <span className="text-xs text-stone-500">Dedicated Regional Pages</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((st) => (
            <div key={st.id} className="p-4 bg-cream-50/70 rounded-2xl border border-gold-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gold-700 font-bold uppercase">{st.region}</span>
                <h4 className="font-serif font-bold text-stone-900 text-sm">{st.name}</h4>
                <p className="text-[11px] text-stone-500 truncate max-w-[200px]">
                  {st.signatureSarees.join(', ')}
                </p>
              </div>

              <Link
                href={`/states/${st.slug}`}
                target="_blank"
                className="text-xs text-maroon-900 font-bold hover:underline flex items-center space-x-1"
              >
                <span>View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
