'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Saree } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag, Eye, Star, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Saree;
  onQuickView?: (product: Saree) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageIndex, setImageIndex] = useState(0);
  const isWishlisted = isInWishlist(product.id);

  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-luxury-hover hover:border-gold-300 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer"
        onMouseEnter={() => hasMultipleImages && setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
      >
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[imageIndex] || product.images[0]}
            alt={`${product.name} - ${product.fabric} from ${product.state}, India`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges on Top-Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discountPercentage > 0 && (
            <span className="bg-maroon-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold-500 text-maroon-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-stone-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
              NEW WEAVE
            </span>
          )}
        </div>

        {/* Wishlist Button on Top-Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-maroon-900 text-white shadow-md'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-maroon-900 shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-gold-300' : ''}`} />
        </button>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold py-2 rounded-xl shadow-md transition flex items-center justify-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5 text-maroon-900" />
              <span>Quick View</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 bg-gradient-to-r from-maroon-900 to-maroon-800 hover:from-maroon-950 hover:to-maroon-900 text-white text-xs font-semibold py-2 rounded-xl shadow-md transition flex items-center justify-center space-x-1"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Saree Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* State & Fabric Tag */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-semibold text-gold-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600 inline-block"></span>
              {product.state}
            </span>
            <span className="text-stone-400 capitalize">{product.fabric.split(' ')[0]}</span>
          </div>

          {/* Saree Name */}
          <Link
            href={`/product/${product.slug}`}
            className="font-serif font-bold text-sm text-stone-900 hover:text-maroon-900 transition line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>
        </div>

        <div className="pt-3 border-t border-stone-100 mt-3">
          {/* Ratings & Authenticity */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 text-xs">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold text-stone-800 text-xs">{product.rating}</span>
              <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
            </div>

            <div className="flex items-center space-x-1 text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Silk Mark</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="font-bold text-maroon-950 text-base">
                {formatPrice(product.discountedPrice)}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <span className="text-[11px] font-semibold text-emerald-700">
              Save {formatPrice(product.originalPrice - product.discountedPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
