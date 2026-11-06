'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/seo';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';

const faqItems = [
  {
    category: 'Silk & Handloom Authenticity',
    question: 'How do I verify the Silk Mark certification of my saree?',
    answer:
      'Every pure silk saree dispatched by SareeHub comes affixed with an official Silk Mark Organization of India hangtag featuring a unique coded number and holographic security strip. You can instantly scan the QR code using any smartphone camera to view the registered weaver identity, silk fiber test certification, and origin cluster on the Silk Mark Board portal.',
  },
  {
    category: 'Silk & Handloom Authenticity',
    question: 'Are your gold and silver zaris tested and genuine?',
    answer:
      'Yes. Our bridal Kanchipuram, Banarasi, Paithani, and Dharmavaram sarees use authentic tested silver-gilt zari electroplated with pure 24-karat gold. We explicitly detail the zari composition in each product specification card.',
  },
  {
    category: 'Saree Dimensions & Blouse Pieces',
    question: 'Does the saree include an attached unstitched blouse piece?',
    answer:
      'Yes, all our sarees measure 5.5 metres in length plus an additional 0.8 to 1.0 metre matching or contrast unstitched running blouse fabric with borders, bringing the total woven fabric length to 6.3 - 6.5 metres.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'What are the delivery charges and timelines across India?',
    answer:
      'We offer 100% FREE Pan-India Express Delivery on all orders above ₹1,999. Deliveries to metro cities (Bengaluru, Hyderabad, Chennai, Mumbai, Delhi-NCR, Kolkata) arrive within 2 to 4 business days. Regional and tier-2/3 pin codes typically take 4 to 6 business days via insured express couriers like Delhivery and BlueDart.',
  },
  {
    category: 'Payments & COD',
    question: 'Do you offer Cash on Delivery (COD) across India?',
    answer:
      'Yes, Cash on Delivery (COD) is available on orders across 19,000+ Indian pincodes. You can inspect the tamper-proof outer muslin package and pay cash or scan the courier UPI QR code directly at your doorstep.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your 7-Day Return and Refund policy?',
    answer:
      'If for any reason you are not completely enchanted with the color, fall, or drape of your saree, you can initiate a return or exchange within 7 days of delivery through your customer account. Our courier partners will arrange a complimentary doorstep pickup. Once the intact Silk Mark tag is inspected, 100% refund is credited back to your original source account within 48 hours.',
  },
  {
    category: 'Saree Care & Storage',
    question: 'How should I preserve pure silk handloom sarees at home?',
    answer:
      'We advise wrapping your pure silk sarees in breathable unbleached pure cotton or muslin fabric (provided complimentary with every SareeHub order). Never store silk in plastic bags. Air-dry your sarees in the shade once every six months, change the fold lines to prevent crease stress on pure zari, and strictly dry clean.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqJsonLd = getFaqJsonLd(faqItems);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'FAQs', url: '/faq' },
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="bg-cream-50/40 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-maroon-900 transition">Home</Link>
            <span>/</span>
            <span className="text-maroon-900 font-semibold">Frequently Asked Questions</span>
          </nav>

          {/* Header */}
          <header className="text-center space-y-3">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-4 py-1 rounded-full">
              Help & Guidance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
              Everything you need to know about our Silk Mark certifications, artisan handlooms, shipping timelines, and care guides.
            </p>
          </header>

          {/* Accordion */}
          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden transition"
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-cream-50/50 transition"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gold-700 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h2 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                        {item.question}
                      </h2>
                    </div>
                    <div
                      className={`p-2 rounded-full bg-cream-100 text-maroon-950 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-gold-200' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Box */}
          <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-sm text-center space-y-4">
            <h2 className="font-serif font-bold text-xl text-maroon-950">
              Still have questions about an authentic Indian weave?
            </h2>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Our experienced saree connoisseurs and stylists are available on WhatsApp and phone to assist with bridal matching, blouse recommendations, and fabric consultations.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="/contact"
                className="bg-maroon-900 hover:bg-maroon-950 text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md transition"
              >
                Contact Concierge
              </Link>
              <a
                href="https://wa.me/917406197088?text=Namaste%20SareeHub"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md transition"
              >
                WhatsApp Us (+91 74061 97088)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
