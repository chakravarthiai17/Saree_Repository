'use client';

import React, { useState, useEffect } from 'react';
import { Coupon } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Tag, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 10,
    minOrderValue: 2999,
    maxDiscount: 2000,
    description: '',
    active: true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon),
      });

      if (res.ok) {
        const saved = await res.json();
        setCoupons([saved, ...coupons]);
        setIsAdding(false);
        setNewCoupon({
          code: '',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 2999,
          maxDiscount: 2000,
          description: '',
          active: true,
        });
        setToastMessage(`Coupon "${saved.code}" created successfully!`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    try {
      const res = await fetch(`/api/coupons?code=${code}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCoupons(coupons.filter((c) => c.code !== code));
        setToastMessage(`Coupon "${code}" deleted.`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Coupons & Promotional Privileges
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Create and manage festive discounts and first-order privileges
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4 text-gold-300" />
          <span>{isAdding ? 'Cancel' : 'Create New Coupon'}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-2xl flex items-center space-x-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Add Coupon Form */}
      {isAdding && (
        <form onSubmit={handleAddCoupon} className="p-6 bg-white rounded-3xl border border-gold-300 shadow-sm space-y-4 text-xs">
          <h3 className="font-serif font-bold text-base text-stone-900">Create New Coupon Code</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. DIWALI25"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono uppercase"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Discount Type</label>
              <select
                value={newCoupon.discountType}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Discount Value</label>
              <input
                type="number"
                min={1}
                value={newCoupon.discountValue}
                onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Minimum Order Value (₹)</label>
              <input
                type="number"
                min={0}
                value={newCoupon.minOrderValue}
                onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: Number(e.target.value) })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Max Cap Discount (₹)</label>
              <input
                type="number"
                min={0}
                value={newCoupon.maxDiscount}
                onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: Number(e.target.value) })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Description</label>
              <input
                type="text"
                placeholder="e.g. 10% OFF on all wedding silks"
                value={newCoupon.description}
                onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-maroon-900 text-white font-bold px-6 py-2.5 rounded-xl shadow-md"
          >
            Save & Activate Coupon
          </button>
        </form>
      )}

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="font-mono font-bold text-lg text-maroon-950 bg-cream-100 border border-gold-300 px-3 py-1 rounded-xl">
                  {c.code}
                </span>
                <button
                  onClick={() => handleDeleteCoupon(c.code)}
                  className="text-stone-400 hover:text-red-600 p-1"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3">
                <span className="font-serif font-bold text-2xl text-stone-900">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : formatPrice(c.discountValue) + ' OFF'}
                </span>
                <p className="text-xs text-stone-600 mt-1">{c.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t text-[11px] text-stone-500 space-y-1">
              <div>Min Order Value: <strong>{formatPrice(c.minOrderValue)}</strong></div>
              {c.maxDiscount && <div>Max Discount Cap: <strong>{formatPrice(c.maxDiscount)}</strong></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
