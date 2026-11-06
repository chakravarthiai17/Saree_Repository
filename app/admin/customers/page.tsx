import { getUsers, getOrders } from '@/lib/db';
import { formatDate, formatPrice } from '@/lib/utils';
import { Users, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const [users, orders] = await Promise.all([getUsers(), getOrders()]);

  return (
    <div className="p-8 space-y-6">
      <div className="pb-6 border-b border-stone-200">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Customer Accounts Directory
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Registered patrons, order frequencies, and verified delivery records
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => {
          const userOrders = orders.filter((o) => o.customer.email.toLowerCase() === u.email.toLowerCase());
          const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);

          return (
            <div
              key={u.id}
              className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon-900 to-maroon-950 text-gold-300 font-serif font-bold text-lg flex items-center justify-center border border-gold-400">
                    {u.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900">{u.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-2 py-0.5 rounded">
                      {u.role === 'admin' ? 'Store Owner' : 'Verified Member'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{u.email}</span>
                  </div>
                  {u.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{u.phone}</span>
                    </div>
                  )}
                  <div className="text-[11px] text-stone-400 pt-1">
                    Joined: {formatDate(u.createdAt)}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Total Orders</span>
                  <span className="font-bold text-stone-900">{userOrders.length} Orders</span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Total Spent</span>
                  <span className="font-bold text-maroon-950">{formatPrice(totalSpent)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
