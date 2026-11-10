'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Sparkles } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#14532D] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#F4C542]/50 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Sparkles className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
