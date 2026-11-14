import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Car,
  Home as HomeIcon,
  Building,
  ShieldCheck,
  Plane,
  Eye,
  CheckCircle2,
  Lock,
  ChevronRight,
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedShowroomModel, formatPrice, t, language, catalogItems } = useGlobalState();

  const pillars = [
    {
      id: 'pillar-1',
      title: t.pillar1Title,
      subtitle: t.pillar1Subtitle,
      desc: t.pillar1Desc,
      icon: Cpu,
      gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
      borderColor: 'group-hover:border-cyan-400/50',
      actionLabel: t.pillar1Btn,
      modelKey: 'rtx5090' as const,
      tag: language === 'RU' ? 'КРЕМНИЙ И ЖЕЛЕЗО' : 'TECH HARDWARE'
    },
    {
      id: 'pillar-2',
      title: t.pillar2Title,
      subtitle: t.pillar2Subtitle,
      desc: t.pillar2Desc,
      icon: Car,
      gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
      borderColor: 'group-hover:border-violet-400/50',
      actionLabel: t.pillar2Btn,
      modelKey: 'cullinan' as const,
      tag: language === 'RU' ? 'СУПЕРКАРЫ' : 'EXOTIC VEHICLES'
    },
    {
      id: 'pillar-3',
      title: t.pillar3Title,
      subtitle: t.pillar3Subtitle,
      desc: t.pillar3Desc,
      icon: HomeIcon,
      gradient: 'from-pink-500/20 via-pink-500/5 to-transparent',
      borderColor: 'group-hover:border-pink-400/50',
      actionLabel: t.pillar3Btn,
      modelKey: 'villa' as const,
      tag: language === 'RU' ? 'ПРЕФАБ ВИЛЛЫ' : 'PREFAB ARCHITECTURE'
    },
    {
      id: 'pillar-4',
      title: t.pillar4Title,
      subtitle: t.pillar4Subtitle,
      desc: t.pillar4Desc,
      icon: Building,
      gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
      borderColor: 'group-hover:border-amber-400/50',
      actionLabel: t.pillar4Btn,
      modelKey: null,
      tag: language === 'RU' ? 'ТЯЖЕЛЫЕ АКТИВЫ' : 'SOVEREIGN ASSETS'
    }
  ];

  const steps = [
    {
      number: t.step1Num,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Layers
    },
    {
      number: t.step2Num,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: Eye
    },
    {
      number: t.step3Num,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Plane
    },
    {
      number: t.step4Num,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: ShieldCheck
    }
  ];

  const handlePillarAction = (modelKey: 'rtx5090' | 'cullinan' | 'villa' | null) => {
    if (modelKey) {
      setSelectedShowroomModel(modelKey);
      navigate('/showroom');
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto pt-6 sm:pt-12 pb-20">
        
        {/* Iridescent Status Capsule */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{t.heroTag}</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </div>

        {/* Shimmering Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
          {t.heroTitle1}{' '}
          <span className="text-iridescent block sm:inline">
            {t.heroTitleGradient}
          </span>{' '}
          {t.heroTitle2}
        </h1>

        {/* Breathable Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          {t.heroSubtitle}
        </p>

        {/* Magnetic Hero CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/showroom"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{t.heroBtnShowroom}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/order"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#101524]/80 hover:bg-[#151D33] text-slate-200 hover:text-white border border-white/15 text-sm font-semibold tracking-wide backdrop-blur-xl shadow-lg hover:border-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.heroBtnCalculator}</span>
          </Link>
        </div>

        {/* Escrow Guarantee Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.heroSafeDeal}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-cyan-400" />
            <span>{t.heroAirSpeed}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-violet-400" />
            <span>{t.heroBiometric}</span>
          </div>
        </div>
      </section>

      {/* THE 4 PILLARS (Clean 2x2 Grid with Interactive 3D-Tilt Glass Cards) */}
      <section className="py-16">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            {t.pillarsTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">
            {t.pillarsTitle}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
            {t.pillarsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map(pillar => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:-translate-y-1"
              >
                <div className="relative h-full rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-2xl p-8 sm:p-9 flex flex-col justify-between overflow-hidden border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                  {/* Subtle Corner Glow Accent */}
                  <div
                    className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${pillar.gradient} blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity`}
                  />

                  <div>
                    {/* Tag & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-[10px] tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                        {pillar.tag}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors font-display">
                      {pillar.title}
                    </h3>
                    <h4 className="text-xs font-mono text-violet-400 mt-1">
                      {pillar.subtitle}
                    </h4>
                    <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => handlePillarAction(pillar.modelKey)}
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-white group-hover:text-cyan-300 transition-colors"
                    >
                      <span>{pillar.actionLabel}</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] font-mono text-slate-500">
                      {language === 'RU' ? 'ГАРАНТИЯ ПОД КЛЮЧ' : 'GUARANTEED TURNKEY'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* THE 4-STEP PROCESS */}
      <section className="py-16 border-t border-white/10 mt-12">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-400">
            {t.lifecycleTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">
            {t.lifecycleTitle}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
            {t.lifecycleSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:bg-white/[0.05]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-cyan-400/40">
                      {step.number}
                    </span>
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'RU' ? 'Протокол активен' : 'Protocol Active'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED ASSETS QUICK STRIP */}
      <section className="py-16 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              {t.featuredTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              {t.featuredTitle}
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>{t.viewCatalogBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalogItems.slice(0, 3).map(asset => (
            <div
              key={asset.id}
              className="rounded-2xl bg-[#0C101C]/80 border border-white/10 p-5 overflow-hidden flex flex-col justify-between hover:border-cyan-400/40 transition-all group"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-900">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-white/10">
                    {asset.originFlag} {asset.originCountry}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                    {asset.deliveryDays}
                  </div>
                </div>

                <div className="text-[10px] font-mono uppercase text-violet-400">
                  {asset.categoryLabel}
                </div>
                <h3 className="text-base font-bold text-white font-display mt-1 truncate">
                  {asset.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {asset.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase text-slate-400 block">
                    {t.turnkeyPrice}
                  </span>
                  <span className="text-lg font-bold font-mono text-white">
                    {formatPrice(asset.priceUsd)}
                  </span>
                </div>
                {asset.modelKey && (
                  <button
                    onClick={() => {
                      if (asset.modelKey) {
                        setSelectedShowroomModel(asset.modelKey);
                        navigate('/showroom');
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.inspect3dBtn}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
