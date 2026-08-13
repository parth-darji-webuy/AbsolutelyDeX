'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 border animate-slide-up',
        'bg-zinc-900/95 text-zinc-100 border-zinc-800'
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium pr-2 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
