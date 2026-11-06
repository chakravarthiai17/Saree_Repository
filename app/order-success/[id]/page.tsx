'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Order } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Printer,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire festive celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#801e35', '#dab33b', '#c59b27', '#1b4332'],
    });

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (e) {
        console.error('Failed to load order', e);
      }
      setLoading(false);
    }

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-maroon-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg font-bold text-maroon-950">Confirming Your Handloom Order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900">Order Not Found</h2>
          <p className="text-xs text-stone-500">We could not locate this order id. Please check your account orders.</p>
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

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Celebration Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold-300 shadow-lg text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 border border-gold-200 px-3.5 py-1 rounded-full">
            Payment & Order Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 mt-3 mb-2">
            Namaste {order.customer.fullName}! Your Saree is Booked.
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            Order ID: <strong className="text-maroon-900 font-mono">{order.orderNumber}</strong>. We are hand-inspecting your saree and packaging it in an artisan muslin keepsake box.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice Receipt</span>
            </button>

            <Link
              href="/account/orders"
              className="px-5 py-2 bg-maroon-900 hover:bg-maroon-950 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
            >
              <span>View In My Orders</span>
            </Link>
          </div>
        </div>

        {/* Live Delivery Tracker Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
            <div className="flex items-center space-x-2 text-maroon-950">
              <Truck className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif font-bold text-lg">Delivery & Tracking Status</h3>
            </div>
            <div className="text-xs text-stone-500">
              Tracking No: <span className="font-mono font-bold text-stone-800">{order.trackingNumber}</span> ({order.carrier})
            </div>
          </div>

          <div className="p-4 bg-cream-50 rounded-2xl border border-gold-200/70 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Current Status</span>
                <span className="font-bold text-sm text-maroon-950">{order.orderStatus}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Estimated Arrival</span>
              <span className="font-bold text-xs text-emerald-800">{formatDate(order.estimatedDelivery)}</span>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="relative pl-6 space-y-6 border-l-2 border-stone-200 ml-3">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-maroon-900 border-4 border-white shadow-sm" />
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-bold text-xs text-stone-900">{step.status}</span>
                    <span className="text-[10px] text-stone-400">{step.time}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Items Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-maroon-950 font-serif font-bold text-base pb-2 border-b">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Delivery Address</span>
            </div>
            <p className="font-bold text-stone-900">{order.customer.fullName}</p>
            <p className="text-stone-600 leading-relaxed">
              {order.customer.streetAddress}
              {order.customer.landmark && `, ${order.customer.landmark}`}
              <br />
              {order.customer.city}, {order.customer.state} - {order.customer.pincode}
            </p>
            <p className="text-stone-600">Phone: {order.customer.phone}</p>
            <p className="text-stone-600">Email: {order.customer.email}</p>
          </div>

          {/* Payment & Invoice Summary */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="font-serif font-bold text-base text-maroon-950">Payment Summary</span>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                {order.paymentStatus}
              </span>
            </div>
            <div className="space-y-1.5 text-stone-600">
              <div className="flex justify-between">
                <span>Payment Mode</span>
                <span className="font-bold text-stone-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Savings ({order.couponCode})</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-sm text-maroon-950">
                <span>Total Paid</span>
                <span className="text-base font-serif">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Sarees List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-maroon-950 border-b pb-3">
            Handlooms in this Order ({order.items.length})
          </h3>

          <div className="divide-y divide-stone-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-stone-900">{item.name}</h5>
                    <p className="text-xs text-stone-500">{item.category} | Qty: {item.quantity}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3" /> Silk Mark Verified
                    </span>
                  </div>
                </div>

                <span className="font-bold text-sm text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-maroon-900 to-maroon-800 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md hover:from-maroon-950 transition"
          >
            <span>Continue Shopping Collections</span>
            <ArrowRight className="w-4 h-4 text-gold-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
