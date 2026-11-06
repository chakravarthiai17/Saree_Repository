'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  CreditCard,
  QrCode,
  Building,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  shippingAddress: any;
}

export default function PaymentModal({
  isOpen,
  onClose,
  shippingAddress,
}: PaymentModalProps) {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, tax, total, appliedCoupon, clearCart } =
    useCart();

  const [paymentMethod, setPaymentMethod] = useState<
    'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery' | 'Razorpay Test'
  >('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const orderPayload = {
        customer: shippingAddress,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          image: item.product.images[0],
          price: item.product.discountedPrice,
          quantity: item.quantity,
          category: item.product.category,
        })),
        subtotal,
        discount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        tax,
        total,
        paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        throw new Error('Failed to create order on server');
      }

      const createdOrder = await res.json();
      clearCart();
      router.push(`/order-success/${createdOrder.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment simulation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-gold-400" />
              <h3 className="font-serif font-bold text-lg">Secure Payment Terminal</h3>
            </div>
            <p className="text-xs text-gold-300 mt-0.5">
              128-bit Encrypted | Integration Ready Sandbox Test Mode
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-stone-700">
          {/* Order Summary Ribbon */}
          <div className="p-3.5 bg-cream-50 rounded-2xl border border-gold-200/80 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Total Payable Amount
              </span>
              <span className="font-serif font-bold text-xl text-maroon-950">
                {formatPrice(total)}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Test Mode Active
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="font-bold uppercase tracking-wider text-stone-500 text-[11px] block">
              Choose Payment Method
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                { id: 'Card', label: 'Card (Visa/MC)', icon: CreditCard },
                { id: 'NetBanking', label: 'Net Banking', icon: Building },
                { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Truck },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center space-y-1.5 ${
                      isSelected
                        ? 'bg-maroon-900 text-white border-maroon-900 font-bold shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-gold-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-gold-300' : 'text-stone-500'}`} />
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
            {paymentMethod === 'UPI' && (
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl border border-stone-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <QrCode className="w-16 h-16 text-stone-800" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h5 className="font-bold text-stone-900">Scan & Pay via any UPI App</h5>
                    <p className="text-[11px] text-stone-500">
                      GPay, PhonePe, Paytm, BHIM, or CRED. Use test UPI ID below:
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className="space-y-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Card Number (Test Mode)</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4111 •••• •••• 1111 (Test Card)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xl font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'NetBanking' && (
              <div className="space-y-2">
                <label className="font-medium text-stone-700 block mb-1">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs"
                >
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                  <option>Bank of Baroda</option>
                </select>
                <p className="text-[10px] text-stone-400">
                  Redirects to {selectedBank}&apos;s secure test payment simulator.
                </p>
              </div>
            )}

            {paymentMethod === 'Cash on Delivery' && (
              <div className="space-y-1">
                <h5 className="font-bold text-stone-900">Cash on Delivery Verification</h5>
                <p className="text-[11px] text-stone-600">
                  You can pay via Cash or UPI to the Delhivery courier executive upon doorstep inspection. Silk Mark authentic seal guaranteed intact.
                </p>
              </div>
            )}
          </div>

          {/* Test Mode Notice */}
          <div className="p-3 bg-gold-50/80 rounded-xl border border-gold-300/60 text-[11px] text-maroon-900">
            ℹ️ <strong>Razorpay Integration Ready</strong>: Operating in Sandbox Test Mode. No live funds will be debited. Click &ldquo;Confirm & Place Order&rdquo; to test complete order fulfillment flow.
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="w-1/3 py-3 rounded-2xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="w-2/3 py-3 rounded-2xl bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-maroon-900 text-white font-bold shadow-lg flex items-center justify-center space-x-2 text-sm"
            >
              {isProcessing ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-gold-300" />
                  <span>Confirm & Place Order ({formatPrice(total)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
