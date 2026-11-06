'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { Review } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ReviewSectionProps {
  productId: string;
  initialReviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function ReviewSection({
  productId,
  initialReviews,
  rating,
  reviewCount,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userCity: '',
    rating: 5,
    title: '',
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.comment) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productId }),
      });
      if (res.ok) {
        const newRev = await res.json();
        setReviews([newRev, ...reviews]);
        setSubmittedMessage(true);
        setShowForm(false);
        setFormData({
          userName: '',
          userCity: '',
          rating: 5,
          title: '',
          comment: '',
        });
      }
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  };

  return (
    <div className="py-12 border-t border-stone-200" id="reviews">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-stone-100 gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-maroon-950">
            Customer Reviews & Experiences
          </h3>
          <p className="text-stone-500 text-xs mt-1">
            Genuine verified feedback from patrons draped in this saree
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cream-100 hover:bg-gold-100 text-maroon-950 border border-gold-300 font-semibold px-5 py-2.5 rounded-full text-xs transition flex items-center space-x-2 self-start"
        >
          <MessageSquarePlus className="w-4 h-4 text-gold-600" />
          <span>{showForm ? 'Cancel' : 'Write a Review'}</span>
        </button>
      </div>

      {submittedMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Thank you! Your verified review has been posted and published.</span>
        </div>
      )}

      {/* Review Form Drawer/Modal */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 p-6 bg-cream-50 rounded-3xl border border-gold-300/60 space-y-4">
          <h4 className="font-serif font-bold text-stone-900 text-base">
            Share Your Saree Experience
          </h4>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Your Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating
                        ? 'text-amber-500 fill-current'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Radhika Menon"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">City / State</label>
              <input
                type="text"
                placeholder="e.g. Bengaluru, Karnataka"
                value={formData.userCity}
                onChange={(e) => setFormData({ ...formData, userCity: e.target.value })}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Review Headline</label>
            <input
              type="text"
              placeholder="e.g. Pure silk luster and regal Korvai border"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Your Detailed Experience</label>
            <textarea
              required
              rows={3}
              placeholder="How was the drape, zari brightness, fabric softness, and packaging?"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-maroon-800"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-maroon-900 hover:bg-maroon-950 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition shadow-sm"
          >
            {submitting ? 'Submitting...' : 'Submit Verified Review'}
          </button>
        </form>
      )}

      {/* Reviews Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-stone-50 p-6 rounded-3xl border border-stone-200">
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0">
          <span className="font-serif text-5xl font-extrabold text-maroon-950">{rating}</span>
          <div className="flex text-amber-500 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-xs text-stone-500 font-medium">Based on {reviewCount} ratings</p>
        </div>

        <div className="col-span-2 space-y-2 flex flex-col justify-center">
          {[
            { stars: 5, pct: '88%' },
            { stars: 4, pct: '10%' },
            { stars: 3, pct: '2%' },
            { stars: 2, pct: '0%' },
            { stars: 1, pct: '0%' },
          ].map((row) => (
            <div key={row.stars} className="flex items-center space-x-3 text-xs text-stone-600">
              <span className="w-12">{row.stars} Stars</span>
              <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
                <div className="bg-gold-500 h-full rounded-full" style={{ width: row.pct }} />
              </div>
              <span className="w-10 text-right text-stone-400 font-medium">{row.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-stone-500 text-sm py-8">
            Be the first to review this royal weave!
          </p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-stone-900 text-sm">{r.userName}</span>
                  {r.verifiedPurchase && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-stone-400 text-xs">{formatDate(r.date)}</span>
              </div>

              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <h5 className="font-semibold text-stone-800 text-xs">{r.title}</h5>
              <p className="text-stone-600 text-xs leading-relaxed">{r.comment}</p>
              <p className="text-[11px] text-stone-400 pt-1">{r.userCity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
