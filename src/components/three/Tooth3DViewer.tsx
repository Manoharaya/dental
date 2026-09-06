import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export type ToothState = 'healthy' | 'decay' | 'restored';

interface Tooth3DViewerProps {
  initialState?: ToothState;
  className?: string;
  showControls?: boolean;
}

export const Tooth3DViewer: React.FC<Tooth3DViewerProps> = ({
  initialState = 'healthy',
  className = '',
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toothState, setToothState] = useState<ToothState>(initialState);
  const [isHovered, setIsHovered] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to three objects so we can morph materials smoothly
  const crownMeshRef = useRef<THREE.Mesh | null>(null);
  const rootsMeshRef = useRef<THREE.Group | null>(null);
  const decaySpotRef = useRef<THREE.Mesh | null>(null);
  const crownCapRef = useRef<THREE.Mesh | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Lights: Precision studio lighting with mint-teal and porcelain rim
    const ambientLight = new THREE.AmbientLight(0xd4eae5, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ec, 2.4); // Warm porcelain key
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x3ed9c0, 1.8); // Precision mint-teal rim
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const backRimLight = new THREE.PointLight(0x52e0c7, 2.0, 12);
    backRimLight.position.set(0, 4, -4);
    scene.add(backRimLight);

    // Group for all tooth parts
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    scene.add(toothGroup);

    // --- PROCEDURAL ANATOMICAL MOLAR TOOTH GEOMETRY ---
    // 1. Crown Geometry (Anatomical 4-cusped molar crown)
    const crownGeo = new THREE.CylinderGeometry(1.05, 0.85, 1.25, 32, 16);
    const crownPos = crownGeo.attributes.position;
    // Displace vertices to form natural molar cusps and fissures
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);

      if (y > 0.3) {
        // Sculpt 4 cusps: mesiobuccal, distobuccal, mesiolingual, distolingual
        const cuspBump = Math.cos(x * 2.8) * Math.cos(z * 2.8) * 0.22;
        crownPos.setY(i, y + cuspBump);
      }
      // Natural barrel curvature
      const bulge = Math.sin((y + 0.6) * 2.2) * 0.12;
      crownPos.setX(i, x * (1 + bulge));
      crownPos.setZ(i, z * (1 + bulge));
    }
    crownGeo.computeVertexNormals();

    // Natural Enamel Material - Translucent Porcelain with Mint-Teal Refraction
    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf6f3ed, // Warm porcelain
      emissive: 0x051a17, // Subtle deep teal internal resonance
      roughness: 0.12,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.32,
      thickness: 0.9,
      reflectivity: 0.95,
      ior: 1.52, // Index of refraction of natural tooth enamel
    });

    const crownMesh = new THREE.Mesh(crownGeo, crownMaterial);
    crownMesh.position.y = 0.55;
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    toothGroup.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // 2. Restored Ceramic Crown Cap (High-translucency Zirconia / Lithium Disilicate)
    const capGeo = new THREE.CylinderGeometry(1.08, 0.95, 0.72, 32, 8);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbf9f5,
      emissive: 0x16463e,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.28,
      visible: false,
    });
    const capMesh = new THREE.Mesh(capGeo, capMaterial);
    capMesh.position.y = 0.85;
    toothGroup.add(capMesh);
    crownCapRef.current = capMesh;

    // 3. Roots (Bifurcated molar roots)
    const rootsGroup = new THREE.Group();
    rootsMeshRef.current = rootsGroup;
    toothGroup.add(rootsGroup);

    const rootMaterial = new THREE.MeshStandardMaterial({
      color: 0xeae1d4,
      roughness: 0.42,
      metalness: 0.02,
    });

    // Root 1 (Mesial)
    const root1Curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.4, 0.0, 0),
      new THREE.Vector3(-0.55, -0.9, 0.05),
      new THREE.Vector3(-0.35, -1.8, -0.05),
    ]);
    const root1Geo = new THREE.TubeGeometry(root1Curve, 20, 0.32, 16, false);
    const root1Mesh = new THREE.Mesh(root1Geo, rootMaterial);
    root1Mesh.castShadow = true;
    rootsGroup.add(root1Mesh);

    // Root 2 (Distal)
    const root2Curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, 0.0, 0),
      new THREE.Vector3(0.55, -0.85, -0.05),
      new THREE.Vector3(0.3, -1.75, 0.05),
    ]);
    const root2Geo = new THREE.TubeGeometry(root2Curve, 20, 0.3, 16, false);
    const root2Mesh = new THREE.Mesh(root2Geo, rootMaterial);
    root2Mesh.castShadow = true;
    rootsGroup.add(root2Mesh);

    // 4. Decay pathology spot (Darkened lesion in occlusal fissure)
    const decayGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const decayMat = new THREE.MeshStandardMaterial({
      color: 0x2b1509,
      emissive: 0x3d1700,
      roughness: 0.88,
      visible: false,
    });
    const decayMesh = new THREE.Mesh(decayGeo, decayMat);
    decayMesh.position.set(0.15, 1.12, 0.12);
    decayMesh.scale.set(1.4, 0.5, 1.2);
    toothGroup.add(decayMesh);
    decaySpotRef.current = decayMesh;

    // Position whole tooth centrally
    toothGroup.position.y = 0.3;

    // Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.015;
        targetRotationX += deltaY * 0.01;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        mouseX = ((clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((clientY - rect.top) / rect.height - 0.5) * 2;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-spin when not actively dragging
      if (!isDragging) {
        targetRotationY += 0.007;
      }

      // Smooth damping interpolation with cursor parallax
      toothGroup.rotation.y += (targetRotationY + mouseX * 0.25 - toothGroup.rotation.y) * 0.07;
      toothGroup.rotation.x += (targetRotationX + mouseY * 0.18 - toothGroup.rotation.x) * 0.07;
      toothGroup.position.y = 0.3 + Math.sin(elapsedTime * 1.4) * 0.05; // Gentle floating breath

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update materials when toothState changes
  useEffect(() => {
    const crown = crownMeshRef.current;
    const decay = decaySpotRef.current;
    const cap = crownCapRef.current;

    if (!crown) return;

    const crownMat = crown.material as THREE.MeshPhysicalMaterial;

    if (toothState === 'healthy') {
      crownMat.color.setHex(0xf6f3ed);
      crownMat.emissive.setHex(0x051a17);
      crownMat.roughness = 0.12;
      crownMat.clearcoat = 1.0;
      crownMat.transmission = 0.32;
      if (decay) decay.visible = false;
      if (cap) cap.visible = false;
    } else if (toothState === 'decay') {
      crownMat.color.setHex(0xc5bcaf);
      crownMat.emissive.setHex(0x1a0d04);
      crownMat.roughness = 0.55;
      crownMat.clearcoat = 0.2;
      crownMat.transmission = 0.05;
      if (decay) decay.visible = true;
      if (cap) cap.visible = false;
    } else if (toothState === 'restored') {
      crownMat.color.setHex(0xfbf9f5);
      crownMat.emissive.setHex(0x0c3029);
      crownMat.roughness = 0.08;
      crownMat.clearcoat = 1.0;
      crownMat.transmission = 0.36;
      if (decay) decay.visible = false;
      if (cap) {
        cap.visible = true;
        (cap.material as THREE.MeshPhysicalMaterial).color.setHex(0xf8fafc);
        (cap.material as THREE.MeshPhysicalMaterial).emissive.setHex(0x1e6155);
      }
    }
  }, [toothState]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Mount */}
      {webglSupported ? (
        <div
          ref={containerRef}
          className="w-full h-64 sm:h-80 md:h-[390px] cursor-grab active:cursor-grabbing tooth-canvas-wrapper flex items-center justify-center relative"
        >
          {/* Subtle Ambient Radial Glow & Architectural Depth Rings */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
            <div className="w-52 sm:w-72 h-52 sm:h-72 border border-[#3ED9C0]/20 rounded-full animate-pulse-ring" />
            <div className="w-36 sm:w-52 h-36 sm:h-52 border border-[#F2E9DC]/15 rounded-full absolute" />
          </div>

          {/* Interactive Hint */}
          <div
            className={`absolute bottom-2 bg-[#0E1614]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] sm:text-xs text-[#A8B8B4] shadow-lg transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 ${
              isHovered ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ED9C0] animate-ping" />
            <span>Interactive 3D model • Drag to inspect</span>
          </div>
        </div>
      ) : (
        /* Graceful Fallback Illustration */
        <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center bg-[#131F1C] rounded-3xl border border-white/10 p-6 text-center">
          <div className="w-20 sm:w-28 h-20 sm:h-28 bg-[#182723] rounded-full flex items-center justify-center text-[#3ED9C0] mb-3 shadow-[0_0_25px_rgba(62,217,192,0.25)]">
            <Sparkles className="w-8 sm:w-12 h-8 sm:h-12" />
          </div>
          <h4 className="font-display font-semibold text-[#F9FAF9] text-sm sm:text-lg">3D Anatomical Tooth Model</h4>
          <p className="text-xs sm:text-sm text-[#A8B8B4] max-w-xs mt-1">WebGL is disabled or unsupported on this device. Viewing clinical schematic.</p>
        </div>
      )}

      {/* Interactive State Toggle Controls */}
      {showControls && (
        <div className="mt-2 flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 p-1.5 bg-[#131F1C]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] max-w-full">
          <button
            onClick={() => setToothState('healthy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${
              toothState === 'healthy'
                ? 'bg-gradient-to-r from-[#4AE0C7] to-[#2BB9A2] text-[#07221C] shadow-[0_0_20px_rgba(62,217,192,0.35)]'
                : 'text-[#A8B8B4] hover:text-[#F9FAF9] hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Natural Enamel
          </button>

          <button
            onClick={() => setToothState('decay')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${
              toothState === 'decay'
                ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg'
                : 'text-[#A8B8B4] hover:text-[#F9FAF9] hover:bg-white/5'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Caries / Defect
          </button>

          <button
            onClick={() => setToothState('restored')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${
              toothState === 'restored'
                ? 'bg-gradient-to-r from-[#2BB9A2] to-emerald-600 text-[#07221C] font-bold shadow-[0_0_20px_rgba(62,217,192,0.35)]'
                : 'text-[#A8B8B4] hover:text-[#F9FAF9] hover:bg-white/5'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Ceramic Crown
          </button>
        </div>
      )}
    </div>
  );
};
