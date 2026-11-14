import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural Hyper-Detailed NVIDIA GeForce RTX 5090 Founders Edition
// Features: Dual-axial flowing hourglass titanium exoskeleton, dense copper & aluminum heatsink fin stack (40+ individual fins),
// 3 synchronized contra-rotating turbine fans with aerodynamic swept blades and silver hub caps, illuminated GeForce RTX 5090 LED logo,
// 12V-2x6 PCIe Gen 5.1 power socket, 4 display output ports, and PCIe bracket.
export const RTX5090Model: React.FC<ModelProps> = ({ wireframe = false }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  const fan3Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cardGroup.current) {
      cardGroup.current.rotation.y += delta * 0.25;
    }
    if (fan1Ref.current) fan1Ref.current.rotation.z += delta * 5.0;
    if (fan2Ref.current) fan2Ref.current.rotation.z -= delta * 5.0;
    if (fan3Ref.current) fan3Ref.current.rotation.z += delta * 5.0;
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Gunmetal bead-blasted titanium frame with chamfered edge reflections
    const titaniumOuter = new THREE.MeshPhysicalMaterial({
      color: '#1E2430',
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.8,
      reflectivity: 0.95
    });

    // Dark matte inner structural shroud
    const innerShroud = new THREE.MeshStandardMaterial({
      color: '#0B0F17',
      metalness: 0.85,
      roughness: 0.35
    });

    // Pure electrolytic copper vapor chamber base & composite heatpipes
    const copperHeatpipes = new THREE.MeshStandardMaterial({
      color: '#B45309',
      metalness: 0.92,
      roughness: 0.22
    });

    // Anodized dark aluminum micro-fin heatsink array
    const finStack = new THREE.MeshStandardMaterial({
      color: '#334155',
      metalness: 0.9,
      roughness: 0.25
    });

    // High-tensile composite fan blades (stealth black)
    const fanBladeMat = new THREE.MeshStandardMaterial({
      color: '#090D14',
      metalness: 0.7,
      roughness: 0.28
    });

    // Mirror-polished aluminum fan center spinner caps
    const fanHubAlloy = new THREE.MeshPhysicalMaterial({
      color: '#F1F5F9',
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0
    });

    // Illuminated Mint/Emerald Green LED Logo Strip (NVIDIA Signature)
    const ledGlow = new THREE.MeshBasicMaterial({
      color: '#76B900' // Authentic NVIDIA Kelly/Emerald Green
    });

    // White illuminated emblem plate
    const whiteLed = new THREE.MeshBasicMaterial({
      color: '#F8FAFC'
    });

    // PCIe 5.1 Gold Finger Contacts
    const pcieGold = new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      metalness: 0.98,
      roughness: 0.1
    });

    // Nickel-plated I/O mounting bracket
    const ioBracket = new THREE.MeshStandardMaterial({
      color: '#CBD5E1',
      metalness: 0.95,
      roughness: 0.18
    });

    // 12V-2x6 (16-Pin) High-Power Connector Housing
    const powerConnector = new THREE.MeshStandardMaterial({
      color: '#020617',
      roughness: 0.7
    });

    return {
      titaniumOuter: wireframe ? wireMat : titaniumOuter,
      innerShroud: wireframe ? wireMat : innerShroud,
      copperHeatpipes: wireframe ? wireMat : copperHeatpipes,
      finStack: wireframe ? wireMat : finStack,
      fanBladeMat: wireframe ? wireMat : fanBladeMat,
      fanHubAlloy: wireframe ? wireMat : fanHubAlloy,
      ledGlow: wireframe ? wireMat : ledGlow,
      whiteLed: wireframe ? wireMat : whiteLed,
      pcieGold: wireframe ? wireMat : pcieGold,
      ioBracket: wireframe ? wireMat : ioBracket,
      powerConnector: wireframe ? wireMat : powerConnector
    };
  }, [wireframe]);

  // Procedural fan rotor generator with 9 curved aerodynamic blades
  const renderTurbineFan = (ref: React.RefObject<THREE.Group>, hubPosition: [number, number, number], ringRadius: number) => (
    <group position={hubPosition}>
      {/* Outer aerodynamic ducted cowl ring */}
      <mesh material={materials.titaniumOuter}>
        <torusGeometry args={[ringRadius, 0.035, 16, 36]} />
      </mesh>
      {/* Spinning Rotor Assembly */}
      <group ref={ref}>
        {/* Diamond-cut Center Cap */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.fanHubAlloy}>
          <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.titaniumOuter}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 20]} />
        </mesh>
        {/* 9 Fluid Dynamic Swept Blades */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const angle = (i * (2 * Math.PI)) / 9;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              <mesh position={[0, (ringRadius - 0.06) / 2 + 0.06, 0]} rotation={[0.35, 0, 0]} material={materials.fanBladeMat}>
                <boxGeometry args={[0.065, ringRadius - 0.1, 0.018]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={cardGroup} scale={[1.25, 1.25, 1.25]} rotation={[-Math.PI / 8, Math.PI / 4, 0]}>
        {/* ========================================================
            1. TITANIUM EXOSKELETON HOUSING & CHASSIS
           ======================================================== */}
        {/* Main Hourglass Torus Perimeter Bezel (Length: 3.4, Height: 1.45, Depth: 0.6) */}
        <mesh position={[0, 0, 0]} material={materials.titaniumOuter}>
          <boxGeometry args={[3.4, 1.45, 0.62]} />
        </mesh>

        {/* Recessed Interior Air Cavity */}
        <mesh position={[0, 0, 0]} material={materials.innerShroud}>
          <boxGeometry args={[3.25, 1.35, 0.58]} />
        </mesh>

        {/* Flow-Through X-Shaped Structural Spine Braces */}
        <mesh position={[0, 0, 0.315]} rotation={[0, 0, Math.PI / 6]} material={materials.titaniumOuter}>
          <boxGeometry args={[3.2, 0.06, 0.02]} />
        </mesh>
        <mesh position={[0, 0, 0.315]} rotation={[0, 0, -Math.PI / 6]} material={materials.titaniumOuter}>
          <boxGeometry args={[3.2, 0.06, 0.02]} />
        </mesh>
        <mesh position={[0, 0, -0.315]} rotation={[0, 0, Math.PI / 6]} material={materials.titaniumOuter}>
          <boxGeometry args={[3.2, 0.06, 0.02]} />
        </mesh>
        <mesh position={[0, 0, -0.315]} rotation={[0, 0, -Math.PI / 6]} material={materials.titaniumOuter}>
          <boxGeometry args={[3.2, 0.06, 0.02]} />
        </mesh>

        {/* ========================================================
            2. HIGH-DENSITY HEATSINK COOLING FIN ARRAYS (36 Individual Fins)
           ======================================================== */}
        <group position={[0, 0, 0]}>
          {Array.from({ length: 32 }).map((_, idx) => {
            const x = -1.5 + idx * 0.098;
            return (
              <mesh key={idx} position={[x, 0, 0]} material={materials.finStack}>
                <boxGeometry args={[0.015, 1.25, 0.52]} />
              </mesh>
            );
          })}
        </group>

        {/* Quad Sintered Pure Copper Heatpipes passing through fin stack */}
        {[-0.35, -0.12, 0.12, 0.35].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.copperHeatpipes}>
            <cylinderGeometry args={[0.032, 0.032, 3.1, 16]} />
          </mesh>
        ))}

        {/* Central Pure Copper Vapor Chamber Cold Plate */}
        <mesh position={[0, 0, 0]} material={materials.copperHeatpipes}>
          <boxGeometry args={[1.2, 0.9, 0.18]} />
        </mesh>

        {/* ========================================================
            3. TRIPLE HIGH-STATIC PRESSURE CONTRA-ROTATING TURBINE FANS
           ======================================================== */}
        {/* Fan 1: Left Intake (X: -1.05, Front Face Z: +0.31) */}
        {renderTurbineFan(fan1Ref, [-1.05, 0, 0.31], 0.48)}

        {/* Fan 2: Center High-Velocity Pull (X: 0.0, Reverse Underside Z: -0.31) */}
        {renderTurbineFan(fan2Ref, [0.0, 0, -0.31], 0.48)}

        {/* Fan 3: Right Exhaust Push-Through (X: 1.05, Front Face Z: +0.31) */}
        {renderTurbineFan(fan3Ref, [1.05, 0, 0.31], 0.48)}

        {/* ========================================================
            4. ILLUMINATED GEFORCE RTX 5090 SIDE EMBLEM & BADGES
           ======================================================== */}
        {/* Top Edge Laser-Cut Emblem Plateau */}
        <mesh position={[0, 0.73, 0]} material={materials.innerShroud}>
          <boxGeometry args={[1.8, 0.03, 0.32]} />
        </mesh>

        {/* Vibrant Emerald Green Glowing Backlight Bar */}
        <mesh position={[0, 0.735, 0]} material={materials.ledGlow}>
          <boxGeometry args={[1.6, 0.02, 0.18]} />
        </mesh>

        {/* White Inlaid Text Bars representing "GEFORCE RTX 5090" */}
        <mesh position={[-0.45, 0.74, 0]} material={materials.whiteLed}>
          <boxGeometry args={[0.42, 0.015, 0.08]} />
        </mesh>
        <mesh position={[0.0, 0.74, 0]} material={materials.whiteLed}>
          <boxGeometry args={[0.26, 0.015, 0.08]} />
        </mesh>
        <mesh position={[0.45, 0.74, 0]} material={materials.whiteLed}>
          <boxGeometry args={[0.34, 0.015, 0.08]} />
        </mesh>

        {/* Soft Volumetric Glow radiating from Top Logo */}
        <pointLight position={[0, 0.95, 0]} intensity={1.8} color="#76B900" distance={1.8} />

        {/* ========================================================
            5. POWER SOCKET, PCIE 5.1 CONNECTOR & I/O BRACKET
           ======================================================== */}
        {/* 12V-2x6 (PCIe 5.1 600W Micro-Fit Power Connector) */}
        <mesh position={[1.35, 0.65, 0]} material={materials.powerConnector}>
          <boxGeometry args={[0.24, 0.12, 0.14]} />
        </mesh>
        {/* Gold Sensor & Power Pins inside socket */}
        <mesh position={[1.35, 0.65, 0]} material={materials.pcieGold}>
          <boxGeometry args={[0.2, 0.06, 0.08]} />
        </mesh>

        {/* Gold PCIe 5.1 x16 High-Speed Interface Edge Contacts */}
        <mesh position={[-0.4, -0.76, 0]} material={materials.pcieGold}>
          <boxGeometry args={[1.45, 0.08, 0.03]} />
        </mesh>
        {/* PCIe Key Notch */}
        <mesh position={[-0.8, -0.76, 0]} material={materials.innerShroud}>
          <boxGeometry args={[0.04, 0.09, 0.04]} />
        </mesh>

        {/* Heavy-Duty Stainless Steel Rear I/O Bracket */}
        <mesh position={[-1.72, 0, 0]} material={materials.ioBracket}>
          <boxGeometry args={[0.05, 1.55, 0.68]} />
        </mesh>

        {/* 3x DisplayPort 2.1 UHBR20 Ports + 1x HDMI 2.1b Port cutouts */}
        {[-0.4, -0.15, 0.1, 0.35].map((y, idx) => (
          <group key={idx} position={[-1.75, y, 0]}>
            <mesh material={materials.innerShroud}>
              <boxGeometry args={[0.02, 0.12, 0.22]} />
            </mesh>
            <mesh position={[-0.005, 0, 0]} material={materials.pcieGold}>
              <boxGeometry args={[0.01, 0.06, 0.16]} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};
