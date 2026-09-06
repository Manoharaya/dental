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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.2);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0ea5e9, 1.4); // Subtle cyan clinical fill
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.8, 10);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

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
      const r = Math.sqrt(x * x + z * z);
      const bulge = Math.sin((y + 0.6) * 2.2) * 0.12;
      crownPos.setX(i, x * (1 + bulge));
      crownPos.setZ(i, z * (1 + bulge));
    }
    crownGeo.computeVertexNormals();

    // Natural Enamel Material
    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbf9f5,
      emissive: 0x111111,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      transmission: 0.25,
      thickness: 0.8,
      reflectivity: 0.9,
    });

    const crownMesh = new THREE.Mesh(crownGeo, crownMaterial);
    crownMesh.position.y = 0.55;
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    toothGroup.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // 2. Restored Ceramic / Gold Inlay Crown Cap
    const capGeo = new THREE.CylinderGeometry(1.08, 0.95, 0.7, 32, 8);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold/Champagne ceramic restoration
      metalness: 0.85,
      roughness: 0.25,
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
      color: 0xf3ede2,
      roughness: 0.45,
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
      color: 0x3d1c06,
      roughness: 0.9,
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
        targetRotationY += 0.008;
      }

      // Smooth damping interpolation
      toothGroup.rotation.y += (targetRotationY + mouseX * 0.3 - toothGroup.rotation.y) * 0.08;
      toothGroup.rotation.x += (targetRotationX + mouseY * 0.2 - toothGroup.rotation.x) * 0.08;
      toothGroup.position.y = 0.3 + Math.sin(elapsedTime * 1.5) * 0.06; // Floating motion

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
      crownMat.color.setHex(0xfbf9f5);
      crownMat.roughness = 0.18;
      crownMat.clearcoat = 0.95;
      crownMat.transmission = 0.25;
      if (decay) decay.visible = false;
      if (cap) cap.visible = false;
    } else if (toothState === 'decay') {
      crownMat.color.setHex(0xd6cfc4);
      crownMat.roughness = 0.6;
      crownMat.clearcoat = 0.2;
      crownMat.transmission = 0.05;
      if (decay) decay.visible = true;
      if (cap) cap.visible = false;
    } else if (toothState === 'restored') {
      crownMat.color.setHex(0xf8fafc);
      crownMat.roughness = 0.15;
      crownMat.clearcoat = 1.0;
      crownMat.transmission = 0.3;
      if (decay) decay.visible = false;
      if (cap) {
        cap.visible = true;
        (cap.material as THREE.MeshStandardMaterial).color.setHex(0x0ea5e9); // Modern high-tech ceramic or gold
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
          {/* Subtle 3D Depth Rings & Clinical Grid */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-48 sm:w-64 h-48 sm:h-64 border border-brand-300/40 rounded-full animate-pulse-ring" />
            <div className="w-36 sm:w-48 h-36 sm:h-48 border border-brand-200/50 rounded-full absolute" />
          </div>

          {/* Interactive Hint */}
          <div
            className={`absolute bottom-2 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/80 text-[10px] sm:text-xs text-slate-600 shadow-sm transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-70'
            }`}
          >
            ✦ Click & drag to rotate in 3D
          </div>
        </div>
      ) : (
        /* Graceful Fallback Illustration */
        <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-slate-200 p-6 text-center">
          <div className="w-20 sm:w-28 h-20 sm:h-28 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mb-3 shadow-glow">
            <Sparkles className="w-8 sm:w-12 h-8 sm:h-12" />
          </div>
          <h4 className="font-display font-semibold text-slate-800 text-sm sm:text-lg">3D Anatomical Tooth Model</h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mt-1">WebGL is disabled or unsupported on this device. Viewing clinical schematic.</p>
        </div>
      )}

      {/* Interactive State Toggle Controls */}
      {showControls && (
        <div className="mt-2 flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-luxury max-w-full">
          <button
            onClick={() => setToothState('healthy')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium transition-all ${
              toothState === 'healthy'
                ? 'bg-brand-500 text-white shadow-glow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Healthy Enamel
          </button>

          <button
            onClick={() => setToothState('decay')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium transition-all ${
              toothState === 'decay'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Caries / Decay
          </button>

          <button
            onClick={() => setToothState('restored')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium transition-all ${
              toothState === 'restored'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Restored Crown
          </button>
        </div>
      )}
    </div>
  );
};
