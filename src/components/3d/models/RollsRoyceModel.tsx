import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { getAssetPath } from '../../../utils/assetPath';

const LUXURY_CAR_MODEL_URL = getAssetPath('models/luxury_car.glb');

interface ModelProps {
  wireframe?: boolean;
}

// Authentic High-Poly BMW M Performance M4 Competition
export const RollsRoyceModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(LUXURY_CAR_MODEL_URL);

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // BMW M Performance Isle of Man Deep Metallic Blue / Tanzanite
    const mPerformancePaint = new THREE.MeshPhysicalMaterial({
      color: '#1D4ED8',
      metalness: 0.82,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
      iridescence: 0.25
    });

    // Dark Chrome Grille & Accents
    const darkChrome = new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      metalness: 0.95,
      roughness: 0.08
    });

    // Illuminated Laser Matrix Headlights
    const headlightLens = new THREE.MeshPhysicalMaterial({
      color: '#E0F2FE',
      emissive: '#38BDF8',
      emissiveIntensity: 0.9,
      transmission: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true
    });

    // Smoked Privacy Glass
    const smokedGlass = new THREE.MeshPhysicalMaterial({
      color: '#0A111E',
      transmission: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true
    });

    // Wireframe Material
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#06B6D4',
      wireframe: true
    });

    clone.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (wireframe) {
          mesh.material = wireframeMat;
        } else {
          const mat = mesh.material as any;
          const matName = (mat?.name || '').toLowerCase();
          const meshName = mesh.name.toLowerCase();

          // If the mesh already has high-resolution texture map (rims, logo, dash, carbon), preserve it
          if (mat?.map) {
            mat.roughness = THREE.MathUtils.clamp(mat.roughness ?? 0.3, 0.15, 0.5);
            mat.metalness = THREE.MathUtils.clamp(mat.metalness ?? 0.4, 0.2, 0.8);
            mat.needsUpdate = true;
          } else if (meshName.includes('grill') || matName.includes('grill') || matName.includes('piggrill')) {
            mesh.material = darkChrome;
          } else if (meshName.includes('headlight') || matName.includes('light51') || matName.includes('led')) {
            mesh.material = headlightLens;
          } else if (meshName.includes('chrome') || matName.includes('chrome') || matName.includes('logo')) {
            mesh.material = darkChrome;
          } else if (meshName.includes('glass') || matName.includes('glass') || matName.includes('window')) {
            mesh.material = smokedGlass;
          } else if (matName.includes('body') || matName.includes('paint') || matName.includes('livery')) {
            mesh.material = mPerformancePaint;
          }
        }
      }
    });

    return clone;
  }, [gltf, wireframe]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
      <group
        ref={groupRef}
        scale={[0.22, 0.22, 0.22]}
        position={[0.15, -0.6, 0.15]}
      >
        <primitive object={clonedScene} />

        {/* Dedicated studio illumination spots for BMW M Performance body */}
        <pointLight position={[0, 4, 8]} intensity={4.0} color="#E0F2FE" distance={20} />
        <pointLight position={[6, 3, 0]} intensity={3.0} color="#93C5FD" distance={15} />
        <pointLight position={[-6, 3, 0]} intensity={3.0} color="#93C5FD" distance={15} />
        <pointLight position={[0, 1, -10]} intensity={2.5} color="#38BDF8" distance={15} />
      </group>
    </Float>
  );
};

useGLTF.preload(LUXURY_CAR_MODEL_URL);
