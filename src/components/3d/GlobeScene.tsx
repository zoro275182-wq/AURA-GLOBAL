import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TrackingOrder } from '../../types';

// Convert lat/lng to 3D sphere coordinate
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate quadratic/cubic 3D arc points curving above the sphere surface
function generateArcCurve(start: THREE.Vector3, end: THREE.Vector3, elevation = 1.35) {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(start.length() + Math.min(elevation, distance * 0.4));
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

interface GlobeSceneProps {
  order: TrackingOrder;
}

const GlobeInner: React.FC<{ order: TrackingOrder }> = ({ order }) => {
  const globeGroup = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const RADIUS = 2.4;

  // Calculate 3D points
  const originPos = useMemo(
    () => latLngToVector3(order.originCoords[0], order.originCoords[1], RADIUS),
    [order.originCoords]
  );
  const customsPos = useMemo(
    () => latLngToVector3(order.customsCoords[0], order.customsCoords[1], RADIUS),
    [order.customsCoords]
  );
  const destPos = useMemo(
    () => latLngToVector3(order.destinationCoords[0], order.destinationCoords[1], RADIUS),
    [order.destinationCoords]
  );

  // Flight curves: Leg 1 (Origin -> Customs), Leg 2 (Customs -> Dest)
  const curveLeg1 = useMemo(() => generateArcCurve(originPos, customsPos, 0.8), [originPos, customsPos]);
  const curveLeg2 = useMemo(() => generateArcCurve(customsPos, destPos, 0.8), [customsPos, destPos]);

  const curve1Points = useMemo(() => curveLeg1.getPoints(50), [curveLeg1]);
  const curve2Points = useMemo(() => curveLeg2.getPoints(50), [curveLeg2]);

  // Animated traveling cargo beacon along the active leg
  useFrame(({ clock }) => {
    if (globeGroup.current) {
      globeGroup.current.rotation.y += 0.0015; // Slow ambient orbit
    }
    if (pulseRef.current) {
      const t = (clock.getElapsedTime() * 0.35) % 1;
      // If percent < 50 leg 1, else leg 2
      const point = t < 0.5 ? curveLeg1.getPoint(t * 2) : curveLeg2.getPoint((t - 0.5) * 2);
      pulseRef.current.position.copy(point);
    }
  });

  return (
    <group ref={globeGroup}>
      {/* Central Holographic Core Sphere */}
      <mesh>
        <sphereGeometry args={[RADIUS - 0.05, 32, 32]} />
        <meshPhysicalMaterial
          color="#060C18"
          roughness={0.4}
          metalness={0.9}
          transmission={0.4}
          transparent
          opacity={0.85}
          clearcoat={1}
        />
      </mesh>

      {/* Wireframe Holographic Latitude/Longitude Grid */}
      <mesh>
        <sphereGeometry args={[RADIUS, 28, 28]} />
        <meshBasicMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Outer Glow Halo Rim */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.15, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Origin Hub Marker */}
      <group position={originPos}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.08, 0.14, 16]} />
          <meshBasicMaterial color="#06B6D4" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
        <Html distanceFactor={10} position={[0, 0.15, 0]} center>
          <div className="px-2 py-0.5 rounded bg-black/80 border border-cyan-400 text-[10px] font-mono text-cyan-300 whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.6)]">
            ORIGIN: {order.originCity}
          </div>
        </Html>
      </group>

      {/* Customs Hub Marker */}
      <group position={customsPos}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#8B5CF6" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.08, 0.14, 16]} />
          <meshBasicMaterial color="#8B5CF6" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
        <Html distanceFactor={10} position={[0, 0.15, 0]} center>
          <div className="px-2 py-0.5 rounded bg-black/80 border border-violet-400 text-[10px] font-mono text-violet-300 whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(139,92,246,0.6)]">
            CUSTOMS: {order.customsHub}
          </div>
        </Html>
      </group>

      {/* Destination Marker */}
      <group position={destPos}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#EC4899" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.08, 0.14, 16]} />
          <meshBasicMaterial color="#EC4899" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
        <Html distanceFactor={10} position={[0, 0.15, 0]} center>
          <div className="px-2 py-0.5 rounded bg-black/80 border border-pink-400 text-[10px] font-mono text-pink-300 whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(236,72,153,0.6)]">
            DEST: {order.destinationCity}
          </div>
        </Html>
      </group>

      {/* Flight Arc Line 1 (Origin -> Customs) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(curve1Points.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#06B6D4" linewidth={2} transparent opacity={0.8} />
      </line>

      {/* Flight Arc Line 2 (Customs -> Dest) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(curve2Points.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#EC4899" linewidth={2} transparent opacity={0.8} />
      </line>

      {/* Traveling Flight Packet / Telemetry Photon */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};

export const GlobeScene: React.FC<GlobeSceneProps> = ({ order }) => {
  return (
    <div className="w-full h-[420px] lg:h-[520px] relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/20">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial-at-c from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Active telemetry header overlay */}
      <div className="absolute top-4 left-4 z-10 font-mono text-xs flex items-center gap-2 bg-[#090D16]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-cyan-300 font-semibold">{order.id}</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-300">{order.flightCode}</span>
      </div>

      <Canvas camera={{ position: [0, 1.2, 5.8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#E0F2FE" />
        <directionalLight position={[-5, -5, -5]} intensity={1.0} color="#8B5CF6" />
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <GlobeInner order={order} />
        </Float>
        <OrbitControls
          enableZoom={true}
          minDistance={3.5}
          maxDistance={8.5}
          enablePan={false}
          autoRotate={false}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
