'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('nlg_cookie_consent');
      if (!consent) {
        setShow(true);
      }
    } catch (e) {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('nlg_cookie_consent', 'accepted');
    } catch (e) {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('nlg_cookie_consent', 'declined');
    } catch (e) {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-xs z-[999] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-[#F4C542] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-lg bg-amber-100 text-[#A67C00] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Cookie className="w-3.5 h-3.5 text-[#A67C00]" />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <h4 className="text-[11px] sm:text-xs font-bold text-[#242424] leading-tight">
            Cookies & Confidentialité
          </h4>
          <p className="text-[10px] sm:text-[11px] text-gray-600 leading-snug">
            Cookies techniques pour le panier et vos commandes.{' '}
            <Link href="/legal/privacy" className="text-[#C62828] underline font-medium">
              En savoir plus
            </Link>.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1.5">
            <button
              onClick={handleAccept}
              className="w-full py-1.5 px-2 rounded-lg bg-[#14532D] hover:bg-[#0E3E21] text-white text-[10px] font-bold transition-colors shadow-sm text-center"
            >
              Accepter
            </button>
            <button
              onClick={handleDecline}
              className="w-full py-1.5 px-2 rounded-lg bg-[#C62828] hover:bg-[#A71D1D] text-white text-[10px] font-bold transition-colors shadow-sm text-center"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
