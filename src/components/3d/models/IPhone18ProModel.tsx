import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  wireframe?: boolean;
}

// Continuous G2 squircle generator for authentic Apple curvature
function createSquircleShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

// Authentic Apple Logo Bézier Shape
function createAppleLogoShapes(): { appleBody: THREE.Shape; appleLeaf: THREE.Shape } {
  const appleBody = new THREE.Shape();
  appleBody.moveTo(0, -0.042);
  appleBody.bezierCurveTo(-0.015, -0.042, -0.038, -0.030, -0.052, -0.012);
  appleBody.bezierCurveTo(-0.066, 0.006, -0.065, 0.032, -0.050, 0.050);
  appleBody.bezierCurveTo(-0.038, 0.064, -0.018, 0.068, 0, 0.058);
  appleBody.bezierCurveTo(0.018, 0.068, 0.038, 0.064, 0.050, 0.050);
  appleBody.bezierCurveTo(0.035, 0.038, 0.032, 0.012, 0.044, -0.002);
  appleBody.bezierCurveTo(0.056, -0.016, 0.062, -0.018, 0.056, -0.026);
  appleBody.bezierCurveTo(0.044, -0.038, 0.022, -0.042, 0, -0.042);

  const appleLeaf = new THREE.Shape();
  appleLeaf.moveTo(0.002, 0.064);
  appleLeaf.bezierCurveTo(0.018, 0.082, 0.032, 0.088, 0.034, 0.088);
  appleLeaf.bezierCurveTo(0.034, 0.088, 0.032, 0.076, 0.022, 0.066);
  appleLeaf.bezierCurveTo(0.012, 0.056, 0.002, 0.064, 0.002, 0.064);

  return { appleBody, appleLeaf };
}

// Master-crafted High-Poly iPhone 18 Pro Max in Deep Burgundy Titanium
// Backplate with 48MP Triple-Lens Optical System and Mirror Apple Logo
export const IPhone18ProModel: React.FC<ModelProps> = ({ wireframe = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth showroom 360 orbit
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.32;
    }
  });

  const materials = useMemo(() => {
    // 1. Grade 5 Aerospace Titanium Frame (Deep Burgundy)
    const titaniumFrame = new THREE.MeshPhysicalMaterial({
      color: '#3F0612',
      metalness: 0.94,
      roughness: 0.20,
      clearcoat: 0.8,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95
    });

    // 2. Frosted Satin Rear Glass Backplate (Deep Burgundy Velvet Sheen)
    const frostedBackGlass = new THREE.MeshPhysicalMaterial({
      color: '#55091A',
      metalness: 0.16,
      roughness: 0.32,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      reflectivity: 0.88,
      iridescence: 0.30,
      iridescenceIOR: 1.45
    });

    // 3. Polished Deep Burgundy Sapphire Camera Plateau
    const sapphirePlateau = new THREE.MeshPhysicalMaterial({
      color: '#650E22',
      metalness: 0.65,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.96
    });

    // 4. Titanium Lens Bezel Outer Rings (Deep Burgundy)
    const lensRing = new THREE.MeshPhysicalMaterial({
      color: '#380510',
      metalness: 0.96,
      roughness: 0.14,
      clearcoat: 0.85
    });

    // 5. Diamond-Cut Silver Chamfered Rim
    const diamondCutLip = new THREE.MeshStandardMaterial({
      color: '#F1F5F9',
      metalness: 0.98,
      roughness: 0.06
    });

    // 6. Stepped Black Inner Aperture Baffle
    const apertureBaffle = new THREE.MeshStandardMaterial({
      color: '#080A12',
      roughness: 0.6
    });

    // 7. Anti-Reflective Optical Sapphire Lens Element (Ultra-Clean Glass Shader)
    const opticalGlass = new THREE.MeshPhysicalMaterial({
      color: '#02050E',
      transmission: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      transparent: true
    });

    // 8. Authentic Mirror-Chrome Inlaid Apple Logo
    const chromeLogo = new THREE.MeshStandardMaterial({
      color: '#F8FAFC',
      metalness: 0.98,
      roughness: 0.04
    });

    // 9. Ceramic Shield Front Glass & OLED Display
    const frontScreen = new THREE.MeshPhysicalMaterial({
      color: '#020408',
      metalness: 0.88,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95
    });

    // 10. Dynamic Island Module
    const dynamicIsland = new THREE.MeshBasicMaterial({
      color: '#000000'
    });

    // 11. LiDAR Scanner Module
    const lidarScanner = new THREE.MeshStandardMaterial({
      color: '#090B10',
      roughness: 0.8,
      metalness: 0.3
    });

    // 12. True-Tone Adaptive Quad-LED Flash
    const trueToneFlash = new THREE.MeshStandardMaterial({
      color: '#FEF08A',
      emissive: '#FDE047',
      emissiveIntensity: 0.65,
      roughness: 0.2
    });

    // 13. Camera Control Capacitive Sensor Button
    const cameraControlSensor = new THREE.MeshPhysicalMaterial({
      color: '#4A0815',
      roughness: 0.12,
      metalness: 0.85,
      clearcoat: 1.0
    });

    // 14. Wireframe Hologram Material
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#06B6D4',
      wireframe: true
    });

    return {
      titaniumFrame: wireframe ? wireframeMat : titaniumFrame,
      frostedBackGlass: wireframe ? wireframeMat : frostedBackGlass,
      sapphirePlateau: wireframe ? wireframeMat : sapphirePlateau,
      lensRing: wireframe ? wireframeMat : lensRing,
      diamondCutLip: wireframe ? wireframeMat : diamondCutLip,
      apertureBaffle: wireframe ? wireframeMat : apertureBaffle,
      opticalGlass: wireframe ? wireframeMat : opticalGlass,
      chromeLogo: wireframe ? wireframeMat : chromeLogo,
      frontScreen: wireframe ? wireframeMat : frontScreen,
      dynamicIsland: wireframe ? wireframeMat : dynamicIsland,
      lidarScanner: wireframe ? wireframeMat : lidarScanner,
      trueToneFlash: wireframe ? wireframeMat : trueToneFlash,
      cameraControlSensor: wireframe ? wireframeMat : cameraControlSensor
    };
  }, [wireframe]);

  const geometries = useMemo(() => {
    // 1:1 CAD Proportions: 77.6mm width, 163.0mm height, 8.25mm thickness
    const bodyShape = createSquircleShape(0.776, 1.63, 0.12);
    const bodyExtrude = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 0.0825,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.007,
      bevelThickness: 0.007
    });

    // Rear Frosted Glass Backplate
    const backPlateGeom = new THREE.ShapeGeometry(createSquircleShape(0.766, 1.62, 0.116));

    // Raised Sapphire Camera Plateau
    const plateauShape = createSquircleShape(0.38, 0.40, 0.08);
    const plateauExtrude = new THREE.ExtrudeGeometry(plateauShape, {
      depth: 0.022,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.005,
      bevelThickness: 0.005
    });

    // Apple Logo Bézier Geometries
    const { appleBody, appleLeaf } = createAppleLogoShapes();
    const appleBodyGeom = new THREE.ShapeGeometry(appleBody);
    const appleLeafGeom = new THREE.ShapeGeometry(appleLeaf);

    // Front Ceramic Shield OLED Screen
    const screenGeom = new THREE.ShapeGeometry(createSquircleShape(0.758, 1.612, 0.112));

    return {
      bodyExtrude,
      backPlateGeom,
      plateauExtrude,
      appleBodyGeom,
      appleLeafGeom,
      screenGeom
    };
  }, []);

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.2}>
      <group
        ref={groupRef}
        rotation={[Math.PI / 12, Math.PI / 4.5, 0]}
        position={[0, 0, 0]}
      >
        {/* ======================================================== */}
        {/* 1. AEROSPACE GRADE 5 TITANIUM CHASSIS FRAME             */}
        {/* ======================================================== */}
        <mesh
          geometry={geometries.bodyExtrude}
          material={materials.titaniumFrame}
          position={[0, 0, -0.04125]}
          castShadow
          receiveShadow
        />

        {/* ======================================================== */}
        {/* 2. FROSTED SATIN REAR GLASS BACKPLATE (DEEP BURGUNDY)    */}
        {/* ======================================================== */}
        <mesh
          geometry={geometries.backPlateGeom}
          material={materials.frostedBackGlass}
          position={[0, 0, 0.0415]}
          castShadow
          receiveShadow
        />

        {/* Authentic Inlaid Mirror-Chrome Apple Logo */}
        <group position={[0, -0.02, 0.0418]}>
          <mesh geometry={geometries.appleBodyGeom} material={materials.chromeLogo} />
          <mesh geometry={geometries.appleLeafGeom} material={materials.chromeLogo} />
        </group>

        {/* ======================================================== */}
        {/* 3. PROTRUDING IPHONE 18 PRO MAX 48MP CAMERA SYSTEM       */}
        {/* ======================================================== */}
        <group position={[-0.182, 0.585, 0.0415]}>
          {/* Raised Deep Burgundy Sapphire Plateau */}
          <mesh
            geometry={geometries.plateauExtrude}
            material={materials.sapphirePlateau}
            position={[0, 0, 0]}
            castShadow
            receiveShadow
          />

          {/* Plateau outer face is at Z = +0.027 */}

          {/* --- LENS 1: 48MP Fusion Wide Angle (Top Left) --- */}
          <group position={[-0.068, 0.085, 0.027]}>
            <mesh material={materials.lensRing} position={[0, 0, 0.014]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.070, 0.073, 0.028, 36]} />
            </mesh>
            <mesh material={materials.diamondCutLip} position={[0, 0, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.067, 0.069, 0.003, 36]} />
            </mesh>
            <mesh material={materials.apertureBaffle} position={[0, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.054, 0.054, 0.006, 36]} />
            </mesh>
            <mesh material={materials.opticalGlass} position={[0, 0, 0.0275]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.050, 0.050, 0.002, 36]} />
            </mesh>
          </group>

          {/* --- LENS 2: 48MP 5x Tetraprism Periscope Telephoto (Bottom Left) --- */}
          <group position={[-0.068, -0.085, 0.027]}>
            <mesh material={materials.lensRing} position={[0, 0, 0.014]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.070, 0.073, 0.028, 36]} />
            </mesh>
            <mesh material={materials.diamondCutLip} position={[0, 0, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.067, 0.069, 0.003, 36]} />
            </mesh>
            <mesh material={materials.apertureBaffle} position={[0, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.054, 0.054, 0.006, 36]} />
            </mesh>
            <mesh material={materials.opticalGlass} position={[0, 0, 0.0275]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.050, 0.050, 0.002, 36]} />
            </mesh>
          </group>

          {/* --- LENS 3: 48MP Ultra-Wide Macro (Center Right) --- */}
          <group position={[0.068, 0.0, 0.027]}>
            <mesh material={materials.lensRing} position={[0, 0, 0.014]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.070, 0.073, 0.028, 36]} />
            </mesh>
            <mesh material={materials.diamondCutLip} position={[0, 0, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.067, 0.069, 0.003, 36]} />
            </mesh>
            <mesh material={materials.apertureBaffle} position={[0, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.054, 0.054, 0.006, 36]} />
            </mesh>
            <mesh material={materials.opticalGlass} position={[0, 0, 0.0275]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.050, 0.050, 0.002, 36]} />
            </mesh>
          </group>

          {/* --- True-Tone Adaptive Quad-LED Flash (Top Right) --- */}
          <group position={[0.068, 0.105, 0.028]}>
            <mesh material={materials.trueToneFlash} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.026, 0.026, 0.004, 24]} />
            </mesh>
          </group>

          {/* --- LiDAR Scanner Depth Module (Bottom Right) --- */}
          <group position={[0.068, -0.105, 0.028]}>
            <mesh material={materials.lidarScanner} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 0.004, 24]} />
            </mesh>
          </group>

          {/* --- Studio Acoustic Microphone Pinhole --- */}
          <mesh material={materials.dynamicIsland} position={[0.068, -0.038, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.004, 16]} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 4. FRONT FACE: SUPER RETINA XDR DISPLAY & DYNAMIC ISLAND */}
        {/* ======================================================== */}
        <mesh
          geometry={geometries.screenGeom}
          material={materials.frontScreen}
          position={[0, 0, -0.0485]}
          rotation={[0, Math.PI, 0]}
          castShadow
          receiveShadow
        />

        {/* Dynamic Island Pill on Front Display */}
        <group position={[0, 0.70, -0.0492]} rotation={[0, Math.PI, 0]}>
          <mesh material={materials.dynamicIsland}>
            <capsuleGeometry args={[0.018, 0.072, 16, 16]} />
          </mesh>
          <mesh position={[-0.024, 0, 0.0005]} material={materials.opticalGlass}>
            <circleGeometry args={[0.011, 24]} />
          </mesh>
          <mesh position={[0.024, 0, 0.0005]} material={materials.apertureBaffle}>
            <circleGeometry args={[0.009, 24]} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 5. SIDE PERIMETER BUTTONS & CONTROLS                     */}
        {/* ======================================================== */}
        {/* Right Side: Power Button */}
        <mesh material={materials.titaniumFrame} position={[0.395, 0.28, 0]}>
          <boxGeometry args={[0.012, 0.16, 0.028]} />
        </mesh>

        {/* Right Side: Capacitive Sapphire "Camera Control" Sensor Button */}
        <mesh material={materials.cameraControlSensor} position={[0.395, -0.32, 0]}>
          <boxGeometry args={[0.009, 0.18, 0.024]} />
        </mesh>

        {/* Left Side: Action Button */}
        <mesh material={materials.titaniumFrame} position={[-0.395, 0.44, 0]}>
          <boxGeometry args={[0.012, 0.075, 0.028]} />
        </mesh>

        {/* Left Side: Volume Up & Down Buttons */}
        <mesh material={materials.titaniumFrame} position={[-0.395, 0.26, 0]}>
          <boxGeometry args={[0.012, 0.14, 0.028]} />
        </mesh>
        <mesh material={materials.titaniumFrame} position={[-0.395, 0.08, 0]}>
          <boxGeometry args={[0.012, 0.14, 0.028]} />
        </mesh>

        {/* Bottom Edge: USB-C 3.2 Port */}
        <mesh material={materials.diamondCutLip} position={[0, -0.822, 0]}>
          <boxGeometry args={[0.11, 0.008, 0.028]} />
        </mesh>
        <mesh material={materials.dynamicIsland} position={[0, -0.823, 0]}>
          <boxGeometry args={[0.095, 0.008, 0.020]} />
        </mesh>

        {/* Bottom Edge: CNC Acoustic Speaker & Mic Grills */}
        {[-0.22, -0.18, -0.14, 0.14, 0.18, 0.22, 0.26].map((xOffset, i) => (
          <mesh
            key={i}
            material={materials.dynamicIsland}
            position={[xOffset, -0.823, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.007, 0.007, 0.006, 12]} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};
