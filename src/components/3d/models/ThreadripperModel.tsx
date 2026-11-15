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

// Ultra-realistic 4K laser-etched IHS texture generator
// Runs 100% locally in browser memory with zero external font or network requests.
function createLaserEtchTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 2048, 2048);

    // Outer subtle metallic laser perimeter frame
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(180, 180, 1688, 1688);

    // Inner chamfer corner accents
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.6)';
    ctx.lineWidth = 6;
    const corner = 60;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(180, 180 + corner);
    ctx.lineTo(180, 180);
    ctx.lineTo(180 + corner, 180);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(1868, 1868 - corner);
    ctx.lineTo(1868, 1868);
    ctx.lineTo(1868 - corner, 1868);
    ctx.stroke();

    // 1. AMD Brand Logo / Triangle Mark on Top Left
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.moveTo(260, 260);
    ctx.lineTo(340, 260);
    ctx.lineTo(340, 340);
    ctx.lineTo(260, 340);
    ctx.closePath();
    ctx.fill();
    ctx.clearRect(285, 285, 30, 30);

    // 2. AMD RYZEN Laser Engraved Brand Header
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 100px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
    ctx.letterSpacing = '14px';
    ctx.fillText('AMD RYZEN™', 1024, 600);

    // 3. AMD Signature Crimson-Orange Accent THREADRIPPER (Glowing metallic gradient look)
    ctx.fillStyle = '#EA580C';
    ctx.font = '900 148px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
    ctx.letterSpacing = '10px';
    ctx.fillText('THREADRIPPER™', 1024, 780);

    // 4. Model Subheading: PRO 7995WX in Dark Titanium
    ctx.fillStyle = '#1E293B';
    ctx.font = '800 96px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
    ctx.letterSpacing = '16px';
    ctx.fillText('PRO 7995WX', 1024, 940);

    // Double precision laser divider lines
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(480, 1030, 1088, 5);
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(924, 1028, 200, 9);

    // 5. Core Architecture Specs
    ctx.fillStyle = '#334155';
    ctx.font = '700 60px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('96 CORES  •  192 THREADS  •  5.1 GHz BOOST', 1024, 1130);

    // 6. Socket Architecture & Power
    ctx.fillStyle = '#475569';
    ctx.font = '600 50px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('sTR5 / SP6 WORKSTATION  •  350W TDP  •  DIFFUSED IN USA', 1024, 1230);

    // 7. OPN Serial & Batch ID
    ctx.fillStyle = '#64748B';
    ctx.font = '600 42px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('OPN 100-000000884 • YD7995WWA8884 • LOT 2411A', 1024, 1320);

    // 8. Micro 2D DataMatrix Security QR Grid in top-right
    const qrX = 1520;
    const qrY = 260;
    const qrSize = 190;
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.fillStyle = '#E2E8F0';
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if ((r * c + r + c) % 3 !== 0) {
          ctx.fillRect(qrX + 20 + c * 22, qrY + 20 + r * 22, 18, 18);
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
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
          Crisp, High-Resolution Laser-Engraved Typography placed DIRECTLY on the nickel IHS surface lid (Z = 0.00512).
          Using offline 2048x2048 canvas texture: ultra-crisp, perfectly flush, 0 network requests, 0 external font dependencies!
        */}
        <mesh position={[0, 0, 0.00512]}>
          <planeGeometry args={[0.027, 0.027]} />
          <meshBasicMaterial
            map={laserTexture}
            transparent
            opacity={0.96}
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
