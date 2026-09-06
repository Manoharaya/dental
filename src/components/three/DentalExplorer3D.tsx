import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Activity, AlertTriangle, CheckCircle2, ChevronRight, Stethoscope, Sparkles } from 'lucide-react';

interface ToothDetail {
  id: string;
  number: string;
  name: string;
  type: 'incisor' | 'canine' | 'premolar' | 'molar';
  function: string;
  anatomy: {
    enamel: string;
    dentin: string;
    pulp: string;
    root: string;
  };
  commonIssues: {
    title: string;
    symptom: string;
    risk: string;
  }[];
  treatments: {
    name: string;
    type: string;
    recommendation: string;
  }[];
}

const TOOTH_DATABASE: Record<string, ToothDetail> = {
  molar: {
    id: 'molar',
    number: '#30 & #19',
    name: 'First Mandibular Molar',
    type: 'molar',
    function: 'Heavy mastication, grinding food with up to 200 lbs of bite force.',
    anatomy: {
      enamel: 'Thick 2.5mm protective cap with deep developmental occlusal grooves and fissures.',
      dentin: 'Expansive tubular zone that cushions bite impact and insulates the pulp.',
      pulp: 'Large chamber with 3-4 distinct nerve canals (mesiobuccal, mesiolingual, distal).',
      root: 'Bifurcated dual root structure deeply embedded in the mandibular cortical bone.'
    },
    commonIssues: [
      { title: 'Occlusal Pit & Fissure Caries', symptom: 'Deep brown discoloration, sweet/cold sensitivity', risk: 'High' },
      { title: 'Craze Lines & Cuspal Fracture', symptom: 'Sharp pain upon chewing hard foods', risk: 'Moderate' },
      { title: 'Apical Periodontitis', symptom: 'Spontaneous throbbing ache, tender to tap', risk: 'Urgent' }
    ],
    treatments: [
      { name: 'Ceramic Inlay / Onlay', type: 'Conservative Restorative', recommendation: 'Strengthens cusps without removing unnecessary enamel.' },
      { name: 'Same-Day CEREC Crown', type: 'Full Coverage', recommendation: 'Envelops fractured molar to prevent complete split.' },
      { name: 'Gentle Root Canal Therapy', type: 'Endodontic', recommendation: 'Disinfects internal nerve canals and saves natural root.' }
    ]
  },
  incisor: {
    id: 'incisor',
    number: '#8 & #9',
    name: 'Central Maxillary Incisor',
    type: 'incisor',
    function: 'Aesthetic smile center, shearing food, and phonetic pronunciation (f, v, s, th).',
    anatomy: {
      enamel: 'Highly visible crystalline enamel with natural incisal mamelons and optical translucency.',
      dentin: 'Subtle warm-toned inner structure giving natural depth and vitality to the smile.',
      pulp: 'Single straight broad canal vulnerable to direct facial impact or sports trauma.',
      root: 'Conical single root providing aesthetic gingival papilla support.'
    },
    commonIssues: [
      { title: 'Incisal Edge Chipping', symptom: 'Rough edge felt by tongue, uneven smile arc', risk: 'Cosmetic' },
      { title: 'Intrinsic Discoloration', symptom: 'Grey or yellowish tint unaffected by brushing', risk: 'Cosmetic' },
      { title: 'Traumatic Luxation', symptom: 'Mobility after sports injury or fall', risk: 'Urgent' }
    ],
    treatments: [
      { name: 'Porcelain Micro-Veneer', type: 'Aesthetic Gold Standard', recommendation: 'Corrects shape, color, and symmetry with 0.3mm prep.' },
      { name: 'Biomimetic Composite Bonding', type: 'Single-Visit Repair', recommendation: 'Seamlessly sculpts broken corner in 45 minutes.' },
      { name: 'Laser In-Studio Whitening', type: 'Non-Invasive', recommendation: 'Brightens baseline enamel 8-10 VITA shades.' }
    ]
  },
  canine: {
    id: 'canine',
    number: '#6 & #11',
    name: 'Maxillary Cuspid (Canine)',
    type: 'canine',
    function: 'Cornerstone of the dental arch, guiding jaw movement and tearing food.',
    anatomy: {
      enamel: 'Prominent single pointed cusp with thick buccal enamel ridge.',
      dentin: 'Dense supportive volume absorbing lateral disclusion forces.',
      pulp: 'Longest nerve canal in human dentition.',
      root: 'Longest root in the mouth (up to 30mm), forming the canine facial eminence.'
    },
    commonIssues: [
      { title: 'Cervical Abfraction / Notching', symptom: 'Sensitive tooth neck near gumline from clenching', risk: 'Moderate' },
      { title: 'Gingival Recession', symptom: 'Exposed yellow root surface, cold water sting', risk: 'Moderate' },
      { title: 'Canine Guidance Enamel Wear', symptom: 'Flattened tip reducing bite protection', risk: 'Functional' }
    ],
    treatments: [
      { name: 'Custom Nightguard (Bruxism)', type: 'Preventive Orthotic', recommendation: 'Prevents grinding micro-fractures during sleep.' },
      { name: 'Biocompatible Gum Graft / Contouring', type: 'Periodontal', recommendation: 'Covers exposed root to eradicate cold sensitivity.' }
    ]
  },
  premolar: {
    id: 'premolar',
    number: '#4 & #5',
    name: 'Maxillary Bicuspid (Premolar)',
    type: 'premolar',
    function: 'Transition zone between tearing canines and crushing molars.',
    anatomy: {
      enamel: 'Dual-cusped occlusal table with central developmental groove.',
      dentin: 'Moderate shock-absorbing dentin core.',
      pulp: 'Frequently features two delicate bifurcated root canals.',
      root: 'Double or grooved single root seated near maxillary sinus floor.'
    },
    commonIssues: [
      { title: 'Interproximal Floss-Line Cavity', symptom: 'Food trap between teeth, cold zing', risk: 'Moderate' },
      { title: 'Lingual Cusp Fracture', symptom: 'Pain when releasing bite on hard bread', risk: 'Moderate' }
    ],
    treatments: [
      { name: 'Composite Resin Micro-Filling', type: 'Tooth-Colored Restorative', recommendation: 'Bonds directly to remaining tooth structure.' },
      { name: 'Ceramic Partial Onlay', type: 'Biomimetic', recommendation: 'Reinforces weakened cusp while saving 70% natural tooth.' }
    ]
  }
};

interface DentalExplorer3DProps {
  onSelectTreatment?: (treatmentName: string) => void;
  onBookConsultation?: () => void;
}

export const DentalExplorer3D: React.FC<DentalExplorer3DProps> = ({
  onBookConsultation,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedToothKey, setSelectedToothKey] = useState<string>('molar');
  const [activeLayer, setActiveLayer] = useState<'all' | 'enamel' | 'dentin' | 'pulp'>('all');
  const [activeTab, setActiveTab] = useState<'anatomy' | 'issues' | 'treatments'>('anatomy');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const toothMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const selectedTooth = TOOTH_DATABASE[selectedToothKey] || TOOTH_DATABASE.molar;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 7.5);
    camera.lookAt(0, -0.2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Studio lighting setup
    const ambLight = new THREE.AmbientLight(0xe8f5f2, 1.4);
    scene.add(ambLight);

    const mainLight = new THREE.DirectionalLight(0xfff8ee, 2.8);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x7ed0be, 1.8);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Main 3D Dental Arch Group
    const archGroup = new THREE.Group();
    scene.add(archGroup);

    // 1. Gum Base (U-shaped gingival contour)
    const gumCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.4, 0, 1.8),
      new THREE.Vector3(-2.1, 0, 0.2),
      new THREE.Vector3(-1.4, 0, -1.2),
      new THREE.Vector3(0, 0, -1.8),
      new THREE.Vector3(1.4, 0, -1.2),
      new THREE.Vector3(2.1, 0, 0.2),
      new THREE.Vector3(2.4, 0, 1.8),
    ]);
    const gumGeo = new THREE.TubeGeometry(gumCurve, 40, 0.65, 20, false);
    const gumMat = new THREE.MeshStandardMaterial({
      color: 0xdf848a,
      roughness: 0.35,
      metalness: 0.05,
    });
    const gumMesh = new THREE.Mesh(gumGeo, gumMat);
    gumMesh.position.y = -0.35;
    gumMesh.scale.set(1, 0.65, 1);
    archGroup.add(gumMesh);

    // 2. Interactive Teeth along Dental Arch
    const toothTypesConfig = [
      { key: 'molar', label: 'Molar', pos: new THREE.Vector3(-2.2, 0.2, 1.6), scale: 0.48, rotY: 0.2 },
      { key: 'premolar', label: 'Premolar', pos: new THREE.Vector3(-1.7, 0.2, 0.4), scale: 0.4, rotY: 0.4 },
      { key: 'canine', label: 'Canine', pos: new THREE.Vector3(-1.1, 0.2, -0.8), scale: 0.38, rotY: 0.7 },
      { key: 'incisor', label: 'Central Incisor', pos: new THREE.Vector3(-0.35, 0.2, -1.65), scale: 0.36, rotY: 0.0 },
      { key: 'incisor', label: 'Central Incisor', pos: new THREE.Vector3(0.35, 0.2, -1.65), scale: 0.36, rotY: 0.0 },
      { key: 'canine', label: 'Canine', pos: new THREE.Vector3(1.1, 0.2, -0.8), scale: 0.38, rotY: -0.7 },
      { key: 'premolar', label: 'Premolar', pos: new THREE.Vector3(1.7, 0.2, 0.4), scale: 0.4, rotY: -0.4 },
      { key: 'molar', label: 'Molar', pos: new THREE.Vector3(2.2, 0.2, 1.6), scale: 0.48, rotY: -0.2 },
    ];

    const toothGeo = new THREE.CylinderGeometry(0.7, 0.55, 1.2, 16);
    const tPos = toothGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      if (tPos.getY(i) > 0.2) {
        tPos.setY(i, tPos.getY(i) + Math.sin(tPos.getX(i) * 4) * 0.15);
      }
    }
    toothGeo.computeVertexNormals();

    toothTypesConfig.forEach((cfg, idx) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xfdfdfd,
        roughness: 0.12,
        clearcoat: 1.0,
        transmission: 0.3,
        ior: 1.52,
      });
      const mesh = new THREE.Mesh(toothGeo, mat);
      mesh.position.copy(cfg.pos);
      mesh.rotation.y = cfg.rotY;
      mesh.scale.set(cfg.scale, cfg.scale * 1.1, cfg.scale);
      mesh.name = `tooth-${cfg.key}-${idx}`;
      mesh.userData = { key: cfg.key };
      mesh.castShadow = true;
      archGroup.add(mesh);

      toothMeshesRef.current.set(`${cfg.key}-${idx}`, mesh);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(archGroup.children);

      for (const hit of intersects) {
        if (hit.object.userData && hit.object.userData.key) {
          setSelectedToothKey(hit.object.userData.key);
          break;
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Orbit Drag Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0.3;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(0.05, Math.min(1.2, targetRotX + dy * 0.006));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(0.05, Math.min(1.2, targetRotX + dy * 0.006));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotY += 0.003;
      }

      archGroup.rotation.y += (targetRotY - archGroup.rotation.y) * 0.06;
      archGroup.rotation.x += (targetRotX - archGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nw > 0) {
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        }
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update selected tooth highlight
  useEffect(() => {
    toothMeshesRef.current.forEach((mesh) => {
      const isSelected = mesh.userData.key === selectedToothKey;
      const mat = mesh.material as THREE.MeshPhysicalMaterial;

      if (isSelected) {
        mat.color.setHex(0x3e8e7e); // Sage-teal highlight
        mat.emissive.setHex(0x1a453d);
        mat.emissiveIntensity = 0.5;
      } else {
        mat.color.setHex(0xfdfdfd);
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
      }
    });
  }, [selectedToothKey]);

  // Handle Layer toggles (Enamel, Dentin, Pulp)
  useEffect(() => {
    toothMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      if (activeLayer === 'enamel') {
        mat.opacity = 0.45;
        mat.transparent = true;
        mat.color.setHex(0xade2d5);
      } else if (activeLayer === 'dentin') {
        mat.opacity = 0.85;
        mat.transparent = false;
        mat.color.setHex(0xfef08a);
      } else if (activeLayer === 'pulp') {
        mat.opacity = 0.9;
        mat.transparent = false;
        mat.color.setHex(0xf43f5e);
      } else {
        mat.opacity = 1.0;
        mat.transparent = false;
        mat.color.setHex(mesh.userData.key === selectedToothKey ? 0x3e8e7e : 0xfdfdfd);
      }
    });
  }, [activeLayer, selectedToothKey]);

  return (
    <div className="w-full bg-[#F5F1EA] rounded-3xl border border-[#1B2B27]/08 shadow-spa overflow-hidden p-4 sm:p-6 md:p-8 text-[#1B2B27] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4EFE8]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F9EBE7]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Medical Tag */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1B2B27]/08 pb-5 sm:pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Interactive 3D Feature
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Explore Your Dental Health in 3D
          </h3>
          <p className="text-[#536963] text-xs sm:text-sm mt-1">
            Rotate the full dental arch, tap individual teeth, and inspect anatomical layers and clinical treatments.
          </p>
        </div>

        {/* Quick Tooth Selector Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-[#1B2B27]/08 shadow-sm overflow-x-auto no-scrollbar">
          {(['molar', 'premolar', 'canine', 'incisor'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedToothKey(key)}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium capitalize shrink-0 transition-all ${
                selectedToothKey === key
                  ? 'btn-tactile-primary text-white shadow-tactile-teal'
                  : 'text-[#536963] hover:text-[#1B2B27] hover:bg-[#F5F1EA]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: 3D Arch Canvas + Diagnostic Intelligence Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: 3D Canvas Area */}
        <div className="lg:col-span-7 flex flex-col justify-between glass-spa rounded-3xl border border-[#1B2B27]/08 p-4 relative min-h-[380px] sm:min-h-[440px] shadow-spa">
          {/* Top Canvas Badges: Layer Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10 mb-2">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-[#1B2B27]/08 text-[11px] sm:text-xs shadow-sm">
              <span className="text-[#536963] px-2 py-0.5 flex items-center gap-1 font-medium">
                <Layers className="w-3.5 h-3.5 text-[#3E8E7E]" /> Layers:
              </span>
              {(['all', 'enamel', 'dentin', 'pulp'] as const).map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs capitalize transition-colors ${
                    activeLayer === layer
                      ? 'btn-tactile-primary text-white font-semibold'
                      : 'text-[#536963] hover:text-[#1B2B27]'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>

            <span className="text-[10px] sm:text-xs text-[#536963] bg-white/90 px-2.5 py-1 rounded-lg border border-[#1B2B27]/08 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#3E8E7E] animate-pulse" /> Tap tooth to isolate
            </span>
          </div>

          {/* 3D WebGL Canvas Mounting Point */}
          <div ref={mountRef} className="w-full h-64 sm:h-80 md:h-96 relative cursor-grab active:cursor-grabbing touch-none" />

          {/* Bottom Interactive Hint & Selected Tooth pill */}
          <div className="flex items-center justify-between z-10 pt-2 border-t border-[#1B2B27]/08 text-xs text-[#536963]">
            <span>✦ Click & drag to inspect 360°</span>
            <span className="font-mono text-[#3E8E7E] font-semibold bg-white px-3 py-0.5 rounded-full border border-[#3E8E7E]/30 shadow-sm">
              Selected: {selectedTooth.name} ({selectedTooth.number})
            </span>
          </div>
        </div>

        {/* Right: Clinical Anatomy & Diagnostic Detail Card */}
        <div className="lg:col-span-5 flex flex-col justify-between glass-spa rounded-3xl border border-[#1B2B27]/08 p-5 sm:p-7 shadow-spa">
          <div>
            {/* Tooth Badge and Title */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-mono text-[#3E8E7E] tracking-wider font-semibold">
                  Dental Anatomy • {selectedTooth.number}
                </span>
                <h4 className="text-xl font-serif font-normal text-[#1B2B27] mt-0.5">
                  {selectedTooth.name}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#D4EFE8] text-xs text-[#1B2B27] border border-[#3E8E7E]/20 font-medium capitalize">
                {selectedTooth.type}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#536963] mb-5 bg-white p-3.5 rounded-xl border border-[#1B2B27]/06 leading-relaxed shadow-sm">
              {selectedTooth.function}
            </p>

            {/* Diagnostic Tabs */}
            <div className="flex items-center border-b border-[#1B2B27]/08 mb-4 text-xs font-medium">
              <button
                onClick={() => setActiveTab('anatomy')}
                className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'anatomy'
                    ? 'border-[#3E8E7E] text-[#3E8E7E] font-semibold'
                    : 'border-transparent text-[#536963] hover:text-[#1B2B27]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Tissue Anatomy
              </button>
              <button
                onClick={() => setActiveTab('issues')}
                className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'issues'
                    ? 'border-amber-600 text-amber-700 font-semibold'
                    : 'border-transparent text-[#536963] hover:text-[#1B2B27]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Pathologies
              </button>
              <button
                onClick={() => setActiveTab('treatments')}
                className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'treatments'
                    ? 'border-[#3E8E7E] text-[#3E8E7E] font-semibold'
                    : 'border-transparent text-[#536963] hover:text-[#1B2B27]'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Clinical Solutions
              </button>
            </div>

            {/* Tab 1: Tissue Anatomy */}
            {activeTab === 'anatomy' && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#1B2B27]/06 shadow-sm">
                  <div className="flex items-center gap-1.5 font-semibold text-[#3E8E7E] mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#3E8E7E]" />
                    Enamel Layer (Outer)
                  </div>
                  <p className="text-[#536963] leading-relaxed">{selectedTooth.anatomy.enamel}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#1B2B27]/06 shadow-sm">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-700 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Dentin Layer (Middle)
                  </div>
                  <p className="text-[#536963] leading-relaxed">{selectedTooth.anatomy.dentin}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#1B2B27]/06 shadow-sm">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-600 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Pulp & Nerve Chamber (Inner)
                  </div>
                  <p className="text-[#536963] leading-relaxed">{selectedTooth.anatomy.pulp}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#1B2B27]/06 shadow-sm">
                  <div className="flex items-center gap-1.5 font-semibold text-[#1B2B27] mb-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Root & Alveolar Bone
                  </div>
                  <p className="text-[#536963] leading-relaxed">{selectedTooth.anatomy.root}</p>
                </div>
              </div>
            )}

            {/* Tab 2: Common Pathologies */}
            {activeTab === 'issues' && (
              <div className="space-y-2.5 text-xs">
                {selectedTooth.commonIssues.map((issue, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-amber-500/20 shadow-sm">
                    <div className="flex items-center justify-between font-semibold text-amber-800 mb-1">
                      <span>{issue.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        {issue.risk}
                      </span>
                    </div>
                    <p className="text-[#536963] mb-1">Symptoms: {issue.symptom}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Clinical Solutions */}
            {activeTab === 'treatments' && (
              <div className="space-y-2.5 text-xs">
                {selectedTooth.treatments.map((tr, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-[#3E8E7E]/20 shadow-sm">
                    <div className="flex items-center justify-between font-semibold text-[#3E8E7E] mb-1">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3E8E7E]" />
                        {tr.name}
                      </span>
                      <span className="text-[10px] text-[#536963]">{tr.type}</span>
                    </div>
                    <p className="text-[#536963] leading-relaxed">{tr.recommendation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="mt-6 pt-4 border-t border-[#1B2B27]/08 space-y-3">
            <button
              onClick={onBookConsultation}
              className="btn-tactile-primary w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 group"
            >
              <Stethoscope className="w-4 h-4 text-white" />
              <span>Reserve Consultation for {selectedTooth.name}</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="text-[11px] text-[#536963] text-center leading-relaxed">
              ✦ <span className="font-semibold text-[#1B2B27]">Educational Disclaimer:</span> Interactive biological visualization designed for clinical orientation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
