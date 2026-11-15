import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// 100% Procedural High-Detail Custom RTX 5090 (MSI Gaming X Trio / SUPRIM inspired)
// Features:
// 1. Triple TORX 5.0 Frosted White Ringed Fans on the FRONT shroud with counter-rotation.
// 2. High-precision MSI Dragon emblem center badges on metallic spinner hubs.
// 3. Iconic RGB Neon Chevrons (flowing purple/cyan/blue lighting strips) across the front shroud facets.
// 4. Matte Gunmetal & Obsidian geometric angular front shroud with beveled chamfers.
// 5. Heavy-duty aluminum heatsink cooling fin stack & copper heatpipe core.
// 6. Illuminated top crest with MSI Dragon Logo and "GEFORCE RTX" branding.
// 7. Right edge Dragon Shield illuminated badge.
export const RTX5090Model: React.FC<ModelProps> = ({ wireframe = false }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  const fan3Ref = useRef<THREE.Group>(null);

  // Textures generated procedurally on local canvas for authentic branding
  const { dragonTexture, msiTopLogoTexture, geforceRtxTexture } = useMemo(() => {
    // 1. Dragon Logo Badge for fan center
    const dCanvas = document.createElement('canvas');
    dCanvas.width = 512;
    dCanvas.height = 512;
    const dCtx = dCanvas.getContext('2d')!;

    // Black metallic ring background
    dCtx.fillStyle = '#0F1318';
    dCtx.fillRect(0, 0, 512, 512);

    // Outer silver chrome ring
    dCtx.strokeStyle = '#E2E8F0';
    dCtx.lineWidth = 18;
    dCtx.beginPath();
    dCtx.arc(256, 256, 240, 0, Math.PI * 2);
    dCtx.stroke();

    // Red/silver accent ring
    dCtx.strokeStyle = '#38BDF8';
    dCtx.lineWidth = 6;
    dCtx.beginPath();
    dCtx.arc(256, 256, 220, 0, Math.PI * 2);
    dCtx.stroke();

    // Stylized MSI Dragon Emblem (procedural vector curve)
    dCtx.save();
    dCtx.translate(256, 256);
    dCtx.strokeStyle = '#F8FAFC';
    dCtx.fillStyle = '#E2E8F0';
    dCtx.lineWidth = 10;
    dCtx.lineCap = 'round';
    dCtx.lineJoin = 'round';

    // Dragon silhouette
    dCtx.beginPath();
    dCtx.moveTo(-60, 80);
    dCtx.bezierCurveTo(-110, 30, -90, -60, -20, -90);
    dCtx.bezierCurveTo(20, -110, 80, -90, 90, -30);
    dCtx.bezierCurveTo(100, 30, 40, 90, -10, 85);
    dCtx.bezierCurveTo(-40, 80, -60, 50, -30, 20);
    dCtx.bezierCurveTo(0, -10, 40, -10, 45, -40);
    dCtx.stroke();

    // Dragon head and crest horns
    dCtx.beginPath();
    dCtx.moveTo(-20, -90);
    dCtx.lineTo(-10, -140);
    dCtx.lineTo(20, -100);
    dCtx.lineTo(50, -130);
    dCtx.lineTo(60, -85);
    dCtx.stroke();

    // Wing spikes
    dCtx.beginPath();
    dCtx.moveTo(40, -30);
    dCtx.lineTo(120, -50);
    dCtx.lineTo(80, 0);
    dCtx.lineTo(130, 10);
    dCtx.lineTo(70, 40);
    dCtx.stroke();

    dCtx.restore();

    const dTex = new THREE.CanvasTexture(dCanvas);
    dTex.needsUpdate = true;

    // 2. MSI Dragon + Text Top Plate
    const mCanvas = document.createElement('canvas');
    mCanvas.width = 1024;
    mCanvas.height = 256;
    const mCtx = mCanvas.getContext('2d')!;
    mCtx.fillStyle = '#0B0F14';
    mCtx.fillRect(0, 0, 1024, 256);

    // Glowing Dragon Logo + "msi"
    mCtx.fillStyle = '#FFFFFF';
    mCtx.font = '900 110px "Inter", "Segoe UI", sans-serif';
    mCtx.textAlign = 'center';
    mCtx.textBaseline = 'middle';
    mCtx.shadowColor = '#38BDF8';
    mCtx.shadowBlur = 18;
    mCtx.fillText('⚡ msi', 512, 128);

    const mTex = new THREE.CanvasTexture(mCanvas);
    mTex.needsUpdate = true;

    // 3. GEFORCE RTX Side Typography
    const gCanvas = document.createElement('canvas');
    gCanvas.width = 1024;
    gCanvas.height = 256;
    const gCtx = gCanvas.getContext('2d')!;
    gCtx.fillStyle = '#0B0F14';
    gCtx.fillRect(0, 0, 1024, 256);

    gCtx.fillStyle = '#FFFFFF';
    gCtx.font = '800 85px "Inter", "Segoe UI", sans-serif';
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    gCtx.shadowColor = '#F8FAFC';
    gCtx.shadowBlur = 12;
    gCtx.fillText('GEFORCE RTX™', 512, 128);

    const gTex = new THREE.CanvasTexture(gCanvas);
    gTex.needsUpdate = true;

    return { dragonTexture: dTex, msiTopLogoTexture: mTex, geforceRtxTexture: gTex };
  }, []);

  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Matte Obsidian Dark Grey Outer Geometric Shroud (MSI Gaming/Trio style)
    const shroudMat = new THREE.MeshPhysicalMaterial({
      color: '#1E232B',
      metalness: 0.85,
      roughness: 0.32,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2
    });

    // Dark gunmetal bevel accent insets
    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: '#0D1117',
      metalness: 0.9,
      roughness: 0.25
    });

    // White / Frosted Milky Fan Blades (TORX 5.0 translucent frosted finish)
    const fanBladeWhiteMat = new THREE.MeshPhysicalMaterial({
      color: '#F1F5F9',
      metalness: 0.1,
      roughness: 0.18,
      transmission: 0.3,
      thickness: 0.4,
      clearcoat: 0.8
    });

    // Chrome outer cowl ring surrounding each fan
    const cowlRingMat = new THREE.MeshStandardMaterial({
      color: '#151A22',
      metalness: 0.95,
      roughness: 0.15
    });

    // Heatsink aluminum cooling fin stack
    const finStackMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      metalness: 0.92,
      roughness: 0.28
    });

    // Pure Copper heatpipes
    const heatpipeMat = new THREE.MeshStandardMaterial({
      color: '#D97706',
      metalness: 0.95,
      roughness: 0.2
    });

    // Stainless steel PCIe backplate & IO bracket
    const metalMat = new THREE.MeshStandardMaterial({
      color: '#94A3B8',
      metalness: 0.95,
      roughness: 0.2
    });

    // Dragon emblem badge material for fan center
    const dragonBadgeMat = new THREE.MeshStandardMaterial({
      map: dragonTexture,
      metalness: 0.7,
      roughness: 0.2
    });

    // Top MSI logo
    const msiTopLogoMat = new THREE.MeshBasicMaterial({
      map: msiTopLogoTexture,
      transparent: true
    });

    // Top GEFORCE RTX logo
    const geforceLogoMat = new THREE.MeshBasicMaterial({
      map: geforceRtxTexture,
      transparent: true
    });

    // RGB Illuminated Strips (Chevrons)
    const rgbCyan = new THREE.MeshBasicMaterial({ color: '#38BDF8' });
    const rgbMagenta = new THREE.MeshBasicMaterial({ color: '#C084FC' });
    const rgbViolet = new THREE.MeshBasicMaterial({ color: '#818CF8' });

    return {
      shroudMat: wireframe ? wireMat : shroudMat,
      darkAccentMat: wireframe ? wireMat : darkAccentMat,
      fanBladeWhiteMat: wireframe ? wireMat : fanBladeWhiteMat,
      cowlRingMat: wireframe ? wireMat : cowlRingMat,
      finStackMat: wireframe ? wireMat : finStackMat,
      heatpipeMat: wireframe ? wireMat : heatpipeMat,
      metalMat: wireframe ? wireMat : metalMat,
      dragonBadgeMat: wireframe ? wireMat : dragonBadgeMat,
      msiTopLogoMat: wireframe ? wireMat : msiTopLogoMat,
      geforceLogoMat: wireframe ? wireMat : geforceLogoMat,
      rgbCyan: wireframe ? wireMat : rgbCyan,
      rgbMagenta: wireframe ? wireMat : rgbMagenta,
      rgbViolet: wireframe ? wireMat : rgbViolet
    };
  }, [wireframe, dragonTexture, msiTopLogoTexture, geforceRtxTexture]);

  // Construct TORX 5.0 Frosted Fan with connected ring and 9 swept blades
  const renderTorxFan = (ref: React.RefObject<THREE.Group>, xPos: number) => {
    const fanRadius = 0.52;
    const hubRadius = 0.17;
    const bladeCount = 9;

    return (
      <group position={[xPos, 0, 0.42]}>
        {/* Outer Circular Cowl Rim */}
        <mesh material={materials.cowlRingMat}>
          <torusGeometry args={[fanRadius + 0.02, 0.025, 16, 48]} />
        </mesh>

        {/* Dynamic Spinning Fan Rotor Group */}
        <group ref={ref}>
          {/* Outer Interconnected Fan Blade Ring (TORX 5.0 Signature outer ring band) */}
          <mesh material={materials.fanBladeWhiteMat}>
            <torusGeometry args={[fanRadius - 0.03, 0.015, 12, 48]} />
          </mesh>

          {/* 9 Swept Translucent White Fan Blades */}
          {Array.from({ length: bladeCount }).map((_, idx) => {
            const angle = (idx * Math.PI * 2) / bladeCount;
            return (
              <group key={idx} rotation={[0, 0, angle]}>
                <mesh
                  position={[0, fanRadius * 0.52, 0]}
                  rotation={[-Math.PI / 4.2, 0, -0.15]}
                  material={materials.fanBladeWhiteMat}
                >
                  <boxGeometry args={[0.13, fanRadius * 0.72, 0.016]} />
                </mesh>
              </group>
            );
          })}

          {/* Center Hub Housing */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.darkAccentMat}>
            <cylinderGeometry args={[hubRadius, hubRadius, 0.06, 32]} />
          </mesh>

          {/* Metallic Center Hub Rim */}
          <mesh position={[0, 0, 0.025]} material={materials.metalMat}>
            <torusGeometry args={[hubRadius, 0.012, 12, 32]} />
          </mesh>

          {/* Front MSI Dragon Emblem Badge Disk */}
          <mesh position={[0, 0, 0.035]} material={materials.dragonBadgeMat}>
            <circleGeometry args={[hubRadius * 0.92, 32]} />
          </mesh>
        </group>
      </group>
    );
  };

  useFrame((_, delta) => {
    // Showroom rotation around the card
    if (cardGroup.current) {
      cardGroup.current.rotation.y += delta * 0.25;
    }

    // High-speed realistic fan rotation:
    // Left and right rotate clockwise, center rotates counter-clockwise (MSI Alternate Spin tech)
    if (fan1Ref.current) fan1Ref.current.rotation.z -= delta * 7.0;
    if (fan2Ref.current) fan2Ref.current.rotation.z += delta * 7.0;
    if (fan3Ref.current) fan3Ref.current.rotation.z -= delta * 7.0;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.2}>
      <group
        ref={cardGroup}
        scale={[1.85, 1.85, 1.85]}
        rotation={[-0.2, 0.45, 0]}
        position={[0, 0, 0]}
      >
        {/* ========================================================
            1. MAIN BODY SHROUD (MSI Angular Geometric Chassis)
           ======================================================== */}
        {/* Central Card Shroud Body */}
        <mesh material={materials.shroudMat}>
          <boxGeometry args={[3.8, 1.48, 0.78]} />
        </mesh>

        {/* Top/Bottom Chamfered Geometric Facets */}
        <mesh position={[0, 0.74, 0.2]} rotation={[Math.PI / 4.5, 0, 0]} material={materials.darkAccentMat}>
          <boxGeometry args={[3.78, 0.16, 0.3]} />
        </mesh>
        <mesh position={[0, -0.74, 0.2]} rotation={[-Math.PI / 4.5, 0, 0]} material={materials.darkAccentMat}>
          <boxGeometry args={[3.78, 0.16, 0.3]} />
        </mesh>

        {/* Angular Geometric Front Face Ribs */}
        <mesh position={[-0.6, 0, 0.4]} material={materials.shroudMat}>
          <boxGeometry args={[0.08, 1.4, 0.05]} />
        </mesh>
        <mesh position={[0.6, 0, 0.4]} material={materials.shroudMat}>
          <boxGeometry args={[0.08, 1.4, 0.05]} />
        </mesh>

        {/* ========================================================
            2. TRIPLE TORX 5.0 FANS ACROSS THE FRONT
           ======================================================== */}
        {/* Left Fan */}
        {renderTorxFan(fan1Ref, -1.2)}

        {/* Center Fan */}
        {renderTorxFan(fan2Ref, 0.0)}

        {/* Right Fan */}
        {renderTorxFan(fan3Ref, 1.2)}

        {/* ========================================================
            3. MSI SIGNATURE RGB CHEVRON STRIPES (Front Facets)
           ======================================================== */}
        {/* Upper Diagonal Chevron Slash Lights between Fans 1 & 2 */}
        <group position={[-0.58, 0.48, 0.42]} rotation={[0, 0, -Math.PI / 4]}>
          <mesh position={[-0.07, 0, 0]} material={materials.rgbCyan}>
            <boxGeometry args={[0.03, 0.28, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={materials.rgbViolet}>
            <boxGeometry args={[0.03, 0.34, 0.02]} />
          </mesh>
          <mesh position={[0.07, 0, 0]} material={materials.rgbMagenta}>
            <boxGeometry args={[0.03, 0.4, 0.02]} />
          </mesh>
        </group>

        {/* Lower Diagonal Chevron Accent between Fans 1 & 2 */}
        <group position={[-0.62, -0.48, 0.42]} rotation={[0, 0, -Math.PI / 4]}>
          <mesh position={[-0.05, 0, 0]} material={materials.rgbCyan}>
            <boxGeometry args={[0.03, 0.22, 0.02]} />
          </mesh>
          <mesh position={[0.02, 0, 0]} material={materials.rgbViolet}>
            <boxGeometry args={[0.03, 0.26, 0.02]} />
          </mesh>
        </group>

        {/* Right Shroud Edge Illuminated Ring / RGB Dragon Shield Logo */}
        <group position={[1.86, 0.1, 0.18]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={materials.rgbCyan}>
            <torusGeometry args={[0.16, 0.02, 16, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.005]} material={materials.dragonBadgeMat}>
            <circleGeometry args={[0.14, 32]} />
          </mesh>
        </group>

        {/* Soft Front Face RGB Ambient Glow Point Lights */}
        <pointLight position={[-0.6, 0.5, 0.6]} intensity={1.5} color="#38BDF8" distance={1.8} />
        <pointLight position={[-0.6, 0.5, 0.6]} intensity={1.5} color="#C084FC" distance={1.8} />
        <pointLight position={[1.85, 0.1, 0.3]} intensity={1.2} color="#38BDF8" distance={1.5} />

        {/* ========================================================
            4. TOP EDGE CREST: MSI LOGO & GEFORCE RTX BRANDING
           ======================================================== */}
        {/* Top Edge Angled Bezel Plate */}
        <mesh position={[0, 0.77, 0.08]} rotation={[-Math.PI / 7, 0, 0]} material={materials.darkAccentMat}>
          <boxGeometry args={[3.76, 0.04, 0.38]} />
        </mesh>

        {/* Top Left: MSI Logo Plate */}
        <mesh position={[-0.95, 0.81, 0.11]} rotation={[-Math.PI / 7, 0, 0]} material={materials.msiTopLogoMat}>
          <planeGeometry args={[0.85, 0.22]} />
        </mesh>

        {/* Top Right: GEFORCE RTX™ Inlaid Brand */}
        <mesh position={[0.85, 0.81, 0.11]} rotation={[-Math.PI / 7, 0, 0]} material={materials.geforceLogoMat}>
          <planeGeometry args={[1.35, 0.22]} />
        </mesh>

        {/* 16-Pin 12V-2x6 Power Connector Housing recessed in top */}
        <mesh position={[-0.05, 0.78, -0.05]} material={materials.darkAccentMat}>
          <boxGeometry args={[0.34, 0.12, 0.18]} />
        </mesh>
        <mesh position={[-0.05, 0.79, -0.05]} material={materials.metalMat}>
          <boxGeometry args={[0.28, 0.06, 0.12]} />
        </mesh>

        {/* ========================================================
            5. DENSE HEATSINK FIN ARRAYS & COPPER HEATPIPES
           ======================================================== */}
        {/* Top & Bottom Visible Cooling Fin Slots */}
        <group position={[0, 0, 0]}>
          {Array.from({ length: 42 }).map((_, idx) => {
            const x = -1.75 + idx * 0.085;
            return (
              <mesh key={idx} position={[x, 0, -0.05]} material={materials.finStackMat}>
                <boxGeometry args={[0.018, 1.34, 0.65]} />
              </mesh>
            );
          })}
        </group>

        {/* 5 Massive Pure Copper Heatpipes running through fins */}
        {[-0.42, -0.21, 0.0, 0.21, 0.42].map((y, idx) => (
          <mesh key={idx} position={[0, y, -0.05]} rotation={[0, 0, Math.PI / 2]} material={materials.heatpipeMat}>
            <cylinderGeometry args={[0.038, 0.038, 3.65, 16]} />
          </mesh>
        ))}

        {/* ========================================================
            6. REAR BACKPLATE & PCIE INTERFACE
           ======================================================== */}
        {/* Brushed Metal Backplate */}
        <mesh position={[0, 0, -0.4]} material={materials.shroudMat}>
          <boxGeometry args={[3.8, 1.48, 0.04]} />
        </mesh>

        {/* Flow-Through Exhaust Window on Backplate */}
        <mesh position={[1.1, 0, -0.405]} material={materials.darkAccentMat}>
          <boxGeometry args={[1.1, 1.0, 0.02]} />
        </mesh>

        {/* Triple-Slot Stainless Steel Rear I/O Bracket */}
        <mesh position={[-1.92, 0, -0.02]} material={materials.metalMat}>
          <boxGeometry args={[0.05, 1.75, 0.75]} />
        </mesh>

        {/* 3x DisplayPort 2.1 + 1x HDMI 2.1 Display Output Ports */}
        {[-0.45, -0.15, 0.15, 0.45].map((y, idx) => (
          <group key={idx} position={[-1.95, y, 0]}>
            <mesh material={materials.darkAccentMat}>
              <boxGeometry args={[0.02, 0.14, 0.24]} />
            </mesh>
            <mesh position={[-0.005, 0, 0]} material={materials.metalMat}>
              <boxGeometry args={[0.01, 0.06, 0.16]} />
            </mesh>
          </group>
        ))}

        {/* Gold Plated PCIe 5.0 x16 Contact Fingers */}
        <mesh position={[-0.5, -0.79, 0]} material={materials.heatpipeMat}>
          <boxGeometry args={[1.6, 0.1, 0.03]} />
        </mesh>
      </group>
    </Float>
  );
};
