import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

export const ModernVillaModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const villaGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (villaGroup.current) {
      villaGroup.current.rotation.y += delta * 0.12;
    }
  });

  // Materials
  const concreteMat = new THREE.MeshStandardMaterial({
    color: wireframe ? '#8b5cf6' : '#232733',
    roughness: 0.85,
    metalness: 0.1,
    wireframe
  });

  const calacattaMarbleMat = new THREE.MeshPhysicalMaterial({
    color: wireframe ? '#ec4899' : '#F8FAFC',
    roughness: 0.2,
    metalness: 0.12,
    clearcoat: 0.85,
    clearcoatRoughness: 0.15,
    wireframe
  });

  const architecturalGlassMat = new THREE.MeshPhysicalMaterial({
    color: wireframe ? '#06b6d4' : '#0B1524',
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.1,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1.0,
    transparent: true,
    wireframe
  });

  const interiorWarmGlowMat = new THREE.MeshBasicMaterial({
    color: '#FDE047',
    wireframe
  });

  const poolWaterMat = new THREE.MeshPhysicalMaterial({
    color: wireframe ? '#06b6d4' : '#06B6D4',
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.1,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1.0,
    transparent: true,
    wireframe
  });

  const teakWoodMat = new THREE.MeshStandardMaterial({
    color: wireframe ? '#8b5cf6' : '#8A532B',
    roughness: 0.6,
    wireframe
  });

  const solarRoofMat = new THREE.MeshPhysicalMaterial({
    color: wireframe ? '#06b6d4' : '#0F172A',
    metalness: 0.95,
    roughness: 0.15,
    clearcoat: 0.9,
    iridescence: 0.7,
    wireframe
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.18}>
      <group ref={villaGroup} scale={[1.15, 1.15, 1.15]} position={[0, -0.65, 0]}>
        
        {/* Main Architectural Landscaped Podium Base */}
        <mesh position={[0, 0, 0]} material={concreteMat}>
          <boxGeometry args={[6.4, 0.45, 5.0]} />
        </mesh>

        {/* Level 1 Main Living Pavilion (Floor-to-Ceiling Schüco Glass) */}
        <mesh position={[-0.45, 0.85, 0]} material={architecturalGlassMat}>
          <boxGeometry args={[4.0, 1.25, 3.4]} />
        </mesh>

        {/* Level 1 Warm Interior Floor / Living Room Lighting */}
        <mesh position={[-0.45, 0.72, 0]} material={interiorWarmGlowMat}>
          <boxGeometry args={[2.8, 0.08, 2.2]} />
        </mesh>
        {/* Interior Minimalist Kitchen Island */}
        <mesh position={[-1.2, 0.55, -0.4]} material={calacattaMarbleMat}>
          <boxGeometry args={[1.2, 0.5, 0.6]} />
        </mesh>

        {/* Level 1 Spine Structural Core */}
        <mesh position={[1.65, 0.85, 0]} material={concreteMat}>
          <boxGeometry args={[0.35, 1.25, 3.4]} />
        </mesh>

        {/* Inter-Floor Concrete Slab */}
        <mesh position={[-0.25, 1.52, 0]} material={concreteMat}>
          <boxGeometry args={[4.6, 0.16, 3.8]} />
        </mesh>

        {/* Level 2: Cantilevered Master Suite Overhang (Extending Forward & Left) */}
        <mesh position={[-0.85, 2.2, 0.45]} material={calacattaMarbleMat}>
          <boxGeometry args={[3.8, 1.15, 2.8]} />
        </mesh>

        {/* Cantilever Master Panoramic Corner Window */}
        <mesh position={[-1.3, 2.2, 1.86]} material={architecturalGlassMat}>
          <boxGeometry args={[2.8, 0.95, 0.05]} />
        </mesh>
        <mesh position={[-2.76, 2.2, 1.2]} rotation={[0, Math.PI / 2, 0]} material={architecturalGlassMat}>
          <boxGeometry args={[1.4, 0.95, 0.05]} />
        </mesh>

        {/* Level 2 Warm Interior Light Core */}
        <mesh position={[-0.85, 2.08, 0.45]} material={interiorWarmGlowMat}>
          <boxGeometry args={[2.4, 0.08, 1.8]} />
        </mesh>

        {/* Vertical Teak Privacy Louvers on Master Suite Balcony */}
        {[-0.7, -0.45, -0.2, 0.05, 0.3].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 2.2, 1.88]} material={teakWoodMat}>
            <boxGeometry args={[0.04, 1.05, 0.08]} />
          </mesh>
        ))}

        {/* Thin Cantilevered Floating Roof Canopy */}
        <mesh position={[-0.85, 2.84, 0.45]} material={concreteMat}>
          <boxGeometry args={[4.4, 0.12, 3.4]} />
        </mesh>

        {/* Solar Glass Roof Grid Panels */}
        <mesh position={[-0.85, 2.91, 0.45]} material={solarRoofMat}>
          <boxGeometry args={[4.0, 0.02, 3.0]} />
        </mesh>

        {/* Heated Cantilevered Infinity Pool Basin & Spillway */}
        <group position={[1.9, 0.28, 0]}>
          <mesh material={calacattaMarbleMat}>
            <boxGeometry args={[1.9, 0.38, 3.4]} />
          </mesh>
          <mesh position={[0, 0.18, 0]} material={poolWaterMat}>
            <boxGeometry args={[1.6, 0.06, 3.1]} />
          </mesh>
        </group>

        {/* Sunken Lounge Terrace with Fire Pit */}
        <group position={[0.65, 0.32, 1.7]}>
          <mesh material={teakWoodMat}>
            <boxGeometry args={[1.4, 0.05, 1.4]} />
          </mesh>
          <mesh position={[0, 0.1, 0]} material={concreteMat}>
            <boxGeometry args={[0.5, 0.15, 0.5]} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
            <meshBasicMaterial color="#EA580C" />
          </mesh>
        </group>

        {/* Architectural Linear LED Ground Uplights */}
        <mesh position={[-0.45, 0.24, 1.95]}>
          <boxGeometry args={[3.8, 0.02, 0.04]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>
        <mesh position={[1.9, 0.1, 1.8]}>
          <boxGeometry args={[1.8, 0.02, 0.04]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>
      </group>
    </Float>
  );
};
