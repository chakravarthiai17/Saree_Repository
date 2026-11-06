'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  Filter,
  ExternalLink,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateStatusVal, setUpdateStatusVal] = useState<Order['orderStatus']>('Processing');
  const [timelineNote, setTimelineNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: updateStatusVal,
          note: timelineNote || `Order status updated to ${updateStatusVal} by store management.`,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updated);
        }
        setToastMessage(`Order ${updated.orderNumber} status updated to "${updateStatusVal}"!`);
        setTimeout(() => setToastMessage(null), 3000);
        setUpdatingId(null);
        setTimelineNote('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = statusFilter
    ? orders.filter((o) => o.orderStatus === statusFilter)
    : orders;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Customer Orders Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track fulfillment, update dispatch progress, and view verified customer addresses
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium"
          >
            <option value="">All Statuses ({orders.length})</option>
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-2xl flex items-center space-x-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-stone-500">
            <div className="w-8 h-8 border-4 border-maroon-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
            Loading customer orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No orders found under this status.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Order ID & Date</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Items Summary</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Fulfillment Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-cream-50/50 transition">
                    <td className="p-4">
                      <div className="font-mono font-bold text-stone-900 text-sm">
                        {ord.orderNumber}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        {formatDate(ord.createdAt)}
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-stone-800">{ord.customer.fullName}</p>
                      <p className="text-[11px] text-stone-500">{ord.customer.city}, {ord.customer.state}</p>
                      <p className="text-[11px] text-stone-400">{ord.customer.phone}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-stone-900">{ord.items.length} {ord.items.length === 1 ? 'Saree' : 'Sarees'}</p>
                      <p className="text-[11px] text-stone-500 truncate max-w-xs">
                        {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                      </p>
                    </td>

                    <td className="p-4">
                      <span className="font-serif font-bold text-base text-stone-900">
                        {formatPrice(ord.total)}
                      </span>
                      {ord.discount > 0 && (
                        <p className="text-[10px] text-emerald-700">Coupon: {ord.couponCode}</p>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {ord.paymentMethod} • {ord.paymentStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.orderStatus === 'Dispatched'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setUpdatingId(ord.id);
                            setUpdateStatusVal(ord.orderStatus);
                          }}
                          className="bg-maroon-900 hover:bg-maroon-950 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm"
                        >
                          Update Status
                        </button>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                          title="View Details"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Status Update Modal */}
      {updatingId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-gold-300">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Update Order Fulfillment Status
            </h3>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-stone-700 block">Select New Status</label>
              <select
                value={updateStatusVal}
                onChange={(e) => setUpdateStatusVal(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              >
                <option value="Placed">Placed</option>
                <option value="Processing">Processing (Quality Check & Muslin Wrap)</option>
                <option value="Dispatched">Dispatched (Handed over to Delhivery / BlueDart)</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered (Doorstep Handover)</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 block">Status Note for Customer Timeline</label>
              <input
                type="text"
                placeholder="e.g. Saree dispatched via Delhivery Express surface"
                value={timelineNote}
                onChange={(e) => setTimelineNote(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="flex gap-2 justify-end pt-3">
              <button
                onClick={() => setUpdatingId(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold text-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(updatingId)}
                className="px-5 py-2 bg-maroon-900 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Apply & Save Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Full Inspection Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl border border-gold-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl text-maroon-950">
                  Order Details: {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-stone-400">Placed on {formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-stone-50 p-4 rounded-2xl text-xs space-y-1.5 border">
              <h4 className="font-bold text-stone-900 mb-1">Customer Delivery Destination</h4>
              <p className="font-semibold text-stone-800">{selectedOrder.customer.fullName}</p>
              <p className="text-stone-600">
                {selectedOrder.customer.streetAddress}, {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
              </p>
              <p className="text-stone-600">Phone: {selectedOrder.customer.phone} | Email: {selectedOrder.customer.email}</p>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Ordered Sarees</h4>
              <div className="divide-y text-xs">
                {selectedOrder.items.map((i, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-stone-800">{i.name}</p>
                      <p className="text-stone-500">{i.category} • Qty: {i.quantity}</p>
                    </div>
                    <span className="font-bold text-stone-900">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif font-bold text-stone-900 text-sm">Order Progress Timeline</h4>
              <div className="relative pl-5 space-y-3 border-l-2 border-stone-200 ml-2">
                {selectedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-maroon-900" />
                    <div>
                      <span className="font-bold text-stone-900">{step.status}</span>
                      <span className="text-[10px] text-stone-400 ml-2">{step.time}</span>
                      <p className="text-[11px] text-stone-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
