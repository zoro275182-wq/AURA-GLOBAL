import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// Hyper-Realistic Procedural MSI GeForce RTX 5090 Gaming X Trio / SUPRIM
// Matches user reference:
// - Faceted matte-black/gunmetal shroud with angular beveled edges
// - Recessed triple TORX 5.0 fan bay with chamfered inner lips
// - Distinctive white TORX 5.0 fan blades: 9 curved aerofoils bound in sets of three by an outer ring
// - Authentic metallic spun-aluminum fan hubs with sharp MSI Dragon Shield emblem
// - Iconic tri-color diagonal RGB light slashes (Cyan, Purple, Magenta) on the front shroud
// - Top-mounted angular crest with illuminated "⚡ msi" Dragon badge and "GEFORCE RTX" logo
// - Side RGB edge shield with illuminated dragon crest
// - Deep, dense aluminum radiator fin stack visible behind fans and through top/bottom vents
// - Nickel-plated copper heatpipes snaking through the radiator
// - Brushed aluminum backplate with geometric flow-through cutouts
export const RTX5090Model: React.FC<ModelProps> = ({ wireframe = false }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  const fan3Ref = useRef<THREE.Group>(null);
  const rgbStripsRef = useRef<THREE.Group>(null);

  // Generate crisp procedural textures for MSI dragon badges and logos
  const { dragonBadgeTexture, msiTopLogoTexture, geforceRtxTexture, sideShieldTexture } = useMemo(() => {
    // 1. MSI Dragon Center Hub Badge (512x512)
    const dCanvas = document.createElement('canvas');
    dCanvas.width = 512;
    dCanvas.height = 512;
    const dCtx = dCanvas.getContext('2d')!;

    // Radial dark gunmetal brushed gradient
    const grad = dCtx.createRadialGradient(256, 256, 10, 256, 256, 256);
    grad.addColorStop(0, '#1E2530');
    grad.addColorStop(0.7, '#0C1016');
    grad.addColorStop(1, '#05070A');
    dCtx.fillStyle = grad;
    dCtx.fillRect(0, 0, 512, 512);

    // Fine concentric brushed metal rings
    dCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    dCtx.lineWidth = 1.5;
    for (let r = 30; r < 240; r += 12) {
      dCtx.beginPath();
      dCtx.arc(256, 256, r, 0, Math.PI * 2);
      dCtx.stroke();
    }

    // Outer Chrome Chamfer Ring
    dCtx.strokeStyle = '#E2E8F0';
    dCtx.lineWidth = 14;
    dCtx.beginPath();
    dCtx.arc(256, 256, 244, 0, Math.PI * 2);
    dCtx.stroke();

    // Inner Neon Accent Ring
    dCtx.strokeStyle = '#38BDF8';
    dCtx.lineWidth = 4;
    dCtx.beginPath();
    dCtx.arc(256, 256, 230, 0, Math.PI * 2);
    dCtx.stroke();

    // Detailed MSI Dragon Vector Path
    dCtx.save();
    dCtx.translate(256, 256);

    // Shadow for depth
    dCtx.shadowColor = '#38BDF8';
    dCtx.shadowBlur = 8;
    dCtx.strokeStyle = '#F8FAFC';
    dCtx.fillStyle = '#F1F5F9';
    dCtx.lineWidth = 7;
    dCtx.lineCap = 'round';
    dCtx.lineJoin = 'round';

    // Dragon body spine
    dCtx.beginPath();
    dCtx.moveTo(-50, 75);
    dCtx.bezierCurveTo(-100, 35, -85, -50, -20, -85);
    dCtx.bezierCurveTo(20, -105, 75, -85, 85, -30);
    dCtx.bezierCurveTo(95, 30, 45, 85, -5, 80);
    dCtx.bezierCurveTo(-35, 75, -55, 45, -25, 15);
    dCtx.bezierCurveTo(5, -15, 35, -15, 40, -40);
    dCtx.stroke();

    // Dragon Head & Jaws & Horns
    dCtx.beginPath();
    dCtx.moveTo(-20, -85);
    dCtx.lineTo(-12, -135);
    dCtx.lineTo(15, -95);
    dCtx.lineTo(45, -125);
    dCtx.lineTo(55, -85);
    dCtx.stroke();

    // Sharp Wing Claws / Ribs
    dCtx.beginPath();
    dCtx.moveTo(35, -30);
    dCtx.lineTo(110, -50);
    dCtx.lineTo(75, -2);
    dCtx.lineTo(120, 10);
    dCtx.lineTo(65, 38);
    dCtx.stroke();

    // Tail tip barb
    dCtx.beginPath();
    dCtx.moveTo(-50, 75);
    dCtx.lineTo(-80, 105);
    dCtx.lineTo(-50, 100);
    dCtx.lineTo(-40, 120);
    dCtx.lineTo(-30, 85);
    dCtx.fill();

    dCtx.restore();

    const dTex = new THREE.CanvasTexture(dCanvas);
    dTex.needsUpdate = true;

    // 2. MSI Logo for Top Crest (1024x256)
    const mCanvas = document.createElement('canvas');
    mCanvas.width = 1024;
    mCanvas.height = 256;
    const mCtx = mCanvas.getContext('2d')!;
    mCtx.fillStyle = '#0F1318';
    mCtx.fillRect(0, 0, 1024, 256);

    // Glowing Dragon Logo + "msi"
    mCtx.fillStyle = '#FFFFFF';
    mCtx.font = '900 115px "Segoe UI", "Inter", sans-serif';
    mCtx.textAlign = 'center';
    mCtx.textBaseline = 'middle';
    mCtx.shadowColor = '#38BDF8';
    mCtx.shadowBlur = 18;
    mCtx.fillText('⚡ msi', 512, 128);

    const mTex = new THREE.CanvasTexture(mCanvas);
    mTex.needsUpdate = true;

    // 3. GEFORCE RTX Side Typography (1024x256)
    const gCanvas = document.createElement('canvas');
    gCanvas.width = 1024;
    gCanvas.height = 256;
    const gCtx = gCanvas.getContext('2d')!;
    gCtx.fillStyle = '#0F1318';
    gCtx.fillRect(0, 0, 1024, 256);

    gCtx.fillStyle = '#FFFFFF';
    gCtx.font = '800 90px "Segoe UI", "Inter", sans-serif';
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    gCtx.shadowColor = '#F8FAFC';
    gCtx.shadowBlur = 14;
    gCtx.fillText('GEFORCE RTX™', 512, 128);

    const gTex = new THREE.CanvasTexture(gCanvas);
    gTex.needsUpdate = true;

    // 4. Side Dragon Shield Badge (512x512)
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 512;
    sCanvas.height = 512;
    const sCtx = sCanvas.getContext('2d')!;
    sCtx.fillStyle = '#0B0F14';
    sCtx.fillRect(0, 0, 512, 512);

    // Shield outline
    sCtx.strokeStyle = '#38BDF8';
    sCtx.lineWidth = 14;
    sCtx.beginPath();
    sCtx.moveTo(256, 40);
    sCtx.lineTo(430, 80);
    sCtx.lineTo(430, 280);
    sCtx.bezierCurveTo(430, 400, 256, 470, 256, 470);
    sCtx.bezierCurveTo(256, 470, 82, 400, 82, 280);
    sCtx.lineTo(82, 80);
    sCtx.closePath();
    sCtx.stroke();

    // Dragon inside shield
    sCtx.save();
    sCtx.translate(256, 250);
    sCtx.scale(0.8, 0.8);
    sCtx.strokeStyle = '#F8FAFC';
    sCtx.lineWidth = 10;
    sCtx.lineCap = 'round';
    sCtx.beginPath();
    sCtx.moveTo(-45, 60);
    sCtx.bezierCurveTo(-90, 20, -75, -50, -15, -80);
    sCtx.bezierCurveTo(15, -95, 65, -80, 75, -30);
    sCtx.bezierCurveTo(85, 20, 35, 75, -5, 70);
    sCtx.stroke();
    sCtx.restore();

    const sTex = new THREE.CanvasTexture(sCanvas);
    sTex.needsUpdate = true;

    return {
      dragonBadgeTexture: dTex,
      msiTopLogoTexture: mTex,
      geforceRtxTexture: gTex,
      sideShieldTexture: sTex
    };
  }, []);

  // Hyper-realistic PBR materials matching real high-end GPU hardware
  const materials = useMemo(() => {
    const wireMat = new THREE.MeshBasicMaterial({ color: '#06B6D4', wireframe: true });

    // Matte Gunmetal / Obsidian Metallic Shroud with microscopic metallic flakes
    const shroudMat = new THREE.MeshPhysicalMaterial({
      color: '#1A1E24',
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.4,
      clearcoatRoughness: 0.15,
      reflectivity: 0.85
    });

    // Dark brushed aluminum accent inserts (facets & chamfers)
    const brushedDarkMat = new THREE.MeshStandardMaterial({
      color: '#10141A',
      metalness: 0.95,
      roughness: 0.2
    });

    // Mirror chrome bezels around fan wells
    const chromeBezelMat = new THREE.MeshPhysicalMaterial({
      color: '#E2E8F0',
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      reflectivity: 0.98
    });

    // Frosted Translucent White TORX 5.0 Fan Blades (high transmission milky polymer)
    const fanBladeWhiteMat = new THREE.MeshPhysicalMaterial({
      color: '#F8FAFC',
      metalness: 0.05,
      roughness: 0.14,
      transmission: 0.42,
      thickness: 0.35,
      ior: 1.48,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08
    });

    // Dark ring joining blade tips
    const fanBladeTipRingMat = new THREE.MeshPhysicalMaterial({
      color: '#F1F5F9',
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.35,
      thickness: 0.3
    });

    // Spun aluminum center fan hub cap with dragon badge
    const dragonBadgeMat = new THREE.MeshStandardMaterial({
      map: dragonBadgeTexture,
      metalness: 0.85,
      roughness: 0.18
    });

    // Dense aluminum radiator cooling fin stack
    const finStackMat = new THREE.MeshStandardMaterial({
      color: '#64748B',
      metalness: 0.94,
      roughness: 0.26
    });

    // Pure Electrolytic Copper Heatpipes
    const heatpipeMat = new THREE.MeshStandardMaterial({
      color: '#EA580C',
      metalness: 0.96,
      roughness: 0.18
    });

    // Nickel-plated heatpipe caps
    const nickelMat = new THREE.MeshStandardMaterial({
      color: '#CBD5E1',
      metalness: 0.96,
      roughness: 0.12
    });

    // Brushed dark aluminum backplate
    const backplateMat = new THREE.MeshStandardMaterial({
      color: '#161A22',
      metalness: 0.92,
      roughness: 0.25
    });

    // Stainless steel triple-slot I/O bracket
    const ioBracketMat = new THREE.MeshStandardMaterial({
      color: '#CBD5E1',
      metalness: 0.98,
      roughness: 0.15
    });

    // Top MSI illuminated logo
    const msiTopLogoMat = new THREE.MeshBasicMaterial({
      map: msiTopLogoTexture,
      transparent: true
    });

    // Top GEFORCE RTX illuminated logo
    const geforceLogoMat = new THREE.MeshBasicMaterial({
      map: geforceRtxTexture,
      transparent: true
    });

    // Side Dragon Shield Badge
    const sideShieldMat = new THREE.MeshBasicMaterial({
      map: sideShieldTexture,
      transparent: true
    });

    // Vivid RGB LED materials for the front chevrons
    const rgbCyan = new THREE.MeshBasicMaterial({ color: '#38BDF8' });
    const rgbViolet = new THREE.MeshBasicMaterial({ color: '#818CF8' });
    const rgbMagenta = new THREE.MeshBasicMaterial({ color: '#D946EF' });

    return {
      shroudMat: wireframe ? wireMat : shroudMat,
      brushedDarkMat: wireframe ? wireMat : brushedDarkMat,
      chromeBezelMat: wireframe ? wireMat : chromeBezelMat,
      fanBladeWhiteMat: wireframe ? wireMat : fanBladeWhiteMat,
      fanBladeTipRingMat: wireframe ? wireMat : fanBladeTipRingMat,
      dragonBadgeMat: wireframe ? wireMat : dragonBadgeMat,
      finStackMat: wireframe ? wireMat : finStackMat,
      heatpipeMat: wireframe ? wireMat : heatpipeMat,
      nickelMat: wireframe ? wireMat : nickelMat,
      backplateMat: wireframe ? wireMat : backplateMat,
      ioBracketMat: wireframe ? wireMat : ioBracketMat,
      msiTopLogoMat: wireframe ? wireMat : msiTopLogoMat,
      geforceLogoMat: wireframe ? wireMat : geforceLogoMat,
      sideShieldMat: wireframe ? wireMat : sideShieldMat,
      rgbCyan: wireframe ? wireMat : rgbCyan,
      rgbViolet: wireframe ? wireMat : rgbViolet,
      rgbMagenta: wireframe ? wireMat : rgbMagenta
    };
  }, [wireframe, dragonBadgeTexture, msiTopLogoTexture, geforceRtxTexture, sideShieldTexture]);

  // Construct Realistic TORX 5.0 Fan with connected 3-blade ring bands and realistic aerofoil pitch
  const renderTorx5Fan = (ref: React.RefObject<THREE.Group>, xPos: number, isReversed: boolean) => {
    const fanRadius = 0.54;
    const hubRadius = 0.175;
    const bladeCount = 9;

    return (
      <group position={[xPos, 0, 0.44]}>
        {/* Recessed Fan Well Housing with Chamfered Wall */}
        <mesh position={[0, 0, -0.06]} material={materials.brushedDarkMat}>
          <cylinderGeometry args={[fanRadius + 0.05, fanRadius + 0.03, 0.12, 48, 1, true]} />
        </mesh>

        {/* Polished Chrome Outer Lip Accent Ring */}
        <mesh position={[0, 0, 0.005]} material={materials.chromeBezelMat}>
          <torusGeometry args={[fanRadius + 0.035, 0.014, 16, 48]} />
        </mesh>

        {/* Dynamic Spinning Rotor Assembly */}
        <group ref={ref}>
          {/* Outer Interconnected Fan Blade Ring (TORX 5.0 Signature outer ring band connecting 3 blade sets) */}
          <mesh position={[0, 0, 0.01]} material={materials.fanBladeTipRingMat}>
            <torusGeometry args={[fanRadius - 0.02, 0.016, 12, 48]} />
          </mesh>

          {/* 9 Swept Translucent White Fan Blades with Progressive Aerodynamic Twist */}
          {Array.from({ length: bladeCount }).map((_, idx) => {
            const angle = (idx * Math.PI * 2) / bladeCount;
            const pitchDir = isReversed ? 1 : -1;
            return (
              <group key={idx} rotation={[0, 0, angle]}>
                {/* Blade Root Section */}
                <mesh
                  position={[0, fanRadius * 0.52, 0.01]}
                  rotation={[pitchDir * 0.65, 0, -0.22]}
                  material={materials.fanBladeWhiteMat}
                >
                  <boxGeometry args={[0.135, fanRadius * 0.72, 0.018]} />
                </mesh>
                {/* Secondary Aerodynamic Stiffening Ridge */}
                <mesh
                  position={[0.04, fanRadius * 0.54, 0.018]}
                  rotation={[pitchDir * 0.65, 0, -0.22]}
                  material={materials.fanBladeWhiteMat}
                >
                  <boxGeometry args={[0.025, fanRadius * 0.65, 0.024]} />
                </mesh>
              </group>
            );
          })}

          {/* Spun Aluminum Center Hub Shell */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.brushedDarkMat}>
            <cylinderGeometry args={[hubRadius, hubRadius, 0.07, 32]} />
          </mesh>

          {/* Stepped Chrome Hub Bezel */}
          <mesh position={[0, 0, 0.032]} material={materials.chromeBezelMat}>
            <torusGeometry args={[hubRadius, 0.012, 12, 32]} />
          </mesh>

          {/* Front MSI Dragon Emblem Badge Disk */}
          <mesh position={[0, 0, 0.038]} material={materials.dragonBadgeMat}>
            <circleGeometry args={[hubRadius * 0.94, 32]} />
          </mesh>
        </group>
      </group>
    );
  };

  useFrame((_, delta) => {
    // Elegant turntable rotation to view 3D card
    if (cardGroup.current) {
      cardGroup.current.rotation.y += delta * 0.22;
    }

    // High-speed synchronized realistic fan spin:
    // Left & Right rotate clockwise, Center rotates counter-clockwise (MSI Alternate Spin)
    if (fan1Ref.current) fan1Ref.current.rotation.z -= delta * 7.5;
    if (fan2Ref.current) fan2Ref.current.rotation.z += delta * 7.5;
    if (fan3Ref.current) fan3Ref.current.rotation.z -= delta * 7.5;
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
        {/* Core Main Shroud Chassis */}
        <mesh material={materials.shroudMat}>
          <boxGeometry args={[3.86, 1.5, 0.82]} />
        </mesh>

        {/* Angular Front Facet Cutouts & Insets */}
        {/* Top Chamfered Face */}
        <mesh position={[0, 0.75, 0.22]} rotation={[Math.PI / 4.2, 0, 0]} material={materials.brushedDarkMat}>
          <boxGeometry args={[3.84, 0.18, 0.32]} />
        </mesh>
        {/* Bottom Chamfered Face */}
        <mesh position={[0, -0.75, 0.22]} rotation={[-Math.PI / 4.2, 0, 0]} material={materials.brushedDarkMat}>
          <boxGeometry args={[3.84, 0.18, 0.32]} />
        </mesh>

        {/* Angular Diamond-Cut Facet Dividers between Fans */}
        <mesh position={[-0.6, 0, 0.44]} material={materials.brushedDarkMat}>
          <boxGeometry args={[0.07, 1.42, 0.08]} />
        </mesh>
        <mesh position={[0.6, 0, 0.44]} material={materials.brushedDarkMat}>
          <boxGeometry args={[0.07, 1.42, 0.08]} />
        </mesh>

        {/* Left & Right End-Cap Chamfer Wedges */}
        <mesh position={[-1.93, 0, 0.22]} rotation={[0, -Math.PI / 5, 0]} material={materials.brushedDarkMat}>
          <boxGeometry args={[0.1, 1.48, 0.38]} />
        </mesh>
        <mesh position={[1.93, 0, 0.22]} rotation={[0, Math.PI / 5, 0]} material={materials.brushedDarkMat}>
          <boxGeometry args={[0.1, 1.48, 0.38]} />
        </mesh>

        {/* ========================================================
            2. TRIPLE RECESSED TORX 5.0 FANS (Exact Placement)
           ======================================================== */}
        {/* Fan 1: Left */}
        {renderTorx5Fan(fan1Ref, -1.22, false)}

        {/* Fan 2: Center (Alternate Spin) */}
        {renderTorx5Fan(fan2Ref, 0.0, true)}

        {/* Fan 3: Right */}
        {renderTorx5Fan(fan3Ref, 1.22, false)}

        {/* ========================================================
            3. MSI SIGNATURE RGB CHEVRON LIGHT SLASHES (As in Reference)
           ======================================================== */}
        {/* Upper Diagonal Chevron Slash between Fans 1 & 2 */}
        <group position={[-0.6, 0.48, 0.45]} rotation={[0, 0, -Math.PI / 3.8]}>
          {/* Slash 1: Cyan */}
          <mesh position={[-0.08, 0, 0]} material={materials.rgbCyan}>
            <boxGeometry args={[0.034, 0.32, 0.024]} />
          </mesh>
          {/* Slash 2: Violet */}
          <mesh position={[0, 0, 0]} material={materials.rgbViolet}>
            <boxGeometry args={[0.034, 0.38, 0.024]} />
          </mesh>
          {/* Slash 3: Magenta */}
          <mesh position={[0.08, 0, 0]} material={materials.rgbMagenta}>
            <boxGeometry args={[0.034, 0.44, 0.024]} />
          </mesh>
        </group>

        {/* Lower Diagonal Chevron Accent between Fans 1 & 2 */}
        <group position={[-0.62, -0.48, 0.45]} rotation={[0, 0, -Math.PI / 3.8]}>
          <mesh position={[-0.05, 0, 0]} material={materials.rgbCyan}>
            <boxGeometry args={[0.03, 0.24, 0.024]} />
          </mesh>
          <mesh position={[0.02, 0, 0]} material={materials.rgbViolet}>
            <boxGeometry args={[0.03, 0.28, 0.024]} />
          </mesh>
        </group>

        {/* Right Corner Slanted RGB Ambient Glint */}
        <group position={[1.88, 0.1, 0.2]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={materials.rgbCyan}>
            <torusGeometry args={[0.17, 0.02, 16, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.005]} material={materials.sideShieldMat}>
            <circleGeometry args={[0.15, 32]} />
          </mesh>
        </group>

        {/* Soft Volumetric RGB Glint Lights illuminating the front shroud */}
        <pointLight position={[-0.6, 0.52, 0.7]} intensity={1.8} color="#38BDF8" distance={2.2} />
        <pointLight position={[-0.6, 0.44, 0.7]} intensity={1.8} color="#D946EF" distance={2.2} />
        <pointLight position={[1.9, 0.1, 0.4]} intensity={1.2} color="#38BDF8" distance={1.8} />

        {/* ========================================================
            4. TOP CREST: MSI DRAGON EMBLEM & GEFORCE RTX BRANDING
           ======================================================== */}
        {/* Top Slanted Bezel Plate */}
        <mesh position={[0, 0.78, 0.08]} rotation={[-Math.PI / 6.8, 0, 0]} material={materials.brushedDarkMat}>
          <boxGeometry args={[3.82, 0.045, 0.42]} />
        </mesh>

        {/* Top Left: Illuminated "⚡ msi" Dragon Plate */}
        <mesh position={[-0.96, 0.825, 0.12]} rotation={[-Math.PI / 6.8, 0, 0]} material={materials.msiTopLogoMat}>
          <planeGeometry args={[0.9, 0.24]} />
        </mesh>

        {/* Top Right: Illuminated "GEFORCE RTX" Inlaid Brand */}
        <mesh position={[0.88, 0.825, 0.12]} rotation={[-Math.PI / 6.8, 0, 0]} material={materials.geforceLogoMat}>
          <planeGeometry args={[1.4, 0.24]} />
        </mesh>

        {/* 16-Pin 12V-2x6 Power Connector Housing in the top notch */}
        <mesh position={[-0.05, 0.79, -0.06]} material={materials.brushedDarkMat}>
          <boxGeometry args={[0.36, 0.14, 0.2]} />
        </mesh>
        <mesh position={[-0.05, 0.8, -0.06]} material={materials.nickelMat}>
          <boxGeometry args={[0.3, 0.07, 0.14]} />
        </mesh>

        {/* ========================================================
            5. DENSE COOLING FIN ARRAY & COPPER HEATPIPES (Behind fans)
           ======================================================== */}
        {/* Dense Aluminum Micro-Fin Stack (48 individual cooling fins) */}
        <group position={[0, 0, 0.05]}>
          {Array.from({ length: 48 }).map((_, idx) => {
            const x = -1.82 + idx * 0.078;
            return (
              <mesh key={idx} position={[x, 0, -0.08]} material={materials.finStackMat}>
                <boxGeometry args={[0.016, 1.36, 0.68]} />
              </mesh>
            );
          })}
        </group>

        {/* 6 Nickel-Plated Copper Composite Heatpipes running lengthwise */}
        {[-0.45, -0.27, -0.09, 0.09, 0.27, 0.45].map((y, idx) => (
          <mesh key={idx} position={[0, y, -0.08]} rotation={[0, 0, Math.PI / 2]} material={materials.heatpipeMat}>
            <cylinderGeometry args={[0.036, 0.036, 3.72, 16]} />
          </mesh>
        ))}

        {/* ========================================================
            6. REAR BRUSHED ALUMINUM BACKPLATE & FLOW-THROUGH
           ======================================================== */}
        {/* Backplate */}
        <mesh position={[0, 0, -0.42]} material={materials.backplateMat}>
          <boxGeometry args={[3.86, 1.5, 0.04]} />
        </mesh>

        {/* Backplate Flow-Through Ventilation Grille (Right Side) */}
        <mesh position={[1.15, 0, -0.425]} material={materials.brushedDarkMat}>
          <boxGeometry args={[1.15, 1.05, 0.02]} />
        </mesh>

        {/* Stainless Steel Triple-Slot Rear I/O Bracket */}
        <mesh position={[-1.95, 0, -0.02]} material={materials.ioBracketMat}>
          <boxGeometry args={[0.05, 1.78, 0.78]} />
        </mesh>

        {/* Display Ports: 3x DisplayPort 2.1 UHBR20 + 1x HDMI 2.1b */}
        {[-0.48, -0.16, 0.16, 0.48].map((y, idx) => (
          <group key={idx} position={[-1.98, y, 0]}>
            <mesh material={materials.brushedDarkMat}>
              <boxGeometry args={[0.02, 0.14, 0.25]} />
            </mesh>
            <mesh position={[-0.005, 0, 0]} material={materials.nickelMat}>
              <boxGeometry args={[0.01, 0.06, 0.16]} />
            </mesh>
          </group>
        ))}

        {/* Gold-Plated PCIe 5.0 x16 Connector Fingers */}
        <mesh position={[-0.5, -0.81, 0]} material={materials.heatpipeMat}>
          <boxGeometry args={[1.65, 0.1, 0.03]} />
        </mesh>
      </group>
    </Float>
  );
};
