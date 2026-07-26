"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X, Rotate3d, Zap, Gauge, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

export interface FleetVehicleData {
  id: string;
  name: string;
  category: string;
  power: string;
  weight: string;
  digDepth: string;
  bucketCap: string;
  speed: string;
  desc: string;
  features: string[];
  applications: string[];
  colorHex: string;
}

interface FleetVehicleModalProps {
  vehicle: FleetVehicleData | null;
  onClose: () => void;
}

export default function FleetVehicleModal({ vehicle, onClose }: FleetVehicleModalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  useEffect(() => {
    angleRef.current = angle;
  }, [angle]);

  useEffect(() => {
    // Reset angle to 0 every time modal is opened or vehicle changes
    setAngle(0);
    angleRef.current = 0;
    startAngleRef.current = 0;

    if (!vehicle) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 380;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f17);
    scene.fog = new THREE.FogExp2(0x0b0f17, 0.008);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.8);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaee, 3.5);
    sunLight.position.set(12, 20, 12);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x0088ff, 1.8);
    rimLight.position.set(-12, 10, -12);
    scene.add(rimLight);

    // 3. Shared PBR Materials
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xf5b400, roughness: 0.25, metalness: 0.4 });
    const yellowDarkMat = new THREE.MeshStandardMaterial({ color: 0xd99b00, roughness: 0.35 });
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.4, metalness: 0.8 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x3a3f47, roughness: 0.3, metalness: 0.8 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x1e3a8a, transparent: true, opacity: 0.7, roughness: 0.1 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111215, roughness: 0.9 });
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x1c1e24, roughness: 0.8, metalness: 0.5 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.05 });

    // 4. Build DISTINCT 3D Vehicle Models Based on Vehicle ID
    const vehicleGroup = new THREE.Group();

    switch (vehicle.id) {
      case "jcb-mini-19c":
      case "jcb-compact-55z":
      case "jcb-crawler-nxt215": {
        // --- CRAWLER EXCAVATOR MODELS (Continuous Rubber/Steel Tracks & Rotating Cab House) ---
        const isBig = vehicle.id === "jcb-crawler-nxt215";
        const isMini = vehicle.id === "jcb-mini-19c";

        // Left & Right Track Belts
        const trackW = isBig ? 0.45 : isMini ? 0.25 : 0.32;
        const trackH = isBig ? 0.85 : isMini ? 0.45 : 0.6;
        const trackL = isBig ? 3.8 : isMini ? 2.2 : 2.8;
        const trackSep = isBig ? 1.2 : isMini ? 0.7 : 0.9;

        [-trackSep, trackSep].forEach((tx) => {
          const trackBelt = new THREE.Mesh(new THREE.BoxGeometry(trackW, trackH, trackL), trackMat);
          trackBelt.position.set(tx, trackH / 2, 0);
          trackBelt.castShadow = true;

          // Track Rollers
          for (let rz = -trackL * 0.4; rz <= trackL * 0.4; rz += 0.5) {
            const roller = new THREE.Mesh(new THREE.CylinderGeometry(trackH * 0.4, trackH * 0.4, trackW + 0.02, 16), steelMat);
            roller.rotation.z = Math.PI / 2;
            roller.position.set(tx, trackH / 2, rz);
            vehicleGroup.add(roller);
          }
          vehicleGroup.add(trackBelt);
        });

        // Track Cross Chassis
        const trackChassis = new THREE.Mesh(new THREE.BoxGeometry(trackSep * 2, trackH * 0.6, trackL * 0.6), chassisMat);
        trackChassis.position.y = trackH * 0.6;
        vehicleGroup.add(trackChassis);

        // 360 Rotating House Cab
        const houseGroup = new THREE.Group();
        const houseW = isBig ? 2.2 : isMini ? 1.3 : 1.7;
        const houseH = isBig ? 1.4 : isMini ? 0.9 : 1.1;
        const houseL = isBig ? 2.6 : isMini ? 1.6 : 2.0;

        const cabBody = new THREE.Mesh(new THREE.BoxGeometry(houseW, houseH, houseL), yellowMat);
        cabBody.position.set(0, trackH + houseH / 2, -0.2);
        cabBody.castShadow = true;
        houseGroup.add(cabBody);

        const cabWin = new THREE.Mesh(new THREE.BoxGeometry(houseW * 0.5, houseH * 0.7, houseL * 0.5), glassMat);
        cabWin.position.set(-houseW * 0.22, trackH + houseH * 0.6, 0.2);
        houseGroup.add(cabWin);

        // Excavator Boom Arm & Digging Bucket
        const boomH = isBig ? 3.2 : isMini ? 1.8 : 2.4;
        const boomArm = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, boomH), yellowMat);
        boomArm.rotation.x = -0.6;
        boomArm.position.set(houseW * 0.2, trackH + houseH * 0.8, boomH * 0.35);
        boomArm.castShadow = true;
        houseGroup.add(boomArm);

        const dipperArm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, boomH * 0.7), yellowDarkMat);
        dipperArm.rotation.x = 0.8;
        dipperArm.position.set(houseW * 0.2, trackH + houseH * 1.2, boomH * 0.75);
        dipperArm.castShadow = true;
        houseGroup.add(dipperArm);

        const bucketGeo = new THREE.BoxGeometry(isBig ? 1.1 : isMini ? 0.5 : 0.75, 0.6, 0.6);
        const excBucket = new THREE.Mesh(bucketGeo, steelMat);
        excBucket.rotation.x = 0.3;
        excBucket.position.set(houseW * 0.2, trackH + 0.4, boomH * 0.95);
        excBucket.castShadow = true;
        houseGroup.add(excBucket);

        vehicleGroup.add(houseGroup);
        break;
      }

      case "jcb-wheel-loader": {
        // --- ARTICULATED WHEEL LOADER (Massive Front Loader Bucket, Articulated Pivot, No Backhoe) ---
        const wChassis = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 3.8), chassisMat);
        wChassis.position.y = 0.8;
        vehicleGroup.add(wChassis);

        // Cab
        const wCab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 1.6), yellowMat);
        wCab.position.set(0, 1.8, -0.4);
        vehicleGroup.add(wCab);

        const wGlass = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.0, 1.4), glassMat);
        wGlass.position.set(0, 2.0, -0.4);
        vehicleGroup.add(wGlass);

        // Massive Heavy Front Loader Bucket
        const bigBucket = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.1, 1.0), steelMat);
        bigBucket.position.set(0, 0.65, 2.4);
        bigBucket.castShadow = true;
        vehicleGroup.add(bigBucket);

        // Dual Lift Arms
        [-0.95, 0.95].forEach((lx) => {
          const arm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 2.6), yellowMat);
          arm.rotation.x = -0.25;
          arm.position.set(lx, 1.3, 1.2);
          arm.castShadow = true;
          vehicleGroup.add(arm);
        });

        // 4 Massive Loader Tires
        [
          [-1.25, 0.8, 1.3],
          [1.25, 0.8, 1.3],
          [-1.25, 0.8, -1.2],
          [1.25, 0.8, -1.2],
        ].forEach(([wx, wy, wz]) => {
          const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.55, 24), tireMat);
          tire.rotation.z = Math.PI / 2;
          tire.position.set(wx, wy, wz);
          tire.castShadow = true;
          vehicleGroup.add(tire);
        });
        break;
      }

      case "jcb-forklift-930": {
        // --- ROUGH TERRAIN FORKLIFT (Vertical Lifting Mast & Dual Steel Forks) ---
        const fChassis = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 3.2), chassisMat);
        fChassis.position.y = 0.6;
        vehicleGroup.add(fChassis);

        // Engine Hood & Rear Counterweight
        const fHood = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.8), yellowMat);
        fHood.position.set(0, 1.2, -0.6);
        vehicleGroup.add(fHood);

        const counterWeight = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.8, 0.6), steelMat);
        counterWeight.position.set(0, 1.1, -1.6);
        vehicleGroup.add(counterWeight);

        // Overhead Safety Cage
        const cage = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.4, 1.4), chassisMat);
        cage.position.set(0, 2.0, 0.2);
        vehicleGroup.add(cage);

        // Vertical Lifting Mast Columns
        [-0.45, 0.45].forEach((mx) => {
          const mast = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.6, 0.12), steelMat);
          mast.position.set(mx, 1.6, 1.5);
          vehicleGroup.add(mast);
        });

        // Dual Steel Forks
        [-0.3, 0.3].forEach((fx) => {
          const forkHoriz = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 1.2), chromeMat);
          forkHoriz.position.set(fx, 0.4, 2.0);
          const forkVert = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.05), chromeMat);
          forkVert.position.set(fx, 0.8, 1.45);
          vehicleGroup.add(forkHoriz, forkVert);
        });

        // 4 High Clearance 4WD Tires
        [
          [-0.95, 0.55, 1.0],
          [0.95, 0.55, 1.0],
          [-0.95, 0.55, -1.0],
          [0.95, 0.55, -1.0],
        ].forEach(([wx, wy, wz]) => {
          const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 24), tireMat);
          tire.rotation.z = Math.PI / 2;
          tire.position.set(wx, wy, wz);
          tire.castShadow = true;
          vehicleGroup.add(tire);
        });
        break;
      }

      default: {
        // --- BACKHOE LOADER VARIANTS (3DX, 2DX, 4DX, 5CX, 3DX Super) ---
        const is2DX = vehicle.id === "jcb-2dx";
        const is4DX5CX = vehicle.id === "jcb-4dx" || vehicle.id === "jcb-5cx";

        const widthScale = is2DX ? 1.35 : is4DX5CX ? 1.95 : 1.65;
        const lengthScale = is2DX ? 2.6 : is4DX5CX ? 3.8 : 3.2;

        const bChassis = new THREE.Mesh(new THREE.BoxGeometry(widthScale, 0.45, lengthScale), chassisMat);
        bChassis.position.y = 0.45;
        bChassis.castShadow = true;
        vehicleGroup.add(bChassis);

        const bBody = new THREE.Mesh(new THREE.BoxGeometry(widthScale * 0.9, 0.95, lengthScale * 0.55), yellowMat);
        bBody.position.set(0, 1.15, -0.2);
        bBody.castShadow = true;
        vehicleGroup.add(bBody);

        const bHood = new THREE.Mesh(new THREE.BoxGeometry(widthScale * 0.85, 0.65, lengthScale * 0.35), yellowDarkMat);
        bHood.position.set(0, 0.95, lengthScale * 0.3);
        bHood.castShadow = true;
        vehicleGroup.add(bHood);

        const bCabGlass = new THREE.Mesh(new THREE.BoxGeometry(widthScale * 0.8, 0.75, lengthScale * 0.3), glassMat);
        bCabGlass.position.set(0, 1.75, -0.2);
        vehicleGroup.add(bCabGlass);

        // Front Loader Bucket
        const bBucket = new THREE.Mesh(new THREE.BoxGeometry(widthScale * 1.05, 0.65, 0.6), steelMat);
        bBucket.position.set(0, 0.55, lengthScale * 0.55);
        bBucket.castShadow = true;
        vehicleGroup.add(bBucket);

        // Rear Excavator Arm & Bucket
        const rearBoom = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 1.6), yellowMat);
        rearBoom.rotation.x = -0.5;
        rearBoom.position.set(0, 1.4, -lengthScale * 0.55);
        vehicleGroup.add(rearBoom);

        const rearDipper = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 1.2), yellowDarkMat);
        rearDipper.rotation.x = 0.6;
        rearDipper.position.set(0, 1.9, -lengthScale * 0.85);
        vehicleGroup.add(rearDipper);

        const rearBucket = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.45), steelMat);
        rearBucket.position.set(0, 1.0, -lengthScale * 1.1);
        vehicleGroup.add(rearBucket);

        // Wheels
        const frontRadius = is4DX5CX ? 0.65 : is2DX ? 0.35 : 0.42;
        const rearRadius = is4DX5CX ? 0.75 : is2DX ? 0.52 : 0.68;

        [
          [-widthScale * 0.58, frontRadius, lengthScale * 0.35],
          [widthScale * 0.58, frontRadius, lengthScale * 0.35],
          [-widthScale * 0.62, rearRadius, -lengthScale * 0.25],
          [widthScale * 0.62, rearRadius, -lengthScale * 0.25],
        ].forEach(([wx, wy, wz], idx) => {
          const r = idx >= 2 ? rearRadius : frontRadius;
          const tire = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.36, 24), tireMat);
          tire.rotation.z = Math.PI / 2;
          tire.position.set(wx, wy, wz);
          tire.castShadow = true;
          vehicleGroup.add(tire);
        });
        break;
      }
    }

    // Ground Disk
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x163820, roughness: 0.95 });
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 4.8, 0.1, 32), groundMat);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    scene.add(vehicleGroup);

    // 5. Pointer Drag Interaction for 360 Rotation
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startAngleRef.current = angleRef.current;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      let newAngle = (startAngleRef.current + deltaX * 0.65) % 360;
      if (newAngle < 0) newAngle += 360;
      angleRef.current = Math.round(newAngle);
      setAngle(Math.round(newAngle));
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 6. Render Loop
    let animId: number;
    const render = () => {
      const rad = (angleRef.current * Math.PI) / 180;
      vehicleGroup.rotation.y = rad;

      // Gentle float motion
      vehicleGroup.position.y = Math.sin(performance.now() * 0.002) * 0.025;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [vehicle]);

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-5xl bg-dark-800 border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] text-white grid lg:grid-cols-12 max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-dark transition-colors flex items-center justify-center text-white/80"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: 3D Model Interactive Viewport */}
        <div className="lg:col-span-7 relative bg-gradient-to-b from-dark-900 via-dark to-dark-950 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 min-h-[380px]">
          {/* Header Tag */}
          <div className="flex items-center justify-between mb-2 z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-wider">
                {vehicle.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs font-semibold">
                3D Custom Model
              </span>
            </div>
          </div>

          {/* 3D WebGL Canvas */}
          <div
            ref={mountRef}
            className="w-full h-[320px] sm:h-[360px] cursor-grab active:cursor-grabbing relative rounded-2xl overflow-hidden"
          >
            {/* Drag Hint */}
            <div className="absolute bottom-3 left-3 z-10 px-3 py-1.5 glass-dark rounded-full text-[11px] text-white/70 flex items-center gap-2 border border-white/10 pointer-events-none">
              <Rotate3d className="w-3.5 h-3.5 text-primary animate-spin" />
              <span>Click & Drag to rotate 360°</span>
            </div>
          </div>

          {/* 360° Angle Slider & Controls */}
          <div className="mt-4 p-4 glass-dark rounded-2xl border border-white/15 flex flex-col gap-2 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white/90">
                <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                  <Rotate3d className="w-4 h-4" />
                </div>
                <span>360° View Angle</span>
              </div>
              <span className="text-sm font-mono font-black text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/30">
                {angle}°
              </span>
            </div>

            {/* Input Slider */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] text-white/50 font-mono">0°</span>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
              />
              <span className="text-[10px] text-white/50 font-mono">360°</span>
            </div>
          </div>
        </div>

        {/* Right Column: Vehicle Specs & Details */}
        <div className="lg:col-span-5 p-6 lg:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-heading font-black text-white mb-2">
              {vehicle.name}
            </h2>
            <p className="text-xs lg:text-sm text-white/70 leading-relaxed font-medium mb-6">
              {vehicle.desc}
            </p>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-bold uppercase mb-1">
                  <Zap className="w-3.5 h-3.5 text-primary" /> Engine Power
                </div>
                <div className="text-base lg:text-lg font-heading font-bold text-white">
                  {vehicle.power}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-bold uppercase mb-1">
                  <Gauge className="w-3.5 h-3.5 text-primary" /> Operating Weight
                </div>
                <div className="text-base lg:text-lg font-heading font-bold text-white">
                  {vehicle.weight}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-bold uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Max Dig Depth
                </div>
                <div className="text-base lg:text-lg font-heading font-bold text-white">
                  {vehicle.digDepth}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/50 text-[11px] font-bold uppercase mb-1">
                  <Cpu className="w-3.5 h-3.5 text-primary" /> Bucket Capacity
                </div>
                <div className="text-base lg:text-lg font-heading font-bold text-white">
                  {vehicle.bucketCap}
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Key Performance Highlights
              </h4>
              <div className="space-y-2">
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Applications */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                Primary Field Applications
              </h4>
              <div className="flex flex-wrap gap-2">
                {vehicle.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[11px] font-semibold text-white/80"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs text-white/50">
              Integrated with LiveLink Telematics
            </div>
            <button
              onClick={onClose}
              className="btn-primary text-xs py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <span>Explore Telematics Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
