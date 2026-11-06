'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim();
    if (!code) return;
    setCouponLoading(true);
    setCouponMessage(null);
    const res = await applyCoupon(code);
    setCouponMessage({ text: res.message, error: !res.success });
    setCouponLoading(false);
    if (res.success) {
      setCouponCode('');
    }
  };

  const freeDeliveryThreshold = 1999;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white flex items-center justify-between border-b border-gold-500/20">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif font-bold text-lg tracking-wide">
                Your Shopping Bag ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-cream-100/90 border-b border-gold-200/60 p-3 text-xs">
            {remainingForFreeDelivery === 0 ? (
              <div className="flex items-center text-emerald-800 font-medium space-x-1.5">
                <Check className="w-4 h-4 bg-emerald-600 text-white rounded-full p-0.5" />
                <span>Congratulations! You have unlocked <strong>FREE Pan-India Express Delivery</strong>.</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between font-medium text-stone-700 mb-1">
                  <span>Add {formatPrice(remainingForFreeDelivery)} more for FREE Delivery</span>
                  <span className="text-maroon-900 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gold-500 to-maroon-700 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-cream-100 text-maroon-800 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800 mb-1">
                  Your bag is empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mb-5">
                  Explore our handwoven treasures from Kanchipuram, Banaras, Paithan, and across India.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="bg-maroon-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-maroon-950 transition shadow-md"
                >
                  Explore Sarees
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex space-x-3">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-serif text-xs font-bold text-stone-900 hover:text-maroon-800 line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-600 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {item.product.state} | {item.selectedColor || item.product.color}
                      </p>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-xs font-bold text-maroon-900">
                          {formatPrice(item.product.discountedPrice)}
                        </span>
                        {item.product.originalPrice > item.product.discountedPrice && (
                          <span className="text-[10px] text-stone-400 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 bg-stone-50 hover:bg-stone-200 text-stone-700 transition"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 bg-stone-50 hover:bg-stone-200 text-stone-700 transition"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-stone-800">
                        {formatPrice(item.product.discountedPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals and CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-cream-50 border-t border-stone-200 space-y-3">
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-800">
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(discount)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-900 font-bold hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. UTSAV10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-maroon-800"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        disabled={couponLoading || !couponCode.trim()}
                        className="bg-maroon-900 hover:bg-maroon-950 text-white text-xs font-semibold px-4 py-2 rounded-xl transition disabled:opacity-50"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>

                    {/* Quick Coupon Suggestions */}
                    <div className="flex gap-1.5 mt-2">
                      {['UTSAV10', 'ROYAL500', 'BRIDAL20'].map((code) => (
                        <button
                          key={code}
                          onClick={() => handleApplyCoupon(code)}
                          className="text-[10px] bg-white border border-gold-300 text-maroon-900 font-medium px-2 py-0.5 rounded-full hover:bg-gold-50"
                        >
                          +{code}
                        </button>
                      ))}
                    </div>

                    {couponMessage && (
                      <p
                        className={`text-[11px] mt-1.5 ${
                          couponMessage.error ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {couponMessage.text}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="text-xs space-y-1.5 pt-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-200 text-stone-900 text-sm font-bold">
                  <span>Total (incl. GST)</span>
                  <span className="text-maroon-900 text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full text-center py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-100 transition"
                >
                  View Full Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-maroon-900 to-maroon-800 text-white text-xs font-semibold hover:from-maroon-950 hover:to-maroon-900 transition flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic Handlooms | Silk Mark India</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
