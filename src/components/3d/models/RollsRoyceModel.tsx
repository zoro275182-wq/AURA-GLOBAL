import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural BMW M Performance M4 Competition Sport Coupé
// Zero external .glb network requests. Uses standard Three.js geometries and materials.
export const RollsRoyceModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // BMW M Performance Isle of Man Metallic Deep Blue Clearcoat
    const mPerformanceBlue = new THREE.MeshPhysicalMaterial({
      color: '#1D4ED8',
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95
    });

    // Smoked Privacy & Windshield Glass
    const windowGlass = new THREE.MeshPhysicalMaterial({
      color: '#0A111E',
      transmission: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true
    });

    // Dark Chrome Shadowline / Kidney Grille
    const darkChrome = new THREE.MeshStandardMaterial({
      color: '#1E293B',
      metalness: 0.95,
      roughness: 0.12
    });

    // Carbon Fiber Roof & Aerodynamic Mirrors
    const carbonFiber = new THREE.MeshStandardMaterial({
      color: '#090D16',
      metalness: 0.8,
      roughness: 0.3
    });

    // Sport Tires
    const tireRubber = new THREE.MeshStandardMaterial({
      color: '#111827',
      roughness: 0.85,
      metalness: 0.1
    });

    // BMW M 826M Bicolor Forged Rims
    const rimMat = new THREE.MeshStandardMaterial({
      color: '#CBD5E1',
      metalness: 0.92,
      roughness: 0.12
    });

    // M Compound Blue Brake Calipers
    const blueCaliper = new THREE.MeshStandardMaterial({
      color: '#2563EB',
      metalness: 0.7,
      roughness: 0.2
    });

    // Laser Light Matrix (Ice Blue)
    const laserHeadlight = new THREE.MeshBasicMaterial({
      color: '#93C5FD'
    });

    // L-Shaped M Taillight LEDs
    const ledTaillight = new THREE.MeshBasicMaterial({
      color: '#EF4444'
    });

    return {
      mPerformanceBlue: wireframe ? wireMat : mPerformanceBlue,
      windowGlass: wireframe ? wireMat : windowGlass,
      darkChrome: wireframe ? wireMat : darkChrome,
      carbonFiber: wireframe ? wireMat : carbonFiber,
      tireRubber: wireframe ? wireMat : tireRubber,
      rimMat: wireframe ? wireMat : rimMat,
      blueCaliper: wireframe ? wireMat : blueCaliper,
      laserHeadlight: wireframe ? wireMat : laserHeadlight,
      ledTaillight: wireframe ? wireMat : ledTaillight
    };
  }, [wireframe]);

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.18}>
      <group ref={groupRef} scale={[1.1, 1.1, 1.1]} position={[0, -0.32, 0]}>
        {/* Main Muscular Sport Coupé Body (Length: 3.8, Width: 1.76, Height: 0.58) */}
        <mesh position={[0, 0.48, 0]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[1.76, 0.48, 3.8]} />
        </mesh>

        {/* Dynamic Sloped Greenhouse Cabin & Curved Windshield */}
        <mesh position={[0, 0.92, -0.15]} material={materials.windowGlass}>
          <boxGeometry args={[1.44, 0.46, 2.05]} />
        </mesh>

        {/* Lightweight Carbon Fiber Roof Panel */}
        <mesh position={[0, 1.16, -0.18]} material={materials.carbonFiber}>
          <boxGeometry args={[1.36, 0.04, 1.82]} />
        </mesh>

        {/* Muscular Hood with Powerdome */}
        <mesh position={[0, 0.58, 1.35]} rotation={[0.12, 0, 0]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[1.68, 0.22, 1.4]} />
        </mesh>

        {/* Iconic Vertical Twin Kidney Grilles */}
        <mesh position={[-0.22, 0.42, 1.91]} material={materials.darkChrome}>
          <boxGeometry args={[0.3, 0.44, 0.06]} />
        </mesh>
        <mesh position={[0.22, 0.42, 1.91]} material={materials.darkChrome}>
          <boxGeometry args={[0.3, 0.44, 0.06]} />
        </mesh>

        {/* Laser Headlight Clusters with Twin Hexagonal DRL Rings */}
        <mesh position={[-0.64, 0.52, 1.84]} rotation={[-0.1, -0.2, 0]} material={materials.laserHeadlight}>
          <boxGeometry args={[0.38, 0.1, 0.24]} />
        </mesh>
        <mesh position={[0.64, 0.52, 1.84]} rotation={[-0.1, 0.2, 0]} material={materials.laserHeadlight}>
          <boxGeometry args={[0.38, 0.1, 0.24]} />
        </mesh>

        {/* Rear Trunk Lid with Integrated Carbon Lip Spoiler */}
        <mesh position={[0, 0.74, -1.86]} material={materials.carbonFiber}>
          <boxGeometry args={[1.48, 0.08, 0.22]} />
        </mesh>

        {/* L-Shaped OLED Rear Taillights */}
        <mesh position={[-0.62, 0.56, -1.91]} material={materials.ledTaillight}>
          <boxGeometry args={[0.42, 0.1, 0.06]} />
        </mesh>
        <mesh position={[0.62, 0.56, -1.91]} material={materials.ledTaillight}>
          <boxGeometry args={[0.42, 0.1, 0.06]} />
        </mesh>

        {/* Quad M Sport Exhaust Tailpipes */}
        {[-0.38, -0.24, 0.24, 0.38].map((x, idx) => (
          <mesh key={idx} position={[x, 0.24, -1.96]} rotation={[Math.PI / 2, 0, 0]} material={materials.darkChrome}>
            <cylinderGeometry args={[0.05, 0.05, 0.16, 16]} />
          </mesh>
        ))}

        {/* 4 M Forged Performance Wheels */}
        {[
          { x: -0.92, z: 1.2 },
          { x: 0.92, z: 1.2 },
          { x: -0.92, z: -1.22 },
          { x: 0.92, z: -1.22 }
        ].map((w, idx) => (
          <group key={idx} position={[w.x, 0.36, w.z]}>
            {/* Tire Rubber */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.tireRubber}>
              <cylinderGeometry args={[0.36, 0.36, 0.28, 24]} />
            </mesh>
            {/* 826M Bicolor Rim */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rimMat}>
              <cylinderGeometry args={[0.26, 0.26, 0.29, 20]} />
            </mesh>
            {/* M Blue Brake Caliper */}
            <mesh position={[0, 0.14, 0]} material={materials.blueCaliper}>
              <boxGeometry args={[0.08, 0.14, 0.18]} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};
