'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Saree } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { X, Star, ShoppingBag, Heart, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface QuickViewModalProps {
  product: Saree | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImg, setSelectedImg] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-200/80 max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 bg-cream-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-stone-200">
              <Image
                src={product.images[selectedImg] || product.images[0]}
                alt={`${product.name} - ${product.fabric} Quick View`}
                fill
                className="object-cover object-top"
              />
              <div className="absolute top-3 left-3 bg-maroon-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                {product.discountPercentage}% OFF
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImg === idx
                        ? 'border-maroon-900 shadow-md ring-2 ring-gold-400/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} Angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* State & Category */}
              <div className="flex items-center space-x-2 text-xs font-semibold text-gold-700 uppercase tracking-wider mb-1">
                <span>{product.state}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>

              {/* Ratings */}
              <div className="flex items-center space-x-3 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold text-stone-800">{product.rating}</span>
                </div>
                <span className="text-stone-400">|</span>
                <span className="text-stone-500">{product.reviewCount} Verified Reviews</span>
                <span className="text-stone-400">|</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Silk Mark
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 p-3 bg-cream-50 rounded-2xl flex items-baseline justify-between border border-gold-200/50">
                <div className="flex items-baseline space-x-2.5">
                  <span className="font-bold text-2xl text-maroon-950 font-serif">
                    {formatPrice(product.discountedPrice)}
                  </span>
                  {product.originalPrice > product.discountedPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  You Save {formatPrice(product.originalPrice - product.discountedPrice)}
                </span>
              </div>

              {/* Short Specs */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-2xl">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Fabric</span>
                  <span className="font-medium text-stone-800">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Zari Type</span>
                  <span className="font-medium text-stone-800">{product.specifications.zariType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Length</span>
                  <span className="font-medium text-stone-800">{product.specifications.sareeLength} + 0.8m Blouse</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">Origin</span>
                  <span className="font-medium text-stone-800">{product.state}, India</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-4 space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Highlights</p>
                {product.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-stone-700">
                    <Check className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-stone-200 space-y-2.5">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-maroon-900 text-white font-semibold py-3 px-4 rounded-2xl shadow-md transition flex items-center justify-center space-x-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300" />
                  <span>{addedAnimation ? 'Added to Bag!' : 'Add to Shopping Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-2xl border transition flex items-center justify-center ${
                    isWishlisted
                      ? 'bg-maroon-900 text-white border-maroon-900'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-gold-300' : ''}`} />
                </button>
              </div>

              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full py-2.5 text-center text-xs font-semibold text-maroon-900 hover:text-maroon-950 flex items-center justify-center space-x-1 group"
              >
                <span>View Complete Saree Details & Customer Reviews</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
