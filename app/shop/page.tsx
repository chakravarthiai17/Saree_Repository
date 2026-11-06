'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Saree } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import QuickViewModal from '@/components/product/QuickViewModal';
import {
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Search,
  X,
  PackageX,
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Saree | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState('bestseller');

  // Filter State
  const initialCategory = searchParams.get('category') || '';
  const initialState = searchParams.get('state') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialBridal = searchParams.get('bridal') === 'true';

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [filters, setFilters] = useState({
    category: initialCategory,
    state: initialState,
    fabric: '',
    color: '',
    occasion: initialBridal ? 'Bridal' : '',
    minPrice: 0,
    maxPrice: 50000,
    inStockOnly: false,
    minDiscount: 0,
  });

  // Sync when searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const st = searchParams.get('state') || '';
    const q = searchParams.get('search') || '';
    const bridal = searchParams.get('bridal') === 'true';

    setFilters((prev) => ({
      ...prev,
      category: cat || prev.category,
      state: st || prev.state,
      occasion: bridal ? 'Bridal' : prev.occasion,
    }));
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Load all products
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (e) {
        console.error('Failed to load products', e);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  // Compute unique lists for filter selectors
  const statesList = useMemo(() => {
    const set = new Set(products.map((p) => p.state));
    return Array.from(set).filter(Boolean).sort();
  }, [products]);

  const categoriesList = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set).filter(Boolean).sort();
  }, [products]);

  const fabricsList = useMemo(() => {
    const set = new Set(products.map((p) => p.fabric));
    return Array.from(set).filter(Boolean).sort();
  }, [products]);

  const colorsList = ['Crimson Red', 'Ruby Red', 'Wine', 'Pink', 'Blue', 'Green', 'Yellow', 'Ivory', 'Beige', 'Pastel'];

  const occasionsList = ['Bridal', 'Muhurtham', 'Festive', 'Wedding Reception', 'Sangeet', 'Haldi', 'Office Wear', 'Daily Wear'];

  const handleFilterChange = (updated: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      state: '',
      fabric: '',
      color: '',
      occasion: '',
      minPrice: 0,
      maxPrice: 50000,
      inStockOnly: false,
      minDiscount: 0,
    });
    setSearchQuery('');
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.state.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (filters.category) {
          if (!p.category.toLowerCase().includes(filters.category.toLowerCase())) {
            return false;
          }
        }

        // State filter
        if (filters.state) {
          if (!p.state.toLowerCase().includes(filters.state.toLowerCase())) {
            return false;
          }
        }

        // Fabric filter
        if (filters.fabric) {
          if (!p.fabric.toLowerCase().includes(filters.fabric.toLowerCase())) {
            return false;
          }
        }

        // Color filter
        if (filters.color) {
          if (!p.color.toLowerCase().includes(filters.color.toLowerCase())) {
            return false;
          }
        }

        // Occasion filter
        if (filters.occasion) {
          const hasOccasion = p.specifications?.occasion?.some((occ) =>
            occ.toLowerCase().includes(filters.occasion.toLowerCase())
          );
          if (!hasOccasion && !p.isBridal && filters.occasion === 'Bridal') {
            return false;
          }
        }

        // Price range
        if (p.discountedPrice < filters.minPrice || p.discountedPrice > filters.maxPrice) {
          return false;
        }

        // Stock
        if (filters.inStockOnly && p.stock <= 0) {
          return false;
        }

        // Discount
        if (filters.minDiscount > 0 && p.discountPercentage < filters.minDiscount) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.discountedPrice - b.discountedPrice;
        }
        if (sortBy === 'price-high') {
          return b.discountedPrice - a.discountedPrice;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // Default best sellers
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, filters, searchQuery, sortBy]);

  return (
    <div className="bg-cream-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Breadcrumbs & Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center space-x-2 text-xs text-stone-500">
            <span>Home</span>
            <span>/</span>
            <span className="text-maroon-900 font-semibold">Shop Sarees</span>
            {filters.state && (
              <>
                <span>/</span>
                <span className="text-stone-800">{filters.state}</span>
              </>
            )}
            {filters.category && (
              <>
                <span>/</span>
                <span className="text-stone-800">{filters.category}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
                {filters.state
                  ? `${filters.state} Sarees Collection`
                  : filters.category
                  ? filters.category
                  : 'All Handloom Sarees of India'}
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Showing {filteredProducts.length} authentic handcrafted drapes with Silk Mark certification
              </p>
            </div>

            {/* Search Input on Shop Page */}
            <div className="w-full sm:w-72 relative">
              <input
                type="text"
                placeholder="Search within collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-full pl-9 pr-8 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-maroon-800 shadow-sm"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar: Filter Toggle for Mobile + Sorting Options */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm mb-8 flex items-center justify-between">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center space-x-2 text-xs font-bold text-maroon-950 bg-cream-100 px-4 py-2 rounded-xl border border-gold-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-600" />
            <span>Filters ({Object.values(filters).filter(Boolean).length})</span>
          </button>

          <div className="hidden lg:flex items-center space-x-2 text-xs text-stone-500">
            <span>Showing all active weaves</span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 text-xs ml-auto">
            <span className="text-stone-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-maroon-800"
            >
              <option value="bestseller">Best Sellers</option>
              <option value="newest">New Arrivals</option>
              <option value="rating">Customer Ratings</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                statesList={statesList}
                categoriesList={categoriesList}
                fabricsList={fabricsList}
                colorsList={colorsList}
                occasionsList={occasionsList}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse space-y-3"
                  >
                    <div className="aspect-[3/4] bg-stone-200 rounded-xl" />
                    <div className="h-4 bg-stone-200 rounded w-3/4" />
                    <div className="h-4 bg-stone-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-100 text-maroon-900 mx-auto flex items-center justify-center">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  No Sarees Found Matching Your Criteria
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for another fabric, state, or weaving tradition.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-maroon-900 text-white font-semibold text-xs px-6 py-2.5 rounded-full hover:bg-maroon-950 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Drawer Modal */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col">
                <div className="p-4 bg-maroon-950 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SlidersHorizontal className="w-4 h-4 text-gold-400" />
                    <h3 className="font-serif font-bold text-base">Filter Sarees</h3>
                  </div>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-full text-stone-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <ProductFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilters}
                    statesList={statesList}
                    categoriesList={categoriesList}
                    fabricsList={fabricsList}
                    colorsList={colorsList}
                    occasionsList={occasionsList}
                  />
                </div>

                <div className="p-4 border-t border-stone-200 bg-stone-50">
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-maroon-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                  >
                    View {filteredProducts.length} Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="bg-cream-50 min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-maroon-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg font-bold text-maroon-950">Loading Handloom Catalog...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
