import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { getAssetPath } from '../../../utils/assetPath';

const CPU_MODEL_URL = getAssetPath('models/cpu.glb');

interface ModelProps {
  wireframe?: boolean;
}

// Authentic High-Poly AMD Ryzen Threadripper PRO 7995WX (sTR5 Workstation Architecture)
export const ThreadripperModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  const gltf = useGLTF(
    CPU_MODEL_URL,
    false,
    false,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Nickel-plated copper Integrated Heat Spreader (IHS)
    const nickelIhsMat = new THREE.MeshPhysicalMaterial({
      color: '#E2E8F0',
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      reflectivity: 0.96,
      iridescence: 0.25,
      iridescenceIOR: 1.35
    });

    // Dark Emerald / Obsidian Enterprise Multi-Layer PCB Substrate
    const pcbMat = new THREE.MeshStandardMaterial({
      color: '#061610',
      roughness: 0.45,
      metalness: 0.15
    });

    // Pure 24K Gold Pin-1 Alignment & Contacts
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      metalness: 0.98,
      roughness: 0.1
    });

    // SMD Ceramic Capacitor Bodies
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: '#452A18',
      roughness: 0.55,
      metalness: 0.1
    });

    // Silver Alloy SMD Solder Terminals
    const solderMat = new THREE.MeshStandardMaterial({
      color: '#CBD5E1',
      roughness: 0.25,
      metalness: 0.92
    });

    // Wireframe Hologram Material
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#06B6D4',
      wireframe: true
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (wireframe) {
          mesh.material = wireframeMat;
        } else {
          const mat = mesh.material as any;
          const matName = (mat?.name || '').toLowerCase();

          // Preserve LGA pin socket texture with gold shine
          if (mat?.map || matName.includes('pads')) {
            mat.metalness = 0.9;
            mat.roughness = 0.25;
            mat.needsUpdate = true;
          } else if (matName.includes('ihs') || matName.includes('nickel')) {
            mesh.material = nickelIhsMat;
          } else if (matName.includes('pcb')) {
            mesh.material = pcbMat;
          } else if (matName.includes('gold')) {
            mesh.material = goldMat;
          } else if (matName.includes('ceramic')) {
            mesh.material = ceramicMat;
          } else if (matName.includes('solder')) {
            mesh.material = solderMat;
          } else {
            mesh.material = nickelIhsMat;
          }
        }
      }
    });

    return clone;
  }, [gltf, wireframe]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.24;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.16} floatIntensity={0.2}>
      <group
        ref={groupRef}
        scale={[50, 50, 50]}
        rotation={[-Math.PI / 4.5, Math.PI / 5, 0]}
        position={[0, 0, 0]}
      >
        <primitive object={clonedScene} />

        {/* 
          Authentic IHS lid details (Pin-1 alignment marker & DataMatrix security matrix).
          Typography is rendered cleanly in the floating HTML/Tailwind overlay above the canvas.
        */}
        <group position={[0, 0, 0.00512]}>
          {/* Micro 2D DataMatrix Security QR Square in top-right corner */}
          <mesh position={[0.0115, 0.0095, 0.00005]}>
            <planeGeometry args={[0.0032, 0.0032]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>

          {/* Authentic Pin-1 Gold Alignment Triangle Marker in bottom-left corner */}
          <mesh position={[-0.0125, -0.0125, 0.00005]} rotation={[0, 0, -Math.PI / 4]}>
            <coneGeometry args={[0.0016, 0.0022, 3]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

useGLTF.preload(CPU_MODEL_URL);
