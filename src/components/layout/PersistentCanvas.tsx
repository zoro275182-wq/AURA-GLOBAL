import React, { useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SceneState {
  sphereDistort: number;
  sphereSpeed: number;
  primaryColor: string;
  secondaryColor: string;
  cameraZ: number;
  sphereScale: [number, number, number];
}

const ROUTE_CONFIG: Record<string, SceneState> = {
  '/': {
    sphereDistort: 0.55,
    sphereSpeed: 2.2,
    primaryColor: '#06B6D4',
    secondaryColor: '#8B5CF6',
    cameraZ: 5.5,
    sphereScale: [1.8, 1.8, 1.8]
  },
  '/showroom': {
    sphereDistort: 0.2,
    sphereSpeed: 0.8,
    primaryColor: '#1e1b4b',
    secondaryColor: '#0c4a6e',
    cameraZ: 8.0,
    sphereScale: [0.6, 0.6, 0.6] // Retracts so full-viewport 3D showroom shines
  },
  '/catalog': {
    sphereDistort: 0.35,
    sphereSpeed: 1.5,
    primaryColor: '#0284c7',
    secondaryColor: '#7c3aed',
    cameraZ: 6.5,
    sphereScale: [1.2, 1.2, 1.2]
  },
  '/order': {
    sphereDistort: 0.45,
    sphereSpeed: 1.8,
    primaryColor: '#d97706',
    secondaryColor: '#c026d3',
    cameraZ: 6.0,
    sphereScale: [1.4, 1.4, 1.4]
  },
  '/tracking': {
    sphereDistort: 0.25,
    sphereSpeed: 1.2,
    primaryColor: '#06b6d4',
    secondaryColor: '#4f46e5',
    cameraZ: 7.0,
    sphereScale: [1.0, 1.0, 1.0]
  },
  '/checkout': {
    sphereDistort: 0.3,
    sphereSpeed: 1.4,
    primaryColor: '#db2777',
    secondaryColor: '#6366f1',
    cameraZ: 6.2,
    sphereScale: [1.3, 1.3, 1.3]
  }
};

const BackgroundSphere: React.FC<{ pathname: string }> = ({ pathname }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetConfig = ROUTE_CONFIG[pathname] || ROUTE_CONFIG['/'];

  // Smooth lerp for scale and rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.22;
      meshRef.current.scale.lerp(new THREE.Vector3(...targetConfig.sphereScale), delta * 2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[pathname === '/' ? 1.8 : 0, 0, -1]}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color={targetConfig.primaryColor}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          distort={targetConfig.sphereDistort}
          speed={targetConfig.sphereSpeed}
          transmission={0.4}
          transparent
          opacity={pathname === '/showroom' ? 0.15 : 0.65}
        />
      </mesh>
    </Float>
  );
};

// Subtle ambient particle dust
const AmbientDust: React.FC = () => {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = (Math.random() - 0.5) * 16;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#06B6D4"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

export const PersistentCanvas: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const config = ROUTE_CONFIG[currentPath] || ROUTE_CONFIG['/'];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, config.cameraZ], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color={config.primaryColor} />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color={config.secondaryColor} />
        <pointLight position={[0, 0, 2]} intensity={1.2} color="#FFFFFF" />

        <BackgroundSphere pathname={currentPath} />
        <AmbientDust />
      </Canvas>
    </div>
  );
};
