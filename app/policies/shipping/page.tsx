import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            SareeHub Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 mt-2">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-stone-500 mt-1">Effective as of 2026 • Pan-India Coverage</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">1. Free Pan-India Delivery</h2>
            <p>
              SareeHub provides <strong>100% Complimentary Express Delivery</strong> on all orders with a cart value exceeding ₹1,999 across all states and union territories in India. For orders below ₹1,999, a nominal flat express shipping charge of ₹150 is applied at checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">2. Processing & Dispatch Timeline</h2>
            <p>
              Every ordered saree undergoes rigorous manual inspection by our senior textile curators to verify Silk Mark barcode tags, zari purity, and flawless weave integrity.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Orders placed before 2:00 PM IST on working days are prepared and handed to courier partners on the same business day.</li>
              <li>Every saree is wrapped in an artisan unbleached muslin envelope inside a rigid protective keepsake box.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">3. Estimated Transit Timelines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border">
                <span className="font-bold text-stone-900 block">Tier-1 Metros (BLR, HYD, MAA, BOM, DEL, CCU)</span>
                <span className="text-stone-500">2 to 4 Business Days</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border">
                <span className="font-bold text-stone-900 block">Tier-2 / Tier-3 Regional Hubs</span>
                <span className="text-stone-500">4 to 6 Business Days</span>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">4. Real-Time Tracking & Notifications</h2>
            <p>
              Once your shipment is dispatched, you will receive an SMS and email containing the Delhivery / BlueDart Air tracking consignment number and live URL. You can also view live delivery progress directly on your SareeHub account orders page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">5. Cash on Delivery (COD) Protocol</h2>
            <p>
              For Cash on Delivery orders, please ensure the recipient is available at the provided delivery address with the exact invoice amount or UPI scanner app. The courier representative will request OTP confirmation upon handover.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
