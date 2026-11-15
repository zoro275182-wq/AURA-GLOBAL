import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { getAssetPath } from '../../../utils/assetPath';

interface ModelProps {
  wireframe?: boolean;
}

const CPU_MODEL_URL = getAssetPath('models/cpu.glb');

// High-resolution offline 2D Canvas laser-etching texture generator
// Runs 100% in local memory with zero external font or network requests.
function createLaserEtchTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Clear transparent background
    ctx.clearRect(0, 0, 1024, 1024);

    // 1. AMD RYZEN Laser Engraved Brand Header
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('AMD RYZEN™', 512, 330);

    // 2. AMD Signature Crimson-Orange Accent THREADRIPPER
    ctx.fillStyle = '#EA580C';
    ctx.font = '900 78px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('THREADRIPPER™', 512, 420);

    // 3. Model Subheading: PRO 7995WX
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('PRO 7995WX', 512, 500);

    // Subtle divider laser line
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(312, 545, 400, 3);

    // 4. Core Architecture Specs
    ctx.fillStyle = '#334155';
    ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('96 CORES • 192 THREADS • 5.1 GHz BOOST', 512, 590);

    // 5. Socket Architecture & Power
    ctx.fillStyle = '#64748B';
    ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('sTR5 SOCKET • 350W TDP • DIFFUSED IN USA', 512, 640);

    // 6. OPN Serial & Batch ID
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('OPN 100-000000884 • YD7995WWA8884 • LOT 2411A', 512, 690);

    // 7. Micro 2D DataMatrix Security QR Grid in top-right
    ctx.fillStyle = '#1E293B';
    const qrX = 760;
    const qrY = 240;
    const qrSize = 100;
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.fillStyle = '#CBD5E1';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(qrX + 12 + c * 15, qrY + 12 + r * 15, 12, 12);
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

// Authentic Real High-Poly AMD Ryzen Threadripper PRO 7995WX (sTR5 Workstation Architecture)
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

  const laserTexture = useMemo(() => {
    return createLaserEtchTexture();
  }, []);

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
          Authentic Laser-Engraved Typography placed DIRECTLY on the nickel IHS surface lid (Z = 0.00512).
          Using offline canvas texture: ultra-crisp, perfectly flush, 0 network requests, 0 external font dependencies!
        */}
        <mesh position={[0, 0, 0.00512]}>
          <planeGeometry args={[0.026, 0.026]} />
          <meshBasicMaterial
            map={laserTexture}
            transparent
            opacity={0.92}
            depthWrite={false}
          />
        </mesh>

        {/* Authentic Pin-1 Gold Alignment Triangle Marker in bottom-left corner */}
        <mesh position={[-0.0125, -0.0125, 0.00514]} rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.0016, 0.0022, 3]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload(CPU_MODEL_URL);
