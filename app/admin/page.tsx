import Link from 'next/link';
import { getProducts, getOrders, getUsers, getCoupons } from '@/lib/db';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Tag,
  Plus,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [products, orders, users, coupons] = await Promise.all([
    getProducts(),
    getOrders(),
    getUsers(),
    getCoupons(),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Placed' || o.orderStatus === 'Processing');

  const stats = [
    {
      label: 'Gross Sales Revenue',
      value: formatPrice(totalRevenue),
      change: '+24.5% this month',
      icon: TrendingUp,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
    },
    {
      label: 'Total Orders',
      value: orders.length.toString(),
      change: `${pendingOrders.length} requiring fulfillment`,
      icon: ShoppingBag,
      color: 'bg-blue-500/10 text-blue-700 border-blue-300',
    },
    {
      label: 'Live Saree Products',
      value: products.length.toString(),
      change: 'Covering 23 categories & 15 states',
      icon: Package,
      color: 'bg-amber-500/10 text-amber-700 border-amber-300',
    },
    {
      label: 'Registered Customers',
      value: users.length.toString(),
      change: 'Patrons across India',
      icon: Users,
      color: 'bg-purple-500/10 text-purple-700 border-purple-300',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-100 border border-gold-300 px-3 py-1 rounded-full">
            SareeHub Merchant Control
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mt-2">
            Store Performance & Catalog Overview
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time synchronization with active storefront database
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="bg-maroon-900 hover:bg-maroon-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-gold-300" />
            <span>Add New Saree</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {s.label}
                </span>
                <div className={`p-2 rounded-xl border ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-stone-900">
                  {s.value}
                </span>
                <p className="text-[11px] text-stone-500 mt-1">{s.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-stone-500">Live fulfillment dispatch queue</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-maroon-900 hover:underline"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-stone-400 uppercase font-semibold">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Payment</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50">
                    <td className="py-3 font-mono font-bold text-stone-900">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-stone-800">{ord.customer.fullName}</p>
                      <p className="text-[10px] text-stone-400">{ord.customer.city}</p>
                    </td>
                    <td className="py-3 font-bold text-stone-900">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3">
                      <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        {ord.paymentMethod} ({ord.paymentStatus})
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href="/admin/orders"
                        className="text-maroon-900 font-bold hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Inventory & Stock Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-amber-800 border-b pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Low Stock Weave Alerts
            </h3>
          </div>

          <p className="text-xs text-stone-500">
            Sarees requiring handloom batch replenishments from weaving co-operatives:
          </p>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-serif font-bold text-stone-900 line-clamp-1">{p.name}</p>
                  <p className="text-[10px] text-stone-500">{p.state} • {p.category}</p>
                </div>
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/products"
              className="w-full text-center py-2.5 rounded-xl border border-stone-300 text-stone-800 font-bold text-xs block hover:bg-stone-50 transition"
            >
              Update Inventory Stock
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
