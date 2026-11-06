'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, ZoomIn, Share2, Heart } from 'lucide-react';
import { Saree } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';

interface ProductGalleryProps {
  product: Saree;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shareSuccess, setShareSuccess] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this authentic ${product.category} from ${product.state} on SareeHub!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  const currentImg = product.images[selectedImg] || product.images[0];

  return (
    <div className="space-y-4">
      {/* Main Image Frame with Zoom */}
      <div
        className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-stone-100 shadow-md border border-stone-200 cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={currentImg}
          alt={`${product.name} - View ${selectedImg + 1} (${product.fabric}, ${product.state})`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover object-top transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
              : undefined
          }
        />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          <span className="bg-maroon-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {product.discountPercentage}% OFF
          </span>
          <span className="bg-white/90 text-stone-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Silk Mark Certified</span>
          </span>
        </div>

        {/* Top-Right Share and Wishlist Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isWishlisted
                ? 'bg-maroon-900 text-white'
                : 'bg-white/90 text-stone-700 hover:text-maroon-900 hover:bg-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-gold-300' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/90 text-stone-700 hover:text-maroon-900 hover:bg-white shadow-md backdrop-blur-md transition"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Hint Banner */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center space-x-1 pointer-events-none opacity-80 group-hover:opacity-0 transition">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Hover to Zoom Texture</span>
        </div>

        {shareSuccess && (
          <div className="absolute bottom-4 left-4 bg-emerald-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Link copied to clipboard!
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {product.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(idx)}
              className={`relative w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                selectedImg === idx
                  ? 'border-maroon-900 shadow-md ring-2 ring-gold-400/50 scale-95'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} Detailed Angle ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
