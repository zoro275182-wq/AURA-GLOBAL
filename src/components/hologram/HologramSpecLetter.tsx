import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetItem } from '../../types';
import { useGlobalState } from '../../context/GlobalStateContext';
import { useScrambleText } from '../../hooks/useScrambleText';
import { ShieldCheck, RefreshCw, Eye, ShoppingCart, Globe2, Plane, Sparkles, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface HologramSpecLetterProps {
  asset: AssetItem;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const HologramSpecLetter: React.FC<HologramSpecLetterProps> = ({
  asset,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const navigate = useNavigate();
  const { formatPrice, addToCart, isWireframeMode, setIsWireframeMode, t, language } = useGlobalState();
  const [isGlitching, setIsGlitching] = useState<boolean>(true);
  const [glitchKey, setGlitchKey] = useState<number>(0);

  // Hook to scramble title and specs
  const titleScramble = useScrambleText(asset.name, 650, true);
  const subtitleScramble = useScrambleText(asset.subtitle, 650, true);
  const hubScramble = useScrambleText(asset.originHub, 650, true);

  // Trigger bootup glitch phase on asset change or manual replay
  useEffect(() => {
    setIsGlitching(true);
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [asset.id, glitchKey]);

  const handleReplayGlitch = () => {
    setGlitchKey(prev => prev + 1);
    titleScramble.startScramble();
    subtitleScramble.startScramble();
    hubScramble.startScramble();
  };

  const handleOrderNow = () => {
    addToCart({
      id: `order-${asset.id}-${Date.now()}`,
      assetId: asset.id,
      name: asset.name,
      categoryLabel: asset.categoryLabel,
      priceUsd: asset.priceUsd,
      quantity: 1,
      image: asset.image,
      originHub: asset.originHub,
      deliveryDays: asset.deliveryDays
    });
    navigate('/checkout');
  };

  // If collapsed, render a minimal floating button
  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="px-4 py-3 rounded-2xl bg-[#090E17]/90 backdrop-blur-2xl border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2 hover:bg-cyan-500/10 transition-all pointer-events-auto"
      >
        <FileText className="w-4 h-4 text-cyan-400" />
        <span className="font-bold">
          {language === 'RU' ? `[ + Показать формуляр: ${asset.name} ]` : `[ + Show Specs: ${asset.name} ]`}
        </span>
      </button>
    );
  }

  return (
    <div
      className={`relative w-full max-w-lg transition-all duration-500 ${
        isGlitching ? 'glitch-active' : ''
      }`}
    >
      {/* 3D Floating Perspective Wrap */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400/40 via-violet-500/20 to-pink-500/30 shadow-[0_0_50px_-10px_rgba(6,182,212,0.35)]">
        
        {/* Hologram Card Container */}
        <div className="relative rounded-2xl bg-[#090E17]/90 backdrop-blur-2xl p-5 sm:p-6 overflow-hidden border border-cyan-500/25 text-slate-100 max-h-[72vh] overflow-y-auto shadow-2xl">
          
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 hologram-overlay z-0" />

          {/* Laser Scanning Beam (During Glitch & Subtle in Background) */}
          <div className="hologram-scanline-beam z-10" />

          {/* Corner Targeting Holographic Brackets */}
          <div className="absolute top-2.5 left-2.5 text-cyan-400 font-mono text-[10px] tracking-widest opacity-80 select-none">
            [ + TL-NODE ]
          </div>
          <div className="absolute top-2.5 right-12 text-cyan-400 font-mono text-[10px] tracking-widest opacity-80 select-none">
            [ TR-SYS 01 ]
          </div>
          <div className="absolute bottom-2.5 left-2.5 text-cyan-400 font-mono text-[10px] tracking-widest opacity-80 select-none">
            [ BL-SPEC.V5 ]
          </div>
          <div className="absolute bottom-2.5 right-2.5 text-cyan-400 font-mono text-[10px] tracking-widest opacity-80 select-none">
            [ BR-LOCK ]
          </div>

          {/* Header Status & Collapse button */}
          <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-medium truncate max-w-[200px]">
                {isGlitching ? t.showroomBooting : t.showroomHologramTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                <span>{asset.originFlag}</span>
                <span>{asset.originCountry}</span>
              </div>
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title={language === 'RU' ? 'Свернуть формуляр' : 'Collapse HUD'}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Asset Title & Subtitle with Glitch Decoding */}
          <div className="relative z-10 mb-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {asset.categoryLabel}
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
              {titleScramble.displayText}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono leading-relaxed line-clamp-2">
              {subtitleScramble.displayText}
            </p>
          </div>

          {/* Quick Telemetry Hub & Transit Speed */}
          <div className="relative z-10 grid grid-cols-2 gap-2 mb-3 p-2 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-mono uppercase text-slate-400">{t.showroomOriginHub}</div>
                <div className="text-xs font-semibold text-slate-200 truncate font-mono">
                  {hubScramble.displayText}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                <Plane className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[9px] font-mono uppercase text-slate-400">{t.showroomTransit}</div>
                <div className="text-xs font-semibold text-slate-200 font-mono">
                  {asset.deliveryDays}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs 2-Column Grid */}
          <div className="relative z-10 mb-3">
            <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              {t.showroomBenchmarks}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {asset.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    {spec.label}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-100 font-mono mt-0.5 truncate">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Turnkey Escrow Notice */}
          <div className="relative z-10 flex items-baseline justify-between p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 mb-3">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-400 block">
                {t.turnkeyPrice}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                {formatPrice(asset.priceUsd)}
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.showroomInsured}
              </div>
              <span className="text-[9px] font-mono text-slate-400">
                {language === 'RU' ? 'Таможня и доставка включены' : 'Customs & Delivery included'}
              </span>
            </div>
          </div>

          {/* Interactive Controls Bar: Replay Glitch, X-Ray Wireframe, Order */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2">
            {/* Replay Glitch Scan */}
            <button
              onClick={handleReplayGlitch}
              className="w-full sm:w-auto px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-all"
              title="Re-run holographic decode and chromatic scan"
            >
              <RefreshCw className={`w-3 h-3 ${isGlitching ? 'animate-spin' : ''}`} />
              <span>{t.showroomReplayGlitch}</span>
            </button>

            {/* X-Ray Wireframe Toggle */}
            <button
              onClick={() => setIsWireframeMode(prev => !prev)}
              className={`w-full sm:w-auto px-2.5 py-2 rounded-xl border text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all ${
                isWireframeMode
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{isWireframeMode ? t.showroomXrayOn : t.showroomXray}</span>
            </button>

            {/* Order This Asset Turnkey */}
            <button
              onClick={handleOrderNow}
              className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white text-[11px] font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{t.showroomOrderBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
