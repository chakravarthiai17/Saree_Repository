'use client';

import React, { useState } from 'react';
import { Saree } from '@/lib/types';
import { X, Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

interface ProductModalProps {
  product: Saree | null; // null means adding a new product
  onClose: () => void;
  onSave: (savedProduct: Saree) => void;
}

export default function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Kanchipuram Silk Sarees',
    state: product?.state || 'Tamil Nadu',
    fabric: product?.fabric || 'Pure Mulberry Silk',
    color: product?.color || 'Crimson Red',
    originalPrice: product?.originalPrice || 19999,
    discountedPrice: product?.discountedPrice || 14999,
    stock: product?.stock ?? 10,
    isNewArrival: product?.isNewArrival ?? false,
    isBestSeller: product?.isBestSeller ?? false,
    isTrending: product?.isTrending ?? false,
    isBridal: product?.isBridal ?? false,
    isFeatured: product?.isFeatured ?? false,
    images: product?.images?.length ? product.images : [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    ],
    description: product?.description || '',
    highlights: product?.highlights?.length ? product.highlights : [
      'Certified Silk Mark 100% Pure Natural Silk',
      'Authentic Korvai Handloom Weave',
      'Contrast Blouse Piece Included',
    ],
    specifications: {
      sareeLength: product?.specifications?.sareeLength || '5.5 Metres',
      blousePiece: product?.specifications?.blousePiece || 'Matching Silk Blouse Piece',
      blouseLength: product?.specifications?.blouseLength || '0.8 Metre',
      blouseIncluded: product?.specifications?.blouseIncluded ?? true,
      zariType: product?.specifications?.zariType || 'Tested Pure Gold Zari',
      weaveTechnique: product?.specifications?.weaveTechnique || 'Traditional Korvai Handloom',
      occasion: product?.specifications?.occasion || ['Bridal', 'Festive', 'Wedding Reception'],
      washCare: product?.specifications?.washCare || 'Dry Clean Only. Wrapped in muslin cloth.',
      certification: product?.specifications?.certification || 'Silk Mark India Certified',
    },
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (index: number, val: string) => {
    const updated = [...formData.images];
    updated[index] = val;
    setFormData({ ...formData, images: updated });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length <= 1) return;
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleHighlightChange = (index: number, val: string) => {
    const updated = [...formData.highlights];
    updated[index] = val;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlightField = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] });
  };

  const removeHighlightField = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    setError('');
    setSaving(true);

    try {
      const url = isEditing ? `/api/products/${product?.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to save product');
      }

      const saved = await res.json();
      onSave(saved);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving');
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg">
              {isEditing ? `Edit Saree: ${product?.name}` : 'Add New Handloom Saree'}
            </h3>
            <p className="text-xs text-gold-300">
              Live updates directly sync with storefront catalog
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-stone-700">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-stone-900 text-sm border-b pb-1">
              General Information
            </h4>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Saree Name / Title *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kanchipuram Pure Silk Crimson Gold Zari Saree"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Saree Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Kanchipuram Silk Sarees"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">State of Origin</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Tamil Nadu"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Fabric</label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="e.g. Pure Mulberry Silk"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Primary Colour</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Crimson Red"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-stone-900 text-sm border-b pb-1">
              Pricing, Inventory & Badges
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Discounted Price (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.discountedPrice}
                  onChange={(e) => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Stock Quantity</label>
                <input
                  type="number"
                  min={0}
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            {/* Badges Toggle */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <label className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="rounded text-maroon-900"
                />
                <span className="font-medium text-stone-800">Best Seller</span>
              </label>

              <label className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNewArrival}
                  onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  className="rounded text-maroon-900"
                />
                <span className="font-medium text-stone-800">New Arrival</span>
              </label>

              <label className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="rounded text-maroon-900"
                />
                <span className="font-medium text-stone-800">Trending</span>
              </label>

              <label className="flex items-center space-x-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBridal}
                  onChange={(e) => setFormData({ ...formData, isBridal: e.target.checked })}
                  className="rounded text-maroon-900"
                />
                <span className="font-medium text-stone-800">Bridal</span>
              </label>
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Product Image URLs
              </h4>
              <button
                type="button"
                onClick={addImageField}
                className="text-maroon-900 font-bold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            {formData.images.map((img, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <ImageIcon className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={img}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  className="flex-1 p-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(idx)}
                    className="p-2 text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Description & Specs */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-stone-900 text-sm border-b pb-1">
              Description & Specifications
            </h4>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Heritage narrative, weave characteristics, motifs..."
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Zari Type</label>
                <input
                  type="text"
                  value={formData.specifications.zariType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, zariType: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Weave Technique</label>
                <input
                  type="text"
                  value={formData.specifications.weaveTechnique}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, weaveTechnique: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-1">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Key Highlights</h4>
              <button
                type="button"
                onClick={addHighlightField}
                className="text-maroon-900 font-bold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>
            {formData.highlights.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => handleHighlightChange(i, e.target.value)}
                  className="flex-1 p-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeHighlightField(i)}
                  className="p-1.5 text-stone-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-white font-bold flex items-center space-x-2 shadow-md"
            >
              <Save className="w-4 h-4 text-gold-300" />
              <span>{saving ? 'Saving...' : isEditing ? 'Update Saree' : 'Publish Saree'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
