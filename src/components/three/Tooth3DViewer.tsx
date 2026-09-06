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

    // Camera: Start closer for entrance sequence (camera pull-back)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const targetCameraZ = 5.2;
    camera.position.set(0, 0.15, 3.4); // Initial camera position for pull-back

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Lights: High-end luxury product render lighting in soft pastel tones
    const ambientLight = new THREE.AmbientLight(0xe8f5f2, 1.4); // Soft cool ambient daylight
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.6); // Warm studio key
    keyLight.position.set(4.5, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7ed0be, 1.8); // Soft pastel sage-teal fill
    fillLight.position.set(-4, 3, -2.5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xafe3d6, 2.4, 14); // Mint rim reflection
    rimLight.position.set(0, 4.5, -4);
    scene.add(rimLight);

    // Group for all tooth parts
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    scene.add(toothGroup);

    // --- PROCEDURAL ANATOMICAL MOLAR TOOTH GEOMETRY ---
    // 1. Crown Geometry (Anatomical 4-cusped molar crown)
    const crownGeo = new THREE.CylinderGeometry(1.05, 0.85, 1.25, 32, 16);
    const crownPos = crownGeo.attributes.position;
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);

      if (y > 0.3) {
        const cuspBump = Math.cos(x * 2.8) * Math.cos(z * 2.8) * 0.22;
        crownPos.setY(i, y + cuspBump);
      }
      const bulge = Math.sin((y + 0.6) * 2.2) * 0.12;
      crownPos.setX(i, x * (1 + bulge));
      crownPos.setZ(i, z * (1 + bulge));
    }
    crownGeo.computeVertexNormals();

    // Natural Enamel Material - Luminous Porcelain with Soft Mint Internal Glow
    const crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdfdfd,
      emissive: 0x0e2b24,
      roughness: 0.1,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transmission: 0.38,
      thickness: 0.85,
      reflectivity: 0.95,
      ior: 1.52, // Human enamel refractive index
    });

    const crownMesh = new THREE.Mesh(crownGeo, crownMaterial);
    crownMesh.position.y = 0.55;
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    toothGroup.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // 2. Restored Ceramic Crown Cap (High-translucency aesthetic lithium disilicate)
    const capGeo = new THREE.CylinderGeometry(1.08, 0.95, 0.72, 32, 8);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x1a453d,
      roughness: 0.06,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transmission: 0.32,
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
      color: 0xf3eee6,
      roughness: 0.38,
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
      color: 0x3d2011,
      emissive: 0x471d05,
      roughness: 0.85,
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

      // Orchestrated camera pull-back entrance animation
      if (camera.position.z < targetCameraZ) {
        camera.position.z += (targetCameraZ - camera.position.z) * 0.04;
      }

      // Gentle auto-spin when not dragging
      if (!isDragging) {
        targetRotationY += 0.006;
      }

      // Smooth damping interpolation with cursor parallax
      toothGroup.rotation.y += (targetRotationY + mouseX * 0.22 - toothGroup.rotation.y) * 0.06;
      toothGroup.rotation.x += (targetRotationX + mouseY * 0.15 - toothGroup.rotation.x) * 0.06;
      toothGroup.position.y = 0.3 + Math.sin(elapsedTime * 1.3) * 0.04; // Subtle calm breath

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
      crownMat.color.setHex(0xfdfdfd);
      crownMat.emissive.setHex(0x0e2b24);
      crownMat.roughness = 0.1;
      crownMat.clearcoat = 1.0;
      crownMat.transmission = 0.38;
      if (decay) decay.visible = false;
      if (cap) cap.visible = false;
    } else if (toothState === 'decay') {
      crownMat.color.setHex(0xd5cec5);
      crownMat.emissive.setHex(0x241206);
      crownMat.roughness = 0.5;
      crownMat.clearcoat = 0.2;
      crownMat.transmission = 0.08;
      if (decay) decay.visible = true;
      if (cap) cap.visible = false;
    } else if (toothState === 'restored') {
      crownMat.color.setHex(0xffffff);
      crownMat.emissive.setHex(0x133d34);
      crownMat.roughness = 0.06;
      crownMat.clearcoat = 1.0;
      crownMat.transmission = 0.42;
      if (decay) decay.visible = false;
      if (cap) {
        cap.visible = true;
        (cap.material as THREE.MeshPhysicalMaterial).color.setHex(0xffffff);
        (cap.material as THREE.MeshPhysicalMaterial).emissive.setHex(0x21544a);
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
          className="w-full h-64 sm:h-80 md:h-[400px] cursor-grab active:cursor-grabbing tooth-canvas-wrapper flex items-center justify-center relative"
        >
          {/* Subtle Ambient Radial Glow & Architectural Depth Rings in Soft Mint */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60">
            <div className="w-56 sm:w-80 h-56 sm:h-80 bg-[#D4EFE8]/40 rounded-full blur-3xl pointer-events-none" />
            <div className="w-52 sm:w-72 h-52 sm:h-72 border border-[#3E8E7E]/15 rounded-full absolute pointer-events-none" />
          </div>

          {/* Interactive Hint */}
          <div
            className={`absolute bottom-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#1B2B27]/08 text-[11px] sm:text-xs text-[#536963] shadow-sm transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 ${
              isHovered ? 'opacity-100' : 'opacity-75'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E7E] animate-ping" />
            <span>Interactive 3D anatomical model • Drag to inspect</span>
          </div>
        </div>
      ) : (
        /* Graceful Fallback Illustration */
        <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center bg-white rounded-3xl border border-[#1B2B27]/08 p-6 text-center shadow-spa">
          <div className="w-20 sm:w-28 h-20 sm:h-28 bg-[#D4EFE8]/50 rounded-full flex items-center justify-center text-[#3E8E7E] mb-3">
            <Sparkles className="w-8 sm:w-12 h-8 sm:h-12" />
          </div>
          <h4 className="font-serif font-normal text-[#1B2B27] text-base sm:text-lg">3D Anatomical Tooth Model</h4>
          <p className="text-xs sm:text-sm text-[#536963] max-w-xs mt-1">WebGL is disabled or unsupported. Viewing clinical schematic.</p>
        </div>
      )}

      {/* Interactive State Toggle Controls */}
      {showControls && (
        <div className="mt-2 flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 p-1.5 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-[#1B2B27]/08 shadow-spa max-w-full">
          <button
            onClick={() => setToothState('healthy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
              toothState === 'healthy'
                ? 'btn-tactile-primary'
                : 'text-[#536963] hover:text-[#1B2B27] hover:bg-[#F5F1EA]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Natural Enamel
          </button>

          <button
            onClick={() => setToothState('decay')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
              toothState === 'decay'
                ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-md'
                : 'text-[#536963] hover:text-[#1B2B27] hover:bg-[#F5F1EA]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Caries / Defect
          </button>

          <button
            onClick={() => setToothState('restored')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
              toothState === 'restored'
                ? 'btn-tactile-primary'
                : 'text-[#536963] hover:text-[#1B2B27] hover:bg-[#F5F1EA]'
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
