'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Lock, Mail, User, Phone, Sparkles, ShieldCheck } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    demoLogin,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (authMode === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    } else {
      const res = await register(name, email, phone);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gold-200 w-full max-w-md overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with ethnic maroon gradient */}
        <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-500/20 text-gold-300 mb-3 border border-gold-400/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-wide">
            {authMode === 'login' ? 'Welcome Back to SareeHub' : 'Join SareeHub Royalty'}
          </h3>
          <p className="text-xs text-gold-200 mt-1 max-w-xs mx-auto">
            {authMode === 'login'
              ? 'Access your orders, saved handlooms, and personalized artisan collections'
              : 'Sign up to discover authentic GI-certified handlooms from across India'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-maroon-950/60 p-1 rounded-xl mt-5 border border-gold-500/20 text-xs font-medium">
            <button
              onClick={() => {
                setAuthMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-maroon-950 font-bold shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Customer Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'register'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-maroon-950 font-bold shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 bg-cream-50/50">
          {/* Quick Demo Access Bar */}
          <div className="mb-5 bg-gold-50 border border-gold-300/60 rounded-2xl p-3.5">
            <div className="flex items-center space-x-2 text-xs font-semibold text-maroon-900 mb-2">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Instant Demo Accounts (One-Click)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className="bg-maroon-900 hover:bg-maroon-800 text-white font-medium py-2 px-2.5 rounded-xl transition text-center shadow-sm"
              >
                👑 Store Admin
              </button>
              <button
                type="button"
                onClick={() => demoLogin('customer')}
                className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium py-2 px-2.5 rounded-xl transition text-center shadow-sm"
              >
                🛍️ Sample Shopper
              </button>
            </div>
            <p className="text-[10px] text-stone-500 text-center mt-2">
              Switch roles anytime to experience customer shopping or full admin dashboard powers.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Iyer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-maroon-800"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-stone-700 font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-maroon-800"
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-stone-700 font-medium mb-1">Phone Number (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-maroon-800"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-stone-700 font-medium">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('For demo, use any password or click the instant demo buttons above!')}
                    className="text-[11px] text-maroon-800 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-maroon-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-maroon-900 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2 text-sm"
            >
              <span>{loading ? 'Authenticating...' : authMode === 'login' ? 'Sign In to SareeHub' : 'Register & Start Shopping'}</span>
            </button>
          </form>

          <p className="text-center text-[11px] text-stone-500 mt-4">
            By continuing, you agree to SareeHub&apos;s{' '}
            <a href="/policies/terms" className="text-maroon-800 underline">Terms of Use</a> &{' '}
            <a href="/policies/privacy" className="text-maroon-800 underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
