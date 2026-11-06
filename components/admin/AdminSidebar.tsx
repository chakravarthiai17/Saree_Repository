'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  FolderTree,
  Users,
  Store,
  ShieldCheck,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Overview Metrics', href: '/admin', icon: LayoutDashboard },
    { label: 'Saree Products', href: '/admin/products', icon: Package },
    { label: 'Customer Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Categories & States', href: '/admin/categories', icon: FolderTree },
    { label: 'Coupons & Offers', href: '/admin/coupons', icon: Tag },
    { label: 'Customers', href: '/admin/customers', icon: Users },
  ];

  return (
    <aside className="w-64 bg-maroon-950 text-stone-300 min-h-screen p-6 flex flex-col justify-between border-r border-gold-500/20">
      <div className="space-y-6">
        {/* Brand */}
        <div>
          <Link href="/admin" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-gold-500 text-maroon-950 flex items-center justify-center font-serif font-black text-lg shadow-md">
              S
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white block leading-tight">
                SareeHub
              </span>
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                Admin Portal
              </span>
            </div>
          </Link>
          <div className="mt-3 flex items-center space-x-1.5 text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Master Live Sync</span>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-maroon-950 font-bold shadow-md'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-maroon-950' : 'text-gold-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to store */}
      <div className="pt-6 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs font-semibold text-gold-300 hover:text-white transition py-2 px-3 rounded-xl hover:bg-white/10"
        >
          <Store className="w-4 h-4" />
          <span>Exit to Customer Store</span>
        </Link>
      </div>
    </aside>
  );
}
