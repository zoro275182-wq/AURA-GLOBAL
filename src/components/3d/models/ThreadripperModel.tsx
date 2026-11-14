import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural Hyper-Detailed AMD Ryzen Threadripper PRO 7995WX (sTR5)
// Features: Gold contact grid array, sub-micron PCB trace layers, multi-faceted nickel-copper IHS,
// recessed micro-fin step chamfers, 12 Zen 4 compute complex dies (CCDs) and huge central I/O die under clear sapphire lid,
// ceramic capacitors, and illuminated laser-etched accents.
export const ThreadripperModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Multi-layer deep emerald PCB substrate with copper trace luster
    const pcbBase = new THREE.MeshStandardMaterial({
      color: '#062016',
      roughness: 0.35,
      metalness: 0.25
    });

    // 24K Gold Plated Contacts / Alignment Notch / LGA array
    const goldPlating = new THREE.MeshPhysicalMaterial({
      color: '#F59E0B',
      metalness: 0.98,
      roughness: 0.12,
      clearcoat: 0.8,
      reflectivity: 0.98
    });

    // Mirror Nickel-Plated Copper Integrated Heat Spreader (IHS)
    const nickelIhs = new THREE.MeshPhysicalMaterial({
      color: '#E2E8F0',
      metalness: 0.96,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.98
    });

    // Brushed Dark Gunmetal IHS Recessed Center Rim
    const ihsDarkBezel = new THREE.MeshStandardMaterial({
      color: '#1E293B',
      metalness: 0.9,
      roughness: 0.28
    });

    // Silicon Zen 4 CCD (Compute Complex Die) with micro iridescent circuit reflection
    const siliconDie = new THREE.MeshPhysicalMaterial({
      color: '#0F172A',
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      iridescence: 0.9,
      iridescenceIOR: 1.6
    });

    // Central 6nm Server I/O Die (cIOD)
    const iodSilicon = new THREE.MeshPhysicalMaterial({
      color: '#1E1B4B',
      metalness: 0.92,
      roughness: 0.1,
      clearcoat: 1.0,
      iridescence: 0.75
    });

    // Anti-Reflective Optical Inspection Sapphire Window
    const sapphireWindow = new THREE.MeshPhysicalMaterial({
      color: '#081426',
      transmission: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.55,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.4
    });

    // Micro SMD ceramic surface-mount capacitor bodies
    const smdCeramic = new THREE.MeshStandardMaterial({
      color: '#78350F',
      roughness: 0.6,
      metalness: 0.1
    });

    // Solder silver alloy end terminals
    const silverSolder = new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      metalness: 0.95,
      roughness: 0.2
    });

    // AMD Signature Crimson/Orange illuminated laser line
    const amdEmblem = new THREE.MeshBasicMaterial({
      color: '#EA580C'
    });

    // Laser-etched typography plate
    const laserPlacard = new THREE.MeshStandardMaterial({
      color: '#090D16',
      roughness: 0.3,
      metalness: 0.7
    });

    return {
      pcbBase: wireframe ? wireMat : pcbBase,
      goldPlating: wireframe ? wireMat : goldPlating,
      nickelIhs: wireframe ? wireMat : nickelIhs,
      ihsDarkBezel: wireframe ? wireMat : ihsDarkBezel,
      siliconDie: wireframe ? wireMat : siliconDie,
      iodSilicon: wireframe ? wireMat : iodSilicon,
      sapphireWindow: wireframe ? wireMat : sapphireWindow,
      smdCeramic: wireframe ? wireMat : smdCeramic,
      silverSolder: wireframe ? wireMat : silverSolder,
      amdEmblem: wireframe ? wireMat : amdEmblem,
      laserPlacard: wireframe ? wireMat : laserPlacard
    };
  }, [wireframe]);

  // Generate coordinates for 12 Zen 4 CCD compute chiplets
  const ccdPositions = useMemo(() => {
    const list: [number, number][] = [];
    const xOffsets = [-0.024, -0.016, -0.008, 0.008, 0.016, 0.024];
    const yOffsets = [-0.013, 0.013];
    xOffsets.forEach(x => {
      yOffsets.forEach(y => {
        list.push([x, y]);
      });
    });
    return list;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} scale={[32, 32, 32]} rotation={[-Math.PI / 4, 0, 0]}>
        {/* ========================================================
            1. MULTI-LAYER sTR5 HIGH-DENSITY ENTERPRISE PCB SUBSTRATE
           ======================================================== */}
        {/* Main 12-layer substrate board (75.4mm x 58.5mm, 1.6mm thickness) */}
        <mesh position={[0, 0, 0]} material={materials.pcbBase}>
          <boxGeometry args={[0.0754, 0.0585, 0.002]} />
        </mesh>

        {/* Copper ground plane inner bevel edge */}
        <mesh position={[0, 0, -0.0001]} material={materials.goldPlating}>
          <boxGeometry args={[0.0758, 0.0589, 0.0004]} />
        </mesh>

        {/* Bottom LGA 4844 Gold Contact Pad Matrix Array */}
        <mesh position={[0, 0, -0.0011]} material={materials.goldPlating}>
          <boxGeometry args={[0.071, 0.054, 0.0002]} />
        </mesh>

        {/* Central LGA decoupling cavity with SMD capacitors on underside */}
        <mesh position={[0, 0, -0.00115]} material={materials.ihsDarkBezel}>
          <boxGeometry args={[0.022, 0.018, 0.0003]} />
        </mesh>

        {/* Pin-1 Gold Triangle Precision Orientation Key on PCB Corner */}
        <mesh position={[-0.033, -0.025, 0.0011]} rotation={[0, 0, -Math.PI / 4]} material={materials.goldPlating}>
          <coneGeometry args={[0.0018, 0.0025, 3]} />
        </mesh>

        {/* Perimeter Alignment Notches (sTR5 Keying slots) */}
        {[-0.038, 0.038].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} material={materials.ihsDarkBezel}>
            <boxGeometry args={[0.002, 0.008, 0.0022]} />
          </mesh>
        ))}

        {/* ========================================================
            2. SILICON ARCHITECTURE: 12 ZEN 4 CCDs + CENTRAL cIOD
           ======================================================== */}
        <group position={[0, 0, 0.0014]}>
          {/* Central 6nm Server I/O Controller Die (cIOD) */}
          <mesh position={[0, 0, 0]} material={materials.iodSilicon}>
            <boxGeometry args={[0.016, 0.022, 0.0008]} />
          </mesh>

          {/* Gold wirebond perimeter surround */}
          <mesh position={[0, 0, -0.0001]} material={materials.goldPlating}>
            <boxGeometry args={[0.0175, 0.0235, 0.0004]} />
          </mesh>

          {/* 12 Individual 5nm Zen 4 CCD Compute Dies (8 Cores / 16 Threads each) */}
          {ccdPositions.map(([x, y], idx) => (
            <group key={idx} position={[x, y, 0]}>
              <mesh material={materials.siliconDie}>
                <boxGeometry args={[0.0068, 0.0085, 0.0008]} />
              </mesh>
              {/* Microscopic solder bump collar */}
              <mesh position={[0, 0, -0.0001]} material={materials.silverSolder}>
                <boxGeometry args={[0.0074, 0.0091, 0.0004]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ========================================================
            3. DENSE SMD CERAMIC PASSIVES & CAPACITOR ARRAYS
           ======================================================== */}
        {/* Top & bottom capacitor banks between CCDs and IHS edge */}
        {[-0.026, 0.026].map((y, rowIdx) => (
          <group key={rowIdx} position={[0, y, 0.0012]}>
            {[-0.028, -0.022, -0.016, -0.01, -0.004, 0.004, 0.01, 0.016, 0.022, 0.028].map((x, capIdx) => (
              <group key={capIdx} position={[x, 0, 0]}>
                <mesh material={materials.smdCeramic}>
                  <boxGeometry args={[0.0018, 0.003, 0.001]} />
                </mesh>
                <mesh position={[0, 0.0017, 0]} material={materials.silverSolder}>
                  <boxGeometry args={[0.0019, 0.0008, 0.0011]} />
                </mesh>
                <mesh position={[0, -0.0017, 0]} material={materials.silverSolder}>
                  <boxGeometry args={[0.0019, 0.0008, 0.0011]} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Left & right high-frequency capacitor rails */}
        {[-0.032, 0.032].map((x, colIdx) => (
          <group key={colIdx} position={[x, 0, 0.0012]}>
            {[-0.018, -0.012, -0.006, 0, 0.006, 0.012, 0.018].map((y, capIdx) => (
              <mesh key={capIdx} position={[0, y, 0]} material={materials.smdCeramic}>
                <boxGeometry args={[0.003, 0.0018, 0.001]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* ========================================================
            4. MULTI-TIER NICKEL-COPPER INTEGRATED HEAT SPREADER (IHS)
           ======================================================== */}
        {/* Outer Heavy Flange / Mounting Skirt */}
        <mesh position={[0, 0, 0.0022]} material={materials.nickelIhs}>
          <boxGeometry args={[0.068, 0.051, 0.0024]} />
        </mesh>

        {/* Precision Torx T20 Mounting Spring Flanges (Four Corners) */}
        {[
          [-0.031, -0.022],
          [0.031, -0.022],
          [-0.031, 0.022],
          [0.031, 0.022]
        ].map(([cx, cy], cIdx) => (
          <mesh key={cIdx} position={[cx, cy, 0.0028]} material={materials.nickelIhs}>
            <cylinderGeometry args={[0.0025, 0.0025, 0.0016, 16]} />
          </mesh>
        ))}

        {/* Raised Contact Plateau (Vapor Chamber Interface Lid) */}
        <mesh position={[0, 0, 0.0036]} material={materials.nickelIhs}>
          <boxGeometry args={[0.062, 0.045, 0.0018]} />
        </mesh>

        {/* High-Tech Sapphire Inspection Crystal Window showing inner chiplets */}
        <mesh position={[0, 0, 0.0044]} material={materials.sapphireWindow}>
          <boxGeometry args={[0.052, 0.036, 0.0004]} />
        </mesh>

        {/* Beveled Gunmetal Framing Bezel around the central laser badge */}
        <mesh position={[0, 0, 0.0046]} material={materials.ihsDarkBezel}>
          <boxGeometry args={[0.046, 0.028, 0.0002]} />
        </mesh>

        {/* Laser Engraved Spec Lettering Placard */}
        <mesh position={[0, 0, 0.00475]} material={materials.laserPlacard}>
          <boxGeometry args={[0.042, 0.024, 0.00015]} />
        </mesh>

        {/* AMD Crimson Illuminated Branding Bars */}
        <mesh position={[0, 0.0065, 0.00485]} material={materials.amdEmblem}>
          <boxGeometry args={[0.034, 0.0035, 0.0001]} />
        </mesh>
        <mesh position={[0, 0.001, 0.00485]} material={materials.nickelIhs}>
          <boxGeometry args={[0.03, 0.0022, 0.0001]} />
        </mesh>
        <mesh position={[0, -0.004, 0.00485]} material={materials.goldPlating}>
          <boxGeometry args={[0.026, 0.0018, 0.0001]} />
        </mesh>
        <mesh position={[0, -0.008, 0.00485]} material={materials.amdEmblem}>
          <boxGeometry args={[0.02, 0.0012, 0.0001]} />
        </mesh>

        {/* 2D DataMatrix Security QR Laser Engraving Block */}
        <mesh position={[0.016, 0.006, 0.0049]} material={materials.nickelIhs}>
          <planeGeometry args={[0.004, 0.004]} />
        </mesh>
      </group>
    </Float>
  );
};
