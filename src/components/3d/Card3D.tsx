import React, { useState } from 'react';
import { Wifi, Sparkles, ShieldCheck } from 'lucide-react';

interface Card3DProps {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  isFlipped: boolean;
  brand?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  cardNumber,
  cardHolder,
  expiry,
  cvv,
  isFlipped,
  brand = 'VISA'
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 14;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const formattedNumber = (cardNumber || '4892 •••• •••• 9012')
    .padEnd(16, '•')
    .replace(/(\w{4})/g, '$1 ')
    .trim();

  return (
    <div
      className="w-full max-w-md h-60 sm:h-64 mx-auto perspective-1000 cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`
        }}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-6 backface-hidden shadow-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-[#121624] via-[#1A102F] to-[#0A1628]">
          {/* Iridescent Chromatic Sheen Overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + rotate.y * 3}% ${
                50 + rotate.x * 3
              }%, rgba(6, 182, 212, 0.8), rgba(236, 72, 153, 0.6), transparent 70%)`
            }}
          />
          {/* Subtle Guilloché Currency Security Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Bar: Bank Logo & Contactless */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-widest text-lg font-display text-white">
                AURA <span className="text-cyan-400 font-light">BLACK</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-cyan-500/30">
                TITANIUM
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Wifi className="w-5 h-5 rotate-90 opacity-80" />
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            </div>
          </div>

          {/* EMV Golden Smart Chip */}
          <div className="relative z-10 mt-4 flex items-center gap-3">
            <div className="w-11 h-9 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-inner border border-amber-300/60 p-1 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-amber-700/40 rounded-full" />
              <div className="flex justify-between">
                <div className="w-2 h-3 bg-amber-700/40 rounded-sm" />
                <div className="w-2 h-3 bg-amber-700/40 rounded-sm" />
              </div>
              <div className="w-full h-0.5 bg-amber-700/40 rounded-full" />
            </div>
            <span className="text-[10px] font-mono text-cyan-300/80 tracking-wider">
              ESCROW SECURE ENCLAVE
            </span>
          </div>

          {/* 16-Digit Card Number */}
          <div className="relative z-10 mt-5 font-mono text-xl sm:text-2xl font-bold tracking-[0.2em] text-white text-shadow-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {formattedNumber}
          </div>

          {/* Bottom Row: Holder, Expiry, Brand */}
          <div className="relative z-10 mt-4 flex items-end justify-between font-mono">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400">Cardholder</div>
              <div className="text-sm font-semibold text-slate-100 tracking-wider uppercase truncate max-w-[190px]">
                {cardHolder || 'ALEXANDER VANCE'}
              </div>
            </div>

            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400">Expires</div>
              <div className="text-sm font-semibold text-slate-100 tracking-wider">
                {expiry || '12/28'}
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-black italic tracking-tighter text-white drop-shadow">
                {brand}
              </span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD (Flipped 180deg) */}
        <div className="absolute inset-0 w-full h-full rounded-2xl pt-6 pb-4 backface-hidden rotate-y-180 shadow-2xl border border-white/20 bg-gradient-to-bl from-[#0D111A] via-[#150F24] to-[#0A111F] text-slate-300">
          {/* Black Magnetic Stripe */}
          <div className="w-full h-11 bg-black/90 shadow-inner mb-4" />

          {/* White Signature & CVV Panel */}
          <div className="px-6 flex items-center gap-3">
            <div className="flex-1 h-9 bg-slate-200 rounded flex items-center px-3 text-slate-700 font-mono text-xs italic tracking-wider shadow-inner">
              Authorized Signature • Escrow Protected
            </div>
            <div className="h-9 px-3 bg-white rounded border border-slate-300 flex items-center justify-center font-mono font-bold text-slate-900 text-sm tracking-widest shadow-inner">
              {cvv || '892'}
            </div>
          </div>

          {/* Terms & Chip ID */}
          <div className="px-6 mt-4">
            <p className="text-[8px] font-mono text-slate-400 leading-tight">
              AURA GLOBAL PRIVATE CLIENT CARD. ISSUED UNDER DIRECT ESCROW CLEARING PROTOCOL. 100% ASSET-BACKED IN LLOYDS OF LONDON CUSTODY.
            </p>
            <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-cyan-400/80">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 256-BIT QUANTUM SIGNED
              </span>
              <span>VIP-9942-X</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
