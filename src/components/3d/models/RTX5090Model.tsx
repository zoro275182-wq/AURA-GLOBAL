import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural NVIDIA GeForce RTX 5090 Founders Edition
// Zero external .glb network requests. Uses standard Three.js geometries and materials.
export const RTX5090Model: React.FC<ModelProps> = ({ wireframe = false }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cardGroup.current) {
      cardGroup.current.rotation.y += delta * 0.25;
    }
    if (fan1Ref.current) {
      fan1Ref.current.rotation.z += delta * 4;
    }
    if (fan2Ref.current) {
      fan2Ref.current.rotation.z -= delta * 4;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Gunmetal Titanium Shroud Frame
    const titaniumFrame = new THREE.MeshPhysicalMaterial({
      color: '#1E232F',
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.85,
      reflectivity: 0.95
    });

    // Pure Copper Heatsink Fin Core
    const heatsinkCopper = new THREE.MeshStandardMaterial({
      color: '#B45309',
      metalness: 0.88,
      roughness: 0.28
    });

    // Dark Matte Fan Blades & Hub
    const fanMat = new THREE.MeshStandardMaterial({
      color: '#0B0F17',
      metalness: 0.6,
      roughness: 0.35
    });

    // Silver Fan Hub Center Metal Accent
    const silverHub = new THREE.MeshStandardMaterial({
      color: '#CBD5E1',
      metalness: 0.95,
      roughness: 0.1
    });

    // Illuminated Emerald / Mint Green LED Emblem
    const ledMat = new THREE.MeshBasicMaterial({
      color: '#34D399'
    });

    // PCIe 5.1 Gold Contact Fingers
    const pcieGold = new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      metalness: 0.98,
      roughness: 0.1
    });

    return {
      titaniumFrame: wireframe ? wireMat : titaniumFrame,
      heatsinkCopper: wireframe ? wireMat : heatsinkCopper,
      fanMat: wireframe ? wireMat : fanMat,
      silverHub: wireframe ? wireMat : silverHub,
      ledMat: wireframe ? wireMat : ledMat,
      pcieGold: wireframe ? wireMat : pcieGold
    };
  }, [wireframe]);

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={cardGroup} scale={[1.3, 1.3, 1.3]} rotation={[-Math.PI / 8, Math.PI / 4, 0]}>
        {/* Main Dual-Axial Flow Shroud Chassis (Length: 3.0, Width: 1.35, Depth: 0.6) */}
        <mesh position={[0, 0, 0]} material={materials.titaniumFrame}>
          <boxGeometry args={[3.0, 1.35, 0.58]} />
        </mesh>

        {/* Central Recessed Heatsink Fin Array (Center Pass-Through) */}
        <mesh position={[0, 0, 0]} material={materials.heatsinkCopper}>
          <boxGeometry args={[2.85, 1.25, 0.52]} />
        </mesh>

        {/* Fan 1 Ring & Rotor (Front Intake, position X: -0.75) */}
        <group position={[-0.75, 0, 0.3]}>
          <mesh material={materials.titaniumFrame}>
            <torusGeometry args={[0.52, 0.04, 16, 36]} />
          </mesh>
          <group ref={fan1Ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.silverHub}>
              <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
            </mesh>
            {/* 7 Aerodynamic Fan Blades */}
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
              const angle = (idx * (2 * Math.PI)) / 7;
              return (
                <mesh key={idx} rotation={[0, 0, angle]} position={[0, 0, 0]} material={materials.fanMat}>
                  <boxGeometry args={[0.08, 0.44, 0.02]} />
                </mesh>
              );
            })}
          </group>
        </group>

        {/* Fan 2 Ring & Rotor (Rear Exhaust Pass-through, position X: 0.75, underside Z: -0.3) */}
        <group position={[0.75, 0, -0.3]}>
          <mesh material={materials.titaniumFrame}>
            <torusGeometry args={[0.52, 0.04, 16, 36]} />
          </mesh>
          <group ref={fan2Ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.silverHub}>
              <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
            </mesh>
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
              const angle = (idx * (2 * Math.PI)) / 7;
              return (
                <mesh key={idx} rotation={[0, 0, angle]} position={[0, 0, 0]} material={materials.fanMat}>
                  <boxGeometry args={[0.08, 0.44, 0.02]} />
                </mesh>
              );
            })}
          </group>
        </group>

        {/* Side Illuminated LED Emblem Bar (GEFORCE RTX 5090) */}
        <mesh position={[0, 0.68, 0]} material={materials.ledMat}>
          <boxGeometry args={[1.5, 0.03, 0.2]} />
        </mesh>

        {/* Soft Point Light from Logo */}
        <pointLight position={[0, 0.8, 0]} intensity={1.2} color="#34D399" distance={1.2} />

        {/* PCIe 5.1 x16 Gold Pin Edge Connector */}
        <mesh position={[-0.3, -0.73, 0]} material={materials.pcieGold}>
          <boxGeometry args={[1.3, 0.09, 0.04]} />
        </mesh>

        {/* Chrome Display Bracket (Triple DisplayPort 2.1 + HDMI 2.1b) */}
        <mesh position={[-1.52, 0, 0]} material={materials.silverHub}>
          <boxGeometry args={[0.04, 1.45, 0.62]} />
        </mesh>
      </group>
    </Float>
  );
};
