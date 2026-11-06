import Link from 'next/link';
import { ShieldCheck, Award } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            Legal Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 mt-2">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-stone-500 mt-1">Effective 2026 • SareeHub E-Commerce Platform</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">1. Agreement to Terms</h2>
            <p>
              By browsing, accessing, or placing orders through SareeHub (&ldquo;the Website&rdquo;), you agree to be bound by these Terms and Conditions. SareeHub is dedicated to providing genuine Indian handloom and ethnic fashion merchandise.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">2. Handloom Uniqueness & Color Representation</h2>
            <p>
              Because our sarees are woven by human hands on traditional pit-looms, fly-shuttles, and frame-looms, minor irregularities in motifs, slubs in natural wild silk, and slight variances in zari reflection are characteristic hallmarks of authentic handlooms, not defects. Photography lighting is calibrated to represent real shades accurately across digital devices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">3. Pricing & Taxes</h2>
            <p>
              All prices quoted on SareeHub are denominated in Indian Rupees (INR) and include applicable Goods and Services Tax (GST 5% on handlooms). SareeHub reserves the right to modify prices and festive promotions without prior individual notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">4. Intellectual Property</h2>
            <p>
              The name &ldquo;SareeHub&rdquo;, our brand insignia, original descriptions, visual assets, and website layout are protected intellectual property under applicable copyright and trademark statutes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">5. Governing Law & Jurisdiction</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the civil courts in Hyderabad, Telangana.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
