import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { ShowroomCanvas } from '../components/3d/ShowroomCanvas';
import { HologramSpecLetter } from '../components/hologram/HologramSpecLetter';
import {
  Cpu,
  Smartphone,
  Car,
  Home as HomeIcon,
  Layers,
  MousePointer,
  ZoomIn
} from 'lucide-react';

export const ShowroomPage: React.FC = () => {
  const {
    selectedShowroomModel,
    setSelectedShowroomModel,
    isWireframeMode,
    t,
    language,
    catalogItems
  } = useGlobalState();

  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  const showroomModels = [
    {
      key: 'rtx5090' as const,
      name: 'RTX 5090 FE',
      category: language === 'RU' ? 'Кремний ИИ' : 'PC Hardware',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      key: 'iphone18' as const,
      name: 'iPhone 18 Pro Max',
      category: language === 'RU' ? 'Смартфоны' : 'Smartphones',
      icon: Smartphone,
      color: 'from-pink-600 to-rose-700'
    },
    {
      key: 'cullinan' as const,
      name: 'BMW M Performance M4',
      category: language === 'RU' ? 'Спорткупе М' : 'M Performance',
      icon: Car,
      color: 'from-blue-600 to-indigo-800'
    },
    {
      key: 'gt3rs' as const,
      name: 'Lamborghini Gallardo',
      category: language === 'RU' ? 'Суперкар V10' : 'V10 Supercar',
      icon: Car,
      color: 'from-amber-500 to-yellow-600'
    },
    {
      key: 'villa' as const,
      name: language === 'RU' ? 'Вилла 450м²' : '450m² Glass Villa',
      category: language === 'RU' ? 'Вилла под ключ' : 'Prefab Villa',
      icon: HomeIcon,
      color: 'from-amber-500 to-orange-600'
    },
    {
      key: 'threadripper' as const,
      name: 'Threadripper PRO',
      category: language === 'RU' ? '96 Ядер sTR5' : '96-Core sTR5',
      icon: Cpu,
      color: 'from-orange-500 to-amber-600'
    }
  ];

  // Find active asset data from catalogItems
  const activeAsset =
    catalogItems.find(item => item.modelKey === selectedShowroomModel) ||
    catalogItems[0];

  return (
    <div className="relative w-full h-screen min-h-[720px] overflow-hidden pt-16">

      {/* FULL-VIEWPORT 3D WEBGL STUDIO CANVAS */}
      <div className="absolute inset-0 z-0">
        <ShowroomCanvas
          modelKey={selectedShowroomModel}
          isWireframe={isWireframeMode}
          isHudCollapsed={isHudCollapsed}
        />
      </div>

      {/* TOP-RIGHT STUDIO STATUS & CAMERA HINTS (CLEAR OF ALL NAVIGATIONS) */}
      <div className="absolute top-24 right-6 sm:right-8 z-30 hidden md:flex items-center gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080C16]/90 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-slate-300 shadow-lg">
          <MousePointer className="w-3 h-3 text-cyan-400" />
          <span>{t.showroomHintDrag}</span>
          <span className="text-slate-600">•</span>
          <ZoomIn className="w-3 h-3 text-violet-400" />
          <span>{t.showroomHintZoom}</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080C16]/90 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-slate-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-cyan-300 font-semibold">{t.showroomEngine}</span>
        </div>
      </div>

      {/* FLOATING HOLOGRAPHIC GLITCH SPEC LETTER (LEFT SIDE OVERLAY - Z-30, WITH COLLAPSE TOGGLE) */}
      <div className="absolute left-4 sm:left-8 top-24 bottom-28 z-30 max-w-sm sm:max-w-md w-full pointer-events-none flex flex-col justify-start">
        <div className="pointer-events-auto w-full">
          <HologramSpecLetter
            asset={activeAsset}
            isCollapsed={isHudCollapsed}
            onToggleCollapse={() => setIsHudCollapsed(prev => !prev)}
          />
        </div>
      </div>

      {/* BOTTOM FLOATING MODEL SELECTOR DOCK (Z-40, ZERO COLLISION WITH NAVBAR OR HOLOGRAM) */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#080C16]/95 backdrop-blur-3xl border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.85)] overflow-x-auto max-w-full">
          {showroomModels.map(m => {
            const isSelected = selectedShowroomModel === m.key;
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setSelectedShowroomModel(m.key)}
                className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${isSelected
                  ? 'bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-bold shadow-[0_0_25px_rgba(6,182,212,0.65)] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                <span>{m.name}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 animate-ping hidden sm:inline-block" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
