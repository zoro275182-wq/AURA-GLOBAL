import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { getAssetPath } from '../../../utils/assetPath';

interface ModelProps {
  wireframe?: boolean;
}

const GPU_MODEL_URL = getAssetPath('models/gpu.glb');

// Authentic Real High-Poly NVIDIA GeForce RTX 5090 Founders Edition with Triple Axial Fans
export const RTX5090Model: React.FC<ModelProps> = ({ wireframe = false }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Object3D | null>(null);
  const fan2Ref = useRef<THREE.Object3D | null>(null);
  const fan3Ref = useRef<THREE.Object3D | null>(null);

  const gltf = useGLTF(
    GPU_MODEL_URL,
    false,
    false,
    (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  const materials = useMemo(() => {
    // Gunmetal Titanium Matte Frame Material
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: '#1E232F',
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      iridescence: 0.45,
      iridescenceIOR: 1.4
    });

    // Pure Copper Heatsink Fin Array
    const copperFinMat = new THREE.MeshStandardMaterial({
      color: '#D97706',
      metalness: 0.95,
      roughness: 0.22
    });

    // Gold PCIe 5.0 Connector Contacts
    const goldPinMat = new THREE.MeshStandardMaterial({
      color: '#FBBF24',
      metalness: 0.98,
      roughness: 0.1
    });

    // Wireframe Material
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#06B6D4',
      wireframe: true
    });

    return {
      titaniumMat: wireframe ? wireframeMat : titaniumMat,
      copperFinMat: wireframe ? wireframeMat : copperFinMat,
      goldPinMat: wireframe ? wireframeMat : goldPinMat,
      wireframeMat
    };
  }, [wireframe]);

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (wireframe) {
          mesh.material = materials.wireframeMat;
        } else {
          const matName = (mesh.material as THREE.Material)?.name?.toLowerCase() || '';
          const meshName = mesh.name.toLowerCase();

          if (meshName.includes('fin') || matName.includes('fin') || matName.includes('copper')) {
            mesh.material = materials.copperFinMat;
          } else if (meshName.includes('pcie') || matName.includes('finger') || matName.includes('gold')) {
            mesh.material = materials.goldPinMat;
          } else if (meshName.includes('frame') || matName.includes('alu') || matName.includes('dark')) {
            mesh.material = materials.titaniumMat;
          }
        }
      }
    });

    // Find the original 2 fans in the GLB
    const f1 = clone.getObjectByName('gpu_fan_rotor_1') || null;
    const f2 = clone.getObjectByName('gpu_fan_rotor_2') || null;

    // Reposition the fans symmetrically to make a perfect 3-fan layout across the card face
    // Original positions: Fan1: X=0.010, Fan2: X=0.126 (distance is 0.116)
    // For 3 fans across the shroud:
    // Left fan: X = 0.005
    // Middle fan: X = 0.068
    // Right fan: X = 0.131
    if (f1) {
      f1.position.x = 0.005;
      fan1Ref.current = f1;
    }

    if (f2) {
      f2.position.x = 0.131;
      fan2Ref.current = f2;

      // Clone f2 to create the authentic 3rd fan in the middle
      const f3 = f2.clone(true);
      f3.name = 'gpu_fan_rotor_3';
      f3.position.x = 0.068; // Dead center between Fan 1 and Fan 2
      f2.parent?.add(f3);
      fan3Ref.current = f3;
    }

    return clone;
  }, [gltf, wireframe, materials]);

  useFrame((_, delta) => {
    // Smooth idle showroom rotation around card's geometric center
    if (cardGroup.current) {
      cardGroup.current.rotation.y += delta * 0.25;
    }
    // Synchronized 3-fan axial airflow rotation
    if (fan1Ref.current) {
      fan1Ref.current.rotation.y += delta * 7.0;
    }
    if (fan2Ref.current) {
      fan2Ref.current.rotation.y += delta * 7.0;
    }
    if (fan3Ref.current) {
      fan3Ref.current.rotation.y -= delta * 7.0; // Reverse middle fan for aerodynamic turbulence reduction
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.2}>
      <group
        ref={cardGroup}
        scale={[14.5, 14.5, 14.5]}
        rotation={[-Math.PI / 7, Math.PI / 4, 0]}
        position={[0, 0, 0]}
      >
        {/* Exact center of mass offset so the GPU rotates on its true physical center */}
        <group position={[-0.0645, 0.0198, -0.0539]}>
          <primitive object={clonedScene} />

          {/* Illuminated LED GEFORCE RTX 5090 emblem directly flush on the side metal bezel */}
          <group position={[0.0645, -0.0198, 0.1246]}>
            <mesh position={[0, 0, 0.0005]}>
              <boxGeometry args={[0.08, 0.008, 0.001]} />
              <meshBasicMaterial color="#E2E8F0" />
            </mesh>
            {/* Soft illuminated glow on side emblem */}
            <pointLight position={[0, 0, 0.008]} intensity={0.5} color="#A7F3D0" distance={0.3} />
          </group>
        </group>
      </group>
    </Float>
  );
};

useGLTF.preload(GPU_MODEL_URL);
