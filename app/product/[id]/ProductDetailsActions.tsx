'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Saree } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  ShoppingBag,
  Zap,
  Star,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

interface ProductDetailsActionsProps {
  product: Saree;
}

export default function ProductDetailsActions({ product }: ProductDetailsActionsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [pincodeChecking, setPincodeChecking] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length !== 6) return;
    setPincodeChecking(true);
    setTimeout(() => {
      setPincodeChecking(false);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);
      const formatted = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
      setPincodeResult(
        `Express Delivery available to pincode ${pincode} by ${formatted}. FREE on this order!`
      );
    }, 500);
  };

  const colorVariants = [
    product.color,
    'Royal Wine',
    'Peacock Green',
    'Antique Mustard',
  ].slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Ratings & Silk Mark Badge */}
      <div className="flex items-center space-x-3 text-xs">
        <div className="flex items-center text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="ml-1 font-bold text-stone-800">{product.rating}</span>
        </div>
        <span className="text-stone-300">|</span>
        <a href="#reviews" className="text-stone-500 hover:text-maroon-900 underline">
          {product.reviewCount} Ratings & Verified Reviews
        </a>
        <span className="text-stone-300">|</span>
        <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Silk Mark India Certified
        </span>
      </div>

      {/* Pricing Banner */}
      <div className="p-4 bg-cream-50 rounded-2xl border border-gold-300/60 flex items-baseline justify-between">
        <div>
          <div className="flex items-baseline space-x-3">
            <span className="font-serif text-3xl font-extrabold text-maroon-950">
              {formatPrice(product.discountedPrice)}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">Inclusive of all taxes & GST</p>
        </div>

        <div className="text-right">
          <span className="inline-block bg-maroon-900 text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm">
            Save {product.discountPercentage}% ({formatPrice(product.originalPrice - product.discountedPrice)})
          </span>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">
            Free Express Shipping Included
          </p>
        </div>
      </div>

      {/* Colour Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
          Available Hue: <span className="text-maroon-950">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {colorVariants.map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => setSelectedColor(col)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                selectedColor === col
                  ? 'bg-maroon-900 text-white border-maroon-900 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-gold-400'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Stock Status */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold text-stone-700 uppercase tracking-wider">
            Quantity
          </label>
          <span className="text-emerald-700 font-bold">
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-3 py-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 py-2 font-bold text-stone-900 text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              className="px-3 py-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-xs text-stone-500">
            Total: <strong>{formatPrice(product.discountedPrice * quantity)}</strong>
          </span>
        </div>
      </div>

      {/* CTAs: Add to Cart and Buy Now */}
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-cream-100 hover:bg-gold-100 text-maroon-950 border border-gold-300/80 font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-sm flex items-center justify-center space-x-2 text-sm"
          >
            <ShoppingBag className="w-4 h-4 text-gold-600" />
            <span>Add to Shopping Bag</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-maroon-900 text-white font-bold py-3.5 px-6 rounded-2xl transition duration-200 shadow-lg flex items-center justify-center space-x-2 text-sm"
          >
            <Zap className="w-4 h-4 text-gold-300" />
            <span>Buy Now with 1-Click</span>
          </button>
        </div>

        {addedToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Saree added to your shopping bag. You can continue shopping or checkout anytime!</span>
          </div>
        )}
      </div>

      {/* Delivery Pincode Checker Simulation */}
      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-stone-800">
          <Truck className="w-4 h-4 text-maroon-900" />
          <span>Check Delivery Timeline & COD Availability</span>
        </div>

        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit Pincode (e.g. 560038)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            className="flex-1 p-2 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
          />
          <button
            type="submit"
            disabled={pincodeChecking || pincode.length !== 6}
            className="bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs px-4 py-2 rounded-xl transition disabled:opacity-50"
          >
            {pincodeChecking ? 'Checking...' : 'Check'}
          </button>
        </form>

        {pincodeResult && (
          <p className="text-xs text-emerald-700 font-medium flex items-center gap-1 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{pincodeResult}</span>
          </p>
        )}
      </div>
    </div>
  );
}
