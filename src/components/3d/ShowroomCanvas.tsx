import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import { RTX5090Model } from './models/RTX5090Model';
import { IPhone18ProModel } from './models/IPhone18ProModel';
import { RollsRoyceModel } from './models/RollsRoyceModel';
import { Porsche911GT3RS } from './models/Porsche911GT3RS';
import { ModernVillaModel } from './models/ModernVillaModel';
import { ThreadripperModel } from './models/ThreadripperModel';

interface ShowroomCanvasProps {
  modelKey: 'rtx5090' | 'iphone18' | 'cullinan' | 'gt3rs' | 'villa' | 'threadripper';
  isWireframe: boolean;
  isHudCollapsed?: boolean;
}

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

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.8, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Studio Lighting Rig */}
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
  );
};
