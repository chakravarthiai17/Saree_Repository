'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Package,
  Heart,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Plus,
  Trash2,
  SlidersHorizontal,
} from 'lucide-react';

export default function AccountProfilePage() {
  const { user, isAdmin, logout, setIsAuthModalOpen } = useAuth();

  const [addresses, setAddresses] = useState(
    user?.savedAddresses?.length
      ? user.savedAddresses
      : [
          {
            fullName: user?.name || 'Ananya Sharma',
            phone: user?.phone || '+91 91234 56789',
            email: user?.email || 'ananya@example.com',
            streetAddress: 'A-402, Royal Palms Residency, Indiranagar 100ft Road',
            landmark: 'Near Metro Station',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
          },
        ]
  );

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.streetAddress || !newAddr.pincode) return;
    setAddresses([...addresses, newAddr]);
    setIsAddingAddress(false);
    setNewAddr({
      fullName: '',
      phone: '',
      email: '',
      streetAddress: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
    });
  };

  const removeAddress = (idx: number) => {
    setAddresses(addresses.filter((_, i) => i !== idx));
  };

  if (!user) {
    return (
      <div className="bg-cream-50/60 min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-stone-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-cream-100 text-maroon-900 mx-auto flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">Sign In to Your Account</h2>
          <p className="text-xs text-stone-500">
            Sign in or create an account to view your orders, saved addresses, and bridal wishlist.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-maroon-900 hover:bg-maroon-950 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-300/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maroon-900 to-maroon-950 text-gold-300 flex items-center justify-center font-serif text-2xl font-bold border-2 border-gold-400 shadow-md">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl font-bold text-stone-900">{user.name}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-2 py-0.5 rounded-md">
                  {user.role === 'admin' ? '👑 Store Owner' : 'Verified Member'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{user.email} | {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href="/admin"
                className="bg-gold-50 hover:bg-gold-100 border border-gold-300 text-maroon-900 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Account Nav Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/account/orders"
            className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-gold-300 shadow-sm flex items-center space-x-3 transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-cream-100 text-maroon-900 flex items-center justify-center group-hover:scale-105 transition">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">My Orders & Tracking</h4>
              <p className="text-[11px] text-stone-500">Track shipments & order receipts</p>
            </div>
          </Link>

          <Link
            href="/account/wishlist"
            className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-gold-300 shadow-sm flex items-center space-x-3 transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-cream-100 text-maroon-900 flex items-center justify-center group-hover:scale-105 transition">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">My Wishlist</h4>
              <p className="text-[11px] text-stone-500">Saved weaves & bridal trousseau</p>
            </div>
          </Link>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cream-100 text-maroon-900 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Silk Mark Privileges</h4>
              <p className="text-[11px] text-stone-500">100% verified pure handloom buyer</p>
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center space-x-2 text-maroon-950">
              <MapPin className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif font-bold text-xl">Saved Shipping Addresses</h3>
            </div>
            <button
              onClick={() => setIsAddingAddress(!isAddingAddress)}
              className="bg-maroon-900 hover:bg-maroon-950 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingAddress ? 'Cancel' : 'Add New Address'}</span>
            </button>
          </div>

          {/* Add Address Form */}
          {isAddingAddress && (
            <form onSubmit={handleAddAddress} className="p-5 bg-cream-50 rounded-2xl border border-gold-300/60 space-y-4 text-xs">
              <h4 className="font-bold text-stone-900">Add New Delivery Location</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="p-2.5 bg-white border border-stone-300 rounded-xl"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="p-2.5 bg-white border border-stone-300 rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address, House No. *"
                  value={newAddr.streetAddress}
                  onChange={(e) => setNewAddr({ ...newAddr, streetAddress: e.target.value })}
                  className="sm:col-span-2 p-2.5 bg-white border border-stone-300 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={newAddr.landmark}
                  onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                  className="p-2.5 bg-white border border-stone-300 rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="City / Town *"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="p-2.5 bg-white border border-stone-300 rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="State *"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="p-2.5 bg-white border border-stone-300 rounded-xl"
                />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-Digit Pincode *"
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  className="p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="bg-maroon-900 text-white font-bold px-5 py-2 rounded-xl"
              >
                Save Address
              </button>
            </form>
          )}

          {/* Addresses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr, idx) => (
              <div key={idx} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2 relative group">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-stone-900 text-sm">{addr.fullName}</span>
                  {addresses.length > 1 && (
                    <button
                      onClick={() => removeAddress(idx)}
                      className="text-stone-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {addr.streetAddress}
                  {addr.landmark && `, ${addr.landmark}`}
                  <br />
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-stone-600">Phone: {addr.phone}</p>
                <div className="pt-2 flex items-center space-x-1 text-[10px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Delivery Destination</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
