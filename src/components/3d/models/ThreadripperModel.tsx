import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural AMD Ryzen Threadripper PRO 7995WX (sTR5 Workstation Architecture)
// Zero external .glb downloads, pure Three.js standard geometries and physical materials.
export const ThreadripperModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Nickel-plated copper Integrated Heat Spreader (IHS)
    const nickelIhs = new THREE.MeshPhysicalMaterial({
      color: '#CBD5E1',
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.9,
      reflectivity: 0.95
    });

    // Dark Emerald High-Density PCB Substrate
    const pcb = new THREE.MeshStandardMaterial({
      color: '#062016',
      roughness: 0.4,
      metalness: 0.2
    });

    // Gold Pin-1 & Contacts
    const gold = new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      metalness: 0.98,
      roughness: 0.1
    });

    // SMD Capacitors
    const ceramic = new THREE.MeshStandardMaterial({
      color: '#5C381E',
      roughness: 0.5,
      metalness: 0.15
    });

    // Dark Laser-etched Inscriptions Plane
    const darkLaser = new THREE.MeshStandardMaterial({
      color: '#1E293B',
      metalness: 0.5,
      roughness: 0.3
    });

    // AMD Crimson Orange Accent
    const amdOrange = new THREE.MeshStandardMaterial({
      color: '#EA580C',
      metalness: 0.4,
      roughness: 0.2
    });

    return {
      nickelIhs: wireframe ? wireMat : nickelIhs,
      pcb: wireframe ? wireMat : pcb,
      gold: wireframe ? wireMat : gold,
      ceramic: wireframe ? wireMat : ceramic,
      darkLaser: wireframe ? wireMat : darkLaser,
      amdOrange: wireframe ? wireMat : amdOrange
    };
  }, [wireframe]);

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} scale={[30, 30, 30]} rotation={[-Math.PI / 4, 0, 0]}>
        {/* PCB Substrate base: sTR5 large socket form-factor (58.5mm x 75.4mm) */}
        <mesh position={[0, 0, -0.001]} material={materials.pcb}>
          <boxGeometry args={[0.0754, 0.0585, 0.002]} />
        </mesh>

        {/* Nickel-Plated Copper IHS Lid */}
        <mesh position={[0, 0, 0.0018]} material={materials.nickelIhs}>
          <boxGeometry args={[0.068, 0.051, 0.0036]} />
        </mesh>

        {/* Center Recessed Engraving Area on IHS */}
        <mesh position={[0, 0, 0.00365]} material={materials.darkLaser}>
          <boxGeometry args={[0.054, 0.038, 0.0001]} />
        </mesh>

        {/* Architectural Threadripper Signature Bars on IHS */}
        <mesh position={[0, 0.006, 0.00375]} material={materials.amdOrange}>
          <boxGeometry args={[0.038, 0.004, 0.0001]} />
        </mesh>
        <mesh position={[0, -0.002, 0.00375]} material={materials.nickelIhs}>
          <boxGeometry args={[0.032, 0.0025, 0.0001]} />
        </mesh>
        <mesh position={[0, -0.008, 0.00375]} material={materials.gold}>
          <boxGeometry args={[0.024, 0.0018, 0.0001]} />
        </mesh>

        {/* Perimeter SMD Ceramic Capacitors on PCB edge */}
        {[-0.034, 0.034].map((x, idx) => (
          <group key={idx} position={[x, 0, 0.0008]}>
            {[-0.02, -0.01, 0, 0.01, 0.02].map((y, sIdx) => (
              <mesh key={sIdx} position={[0, y, 0]} material={materials.ceramic}>
                <boxGeometry args={[0.002, 0.004, 0.0014]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Pin-1 Gold Alignment Corner Marker */}
        <mesh position={[-0.032, -0.024, 0.0005]} material={materials.gold}>
          <cylinderGeometry args={[0.0015, 0.0015, 0.0015, 3]} />
        </mesh>

        {/* LGA Contact Gold Pads on bottom surface */}
        <mesh position={[0, 0, -0.0021]} material={materials.gold}>
          <boxGeometry args={[0.071, 0.054, 0.0002]} />
        </mesh>
      </group>
    </Float>
  );
};
