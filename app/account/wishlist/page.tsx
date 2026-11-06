'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs text-stone-500 mb-1">
              <Link href="/account" className="hover:text-maroon-900">Account</Link>
              <span>/</span>
              <span className="text-maroon-900 font-semibold">Wishlist</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-maroon-950">
              My Saved Sarees ({wishlist.length})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-maroon-900 hover:underline"
          >
            Explore More Sarees →
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-cream-100 text-maroon-900 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Save your favorite bridal Kanchipuram, Banarasi, and regional handlooms to cherish and purchase later.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-maroon-900 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md"
            >
              Discover Sarees
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((saree) => (
              <div
                key={saree.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full bg-stone-100">
                  <Image
                    src={saree.images[0]}
                    alt={saree.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(saree)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-600 shadow-sm hover:bg-white"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] text-gold-700 font-bold uppercase tracking-wider block">
                      {saree.state} Handloom
                    </span>
                    <Link
                      href={`/product/${saree.slug}`}
                      className="font-serif font-bold text-sm text-stone-900 hover:text-maroon-900 line-clamp-1 mt-0.5"
                    >
                      {saree.name}
                    </Link>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="font-bold text-maroon-950 text-base">
                        {formatPrice(saree.discountedPrice)}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(saree.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(saree, 1)}
                    className="w-full mt-4 bg-maroon-900 hover:bg-maroon-950 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
                    <span>Move to Shopping Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
