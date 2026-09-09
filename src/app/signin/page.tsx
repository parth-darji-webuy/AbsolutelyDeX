'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const { checkAuth } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await checkAuth();
        showToast(`Welcome back, ${data.user.name}!`, 'success');
        router.push(redirectPath);
      } else {
        setErrorMsg(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setErrorMsg('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@absolutelydex.com');
    setPassword('password123');
  };

  return (
    <div className="py-16 bg-white dark:bg-zinc-950 min-h-[80vh] flex items-center justify-center transition-colors duration-200">
      <div className="w-full max-w-md px-4">
        <div className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Logo imgClassName="h-16 sm:h-20 w-auto" className="justify-center mb-2" />
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Sign In to Your Account</h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Access your saved wishlist, priority orders, and member perks.
            </p>
          </div>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-center">
            <p className="text-xs text-indigo-600 dark:text-indigo-300 font-medium mb-1">
              Dev Day Demo Account Available
            </p>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-zinc-900 dark:text-white underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Click to autofill (demo@absolutelydex.com)
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <Lock className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={loading}
              className="w-full text-sm font-bold shadow-xl"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-600 dark:text-zinc-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Visual Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl animate-slide-up">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Forgot Password</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This is a visual placeholder for Dev Day mode. Password reset emails are disabled in local demo mode.
            </p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setForgotModalOpen(false)}
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
