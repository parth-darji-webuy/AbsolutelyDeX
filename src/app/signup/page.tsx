'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function SignUpPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await checkAuth();
        showToast(`Account created! Welcome to AbsolutelyDeX, ${data.user.name}`, 'success');
        router.push('/');
      } else {
        setErrorMsg(data.error || 'Failed to create account');
      }
    } catch (err) {
      setErrorMsg('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-zinc-950 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Absolutely<span className="text-indigo-500">DeX</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Create an Account</h1>
            <p className="text-xs text-zinc-400">
              Join AbsolutelyDeX for persistent wishlist sync and member perks.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold text-center">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={loading}
              className="w-full text-sm font-bold shadow-xl"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
            Already have an account?{' '}
            <Link href="/signin" className="font-bold text-indigo-400 hover:text-indigo-300">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
