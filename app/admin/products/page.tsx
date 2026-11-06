'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Saree } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import ProductModal from '@/components/admin/ProductModal';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Saree | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (p: Saree) => {
    setEditingProduct(p);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        setToastMessage('Saree deleted successfully from the catalog.');
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
    setDeleteConfirmId(null);
  };

  const handleSaveProduct = (saved: Saree) => {
    const idx = products.findIndex((p) => p.id === saved.id);
    if (idx >= 0) {
      const updated = [...products];
      updated[idx] = saved;
      setProducts(updated);
      setToastMessage(`Updated "${saved.name}" successfully!`);
    } else {
      setProducts([saved, ...products]);
      setToastMessage(`Published "${saved.name}" to catalog!`);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = products.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (categoryFilter && !p.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
      return false;
    }
    if (stateFilter && !p.state.toLowerCase().includes(stateFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Saree Catalog Manager
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your complete inventory: add new weaves, adjust pricing, upload images, and update stock
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-gold-300" />
          <span>Add New Saree</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-2xl flex items-center space-x-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, fabric, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-maroon-800"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
          >
            <option value="">All States</option>
            {['Tamil Nadu', 'Uttar Pradesh', 'Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Gujarat', 'Rajasthan', 'West Bengal', 'Odisha', 'Madhya Pradesh'].map(
              (st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              )
            )}
          </select>

          <span className="text-xs text-stone-500 self-center px-2">
            Total: <strong>{filteredProducts.length}</strong> Sarees
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-stone-500">
            <div className="w-8 h-8 border-4 border-maroon-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
            Loading catalog data...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No sarees found matching your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Saree & Visual</th>
                  <th className="p-4">State & Origin</th>
                  <th className="p-4">Fabric</th>
                  <th className="p-4">Price (MRP / Offer)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badges</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-cream-50/50 transition">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-stone-100 border flex-shrink-0">
                          <Image
                            src={p.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <a
                            href={`/product/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-serif font-bold text-stone-900 hover:text-maroon-900 flex items-center gap-1 line-clamp-1"
                          >
                            <span>{p.name}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </a>
                          <span className="text-[11px] text-stone-500">{p.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-medium text-stone-800">
                      <span className="font-semibold text-gold-700">{p.state}</span>
                    </td>

                    <td className="p-4 text-stone-600">
                      {p.fabric}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-stone-900">
                        {formatPrice(p.discountedPrice)}
                      </div>
                      <div className="text-[10px] text-stone-400 line-through">
                        {formatPrice(p.originalPrice)} ({p.discountPercentage}% off)
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        p.stock <= 5
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {p.isBestSeller && (
                          <span className="bg-gold-100 text-maroon-900 px-2 py-0.5 rounded font-bold">
                            Best Seller
                          </span>
                        )}
                        {p.isBridal && (
                          <span className="bg-maroon-100 text-maroon-900 px-2 py-0.5 rounded font-bold">
                            Bridal
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-stone-600 hover:text-maroon-900 hover:bg-stone-100 rounded-lg transition"
                          title="Edit Saree"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Saree"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-red-200">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Confirm Saree Deletion
            </h3>
            <p className="text-xs text-stone-600">
              Are you sure you want to remove this saree from the active database? This action immediately deletes it from the customer storefront.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                Delete Saree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Saree Modal */}
      {modalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
