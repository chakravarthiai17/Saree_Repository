'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal Saree Consultation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Bridal Saree Consultation',
      message: '',
    });
  };

  return (
    <div className="bg-cream-50/40 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-4 py-1 rounded-full">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
            Contact SareeHub Concierge
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Whether you seek custom bridal styling, Silk Mark verification details, or regional weave recommendations, our saree specialists are pleased to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gold-400/30 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-gold-300">
                Customer Care & Stylist Desk
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Connect directly with our senior saree curators for personal trousseau styling, bulk wedding orders, or international shipping enquiries.
              </p>

              <div className="space-y-4 text-xs text-stone-200">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Concierge Hotline & WhatsApp</span>
                    <a href="tel:+917406197088" className="hover:text-gold-300 transition">+91 74061 97088</a>
                    <p className="text-[10px] text-gold-300 mt-0.5">Mon - Sat: 10:00 AM - 8:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Customer Support Email</span>
                    <span>support@sareehub.com</span>
                    <p className="text-[10px] text-stone-400 mt-0.5">Response within 4 business hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Flagship Heritage Boutique</span>
                    <span>Plot 42, Weavers Pavilion, Jubilee Hills, Hyderabad, Telangana 500033</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Showroom Hours</span>
                    <span>All 7 Days: 10:30 AM – 9:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="https://wa.me/917406197088?text=Namaste%20SareeHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center space-x-2 text-xs transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp (+91 74061 97088)</span>
              </a>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Send an Enquiry or Feedback
            </h3>

            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-2xl flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Thank you! Your enquiry has been received. Our senior saree stylist will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. radhika@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Enquiry Nature</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                >
                  <option>Bridal Saree Consultation</option>
                  <option>Custom Blouse Stitching Assistance</option>
                  <option>Silk Mark Authenticity Verification</option>
                  <option>Order Delivery & Tracking Status</option>
                  <option>Wholesale & Wedding Trousseau Gifting</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Your Message or Query *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide details about your weave preferences, wedding dates, or saree requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-maroon-800"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-maroon-900 hover:bg-maroon-950 text-white font-bold px-8 py-3.5 rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
              >
                <Send className="w-4 h-4 text-gold-300" />
                <span>Submit Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
