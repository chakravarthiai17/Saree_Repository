'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ArrowLeft,
  Check,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleApplyCoupon = async (codeToUse?: string) => {
    const code = (codeToUse || couponInput).trim();
    if (!code) return;
    setCouponLoading(true);
    setCouponMessage(null);
    const res = await applyCoupon(code);
    setCouponMessage({ text: res.message, error: !res.success });
    setCouponLoading(false);
    if (res.success) {
      setCouponInput('');
    }
  };

  const freeDeliveryThreshold = 1999;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-cream-50/60 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center border border-stone-200 shadow-sm space-y-5">
          <div className="w-20 h-20 rounded-full bg-cream-100 text-maroon-900 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Your Shopping Bag is Currently Empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Discover exquisite handwoven sarees from Kanchipuram, Banaras, Paithan, and across 15+ Indian states with Silk Mark certified purity.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-maroon-900 to-maroon-800 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md hover:from-maroon-950 transition"
            >
              <span>Explore Sarees</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
              Shopping Bag ({cart.length} {cart.length === 1 ? 'Saree' : 'Sarees'})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Review your handpicked heirloom sarees before proceeding to secure checkout
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-maroon-900 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-gold-300 shadow-sm">
          {remainingForFreeDelivery === 0 ? (
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-semibold">
              <Check className="w-4 h-4 bg-emerald-600 text-white rounded-full p-0.5" />
              <span>You have unlocked <strong>FREE Pan-India Express Delivery</strong>.</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-700">
                <span>Add <strong>{formatPrice(remainingForFreeDelivery)}</strong> more for FREE Pan-India Delivery</span>
                <span className="font-bold text-maroon-900">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold-500 to-maroon-800 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm divide-y divide-stone-100">
              {cart.map((item) => (
                <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4">
                  <div className="relative w-28 h-36 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-serif font-bold text-base text-stone-900 hover:text-maroon-900"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-600 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-stone-500 mt-1">
                        <span>Origin: <strong className="text-stone-800">{item.product.state}</strong></span>
                        <span>•</span>
                        <span>Fabric: <strong className="text-stone-800">{item.product.fabric}</strong></span>
                        <span>•</span>
                        <span>Hue: <strong className="text-stone-800">{item.selectedColor || item.product.color}</strong></span>
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-bold text-maroon-950 text-lg">
                          {formatPrice(item.product.discountedPrice)}
                        </span>
                        {item.product.originalPrice > item.product.discountedPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {item.product.discountPercentage}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-50 mt-3">
                      <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-stone-100 text-stone-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 py-1.5 font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-stone-100 text-stone-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block uppercase">Subtotal</span>
                        <span className="font-bold text-sm text-stone-900">
                          {formatPrice(item.product.discountedPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Coupon Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-maroon-950 border-b pb-3">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Promotional Coupon
                </label>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-2xl p-3 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-900">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <p className="font-bold">{appliedCoupon.code} Applied</p>
                        <p className="text-[11px] text-emerald-700">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-700 font-bold hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 p-2.5 bg-cream-50 border border-stone-300 rounded-xl text-xs uppercase placeholder:normal-case focus:outline-none focus:border-maroon-800"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        disabled={couponLoading || !couponInput.trim()}
                        className="bg-maroon-900 hover:bg-maroon-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition disabled:opacity-50"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>

                    {/* Quick suggestion pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['UTSAV10', 'ROYAL500', 'BRIDAL20'].map((code) => (
                        <button
                          key={code}
                          onClick={() => handleApplyCoupon(code)}
                          className="text-[11px] bg-cream-100 hover:bg-gold-50 text-maroon-900 border border-gold-300 px-2.5 py-0.5 rounded-full font-medium"
                        >
                          +{code}
                        </button>
                      ))}
                    </div>

                    {couponMessage && (
                      <p className={`text-xs mt-2 ${couponMessage.error ? 'text-red-600' : 'text-emerald-700'}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Handloom GST (5%)</span>
                  <span className="font-semibold text-stone-900">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-stone-200 text-stone-900 text-base font-bold">
                  <span>Total Amount</span>
                  <span className="text-maroon-950 text-xl font-serif">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-maroon-900 text-white font-bold py-4 rounded-2xl shadow-xl transition flex items-center justify-center space-x-2 text-sm tracking-wide"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </Link>

              <div className="pt-2 text-center text-[11px] text-stone-500 space-y-1">
                <div className="flex items-center justify-center space-x-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Silk Mark India Guaranteed Pure Handlooms</span>
                </div>
                <p>Safe & Encrypted 256-bit Payment Options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
