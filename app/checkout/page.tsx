'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import PaymentModal from '@/components/checkout/PaymentModal';
import {
  ShieldCheck,
  Lock,
  Truck,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, tax, total, appliedCoupon } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState({
    fullName: user?.name || 'Ananya Sharma',
    phone: user?.phone || '+91 91234 56789',
    email: user?.email || 'ananya@example.com',
    streetAddress: 'A-402, Royal Palms Residency, Indiranagar 100ft Road',
    landmark: 'Opposite Metro Pillar 42',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="bg-cream-50/60 min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl text-center border border-stone-200 max-w-md w-full space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900">Your Bag is Empty</h2>
          <p className="text-xs text-stone-500">Please add sarees to your bag before checking out.</p>
          <Link
            href="/shop"
            className="inline-block bg-maroon-900 text-white font-bold text-xs px-6 py-2.5 rounded-full"
          >
            Explore Sarees
          </Link>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.streetAddress || !address.city || !address.pincode) {
      setFormError('Please fill in all mandatory shipping address fields.');
      return;
    }
    setFormError('');
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
              Checkout & Delivery Address
            </h1>
            <p className="text-xs text-stone-500">
              Provide your delivery address for expedited handloom packaging
            </p>
          </div>
          <Link
            href="/cart"
            className="flex items-center space-x-1.5 text-xs font-semibold text-maroon-900 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </Link>
        </div>

        <form onSubmit={handleProceedToPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Shipping Address Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-2 text-maroon-950">
                    <MapPin className="w-5 h-5 text-gold-600" />
                    <h3 className="font-serif font-bold text-lg">Delivery Information</h3>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                    Pan-India Express Surface
                  </span>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Phone Number (For OTP Delivery) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-stone-700 block mb-1">Email (For Order Updates & Tracking) *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-stone-700 block mb-1">Street Address, House/Flat No., Apartment *</label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={address.streetAddress}
                        onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Silk Board or Temple"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">State / Province *</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">6-Digit Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center space-x-2 text-xs text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Shipment insured with tamper-proof seal and Silk Mark certification card</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Trigger */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
                <h3 className="font-serif font-bold text-lg text-maroon-950 border-b pb-3">
                  Items in Shipment ({cart.length})
                </h3>

                {/* Items List Mini */}
                <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-stone-100 pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-3 first:pt-0 flex space-x-3 items-center">
                      <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 text-xs">
                        <p className="font-serif font-bold text-stone-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-[11px] text-stone-500">Qty: {item.quantity} | {item.product.state}</p>
                        <p className="font-bold text-maroon-950 mt-0.5">{formatPrice(item.product.discountedPrice * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Calculation Summary */}
                <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Coupon Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Pan-India Shipping</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-semibold text-stone-900">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-stone-200 text-stone-900 text-base font-bold">
                    <span>Total Payable</span>
                    <span className="text-maroon-950 text-xl font-serif">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Button to open Payment Modal */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-maroon-900 text-white font-bold py-4 rounded-2xl shadow-xl transition flex items-center justify-center space-x-2 text-sm tracking-wide"
                >
                  <Lock className="w-4 h-4 text-gold-300" />
                  <span>Select Payment Method ({formatPrice(total)})</span>
                </button>

                <div className="text-center text-[10px] text-stone-500 space-y-1">
                  <p>UPI, Credit/Debit Cards, Net Banking, COD & Razorpay Sandbox</p>
                  <p className="text-emerald-700 font-medium">Safe 256-Bit SSL Encrypted Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          shippingAddress={address}
        />
      </div>
    </div>
  );
}
