import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural Hyper-Detailed Lamborghini Gallardo LP560-4
// Features: Angular wedge body with sharp Italian styling, flared muscular wheel arches, low-slung front splitter,
// twin large angular air intakes, 3D cockpit cabin with tinted glasshouse, V10 engine bay under rear deck with cooling louvers,
// carbon fiber high-downforce rear wing spoiler, quad exhaust pipes, aggressive rear diffuser,
// illuminated LED headlights with Y-shaped signature DRLs, taillights, forged Cordelia rims, vented brake discs & orange calipers.
export const Porsche911GT3RS: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Oro Elios / Giallo Halys Metallic Triple-Coat Clearcoat Lacquer
    const gallardoPaint = new THREE.MeshPhysicalMaterial({
      color: '#CDB07B', // Oro Elios Champagne Metallic Gold
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.98,
      iridescence: 0.3
    });

    // Dark Smoked Privacy Tempered Glass
    const windowGlass = new THREE.MeshPhysicalMaterial({
      color: '#070B12',
      transmission: 0.9,
      roughness: 0.04,
      metalness: 0.1,
      ior: 1.52,
      reflectivity: 0.95,
      clearcoat: 1.0,
      transparent: true
    });

    // Matte Carbon Fiber Aero Components (Front Splitter, Side Skirts, Rear Diffuser, Spoiler)
    const carbonFiber = new THREE.MeshStandardMaterial({
      color: '#090D14',
      metalness: 0.85,
      roughness: 0.3
    });

    // High-Grip Pirelli P Zero Corsa Tires
    const tireRubber = new THREE.MeshStandardMaterial({
      color: '#131822',
      roughness: 0.88,
      metalness: 0.1
    });

    // Forged Titanium Cordelia Split-Spoke Alloy Wheels
    const rimAlloy = new THREE.MeshPhysicalMaterial({
      color: '#E2E8F0',
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 0.9
    });

    // Cross-Drilled Ventilated Carbon-Ceramic Brake Rotors
    const brakeRotor = new THREE.MeshStandardMaterial({
      color: '#64748B',
      metalness: 0.92,
      roughness: 0.22
    });

    // Brembo High-Gloss Arancio Borealis (Orange) Brake Calipers
    const brakeCaliper = new THREE.MeshPhysicalMaterial({
      color: '#EA580C',
      metalness: 0.7,
      roughness: 0.18,
      clearcoat: 1.0
    });

    // Bi-Xenon / LED Y-Signature Laser Headlights (High-Luminance Ice White)
    const laserHeadlight = new THREE.MeshBasicMaterial({
      color: '#E0F2FE'
    });

    // Bright Amber Turn Signal / Accent
    const amberAccent = new THREE.MeshBasicMaterial({
      color: '#F59E0B'
    });

    // Deep Ruby Red Hexagonal LED Taillights
    const ledTaillight = new THREE.MeshBasicMaterial({
      color: '#EF4444'
    });

    // Chrome Exhaust Pipes (Twin Dual Inconel Tips)
    const exhaustChrome = new THREE.MeshPhysicalMaterial({
      color: '#F8FAFC',
      metalness: 0.98,
      roughness: 0.05,
      clearcoat: 1.0
    });

    // V10 Engine Block Cylinder Head Accent
    const engineSilver = new THREE.MeshStandardMaterial({
      color: '#94A3B8',
      metalness: 0.9,
      roughness: 0.2
    });

    return {
      gallardoPaint: wireframe ? wireMat : gallardoPaint,
      windowGlass: wireframe ? wireMat : windowGlass,
      carbonFiber: wireframe ? wireMat : carbonFiber,
      tireRubber: wireframe ? wireMat : tireRubber,
      rimAlloy: wireframe ? wireMat : rimAlloy,
      brakeRotor: wireframe ? wireMat : brakeRotor,
      brakeCaliper: wireframe ? wireMat : brakeCaliper,
      laserHeadlight: wireframe ? wireMat : laserHeadlight,
      amberAccent: wireframe ? wireMat : amberAccent,
      ledTaillight: wireframe ? wireMat : ledTaillight,
      exhaustChrome: wireframe ? wireMat : exhaustChrome,
      engineSilver: wireframe ? wireMat : engineSilver
    };
  }, [wireframe]);

  // Procedural 19-inch Forged Alloy Wheel Generator
  const renderSupercarWheel = (x: number, y: number, z: number, isRight: boolean) => (
    <group position={[x, y, z]}>
      {/* High-Profile Racing Slick Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.tireRubber}>
        <cylinderGeometry args={[0.38, 0.38, 0.3, 28]} />
      </mesh>
      {/* Outer Polished Rim Ring */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rimAlloy}>
        <cylinderGeometry args={[0.28, 0.28, 0.31, 24]} />
      </mesh>
      {/* 5-Pair Split Spoke Design */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * (2 * Math.PI)) / 5;
        return (
          <group key={i} rotation={[angle, 0, 0]}>
            <mesh position={[isRight ? 0.15 : -0.15, 0.14, 0]} material={materials.rimAlloy}>
              <boxGeometry args={[0.02, 0.22, 0.035]} />
            </mesh>
          </group>
        );
      })}
      {/* Center Bull Wheel Cap */}
      <mesh position={[isRight ? 0.155 : -0.155, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.carbonFiber}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
      </mesh>
      {/* Cross-Drilled Brake Disc */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.brakeRotor}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
      </mesh>
      {/* Massive Brembo Orange Brake Caliper */}
      <mesh position={[0, 0.13, 0.04]} material={materials.brakeCaliper}>
        <boxGeometry args={[0.1, 0.14, 0.16]} />
      </mesh>
    </group>
  );

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.18}>
      <group ref={groupRef} scale={[1.1, 1.1, 1.1]} position={[0, -0.32, 0]}>
        {/* ========================================================
            1. SCULPTED WEDGE MONOCOQUE CHASSIS & BEVELED SIDES
           ======================================================== */}
        {/* Lower Main Hull Floorpan (Length: 3.9, Width: 1.76, Height: 0.34) */}
        <mesh position={[0, 0.38, 0]} material={materials.gallardoPaint}>
          <boxGeometry args={[1.76, 0.32, 3.9]} />
        </mesh>

        {/* Flared Front Wheel Arches (Fenders) */}
        <mesh position={[-0.84, 0.45, 1.25]} material={materials.gallardoPaint}>
          <boxGeometry args={[0.16, 0.36, 1.1]} />
        </mesh>
        <mesh position={[0.84, 0.45, 1.25]} material={materials.gallardoPaint}>
          <boxGeometry args={[0.16, 0.36, 1.1]} />
        </mesh>

        {/* Flared Muscular Rear Haunches & Side Intake Pods */}
        <mesh position={[-0.88, 0.48, -1.15]} material={materials.gallardoPaint}>
          <boxGeometry args={[0.22, 0.42, 1.35]} />
        </mesh>
        <mesh position={[0.88, 0.48, -1.15]} material={materials.gallardoPaint}>
          <boxGeometry args={[0.22, 0.42, 1.35]} />
        </mesh>

        {/* Massive Side Intercooler Radiator Scoops (Black Mesh Cavity) */}
        <mesh position={[-0.92, 0.45, -0.5]} material={materials.carbonFiber}>
          <boxGeometry args={[0.12, 0.22, 0.5]} />
        </mesh>
        <mesh position={[0.92, 0.45, -0.5]} material={materials.carbonFiber}>
          <boxGeometry args={[0.12, 0.22, 0.5]} />
        </mesh>

        {/* Carbon Fiber Side Skirt Extensions */}
        <mesh position={[-0.9, 0.22, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[0.1, 0.06, 2.3]} />
        </mesh>
        <mesh position={[0.9, 0.22, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[0.1, 0.06, 2.3]} />
        </mesh>

        {/* ========================================================
            2. AGGRESSIVE FRONT NOSE, SPLITTER & AIR INTAKES
           ======================================================== */}
        {/* Sharply Pointed Low-Slung Wedge Nose Hood */}
        <mesh position={[0, 0.46, 1.58]} rotation={[0.24, 0, 0]} material={materials.gallardoPaint}>
          <boxGeometry args={[1.68, 0.24, 1.25]} />
        </mesh>

        {/* Dual Signature Trapezoidal Front Air Bumper Intakes */}
        <mesh position={[-0.44, 0.3, 2.05]} material={materials.carbonFiber}>
          <boxGeometry args={[0.54, 0.24, 0.25]} />
        </mesh>
        <mesh position={[0.44, 0.3, 2.05]} material={materials.carbonFiber}>
          <boxGeometry args={[0.54, 0.24, 0.25]} />
        </mesh>

        {/* Front Track-Inspired Carbon Splitter Blade */}
        <mesh position={[0, 0.16, 2.15]} material={materials.carbonFiber}>
          <boxGeometry args={[1.82, 0.05, 0.45]} />
        </mesh>

        {/* Vertical Splitter Winglets */}
        {[-0.92, 0.92].map((x, i) => (
          <mesh key={i} position={[x, 0.24, 2.12]} material={materials.carbonFiber}>
            <boxGeometry args={[0.04, 0.16, 0.25]} />
          </mesh>
        ))}

        {/* ========================================================
            3. COCKPIT GREENHOUSE, TINTED GLASS & ROOF
           ======================================================== */}
        {/* Sloped Jet-Fighter Windshield */}
        <mesh position={[0, 0.82, 0.38]} rotation={[-0.46, 0, 0]} material={materials.windowGlass}>
          <boxGeometry args={[1.38, 0.1, 1.05]} />
        </mesh>

        {/* Low Roof Deck */}
        <mesh position={[0, 1.04, -0.1]} material={materials.gallardoPaint}>
          <boxGeometry args={[1.28, 0.08, 0.85]} />
        </mesh>

        {/* Side Passenger & Driver Windows */}
        <mesh position={[-0.66, 0.86, -0.05]} material={materials.windowGlass}>
          <boxGeometry args={[0.06, 0.36, 1.05]} />
        </mesh>
        <mesh position={[0.66, 0.86, -0.05]} material={materials.windowGlass}>
          <boxGeometry args={[0.06, 0.36, 1.05]} />
        </mesh>

        {/* Aerodynamic Carbon Side Mirrors */}
        {[-0.78, 0.78].map((x, i) => (
          <group key={i} position={[x, 0.82, 0.45]}>
            <mesh material={materials.carbonFiber}>
              <boxGeometry args={[0.18, 0.07, 0.1]} />
            </mesh>
            <mesh position={[x > 0 ? 0.08 : -0.08, 0, 0]} material={materials.exhaustChrome}>
              <boxGeometry args={[0.01, 0.06, 0.09]} />
            </mesh>
          </group>
        ))}

        {/* ========================================================
            4. 5.2L V10 ENGINE BAY, TRANSPARENT BONNET & LOUVERS
           ======================================================== */}
        {/* Sloped Glass Rear Engine Cover */}
        <mesh position={[0, 0.82, -0.85]} rotation={[0.26, 0, 0]} material={materials.windowGlass}>
          <boxGeometry args={[1.24, 0.06, 1.15]} />
        </mesh>

        {/* 5.2L V10 Engine Block Visible Under Glass */}
        <mesh position={[0, 0.58, -0.85]} material={materials.engineSilver}>
          <boxGeometry args={[0.65, 0.24, 0.75]} />
        </mesh>
        {/* Dual Red Anodized Intake Manifolds */}
        {[-0.16, 0.16].map((x, i) => (
          <mesh key={i} position={[x, 0.72, -0.85]} material={materials.brakeCaliper}>
            <boxGeometry args={[0.14, 0.08, 0.65]} />
          </mesh>
        ))}

        {/* Rear Engine Cooling Air Extraction Louvers (Black Slat Grille) */}
        {[-0.55, -0.7, -0.85, -1.0, -1.15].map((z, idx) => (
          <mesh key={idx} position={[0, 0.86 + idx * -0.05, z]} material={materials.carbonFiber}>
            <boxGeometry args={[1.18, 0.02, 0.08]} />
          </mesh>
        ))}

        {/* ========================================================
            5. REAR DIFFUSER, HIGH-DOWNFORCE SPOILER & QUAD EXHAUSTS
           ======================================================== */}
        {/* High-Mounted Carbon Fiber Rear Aerodynamic Wing Spoiler */}
        <group position={[0, 1.05, -1.82]}>
          {/* Main Airfoil Wing Blade */}
          <mesh position={[0, 0.12, 0]} material={materials.carbonFiber}>
            <boxGeometry args={[1.72, 0.04, 0.32]} />
          </mesh>
          {/* Wing Endplates */}
          {[-0.86, 0.86].map((x, i) => (
            <mesh key={i} position={[x, 0.12, 0]} material={materials.carbonFiber}>
              <boxGeometry args={[0.03, 0.18, 0.36]} />
            </mesh>
          ))}
          {/* Twin Swan-Neck CNC Billet Uprights */}
          {[-0.45, 0.45].map((x, i) => (
            <mesh key={i} position={[x, 0.02, 0]} material={materials.carbonFiber}>
              <boxGeometry args={[0.04, 0.22, 0.12]} />
            </mesh>
          ))}
        </group>

        {/* Massive Track-Spec Rear Venturi Diffuser with 4 Vertical Strakes */}
        <mesh position={[0, 0.24, -1.95]} rotation={[-0.15, 0, 0]} material={materials.carbonFiber}>
          <boxGeometry args={[1.72, 0.14, 0.42]} />
        </mesh>
        {[-0.5, -0.2, 0.2, 0.5].map((x, idx) => (
          <mesh key={idx} position={[x, 0.2, -1.95]} material={materials.carbonFiber}>
            <boxGeometry args={[0.03, 0.18, 0.38]} />
          </mesh>
        ))}

        {/* Inconel Chrome Quad Exhaust Tailpipes */}
        {[-0.42, -0.28, 0.28, 0.42].map((x, idx) => (
          <mesh key={idx} position={[x, 0.34, -2.06]} rotation={[Math.PI / 2, 0, 0]} material={materials.exhaustChrome}>
            <cylinderGeometry args={[0.052, 0.052, 0.18, 20]} />
          </mesh>
        ))}

        {/* ========================================================
            6. HIGH-LUMINANCE LASER HEADLIGHTS & TAILLIGHTS
           ======================================================== */}
        {/* Front Y-Signature Angular LED Headlights */}
        <mesh position={[-0.6, 0.54, 1.84]} rotation={[-0.24, -0.22, 0.1]} material={materials.laserHeadlight}>
          <boxGeometry args={[0.38, 0.1, 0.34]} />
        </mesh>
        <mesh position={[0.6, 0.54, 1.84]} rotation={[-0.24, 0.22, -0.1]} material={materials.laserHeadlight}>
          <boxGeometry args={[0.38, 0.1, 0.34]} />
        </mesh>

        {/* Front Amber Corner Markers */}
        <mesh position={[-0.78, 0.48, 1.7]} material={materials.amberAccent}>
          <boxGeometry args={[0.06, 0.05, 0.2]} />
        </mesh>
        <mesh position={[0.78, 0.48, 1.7]} material={materials.amberAccent}>
          <boxGeometry args={[0.06, 0.05, 0.2]} />
        </mesh>

        {/* Rear Hexagonal LED Taillight Clusters */}
        <mesh position={[-0.62, 0.56, -1.95]} material={materials.ledTaillight}>
          <boxGeometry args={[0.42, 0.1, 0.08]} />
        </mesh>
        <mesh position={[0.62, 0.56, -1.95]} material={materials.ledTaillight}>
          <boxGeometry args={[0.42, 0.1, 0.08]} />
        </mesh>

        {/* Rear Full-Width Black Honeycomb Heat Extraction Mesh */}
        <mesh position={[0, 0.46, -1.94]} material={materials.carbonFiber}>
          <boxGeometry args={[1.68, 0.22, 0.05]} />
        </mesh>

        {/* ========================================================
            7. FOUR FORGED CORDELIA SPLIT-SPOKE PERFORMANCE WHEELS
           ======================================================== */}
        {renderSupercarWheel(-0.94, 0.38, 1.25, false)}
        {renderSupercarWheel(0.94, 0.38, 1.25, true)}
        {renderSupercarWheel(-0.96, 0.38, -1.25, false)}
        {renderSupercarWheel(0.96, 0.38, -1.25, true)}
      </group>
    </Float>
  );
};
