import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural Lamborghini Gallardo LP560-4 Supercar
// Zero external .glb network requests. Uses standard Three.js geometries and materials.
export const Porsche911GT3RS: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Oro Elios / Champagne Gold Metallic Clearcoat Lacquer
    const goldPaint = new THREE.MeshPhysicalMaterial({
      color: '#CDB07B',
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.96
    });

    // Glasshouse Tinted Glass
    const windowGlass = new THREE.MeshPhysicalMaterial({
      color: '#0B0F17',
      transmission: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true
    });

    // Dark Carbon Fiber / Aero Splitter
    const carbonAero = new THREE.MeshStandardMaterial({
      color: '#0F172A',
      metalness: 0.85,
      roughness: 0.25
    });

    // High-Performance Performance Tires
    const tireRubber = new THREE.MeshStandardMaterial({
      color: '#111827',
      roughness: 0.85,
      metalness: 0.1
    });

    // Diamond-Cut Forged Alloy Wheels
    const rimAlloy = new THREE.MeshStandardMaterial({
      color: '#F1F5F9',
      metalness: 0.95,
      roughness: 0.1
    });

    // Brembo Carbon Ceramic Caliper
    const brakeCaliper = new THREE.MeshStandardMaterial({
      color: '#EA580C',
      metalness: 0.6,
      roughness: 0.3
    });

    // LED Headlight Matrix
    const headlightMat = new THREE.MeshBasicMaterial({
      color: '#E0F2FE'
    });

    // LED Taillight Strip
    const taillightMat = new THREE.MeshBasicMaterial({
      color: '#EF4444'
    });

    return {
      goldPaint: wireframe ? wireMat : goldPaint,
      windowGlass: wireframe ? wireMat : windowGlass,
      carbonAero: wireframe ? wireMat : carbonAero,
      tireRubber: wireframe ? wireMat : tireRubber,
      rimAlloy: wireframe ? wireMat : rimAlloy,
      brakeCaliper: wireframe ? wireMat : brakeCaliper,
      headlightMat: wireframe ? wireMat : headlightMat,
      taillightMat: wireframe ? wireMat : taillightMat
    };
  }, [wireframe]);

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.18}>
      <group ref={groupRef} scale={[1.1, 1.1, 1.1]} position={[0, -0.35, 0]}>
        {/* Main Wedge Aerodynamic Monocoque Body (Length: 3.6, Width: 1.7, Height: 0.52) */}
        <mesh position={[0, 0.45, 0]} material={materials.goldPaint}>
          <boxGeometry args={[1.72, 0.42, 3.6]} />
        </mesh>

        {/* Sloped Cockpit Greenhouse Cabin with Panoramic Windshield */}
        <mesh position={[0, 0.82, -0.1]} material={materials.windowGlass}>
          <boxGeometry args={[1.42, 0.42, 1.85]} />
        </mesh>

        {/* Aerodynamic Low-Slung Front Wedge Hood */}
        <mesh position={[0, 0.4, 1.5]} rotation={[0.22, 0, 0]} material={materials.goldPaint}>
          <boxGeometry args={[1.68, 0.28, 1.1]} />
        </mesh>

        {/* Front Carbon Splitter & Air Intakes */}
        <mesh position={[0, 0.22, 1.82]} material={materials.carbonAero}>
          <boxGeometry args={[1.76, 0.12, 0.4]} />
        </mesh>

        {/* V10 Engine Bay Louvered Rear Deck */}
        <mesh position={[0, 0.68, -1.25]} rotation={[-0.12, 0, 0]} material={materials.carbonAero}>
          <boxGeometry args={[1.48, 0.18, 1.2]} />
        </mesh>

        {/* Aggressive Rear Carbon Diffuser */}
        <mesh position={[0, 0.24, -1.82]} material={materials.carbonAero}>
          <boxGeometry args={[1.74, 0.16, 0.38]} />
        </mesh>

        {/* Quad Exhaust Cannons */}
        {[-0.35, -0.22, 0.22, 0.35].map((x, i) => (
          <mesh key={i} position={[x, 0.26, -1.98]} rotation={[Math.PI / 2, 0, 0]} material={materials.rimAlloy}>
            <cylinderGeometry args={[0.045, 0.045, 0.15, 16]} />
          </mesh>
        ))}

        {/* LED Laser Headlights */}
        <mesh position={[-0.58, 0.48, 1.72]} rotation={[-0.2, -0.2, 0]} material={materials.headlightMat}>
          <boxGeometry args={[0.34, 0.08, 0.28]} />
        </mesh>
        <mesh position={[0.58, 0.48, 1.72]} rotation={[-0.2, 0.2, 0]} material={materials.headlightMat}>
          <boxGeometry args={[0.34, 0.08, 0.28]} />
        </mesh>

        {/* Rear LED Hexagonal Taillight Bar */}
        <mesh position={[0, 0.52, -1.83]} material={materials.taillightMat}>
          <boxGeometry args={[1.58, 0.08, 0.06]} />
        </mesh>

        {/* 4 Forged Wheels & Brakes */}
        {[
          { x: -0.9, z: 1.12 },
          { x: 0.9, z: 1.12 },
          { x: -0.9, z: -1.18 },
          { x: 0.9, z: -1.18 }
        ].map((w, idx) => (
          <group key={idx} position={[w.x, 0.35, w.z]}>
            {/* Tire Rubber */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.tireRubber}>
              <cylinderGeometry args={[0.35, 0.35, 0.26, 24]} />
            </mesh>
            {/* Diamond Cut Alloy Rim */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rimAlloy}>
              <cylinderGeometry args={[0.24, 0.24, 0.27, 20]} />
            </mesh>
            {/* Orange Caliper */}
            <mesh position={[0, 0.14, 0]} material={materials.brakeCaliper}>
              <boxGeometry args={[0.08, 0.12, 0.16]} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};
