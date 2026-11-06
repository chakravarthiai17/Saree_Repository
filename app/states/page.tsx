import Link from 'next/link';
import Image from 'next/image';
import { getStates } from '@/lib/db';
import { Compass, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function StatesDirectoryPage() {
  const states = await getStates();

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-maroon-900 uppercase tracking-widest bg-gold-100/70 border border-gold-300 px-4 py-1 rounded-full">
            <Compass className="w-4 h-4 text-gold-600" />
            <span>Pan-India Handloom Tapestry</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-maroon-950 tracking-tight">
            Explore Sarees Across India
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every state of Bharat nurtures its distinct handloom tradition—born of indigenous silk yarns, sacred temple architecture, and generational artisan devotion. Select any state to uncover its royal weaves.
          </p>
        </div>

        {/* States Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {states.map((st) => (
            <Link
              key={st.id}
              href={`/states/${st.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-gold-300 transition-all duration-500 flex flex-col hover:-translate-y-1.5"
            >
              {/* Image banner */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                <Image
                  src={st.image}
                  alt={st.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">
                      {st.region} • Capital: {st.capital}
                    </span>
                    <h2 className="font-serif text-2xl font-bold tracking-wide">
                      {st.name}
                    </h2>
                  </div>
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-gold-500 group-hover:text-maroon-950 transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {st.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Traditional Sarees of {st.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {st.signatureSarees.map((weave, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-cream-100 text-maroon-950 font-medium px-2.5 py-0.5 rounded-full border border-gold-200"
                      >
                        {weave}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs font-bold text-maroon-900 group-hover:text-maroon-950 flex items-center space-x-1">
                  <span>Explore {st.name} Handloom Collection</span>
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
