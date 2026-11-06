'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data: Order[] = await res.json();
          // Filter if user has specific email, or show all customer orders for demo
          if (user?.email) {
            const userOrders = data.filter(
              (o) => o.customer.email.toLowerCase() === user.email.toLowerCase()
            );
            setOrders(userOrders.length > 0 ? userOrders : data);
          } else {
            setOrders(data);
          }
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    loadOrders();
  }, [user]);

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-stone-500 mb-1">
              <Link href="/account" className="hover:text-maroon-900">Account</Link>
              <span>/</span>
              <span className="text-maroon-900 font-semibold">My Orders</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-maroon-950">
              My Orders & Shipment Tracking
            </h1>
          </div>
          <Link
            href="/shop"
            className="self-start sm:self-auto bg-maroon-900 hover:bg-maroon-950 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition shadow-sm"
          >
            Explore Sarees
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-maroon-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-500 mt-3 font-medium">Fetching your handloom orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cream-100 text-maroon-900 mx-auto flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">No Orders Placed Yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Explore authentic weaves from across 15+ Indian states and bring home your first heirloom.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-maroon-900 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6"
              >
                {/* Order Top Ribbon */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-maroon-950 text-sm">
                      {ord.orderNumber}
                    </span>
                    <span className="text-stone-400 ml-2">Placed on {formatDate(ord.createdAt)}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                      ord.orderStatus === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : ord.orderStatus === 'Dispatched'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {ord.orderStatus}
                    </span>

                    <button
                      onClick={() => setActiveTrackingOrder(ord)}
                      className="bg-cream-100 hover:bg-gold-100 text-maroon-950 border border-gold-300 font-semibold px-3 py-1 rounded-xl text-xs flex items-center space-x-1"
                    >
                      <Truck className="w-3.5 h-3.5 text-gold-600" />
                      <span>Live Tracking</span>
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-stone-100">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="text-xs">
                          <h4 className="font-serif font-bold text-sm text-stone-900">{item.name}</h4>
                          <p className="text-stone-500">{item.category} • Quantity: {item.quantity}</p>
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

                {/* Bottom Order Info */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-600 gap-3">
                  <div>
                    <span>Delivery Address: <strong>{ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})</strong></span>
                    <span className="block text-[11px] text-stone-400 mt-0.5">
                      Carrier: {ord.carrier} | Tracking: {ord.trackingNumber}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block">Total Paid ({ord.paymentMethod})</span>
                      <span className="font-serif font-bold text-base text-maroon-950">
                        {formatPrice(ord.total)}
                      </span>
                    </div>

                    <Link
                      href={`/order-success/${ord.id}`}
                      className="text-maroon-900 font-bold hover:underline flex items-center space-x-1"
                    >
                      <span>Receipt</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Live Tracking Modal */}
        {activeTrackingOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-gold-300">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <h3 className="font-serif font-bold text-xl text-maroon-950">
                    Live Shipment Tracker
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    {activeTrackingOrder.carrier}: {activeTrackingOrder.trackingNumber}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTrackingOrder(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              {/* Status Milestone Timeline */}
              <div className="relative pl-6 space-y-6 border-l-2 border-stone-200 ml-3">
                {activeTrackingOrder.timeline.map((step, idx) => (
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

              <div className="p-3 bg-cream-50 rounded-2xl border border-gold-200 text-xs text-stone-600">
                Estimated Delivery to <strong>{activeTrackingOrder.customer.city}</strong> by{' '}
                <strong>{formatDate(activeTrackingOrder.estimatedDelivery)}</strong>.
              </div>

              <button
                onClick={() => setActiveTrackingOrder(null)}
                className="w-full bg-stone-900 hover:bg-black text-white font-semibold py-2.5 rounded-xl text-xs"
              >
                Close Tracking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
