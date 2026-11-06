import Link from 'next/link';
import { Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last Updated: 2026 • SareeHub Consumer Protection</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">1. Information We Collect</h2>
            <p>
              When you purchase a saree, create an account, or subscribe to our newsletter at SareeHub, we collect basic necessary information including your full name, shipping delivery address, phone number, and email address to fulfill your order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">2. Payment Security Guarantee</h2>
            <p>
              SareeHub does <strong>never</strong> store your credit card numbers, CVVs, or Net Banking credentials on our servers. All financial transactions are processed securely through certified Level 1 PCI-DSS compliant payment gateways (Razorpay / UPI switches) using 256-bit bank-grade encryption.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>To dispatch, track, and deliver handloom sarees to your doorstep.</li>
              <li>To provide order confirmation invoices and SMS courier dispatch notifications.</li>
              <li>To share exclusive festive discount codes (only if opted in for the Royal Saree Circle).</li>
              <li>We never sell, trade, or rent personal customer records to third-party marketing entities.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">4. Contact Privacy Grievance Officer</h2>
            <p>
              For any questions regarding personal data access or erasure, please reach our Data Protection Officer at privacy@sareehub.com or write to our Hyderabad registered boutique.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
