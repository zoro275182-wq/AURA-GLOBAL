import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { GlobeScene } from '../components/3d/GlobeScene';
import {
  Search,
  Radio,
  CheckCircle2,
  Clock,
  Thermometer,
  Gauge,
  KeyRound,
  MapPin
} from 'lucide-react';

export const LiveTrackingPage: React.FC = () => {
  const { activeTrackingId, setActiveTrackingId, allTrackingOrders, t, language } = useGlobalState();
  const [searchInput, setSearchInput] = useState('');

  // Fallback to first available order if activeTrackingId not found
  const activeOrder =
    allTrackingOrders[activeTrackingId] ||
    Object.values(allTrackingOrders)[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim().toUpperCase();
    if (allTrackingOrders[trimmed]) {
      setActiveTrackingId(trimmed);
      setSearchInput('');
    } else {
      const found = Object.keys(allTrackingOrders).find(id => id.includes(trimmed));
      if (found) {
        setActiveTrackingId(found);
        setSearchInput('');
      }
    }
  };

  const demoPills = Object.keys(allTrackingOrders).slice(0, 5);

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header & Title */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>{t.trackingTag}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          {t.trackingTitle}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 font-light">
          {t.trackingSubtitle}
        </p>
      </div>

      {/* Search Input & Demo Pills Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[#090D17]/80 backdrop-blur-xl border border-white/10">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.trackingSearchPlaceholder}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            {t.trackingLocateBtn}
          </button>
        </form>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap hidden sm:inline">
            {t.trackingActiveVaults}
          </span>
          {demoPills.map(id => (
            <button
              key={id}
              onClick={() => setActiveTrackingId(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                activeTrackingId === id
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 3D Globe + Timeline & Passport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE 3D GLOBE */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <GlobeScene order={activeOrder} />

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 font-mono">
              <span className="text-[9px] uppercase text-cyan-400 block">{language === 'RU' ? 'ХАБ ОТПРАВКИ' : 'ORIGIN HUB'}</span>
              <span className="text-xs font-bold text-white block mt-0.5 truncate">
                {activeOrder.originCity}
              </span>
              <span className="text-[10px] text-slate-400">Lat: {activeOrder.originCoords[0]}°</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 font-mono">
              <span className="text-[9px] uppercase text-violet-400 block">{language === 'RU' ? 'ТАМОЖНЯ' : 'CUSTOMS HUB'}</span>
              <span className="text-xs font-bold text-white block mt-0.5 truncate">
                {activeOrder.customsHub}
              </span>
              <span className="text-[10px] text-slate-400">{language === 'RU' ? 'Очищено' : 'Export Cleared'}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 font-mono">
              <span className="text-[9px] uppercase text-pink-400 block">{language === 'RU' ? 'НАЗНАЧЕНИЕ' : 'DESTINATION'}</span>
              <span className="text-xs font-bold text-white block mt-0.5 truncate">
                {activeOrder.destinationCity}
              </span>
              <span className="text-[10px] text-slate-400">ETA {language === 'RU' ? 'до двери' : 'White Glove'}</span>
            </div>
          </div>
        </div>

        {/* TIMELINE & TELEMETRY PASSPORT */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CARGO TELEMETRY PASSPORT CARD */}
          <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 font-mono shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-cyan-400 block">
                  {t.trackingPassportTitle}
                </span>
                <span className="text-base font-bold text-white font-display">
                  {activeOrder.assetName}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-bold">
                {activeOrder.id}
              </span>
            </div>

            {/* Live Progress Bar */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>{activeOrder.statusText}</span>
                <span className="font-bold text-cyan-300">{activeOrder.percentComplete}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  style={{ width: `${activeOrder.percentComplete}%` }}
                />
              </div>
            </div>

            {/* Telemetry Sensor Readouts */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.trackingTemp}</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {activeOrder.temperature || '+20.5°C'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                  <Gauge className="w-3.5 h-3.5 text-violet-400" />
                  <span>{t.trackingPressure}</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {activeOrder.pressure || '1014 hPa'}
                </div>
              </div>
            </div>

            {/* Carrier & Seal Details */}
            <div className="space-y-2 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">{t.trackingFlight}</span>
                <span className="text-slate-200">{activeOrder.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.trackingEta}</span>
                <span className="text-cyan-300 font-semibold">{activeOrder.eta}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400 flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-emerald-400" /> {t.trackingSeal}
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  {activeOrder.securitySeal}
                </span>
              </div>
            </div>
          </div>

          {/* 4-STAGE DETAILED TIMELINE */}
          <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{t.trackingMilestoneTitle}</span>
            </h3>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
              {activeOrder.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Status Indicator Dot */}
                  <div
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border text-xs font-mono ${
                      step.completed
                        ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        : step.current
                        ? 'bg-cyan-500 border-cyan-400 text-black animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                        : 'bg-[#090D17] border-white/20 text-slate-500'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-white font-mono">
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                        {step.timestamp}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{step.location}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1 leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
