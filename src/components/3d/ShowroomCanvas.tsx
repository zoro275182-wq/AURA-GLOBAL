import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { RTX5090Model } from './models/RTX5090Model';
import { IPhone18ProModel } from './models/IPhone18ProModel';
import { RollsRoyceModel } from './models/RollsRoyceModel';
import { Porsche911GT3RS } from './models/Porsche911GT3RS';
import { ModernVillaModel } from './models/ModernVillaModel';
import { ThreadripperModel } from './models/ThreadripperModel';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface ShowroomCanvasProps {
  modelKey: 'rtx5090' | 'iphone18' | 'cullinan' | 'gt3rs' | 'villa' | 'threadripper';
  isWireframe: boolean;
  isHudCollapsed?: boolean;
}

const MODEL_BADGES: Record<
  ShowroomCanvasProps['modelKey'],
  { title: string; subtitle: string; tag: string; color: string }
> = {
  threadripper: {
    title: 'AMD RYZEN™ THREADRIPPER™ PRO 7995WX',
    subtitle: '96 Cores • 192 Threads • 5.1 GHz Boost • sTR5 Workstation Architecture',
    tag: 'DIFFUSED IN USA / TAIWAN',
    color: 'from-orange-500 to-amber-600'
  },
  rtx5090: {
    title: 'GEFORCE RTX 5090 FOUNDERS EDITION',
    subtitle: 'Blackwell B200 Dual-Axial Flow • 32GB GDDR7 512-bit • Titanium Shroud',
    tag: 'FLAGSHIP NEURAL HARDWARE',
    color: 'from-cyan-400 to-blue-600'
  },
  iphone18: {
    title: 'APPLE iPHONE 18 PRO MAX',
    subtitle: 'Deep Burgundy Velvet Frosted Glass • Grade 5 Titanium • 48MP Triple-Lens',
    tag: 'AURA EXCLUSIVE EDITION',
    color: 'from-rose-500 to-pink-700'
  },
  cullinan: {
    title: 'BMW M PERFORMANCE M4 COMPETITION',
    subtitle: 'S58 3.0L M TwinPower Turbo • 550 HP • Isle of Man Metallic Clearcoat',
    tag: 'BAVARIA MOTOR HUB',
    color: 'from-blue-500 to-indigo-600'
  },
  gt3rs: {
    title: 'LAMBORGHINI GALLARDO LP560-4',
    subtitle: '5.2L Odd-Firing V10 • 560 HP • Champagne Gold Metallic Lacquer',
    tag: 'SANT’AGATA BOLOGNESE',
    color: 'from-amber-400 to-yellow-600'
  },
  villa: {
    title: 'MODERN MINIMALIST GLASS VILLA 450M²',
    subtitle: 'Calacatta Marble • High-Transmission Acoustic Glass • Off-Grid Solar Roof',
    tag: 'TURNKEY GLOBAL REALTY',
    color: 'from-emerald-400 to-teal-600'
  }
};

const LoadingIndicator = () => (
  <Html center>
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-[#090D18]/90 backdrop-blur-xl border border-cyan-400/30 text-cyan-300 font-mono shadow-[0_0_30px_rgba(6,182,212,0.4)]">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      <span className="text-xs uppercase tracking-widest text-cyan-300">
        LOADING 3D MESH...
      </span>
    </div>
  </Html>
);

export const ShowroomCanvas: React.FC<ShowroomCanvasProps> = ({
  modelKey,
  isWireframe,
  isHudCollapsed = false
}) => {
  // Dynamically calculate horizontal offset based on screen width
  const [modelOffsetX, setModelOffsetX] = useState(1.4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 || isHudCollapsed) {
        setModelOffsetX(0);
      } else {
        setModelOffsetX(1.35); // Shift right so the left-side hologram HUD never blocks the model
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isHudCollapsed]);

  const badge = MODEL_BADGES[modelKey];

  return (
    <div className="w-full h-full relative">
      {/* 
        PURE HTML/TAILWIND FLOATING MODEL BRANDING BADGE OVERLAY 
        Replaces Drei's <Text> / <Text3D> completely to prevent external CDN font requests
      */}
      <div
        className={`absolute top-20 left-0 right-0 z-20 pointer-events-none flex justify-center px-4 transition-all duration-300 ${
          modelOffsetX > 0 ? 'lg:pl-96' : ''
        }`}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#080C16]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${badge.color} animate-pulse`} />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-slate-100 font-mono">
                {badge.title}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300 font-mono">
                {badge.tag}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:inline">
              {badge.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* CLASS-BASED ERROR BOUNDARY WRAPPING CANVAS */}
      <CanvasErrorBoundary>
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 1.8, 6.2], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            {/* Pure Local Studio Lighting Rig (No Environment / CDN calls) */}
            <ambientLight intensity={isWireframe ? 0.4 : 1.2} />

            {/* Key Light (Crisp White Softbox) */}
            <directionalLight
              position={[6, 9, 6]}
              intensity={isWireframe ? 0.8 : 3.0}
              color="#F8FAFC"
              castShadow
            />

            {/* Rim / Backlight (Electric Violet Sheen) */}
            <directionalLight
              position={[-6, 6, -6]}
              intensity={isWireframe ? 1.6 : 3.2}
              color="#8B5CF6"
            />

            {/* Fill Underlight (Cyan Specular) */}
            <directionalLight
              position={[0, -4, 4]}
              intensity={isWireframe ? 1.2 : 1.6}
              color="#06B6D4"
            />

            {/* Specular Glint Spotlights for Glass & Metallic Clearcoat */}
            <spotLight
              position={[modelOffsetX + 5, 8, 5]}
              target-position={[modelOffsetX, 0, 0]}
              angle={0.42}
              penumbra={0.75}
              intensity={3.6}
              color="#FFFFFF"
            />
            <spotLight
              position={[modelOffsetX - 5, 6, -4]}
              target-position={[modelOffsetX, 0, 0]}
              angle={0.48}
              penumbra={0.8}
              intensity={2.8}
              color="#38BDF8"
            />

            {/* Top Accent Light (Rose Specular Highlight) */}
            <pointLight position={[modelOffsetX, 5, 0]} intensity={2.4} color="#EC4899" />

            {/* Front Specular Highlight Light for metals & glass */}
            <pointLight position={[modelOffsetX, 2, 4]} intensity={2.0} color="#E0F2FE" />

            <Suspense fallback={<LoadingIndicator />}>
              {/* Shift model horizontally so it sits comfortably to the right of the Hologram Letter */}
              <group position={[modelOffsetX, -0.15, 0]}>
                {modelKey === 'rtx5090' && <RTX5090Model wireframe={isWireframe} />}
                {modelKey === 'iphone18' && <IPhone18ProModel wireframe={isWireframe} />}
                {modelKey === 'cullinan' && <RollsRoyceModel wireframe={isWireframe} />}
                {modelKey === 'gt3rs' && <Porsche911GT3RS wireframe={isWireframe} />}
                {modelKey === 'villa' && <ModernVillaModel wireframe={isWireframe} />}
                {modelKey === 'threadripper' && <ThreadripperModel wireframe={isWireframe} />}
              </group>

              {/* Ground Contact Shadows */}
              <ContactShadows
                position={[modelOffsetX, -2.1, 0]}
                opacity={isWireframe ? 0.2 : 0.7}
                scale={14}
                blur={2.4}
                far={4.8}
                color="#06B6D4"
              />
            </Suspense>

            {/* Smooth 360 Orbit Controls */}
            <OrbitControls
              target={[modelOffsetX, 0, 0]}
              enablePan={false}
              enableZoom={true}
              minDistance={2.8}
              maxDistance={11.0}
              dampingFactor={0.06}
              rotateSpeed={0.85}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2 + 0.05}
            />
          </Canvas>
        </div>
      </CanvasErrorBoundary>
    </div>
  );
};
