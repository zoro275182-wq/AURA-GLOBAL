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

// Authentic Real High-Poly NVIDIA GeForce RTX 5090 Founders Edition with Triple-Fan Aerodynamic Array
export const RTX5090Model: React.FC<ModelProps> = ({ wireframe = false }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Object3D | null>(null);
  const fan2Ref = useRef<THREE.Object3D | null>(null);
  const fan3Ref = useRef<THREE.Group>(null);

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

    // Stealth Black Fan Blade Material
    const fanBladeMat = new THREE.MeshStandardMaterial({
      color: '#090D14',
      metalness: 0.7,
      roughness: 0.25
    });

    // Polished Silver Aluminum Hub
    const fanHubMat = new THREE.MeshPhysicalMaterial({
      color: '#F1F5F9',
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0
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
      fanBladeMat: wireframe ? wireframeMat : fanBladeMat,
      fanHubMat: wireframe ? wireframeMat : fanHubMat,
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

    // Cache existing fan rotor object references from GLB
    fan1Ref.current = clone.getObjectByName('gpu_fan_rotor_1') || null;
    fan2Ref.current = clone.getObjectByName('gpu_fan_rotor_2') || null;

    return clone;
  }, [gltf, wireframe, materials]);

  useFrame((_, delta) => {
    // Smooth idle showroom rotation around card's geometric center
    if (cardGroup.current) {
      cardGroup.current.rotation.y += delta * 0.25;
    }
    // Synchronized triple counter-rotating axial airflow fans
    if (fan1Ref.current) {
      fan1Ref.current.rotation.y += delta * 7.0;
    }
    if (fan2Ref.current) {
      fan2Ref.current.rotation.y -= delta * 7.0;
    }
    if (fan3Ref.current) {
      fan3Ref.current.rotation.y += delta * 7.0;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.2}>
      <group
        ref={cardGroup}
        scale={[9.0, 9.0, 9.0]}
        rotation={[-Math.PI / 7, Math.PI / 4, 0]}
        position={[0, 0, 0]}
      >
        {/* Exact center of mass offset so the GPU rotates on its true physical center */}
        <group position={[-0.0645, 0.0198, -0.0539]}>
          <primitive object={clonedScene} />

          {/* Third High-Velocity Axial Flow Turbine Fan integrated into center/rear passthrough */}
          <group position={[0.0645, -0.0198, -0.06]}>
            {/* Aerodynamic Cowling Duct Ring */}
            <mesh material={materials.titaniumMat}>
              <torusGeometry args={[0.046, 0.003, 16, 32]} />
            </mesh>
            {/* Spinning Rotor Assembly with 9 Swept Aerodynamic Blades */}
            <group ref={fan3Ref}>
              <mesh material={materials.fanHubMat}>
                <cylinderGeometry args={[0.015, 0.015, 0.006, 20]} />
              </mesh>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                const angle = (i * (2 * Math.PI)) / 9;
                return (
                  <group key={i} rotation={[0, angle, 0]}>
                    <mesh position={[0.024, 0, 0]} rotation={[0, 0, 0.35]} material={materials.fanBladeMat}>
                      <boxGeometry args={[0.022, 0.002, 0.008]} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          </group>

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
