import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// Authentic High-Poly Exotic Sports Car with realistic clearcoat lacquer
export const Porsche911GT3RS: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/supercar.glb');

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Oro Elios / Champagne Gold Metallic Clearcoat Paint (Lamborghini Gallardo)
    const gallardoGoldPaint = new THREE.MeshPhysicalMaterial({
      color: '#CDB07B',
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.98,
      iridescence: 0.35
    });

    // Glasshouse Tinted Glass
    const windowGlass = new THREE.MeshPhysicalMaterial({
      color: '#0B0F17',
      transmission: 0.75,
      transparent: true,
      opacity: 0.88,
      roughness: 0.04,
      ior: 1.52,
      clearcoat: 1.0
    });

    // Magnesium Wheels / Dark Metal
    const magnesiumWheels = new THREE.MeshStandardMaterial({
      color: '#1E232D',
      metalness: 0.95,
      roughness: 0.18
    });

    // Acid Yellow PCCB Calipers
    const acidYellowCaliper = new THREE.MeshBasicMaterial({
      color: '#FACC15'
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
          const meshName = mesh.name.toLowerCase();
          const matName = (mesh.material as THREE.Material)?.name?.toLowerCase() || '';

          if (
            meshName.includes('paint') ||
            matName.includes('paint') ||
            meshName.includes('bumper') ||
            meshName.includes('hood') ||
            meshName.includes('fender') ||
            meshName.includes('door') ||
            meshName.includes('trunk') ||
            meshName.includes('roof')
          ) {
            mesh.material = gallardoGoldPaint;
          } else if (meshName.includes('glass') || matName.includes('glass') || meshName.includes('windshield')) {
            mesh.material = windowGlass;
          } else if (meshName.includes('wheel') || meshName.includes('rim') || matName.includes('wheel')) {
            mesh.material = magnesiumWheels;
          } else if (meshName.includes('caliper') || meshName.includes('brake')) {
            mesh.material = acidYellowCaliper;
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
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={groupRef} scale={[0.85, 0.85, 0.85]} position={[0, -0.4, 0]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
};

useGLTF.preload('/models/supercar.glb');
