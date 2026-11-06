'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  ShieldCheck,
  Package,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { itemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, logout, setIsAuthModalOpen, setAuthMode } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const statesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
      if (collectionsRef.current && !collectionsRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
      if (statesRef.current && !statesRef.current.contains(e.target as Node)) {
        setStatesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const topCategories = [
    { name: 'Kanchipuram Silk', href: '/shop?category=Kanchipuram' },
    { name: 'Banarasi Sarees', href: '/shop?category=Banarasi' },
    { name: 'Paithani Sarees', href: '/shop?category=Paithani' },
    { name: 'Mysore Silk', href: '/shop?category=Mysore' },
    { name: 'Pochampally Ikat', href: '/shop?category=Pochampally' },
    { name: 'Uppada Jamdani', href: '/shop?category=Uppada' },
    { name: 'Gadwal Sarees', href: '/shop?category=Gadwal' },
    { name: 'Chanderi Sarees', href: '/shop?category=Chanderi' },
    { name: 'Patola Sarees', href: '/shop?category=Patola' },
    { name: 'Chikankari Georgette', href: '/shop?category=Chikankari' },
    { name: 'Tussar Silk', href: '/shop?category=Tussar' },
    { name: 'Bridal Heritage', href: '/shop?bridal=true' },
    { name: 'View All 23 Categories', href: '/categories' },
  ];

  const indianStates = [
    { name: 'Tamil Nadu', href: '/states/tamil-nadu' },
    { name: 'Uttar Pradesh', href: '/states/uttar-pradesh' },
    { name: 'Telangana', href: '/states/telangana' },
    { name: 'Andhra Pradesh', href: '/states/andhra-pradesh' },
    { name: 'Karnataka', href: '/states/karnataka' },
    { name: 'Maharashtra', href: '/states/maharashtra' },
    { name: 'Gujarat', href: '/states/gujarat' },
    { name: 'Rajasthan', href: '/states/rajasthan' },
    { name: 'West Bengal', href: '/states/west-bengal' },
    { name: 'Odisha', href: '/states/odisha' },
    { name: 'Madhya Pradesh', href: '/states/madhya-pradesh' },
    { name: 'Kerala', href: '/states/kerala' },
    { name: 'Assam', href: '/states/assam' },
    { name: 'Bihar', href: '/states/bihar' },
    { name: 'View All Indian States', href: '/states' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-all duration-300">
      {/* Top Heritage Ribbon */}
      <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-gold-200 text-[11px] font-medium py-1.5 px-4 text-center tracking-wider border-b border-gold-500/20 flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse hidden sm:inline" />
        <span>
          ✨ GRAND UTSAV: Use code <strong>ROYAL500</strong> for ₹500 OFF | Free Pan-India Delivery on orders above ₹1,999 | Silk Mark Certified
        </span>
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'py-2.5 shadow-md' : 'py-3.5 border-b border-stone-100'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-stone-700 hover:text-maroon-900 hover:bg-cream-100 transition"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-maroon-900 hover:bg-cream-100 transition ml-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* SareeHub Logo & Brand Name */}
          <Link href="/" className="flex items-center space-x-2 text-left group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-900 to-maroon-950 border-2 border-gold-400 flex items-center justify-center text-gold-300 shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif font-extrabold text-xl tracking-tighter">S</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-black tracking-tight text-maroon-950 group-hover:text-maroon-800 transition block leading-none">
                Saree<span className="text-gold-600">Hub</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-semibold block mt-0.5">
                Indian Handloom Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase text-stone-700">
            <Link href="/" className="hover:text-maroon-900 transition py-2">
              Home
            </Link>

            <Link href="/shop" className="hover:text-maroon-900 transition py-2">
              Shop Sarees
            </Link>

            {/* Saree Categories Dropdown */}
            <div className="relative" ref={collectionsRef}>
              <button
                onClick={() => {
                  setCollectionsOpen(!collectionsOpen);
                  setStatesOpen(false);
                }}
                className="flex items-center space-x-1 hover:text-maroon-900 transition py-2"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {collectionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gold-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] uppercase font-bold text-maroon-900 tracking-wider px-3 py-1.5 border-b border-stone-100">
                    Handloom & Craft Categories
                  </div>
                  <div className="grid grid-cols-1 gap-1 pt-1.5 max-h-80 overflow-y-auto">
                    {topCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setCollectionsOpen(false)}
                        className="px-3 py-1.5 text-xs text-stone-700 hover:text-maroon-900 hover:bg-cream-100 rounded-lg transition capitalize flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-stone-400">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Explore by States Dropdown */}
            <div className="relative" ref={statesRef}>
              <button
                onClick={() => {
                  setStatesOpen(!statesOpen);
                  setCollectionsOpen(false);
                }}
                className="flex items-center space-x-1 hover:text-maroon-900 transition py-2 text-maroon-900"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>Explore States</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {statesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gold-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] uppercase font-bold text-maroon-900 tracking-wider px-3 py-1.5 border-b border-stone-100 flex items-center justify-between">
                    <span>Sarees Across India</span>
                    <span className="text-[10px] text-gold-600">15+ States</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 pt-1.5 max-h-80 overflow-y-auto">
                    {indianStates.map((state) => (
                      <Link
                        key={state.name}
                        href={state.href}
                        onClick={() => setStatesOpen(false)}
                        className="px-3 py-1.5 text-xs text-stone-700 hover:text-maroon-900 hover:bg-cream-100 rounded-lg transition capitalize flex items-center justify-between"
                      >
                        <span>{state.name}</span>
                        <span className="text-[10px] text-stone-400">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-maroon-900 transition py-2">
              About Us
            </Link>

            <Link href="/contact" className="hover:text-maroon-900 transition py-2">
              Contact
            </Link>
          </nav>

          {/* Right Action Icons: Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Search Bar */}
            <div className="hidden lg:block relative w-56 xl:w-72">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search Kanchipuram, Banarasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cream-50 border border-stone-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-maroon-800 focus:bg-white transition"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              </form>
            </div>

            {/* Wishlist Link */}
            <Link
              href="/account/wishlist"
              className="relative p-2 rounded-full text-stone-700 hover:text-maroon-900 hover:bg-cream-100 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-maroon-800 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 rounded-full text-stone-700 hover:text-maroon-900 hover:bg-cream-100 transition"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-gold-600 text-maroon-950 rounded-full text-[10px] font-black flex items-center justify-center shadow-sm animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Customer Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center space-x-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-stone-200 hover:border-gold-400 hover:bg-cream-50 transition text-stone-700"
              >
                <div className="w-6 h-6 rounded-full bg-maroon-900 text-gold-300 flex items-center justify-center text-xs font-bold">
                  {user ? user.name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs font-medium hidden sm:inline max-w-[90px] truncate">
                  {user ? user.name.split(' ')[0] : 'Sign In'}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:inline" />
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gold-200/80 p-2 z-50 text-xs text-stone-700 animate-in fade-in slide-in-from-top-2 duration-200">
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-stone-100 mb-1">
                        <p className="font-bold text-stone-900">{user.name}</p>
                        <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider bg-gold-100 text-maroon-900 px-2 py-0.5 rounded-md">
                          {user.role === 'admin' ? '👑 Store Owner' : 'Verified Member'}
                        </span>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 rounded-xl text-maroon-900 font-semibold hover:bg-maroon-50 transition"
                        >
                          <SlidersHorizontal className="w-4 h-4 text-gold-600" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <Link
                        href="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-cream-100 transition"
                      >
                        <User className="w-4 h-4 text-stone-500" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/account/orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-cream-100 transition"
                      >
                        <Package className="w-4 h-4 text-stone-500" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        href="/account/wishlist"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-cream-100 transition"
                      >
                        <Heart className="w-4 h-4 text-stone-500" />
                        <span>Wishlist ({wishlistCount})</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition border-t border-stone-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-3 text-center border-b border-stone-100 mb-2">
                        <p className="font-bold text-stone-900">Welcome to SareeHub</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Sign in for personalized sarees</p>
                      </div>

                      <button
                        onClick={() => {
                          setAuthMode('login');
                          setIsAuthModalOpen(true);
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl bg-maroon-900 text-white font-semibold hover:bg-maroon-950 transition mb-1.5"
                      >
                        Customer Sign In
                      </button>

                      <button
                        onClick={() => {
                          setAuthMode('register');
                          setIsAuthModalOpen(true);
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition mb-2"
                      >
                        Create Account
                      </button>

                      <Link
                        href="/admin"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-center text-maroon-900 font-semibold bg-gold-50 rounded-xl hover:bg-gold-100 transition"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />
                        <span>Owner Admin Access</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay / Drawer Input */}
        {searchOpen && (
          <div className="mt-3 pt-3 border-t border-stone-200 lg:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Kanchipuram, Banarasi, Paithani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-cream-50 border border-stone-300 rounded-full pl-10 pr-4 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-maroon-800"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Side Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white shadow-2xl z-10 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-300 font-serif font-bold">
                  S
                </div>
                <span className="font-serif font-bold text-lg">SareeHub</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="p-4 space-y-4 text-sm font-medium text-stone-800 divide-y divide-stone-100">
              <div className="space-y-2 pt-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-stone-800 hover:text-maroon-900 font-semibold"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-stone-800 hover:text-maroon-900 font-semibold"
                >
                  Shop All Sarees
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-stone-800 hover:text-maroon-900 font-semibold"
                >
                  All 23 Saree Categories
                </Link>
                <Link
                  href="/states"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-stone-800 hover:text-maroon-900 font-semibold text-maroon-900"
                >
                  Explore Sarees Across India
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-stone-800 hover:text-maroon-900"
                >
                  About SareeHub
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-stone-800 hover:text-maroon-900"
                >
                  Contact Us
                </Link>
              </div>

              {/* State quick links */}
              <div className="pt-4">
                <p className="text-xs uppercase font-bold text-maroon-900 tracking-wider mb-2">
                  Featured Indian States
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Tamil Nadu', 'Uttar Pradesh', 'Telangana', 'Maharashtra', 'Karnataka', 'Gujarat', 'Rajasthan', 'West Bengal'].map(
                    (st) => (
                      <Link
                        key={st}
                        href={`/states/${st.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 px-2 rounded-lg bg-cream-50 hover:bg-gold-50 text-stone-700"
                      >
                        {st}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Admin Portal quick link */}
              <div className="pt-4">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 py-2.5 px-3 rounded-xl bg-gold-50 text-maroon-900 font-bold border border-gold-300"
                >
                  <SlidersHorizontal className="w-4 h-4 text-gold-600" />
                  <span>Store Admin Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
