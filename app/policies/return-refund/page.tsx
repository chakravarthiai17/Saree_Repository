import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReturnRefundPolicyPage() {
  return (
    <div className="bg-cream-50/40 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            Customer Guarantee
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 mt-2">
            7-Day Easy Return & Refund Policy
          </h1>
          <p className="text-xs text-stone-500 mt-1">Peace of mind for every Indian saree purchase</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">1. Our 7-Day Doorstep Return Window</h2>
            <p>
              We want you to be completely delighted with your handloom saree. If the weave, color shade, or fall does not meet your highest expectations, you may initiate a return or exchange within <strong>7 calendar days</strong> from the delivery timestamp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">2. Return Eligibility Criteria</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>The saree must remain unwashed, unworn, and unstitched.</li>
              <li>The original Silk Mark India authenticity hangtag and barcode tag must be intact and uncut.</li>
              <li>The saree must be returned in its original muslin storage envelope and keepsake packaging.</li>
              <li>Custom blouse-stitched or fall-pico customized sarees on special request cannot be returned unless manufacturing defects exist.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">3. Complimentary Reverse Doorstep Pickup</h2>
            <p>
              Once you request a return via your online account or by emailing support@sareehub.com, our logistics partners will schedule a complimentary doorstep pickup within 24 to 48 hours. You do not need to ship the product yourself.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">4. Rapid Refund Processing</h2>
            <p>
              Upon receipt and quality inspection at our central fulfillment warehouse in Hyderabad:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Prepaid Orders (UPI/Card/NetBanking):</strong> 100% of the purchase amount is credited back to the original source account within 2 to 4 banking business days.</li>
              <li><strong>Cash on Delivery (COD) Orders:</strong> Refunds are transferred via direct NEFT / IMPS or UPI to the customer&apos;s verified bank account within 24 hours of inspection.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
