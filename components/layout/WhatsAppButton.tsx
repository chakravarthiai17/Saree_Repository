'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = message.trim() || 'Namaste SareeHub, I need guidance with choosing an authentic handloom saree.';
    window.open(
      `https://wa.me/917406197088?text=${encodeURIComponent(query)}`,
      '_blank'
    );
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gold-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm tracking-wide">SareeHub Concierge</h4>
                <p className="text-xs text-gold-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> +91 74061 97088 | Live Stylist
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-maroon-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-cream-50 text-sm space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-stone-200 text-stone-800">
              <p className="font-medium text-maroon-900 mb-1">Namaste! 🙏</p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Welcome to SareeHub. Are you searching for a bridal Kanchipuram, a classic Banarasi, or sarees from a specific Indian state? Our senior saree curator is here to help!
              </p>
              <span className="text-[10px] text-stone-400 block text-right mt-1">Just now</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Looking for Bridal Sarees',
                'Need help with Silk Mark verification',
                'Custom Blouse stitching enquiry',
                'Express Pan-India delivery timeline'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    window.open(
                      `https://wa.me/917406197088?text=${encodeURIComponent('Namaste SareeHub: ' + suggestion)}`,
                      '_blank'
                    );
                    setIsOpen(false);
                  }}
                  className="text-xs bg-white hover:bg-gold-50 hover:border-gold-400 border border-stone-200 rounded-full px-3 py-1 text-stone-700 transition text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 text-xs border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-maroon-800"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-3 flex items-center justify-center transition shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-900/30 hover:scale-105 transition-all duration-300 border-2 border-white/40"
        title="Chat with Saree Expert on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-400 rounded-full border-2 border-emerald-700 animate-pulse"></span>
        </div>
        <span className="font-medium text-xs sm:text-sm tracking-wide hidden sm:inline">
          Live WhatsApp Stylist
        </span>
      </button>
    </div>
  );
}
