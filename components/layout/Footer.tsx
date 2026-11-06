'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, Award, Heart, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#2b050e] via-[#1f0309] to-[#120104] text-stone-300 pt-16 pb-10 border-t border-gold-500/20">
      {/* Brand Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">100% Silk Mark Certified</h5>
              <p className="text-xs text-stone-400 mt-0.5">Tested pure natural silk & genuine zari</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">Direct Weaver Heritage</h5>
              <p className="text-xs text-stone-400 mt-0.5">Sourced from 15+ states master artisans</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">Pan-India Free Express</h5>
              <p className="text-xs text-stone-400 mt-0.5">Free shipping on orders above ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">7-Day Easy Returns</h5>
              <p className="text-xs text-stone-400 mt-0.5">Hassle-free doorstep pickup policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-maroon-950 font-serif font-bold shadow-md">
                S
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Saree<span className="text-gold-400">Hub</span>
              </span>
            </Link>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Discover the beauty of India, one saree at a time. SareeHub is India&apos;s premier online sanctuary uniting master weavers and saree connoisseurs from every corner of the subcontinent.
            </p>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-400" />
                <a href="tel:+917406197088" className="hover:text-gold-300 transition">
                  Concierge: +91 74061 97088 (10 AM - 8 PM IST)
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <a
                  href="https://wa.me/917406197088?text=Namaste%20SareeHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition"
                >
                  WhatsApp: +91 74061 97088 (Instant Chat)
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>support@sareehub.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider mb-2">
                Join the Royal Saree Circle
              </h5>
              <p className="text-[11px] text-stone-400 mb-3">
                Subscribe for private showcase access, seasonal weaves, and a flat ₹500 welcome coupon.
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to SareeHub Royalty! Your code <strong>ROYAL500</strong> is ready.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-950 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center space-x-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Saree Categories */}
          <div>
            <h5 className="font-serif font-bold text-white text-sm mb-4 tracking-wide border-b border-gold-500/30 pb-1.5 inline-block">
              Saree Categories
            </h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><Link href="/shop?category=Kanchipuram" className="hover:text-gold-300 transition">Kanchipuram Silk Sarees</Link></li>
              <li><Link href="/shop?category=Banarasi" className="hover:text-gold-300 transition">Banarasi Sarees</Link></li>
              <li><Link href="/shop?category=Paithani" className="hover:text-gold-300 transition">Paithani Sarees</Link></li>
              <li><Link href="/shop?category=Mysore" className="hover:text-gold-300 transition">Mysore Silk Sarees</Link></li>
              <li><Link href="/shop?category=Pochampally" className="hover:text-gold-300 transition">Pochampally Ikat Sarees</Link></li>
              <li><Link href="/shop?category=Uppada" className="hover:text-gold-300 transition">Uppada Jamdani Sarees</Link></li>
              <li><Link href="/shop?category=Chanderi" className="hover:text-gold-300 transition">Chanderi Silk Sarees</Link></li>
              <li><Link href="/shop?category=Patola" className="hover:text-gold-300 transition">Patola Double Ikat Sarees</Link></li>
              <li><Link href="/categories" className="text-gold-400 font-semibold hover:underline">View All 23 Categories →</Link></li>
            </ul>
          </div>

          {/* Explore Across Indian States */}
          <div>
            <h5 className="font-serif font-bold text-white text-sm mb-4 tracking-wide border-b border-gold-500/30 pb-1.5 inline-block">
              Explore by States
            </h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><Link href="/states/tamil-nadu" className="hover:text-gold-300 transition">Tamil Nadu Handlooms</Link></li>
              <li><Link href="/states/uttar-pradesh" className="hover:text-gold-300 transition">Uttar Pradesh (Varanasi & Lucknow)</Link></li>
              <li><Link href="/states/telangana" className="hover:text-gold-300 transition">Telangana (Gadwal & Pochampally)</Link></li>
              <li><Link href="/states/andhra-pradesh" className="hover:text-gold-300 transition">Andhra Pradesh (Uppada & Dharmavaram)</Link></li>
              <li><Link href="/states/karnataka" className="hover:text-gold-300 transition">Karnataka (Mysore Crepe)</Link></li>
              <li><Link href="/states/maharashtra" className="hover:text-gold-300 transition">Maharashtra (Paithani & Yeola)</Link></li>
              <li><Link href="/states/gujarat" className="hover:text-gold-300 transition">Gujarat (Patan Patola & Bandhani)</Link></li>
              <li><Link href="/states/rajasthan" className="hover:text-gold-300 transition">Rajasthan (Kota Doria & Leheriya)</Link></li>
              <li><Link href="/states" className="text-gold-400 font-semibold hover:underline">All 15 Indian States →</Link></li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h5 className="font-serif font-bold text-white text-sm mb-4 tracking-wide border-b border-gold-500/30 pb-1.5 inline-block">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><Link href="/about" className="hover:text-gold-300 transition">About SareeHub</Link></li>
              <li><Link href="/contact" className="hover:text-gold-300 transition">Contact Concierge</Link></li>
              <li><Link href="/account/orders" className="hover:text-gold-300 transition">Track Your Order</Link></li>
              <li><Link href="/faq" className="hover:text-gold-300 transition">Frequently Asked Questions</Link></li>
              <li><Link href="/policies/shipping" className="hover:text-gold-300 transition">Shipping & Delivery Policy</Link></li>
              <li><Link href="/policies/return-refund" className="hover:text-gold-300 transition">Return & Refund Policy</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-gold-300 transition">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-gold-300 transition">Terms & Conditions</Link></li>
              <li><Link href="/admin" className="text-gold-400 font-semibold hover:underline">Admin Portal →</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Payment Icons & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
        <p>
          © {new Date().getFullYear()} <strong>SareeHub</strong>. Handcrafted with devotion for Indian handlooms. All rights reserved.
        </p>

        {/* Payment Badges */}
        <div className="flex items-center space-x-2 text-[10px] tracking-wider uppercase text-stone-300">
          <span className="bg-white/10 px-2 py-1 rounded">UPI</span>
          <span className="bg-white/10 px-2 py-1 rounded">Razorpay</span>
          <span className="bg-white/10 px-2 py-1 rounded">RuPay</span>
          <span className="bg-white/10 px-2 py-1 rounded">Visa</span>
          <span className="bg-white/10 px-2 py-1 rounded">Mastercard</span>
          <span className="bg-white/10 px-2 py-1 rounded">Net Banking</span>
          <span className="bg-white/10 px-2 py-1 rounded">COD</span>
        </div>
      </div>
    </footer>
  );
}
