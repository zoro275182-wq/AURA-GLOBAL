import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural Hyper-Detailed BMW M Performance M4 Competition (G82)
// Features: Sculpted aggressive coupé chassis in Isle of Man Deep Blue Metallic, carbon fiber double-bubble roof,
// twin vertical frameless kidney grilles with horizontal slats, illuminated BMW Laserlight headlights with hexagonal Angel Eyes,
// front carbon bumper canards & splitter, flared M fenders with side M gills, aerodynamic M wing mirrors,
// trunk lid with integrated carbon ducktail spoiler, rear diffuser with quad titanium exhaust tips,
// 3D cabin with tinted glasshouse, and staggered 19"/20" M 826M forged bicolor wheels with blue M compound calipers.
export const RollsRoyceModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // BMW M Performance Isle of Man Deep Blue Metallic Triple-Coat Clearcoat
    const mPerformanceBlue = new THREE.MeshPhysicalMaterial({
      color: '#1D4ED8', // Isle of Man / Tanzanite Metallic Blue
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.96,
      iridescence: 0.25
    });

    // Dark Smoked Privacy Windshield & Greenhouse Glass
    const windowGlass = new THREE.MeshPhysicalMaterial({
      color: '#080E18',
      transmission: 0.9,
      roughness: 0.04,
      metalness: 0.1,
      ior: 1.52,
      reflectivity: 0.95,
      clearcoat: 1.0,
      transparent: true
    });

    // High-Gloss Shadowline / Carbon Fiber (Roof, Splitter, Grille, Mirrors, Spoiler, Diffuser)
    const carbonAero = new THREE.MeshStandardMaterial({
      color: '#090D14',
      metalness: 0.88,
      roughness: 0.28
    });

    // Gloss Black Grille Slats
    const glossBlack = new THREE.MeshStandardMaterial({
      color: '#020617',
      metalness: 0.92,
      roughness: 0.12
    });

    // High-Performance Michelin Pilot Sport 4S Tires
    const tireRubber = new THREE.MeshStandardMaterial({
      color: '#131822',
      roughness: 0.85,
      metalness: 0.1
    });

    // BMW M 826M Bicolor Diamond-Cut Forged Alloy Rims
    const rimAlloy = new THREE.MeshPhysicalMaterial({
      color: '#E2E8F0',
      metalness: 0.96,
      roughness: 0.1,
      clearcoat: 0.9
    });

    // Inner Shadow Spokes (Dark Anthracite)
    const innerRimMat = new THREE.MeshStandardMaterial({
      color: '#1E293B',
      metalness: 0.85,
      roughness: 0.3
    });

    // Cross-Drilled Ventilated M Brake Rotors
    const brakeRotor = new THREE.MeshStandardMaterial({
      color: '#64748B',
      metalness: 0.92,
      roughness: 0.24
    });

    // High-Gloss Estoril Blue M Compound Brake Calipers
    const mBlueCaliper = new THREE.MeshPhysicalMaterial({
      color: '#2563EB',
      metalness: 0.75,
      roughness: 0.15,
      clearcoat: 1.0
    });

    // BMW Laserlight Matrix & Hexagonal Angel Eyes (Ice Blue / High-Luminance White)
    const laserHeadlight = new THREE.MeshBasicMaterial({
      color: '#BAE6FD'
    });

    // L-Shaped OLED Thin-Blade Rear Taillights
    const oledTaillight = new THREE.MeshBasicMaterial({
      color: '#EF4444'
    });

    // Quad Burnt Titanium M Performance Exhaust Tips
    const exhaustTitanium = new THREE.MeshPhysicalMaterial({
      color: '#94A3B8',
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0
    });

    return {
      mPerformanceBlue: wireframe ? wireMat : mPerformanceBlue,
      windowGlass: wireframe ? wireMat : windowGlass,
      carbonAero: wireframe ? wireMat : carbonAero,
      glossBlack: wireframe ? wireMat : glossBlack,
      tireRubber: wireframe ? wireMat : tireRubber,
      rimAlloy: wireframe ? wireMat : rimAlloy,
      innerRimMat: wireframe ? wireMat : innerRimMat,
      brakeRotor: wireframe ? wireMat : brakeRotor,
      mBlueCaliper: wireframe ? wireMat : mBlueCaliper,
      laserHeadlight: wireframe ? wireMat : laserHeadlight,
      oledTaillight: wireframe ? wireMat : oledTaillight,
      exhaustTitanium: wireframe ? wireMat : exhaustTitanium
    };
  }, [wireframe]);

  // Procedural 19"/20" M 826M Bicolor Forged Wheel Generator
  const renderMPerformanceWheel = (x: number, y: number, z: number, isRight: boolean) => (
    <group position={[x, y, z]}>
      {/* Michelin Pilot Sport 4S Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.tireRubber}>
        <cylinderGeometry args={[0.39, 0.39, 0.32, 28]} />
      </mesh>
      {/* Outer Bicolor Polished Rim Barrel */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rimAlloy}>
        <cylinderGeometry args={[0.29, 0.29, 0.33, 24]} />
      </mesh>
      {/* 7-Y Spoke M Forged Architecture */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const angle = (i * (2 * Math.PI)) / 7;
        return (
          <group key={i} rotation={[angle, 0, 0]}>
            <mesh position={[isRight ? 0.16 : -0.16, 0.14, 0]} material={materials.rimAlloy}>
              <boxGeometry args={[0.02, 0.23, 0.03]} />
            </mesh>
            <mesh position={[isRight ? 0.15 : -0.15, 0.14, 0]} material={materials.innerRimMat}>
              <boxGeometry args={[0.015, 0.22, 0.04]} />
            </mesh>
          </group>
        );
      })}
      {/* BMW Roundel Floating Center Cap */}
      <mesh position={[isRight ? 0.165 : -0.165, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.carbonAero}>
        <cylinderGeometry args={[0.052, 0.052, 0.02, 16]} />
      </mesh>
      {/* Cross-Drilled Ventilated M Brake Disc */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.brakeRotor}>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 24]} />
      </mesh>
      {/* 6-Piston M Compound Blue Caliper with M Emblem */}
      <mesh position={[0, 0.14, 0.05]} material={materials.mBlueCaliper}>
        <boxGeometry args={[0.1, 0.15, 0.18]} />
      </mesh>
    </group>
  );

  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.18}>
      <group ref={groupRef} scale={[1.1, 1.1, 1.1]} position={[0, -0.32, 0]}>
        {/* ========================================================
            1. MUSCULAR G82 M4 SPORT COUPÉ SCULPTED CHASSIS
           ======================================================== */}
        {/* Lower Monocoque Sills & Underbody (Length: 4.1, Width: 1.78, Height: 0.38) */}
        <mesh position={[0, 0.4, 0]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[1.78, 0.38, 4.1]} />
        </mesh>

        {/* Flared Muscular Front Fenders with M Side Gills */}
        <mesh position={[-0.86, 0.46, 1.3]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[0.16, 0.38, 1.15]} />
        </mesh>
        <mesh position={[0.86, 0.46, 1.3]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[0.16, 0.38, 1.15]} />
        </mesh>

        {/* Gloss Black M Side Gill Emblems */}
        <mesh position={[-0.94, 0.52, 0.75]} material={materials.glossBlack}>
          <boxGeometry args={[0.02, 0.1, 0.26]} />
        </mesh>
        <mesh position={[0.94, 0.52, 0.75]} material={materials.glossBlack}>
          <boxGeometry args={[0.02, 0.1, 0.26]} />
        </mesh>

        {/* Muscular Rear Widebody Quarter Panels & Haunches */}
        <mesh position={[-0.89, 0.52, -1.25]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[0.2, 0.44, 1.4]} />
        </mesh>
        <mesh position={[0.89, 0.52, -1.25]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[0.2, 0.44, 1.4]} />
        </mesh>

        {/* Carbon Fiber M Performance Aerodynamic Side Skirts */}
        <mesh position={[-0.91, 0.22, 0]} material={materials.carbonAero}>
          <boxGeometry args={[0.08, 0.06, 2.5]} />
        </mesh>
        <mesh position={[0.91, 0.22, 0]} material={materials.carbonAero}>
          <boxGeometry args={[0.08, 0.06, 2.5]} />
        </mesh>

        {/* ========================================================
            2. AGGRESSIVE M FRONT FASCIA, VERTICAL KIDNEYS & SPLITTER
           ======================================================== */}
        {/* Sculpted Powerdome Hood with Dual Recessed Air Indents */}
        <mesh position={[0, 0.58, 1.42]} rotation={[0.14, 0, 0]} material={materials.mPerformanceBlue}>
          <boxGeometry args={[1.7, 0.22, 1.45]} />
        </mesh>
        {/* Dual Indented Hood Speed Creases */}
        {[-0.22, 0.22].map((x, i) => (
          <mesh key={i} position={[x, 0.64, 1.45]} rotation={[0.14, 0, 0]} material={materials.carbonAero}>
            <boxGeometry args={[0.06, 0.02, 1.1]} />
          </mesh>
        ))}

        {/* Iconic Huge Frameless Twin Vertical Kidney Grilles */}
        <mesh position={[-0.24, 0.44, 2.06]} material={materials.glossBlack}>
          <boxGeometry args={[0.34, 0.54, 0.08]} />
        </mesh>
        <mesh position={[0.24, 0.44, 2.06]} material={materials.glossBlack}>
          <boxGeometry args={[0.34, 0.54, 0.08]} />
        </mesh>

        {/* Horizontal Kidney Grille Slats (M Double-Bar Signature) */}
        {[-0.12, -0.04, 0.04, 0.12].map((y, idx) => (
          <group key={idx}>
            <mesh position={[-0.24, 0.44 + y, 2.1]} material={materials.glossBlack}>
              <boxGeometry args={[0.32, 0.02, 0.04]} />
            </mesh>
            <mesh position={[0.24, 0.44 + y, 2.1]} material={materials.glossBlack}>
              <boxGeometry args={[0.32, 0.02, 0.04]} />
            </mesh>
          </group>
        ))}

        {/* Lower Carbon Fiber Front Track Splitter with Winglets */}
        <mesh position={[0, 0.16, 2.12]} material={materials.carbonAero}>
          <boxGeometry args={[1.82, 0.05, 0.35]} />
        </mesh>
        {[-0.92, 0.92].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 2.08]} material={materials.carbonAero}>
            <boxGeometry args={[0.04, 0.18, 0.22]} />
          </mesh>
        ))}

        {/* ========================================================
            3. DOUBLE-BUBBLE CARBON ROOF, GREENHOUSE & M MIRRORS
           ======================================================== */}
        {/* Sloped High-Transmission Panoramic Windshield */}
        <mesh position={[0, 0.88, 0.42]} rotation={[-0.48, 0, 0]} material={materials.windowGlass}>
          <boxGeometry args={[1.42, 0.08, 1.12]} />
        </mesh>

        {/* M Carbon Fiber Double-Bubble Aerodynamic Roof Panel */}
        <mesh position={[0, 1.18, -0.15]} material={materials.carbonAero}>
          <boxGeometry args={[1.36, 0.04, 1.95]} />
        </mesh>
        {/* Center Aero Valley Channel in Carbon Roof */}
        <mesh position={[0, 1.19, -0.15]} material={materials.glossBlack}>
          <boxGeometry args={[0.24, 0.025, 1.9]} />
        </mesh>

        {/* Side Passenger & Driver Windows with Hofmeister Kink */}
        <mesh position={[-0.68, 0.9, -0.1]} material={materials.windowGlass}>
          <boxGeometry args={[0.05, 0.38, 1.7]} />
        </mesh>
        <mesh position={[0.68, 0.9, -0.1]} material={materials.windowGlass}>
          <boxGeometry args={[0.05, 0.38, 1.7]} />
        </mesh>

        {/* Iconic Aerodynamic M Twin-Stalk Wing Mirrors */}
        {[-0.82, 0.82].map((x, i) => (
          <group key={i} position={[x, 0.86, 0.48]}>
            <mesh material={materials.carbonAero}>
              <boxGeometry args={[0.2, 0.08, 0.12]} />
            </mesh>
            {/* Aerodynamic Top Brow Fin */}
            <mesh position={[0, 0.05, 0]} material={materials.carbonAero}>
              <boxGeometry args={[0.18, 0.02, 0.06]} />
            </mesh>
          </group>
        ))}

        {/* ========================================================
            4. REAR DUCKTAIL SPOILER, TRACK DIFFUSER & QUAD EXHAUSTS
           ======================================================== */}
        {/* Sloped Rear Glass Fastback Window */}
        <mesh position={[0, 0.88, -1.05]} rotation={[0.42, 0, 0]} material={materials.windowGlass}>
          <boxGeometry args={[1.34, 0.06, 1.25]} />
        </mesh>

        {/* Trunk Lid with Integrated Carbon Fiber Ducktail Spoiler */}
        <mesh position={[0, 0.78, -1.94]} material={materials.carbonAero}>
          <boxGeometry args={[1.48, 0.07, 0.28]} />
        </mesh>
        {/* Raised Center Gurney Flap on Spoiler */}
        <mesh position={[0, 0.83, -1.98]} rotation={[-0.1, 0, 0]} material={materials.carbonAero}>
          <boxGeometry args={[1.4, 0.04, 0.06]} />
        </mesh>

        {/* Aggressive M Track Rear Venturi Diffuser with 4 Vertical Fins */}
        <mesh position={[0, 0.24, -2.04]} rotation={[-0.12, 0, 0]} material={materials.carbonAero}>
          <boxGeometry args={[1.72, 0.16, 0.4]} />
        </mesh>
        {[-0.45, -0.18, 0.18, 0.45].map((x, idx) => (
          <mesh key={idx} position={[x, 0.22, -2.05]} material={materials.carbonAero}>
            <boxGeometry args={[0.03, 0.18, 0.38]} />
          </mesh>
        ))}

        {/* Quad 100mm Burnt Titanium Exhaust Tips */}
        {[-0.4, -0.25, 0.25, 0.4].map((x, idx) => (
          <mesh key={idx} position={[x, 0.28, -2.14]} rotation={[Math.PI / 2, 0, 0]} material={materials.exhaustTitanium}>
            <cylinderGeometry args={[0.058, 0.058, 0.22, 24]} />
          </mesh>
        ))}

        {/* ========================================================
            5. ILLUMINATED LASERLIGHTS (ANGEL EYES) & OLED TAILLIGHTS
           ======================================================== */}
        {/* Front Twin Hexagonal Laserlight DRL Clusters */}
        <mesh position={[-0.66, 0.56, 1.95]} rotation={[-0.14, -0.2, 0.05]} material={materials.laserHeadlight}>
          <boxGeometry args={[0.42, 0.1, 0.28]} />
        </mesh>
        <mesh position={[0.66, 0.56, 1.95]} rotation={[-0.14, 0.2, -0.05]} material={materials.laserHeadlight}>
          <boxGeometry args={[0.42, 0.1, 0.28]} />
        </mesh>

        {/* Laser Blue Headlight Accent Eyebrows */}
        <mesh position={[-0.66, 0.62, 1.96]} material={materials.mBlueCaliper}>
          <boxGeometry args={[0.38, 0.02, 0.2]} />
        </mesh>
        <mesh position={[0.66, 0.62, 1.96]} material={materials.mBlueCaliper}>
          <boxGeometry args={[0.38, 0.02, 0.2]} />
        </mesh>

        {/* Rear L-Shaped Thin-Blade OLED Tail Lights */}
        <mesh position={[-0.65, 0.62, -2.06]} material={materials.oledTaillight}>
          <boxGeometry args={[0.48, 0.09, 0.08]} />
        </mesh>
        <mesh position={[0.65, 0.62, -2.06]} material={materials.oledTaillight}>
          <boxGeometry args={[0.48, 0.09, 0.08]} />
        </mesh>

        {/* ========================================================
            6. STAGGERED 19"/20" M 826M BICOLOR FORGED WHEELS
           ======================================================== */}
        {renderMPerformanceWheel(-0.95, 0.38, 1.35, false)}
        {renderMPerformanceWheel(0.95, 0.38, 1.35, true)}
        {renderMPerformanceWheel(-0.97, 0.4, -1.35, false)}
        {renderMPerformanceWheel(0.97, 0.4, -1.35, true)}
      </group>
    </Float>
  );
};
