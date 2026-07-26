"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface TruckCanvasProps {
  scrollProgress: number; // 0 to 1
}

// Studio HDRI PMREM Environment Map Generator
function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0e1217);

  const topPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshBasicMaterial({ color: 0xfff3e6, side: THREE.DoubleSide })
  );
  topPanel.rotation.x = Math.PI / 2;
  topPanel.position.set(0, 18, 0);
  envScene.add(topPanel);

  const keyLight = new THREE.DirectionalLight(0xfffaee, 4.0);
  keyLight.position.set(15, 25, 15);
  envScene.add(keyLight);

  const rimPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.MeshBasicMaterial({ color: 0x0088ff, side: THREE.DoubleSide })
  );
  rimPanel.rotation.y = Math.PI / 2;
  rimPanel.position.set(-20, 12, -10);
  envScene.add(rimPanel);

  const renderTarget = pmremGenerator.fromScene(envScene);
  pmremGenerator.dispose();
  return renderTarget.texture;
}

// Weathered JCB Paint Texture Generator (Rust Patina, Scratches & Dirt)
function createWeatheredJCBTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Base JCB Yellow Paint
  ctx.fillStyle = "#F5B400";
  ctx.fillRect(0, 0, 1024, 1024);

  // Dirt & Mud Splatters on lower edges
  ctx.fillStyle = "#3D2F24";
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 1024;
    const y = 600 + Math.random() * 424;
    const r = Math.random() * 8 + 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rust Stains & Corrosion Patches
  ctx.fillStyle = "#8B3A0F";
  for (let i = 0; i < 90; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    const rw = Math.random() * 30 + 5;
    const rh = Math.random() * 20 + 4;
    ctx.beginPath();
    ctx.ellipse(rx, ry, rw, rh, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  // Worn Metallic Scratches
  ctx.strokeStyle = "#C0C5CC";
  ctx.lineWidth = 2;
  for (let i = 0; i < 120; i++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 1024;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + (Math.random() - 0.5) * 45, sy + (Math.random() - 0.5) * 45);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

// Scratched Heavy Steel Bucket & Digging Teeth Texture
function createWeatheredSteelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#282C34";
  ctx.fillRect(0, 0, 512, 512);

  // Dirt & Sand Accumulation
  ctx.fillStyle = "#4D3D2F";
  for (let i = 0; i < 300; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 6 + 1, Math.random() * 6 + 1);
  }

  // Severe Metal Digging Scratches
  ctx.strokeStyle = "#E0E5EC";
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60);
    ctx.stroke();
  }

  // Edge Rust
  ctx.fillStyle = "#7A300B";
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 12 + 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Dirty Rubber Tire Bump Map Texture
function createWeatheredTireTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#023020";
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}



// Procedural JCB Brand Logo Decal Generator
function createJCBLogoTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#F5B400";
  ctx.fillRect(0, 0, 512, 256);

  ctx.lineWidth = 22;
  ctx.strokeStyle = "#1A1D20";
  ctx.strokeRect(14, 14, 484, 228);

  ctx.fillStyle = "#1A1D20";
  ctx.font = "italic 900 135px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("JCB", 256, 128);

  return new THREE.CanvasTexture(canvas);
}

// Procedural 3DX Badge Generator
function create3DXBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#1A1D20";
  ctx.fillRect(0, 0, 512, 128);

  ctx.fillStyle = "#F5B400";
  ctx.font = "bold 65px 'Arial', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("3DX  ecoXcellence", 256, 64);

  return new THREE.CanvasTexture(canvas);
}



// Helper: Bevelled Geometry for Plates & Chassis
function createBevelBox(w: number, h: number, d: number, bevel = 0.025): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hh = h / 2;
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.closePath();

  const extrudeSettings = {
    depth: d,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
  };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  return geo;
}

// Helper: Hydraulic Hoses
function createHydraulicHose(points: THREE.Vector3[], radius = 0.024, hoseMat: THREE.Material): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 24, radius, 8, false);
  const mesh = new THREE.Mesh(geo, hoseMat);
  mesh.castShadow = true;
  return mesh;
}

// 3D Human Operator / Driver inside the cab
function create3DHumanOperator(): THREE.Group {
  const driverGroup = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xe0a98b, roughness: 0.6 });
  const hatMat = new THREE.MeshStandardMaterial({ color: 0xff5500, roughness: 0.3 }); // Orange safety hard hat
  const vestMat = new THREE.MeshStandardMaterial({ color: 0xccff00, roughness: 0.4 }); // High-vis vest
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xe0e5ec, metalness: 0.9, roughness: 0.1 });
  const clothMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.7 });

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), skinMat);
  head.position.set(0, 1.88, -0.38);

  // Sunglasses
  const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0x111111 }));
  glasses.position.set(0, 1.89, -0.27);
  head.add(glasses);

  // Construction Hard Hat
  const hatDome = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), hatMat);
  hatDome.position.set(0, 1.9, -0.38);

  const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16), hatMat);
  hatBrim.position.set(0, 1.9, -0.36);
  hatBrim.rotation.x = 0.1;

  // High-Vis Safety Vest & Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.48, 0.25), vestMat);
  torso.position.set(0, 1.48, -0.4);

  const stripeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.26), stripeMat);
  stripeL.position.set(-0.12, 1.48, -0.4);
  const stripeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.26), stripeMat);
  stripeR.position.set(0.12, 1.48, -0.4);
  const stripeH = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.08, 0.26), stripeMat);
  stripeH.position.set(0, 1.42, -0.4);

  // Arms extending forward to Steering Wheel & Joystick
  [-0.22, 0.22].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.38, 12), clothMat);
    arm.rotation.x = -Math.PI / 3;
    arm.position.set(side, 1.52, -0.22);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), skinMat);
    hand.position.set(side * 0.8, 1.38, -0.06);
    driverGroup.add(arm, hand);
  });

  driverGroup.add(head, hatDome, hatBrim, torso, stripeL, stripeR, stripeH);
  return driverGroup;
}

export default function TruckJourneyCanvas({ scrollProgress }: TruckCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 580;

    // 1. Studio Environment & Dark Atmosphere Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1217);
    scene.fog = new THREE.FogExp2(0x0e1217, 0.004);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.5, 1000);
    camera.position.set(-8.5, 4.0, 13.5);
    camera.lookAt(0, 1.15, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 4. Studio Environment HDRI Reflection Map
    const studioEnvTex = createStudioEnvMap(renderer);
    scene.environment = studioEnvTex;

    // 5. Lighting Setup (Bright Natural Daytime Sunlight)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.8);
    sunLight.position.set(22, 35, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xbbe1fa, 2.0);
    rimLight.position.set(-18, 14, -18);
    scene.add(rimLight);

    // 6. Weathered PBR Textures & Materials
    const jcbWeatheredTex = createWeatheredJCBTexture();
    const steelWeatheredTex = createWeatheredSteelTexture();
    const tireWeatheredTex = createWeatheredTireTexture();
    const jcbLogoTex = createJCBLogoTexture();
    const badge3DXTex = create3DXBadgeTexture();

    // Metallic Weathered & Rusted JCB Paint Material
    const jcbYellowMat = new THREE.MeshPhysicalMaterial({
      map: jcbWeatheredTex,
      metalness: 0.45,
      roughness: 0.32,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      bumpMap: jcbWeatheredTex,
      bumpScale: 0.005,
      envMapIntensity: 1.4,
    });

    const jcbYellowDarkMat = new THREE.MeshPhysicalMaterial({
      map: jcbWeatheredTex,
      metalness: 0.45,
      roughness: 0.38,
      bumpMap: jcbWeatheredTex,
      bumpScale: 0.006,
      envMapIntensity: 1.2,
    });

    // Dark Weathered Structural Chassis Metal
    const chassisBlackMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1f24,
      metalness: 0.7,
      roughness: 0.45,
      bumpMap: jcbWeatheredTex,
      bumpScale: 0.008,
      envMapIntensity: 1.1,
    });

    const hoseRubberMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.15,
      roughness: 0.82,
    });

    // Chrome Hydraulics with slight oil sheen
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.04,
      envMapIntensity: 2.5,
    });

    // Scratched Digging Steel & Teeth Material
    const hardenedSteelMat = new THREE.MeshStandardMaterial({
      map: steelWeatheredTex,
      metalness: 0.82,
      roughness: 0.35,
      bumpMap: steelWeatheredTex,
      bumpScale: 0.012,
      envMapIntensity: 1.5,
    });

    const toothTipMat = new THREE.MeshStandardMaterial({
      color: 0xd0d5dd,
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 2.6,
    });

    // Glass Safety Windows
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111827,
      transparent: true,
      opacity: 0.68,
      transmission: 0.9,
      roughness: 0.05,
      ior: 1.52,
      reflectivity: 0.9,
      envMapIntensity: 2.0,
    });

    // Weathered Rubber Tires with Mud Bump
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x141619,
      roughness: 0.92,
      metalness: 0.1,
      bumpMap: tireWeatheredTex,
      bumpScale: 0.015,
    });

    const rimYellowMat = new THREE.MeshPhysicalMaterial({
      map: jcbWeatheredTex,
      metalness: 0.5,
      roughness: 0.3,
      envMapIntensity: 1.3,
    });

    const amberBeaconMat = new THREE.MeshStandardMaterial({
      color: 0xff8c00,
      emissive: 0xff7700,
      emissiveIntensity: 5.0,
    });



    const logoMat = new THREE.MeshStandardMaterial({ map: jcbLogoTex, roughness: 0.3, envMapIntensity: 1.2 });
    const badge3DXMat = new THREE.MeshStandardMaterial({ map: badge3DXTex, roughness: 0.3 });

    // MASTER WORLD & WHEEL ROTATION ARRAY
    const worldGroup = new THREE.Group();
    const jcbGroup = new THREE.Group();

    // Array storing all wheel groups so renderLoop can rotate them continuously!
    const spinWheels: THREE.Group[] = [];

    // 7. GLTF LOADER & FALLBACK
    let modelLoadedFromGLTF = false;
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      "/models/jcb3dx.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, -0.1, 0);
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        jcbGroup.add(model);
        modelLoadedFromGLTF = true;
      },
      undefined,
      () => {
        buildUltraPBRJCB();
      }
    );

    function buildUltraPBRJCB() {
      if (modelLoadedFromGLTF) return;

      // --- A. CHASSIS & ENGINE BONNET ---
      const chassisGeo = createBevelBox(1.65, 0.65, 4.3, 0.03);
      const chassis = new THREE.Mesh(chassisGeo, chassisBlackMat);
      chassis.position.set(0, 0.82, 0);
      chassis.castShadow = true;
      jcbGroup.add(chassis);

      // Sloped Bonnet with Rust Patina
      const hoodGeo = createBevelBox(1.42, 0.92, 1.85, 0.04);
      const hood = new THREE.Mesh(hoodGeo, jcbYellowMat);
      hood.position.set(0, 1.38, 1.1);
      hood.castShadow = true;
      jcbGroup.add(hood);

      const noseGeo = createBevelBox(1.4, 0.42, 0.62, 0.03);
      const nose = new THREE.Mesh(noseGeo, jcbYellowDarkMat);
      nose.rotation.x = 0.22;
      nose.position.set(0, 1.18, 1.96);
      nose.castShadow = true;
      jcbGroup.add(nose);

      // Radiator Grille
      const grille = new THREE.Mesh(createBevelBox(1.22, 0.68, 0.12, 0.02), chassisBlackMat);
      grille.position.set(0, 1.18, 2.22);
      jcbGroup.add(grille);

      for (let gy = -0.22; gy <= 0.22; gy += 0.09) {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.03, 0.14), hardenedSteelMat);
        slat.position.set(0, 1.18 + gy, 2.24);
        jcbGroup.add(slat);
      }

      // Front JCB Badge
      const frontBadge = new THREE.Mesh(createBevelBox(0.52, 0.26, 0.05, 0.01), logoMat);
      frontBadge.position.set(0, 1.38, 2.23);
      jcbGroup.add(frontBadge);

      const sideBadgeL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 1.1), badge3DXMat);
      sideBadgeL.position.set(-0.72, 1.42, 1.1);
      const sideBadgeR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 1.1), badge3DXMat);
      sideBadgeR.position.set(0.72, 1.42, 1.1);
      jcbGroup.add(sideBadgeL, sideBadgeR);

      // Exhaust Pipe & Heat Guard
      const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.3, 20), chromeMat);
      exhaust.position.set(0.52, 2.25, 1.22);
      exhaust.castShadow = true;

      const heatGuard = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.8, 16), hardenedSteelMat);
      heatGuard.position.set(0.52, 2.1, 1.22);

      const exhaustCap = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.065, 0.16, 16), chromeMat);
      exhaustCap.position.set(0.52, 2.9, 1.22);
      jcbGroup.add(exhaust, heatGuard, exhaustCap);

      const airCleaner = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.75, 20), chassisBlackMat);
      airCleaner.position.set(-0.52, 2.05, 1.42);
      jcbGroup.add(airCleaner);

      // --- B. OPERATOR CABIN & 3D HUMAN OPERATOR ---
      const cabFloor = new THREE.Mesh(createBevelBox(1.52, 0.22, 1.62, 0.03), chassisBlackMat);
      cabFloor.position.set(0, 1.12, -0.4);
      jcbGroup.add(cabFloor);

      const cabGlass = new THREE.Mesh(new THREE.BoxGeometry(1.44, 1.62, 1.54), glassMat);
      cabGlass.position.set(0, 2.02, -0.4);
      jcbGroup.add(cabGlass);

      // Add Real 3D Human Operator Driving the Machine!
      const humanDriver = create3DHumanOperator();
      jcbGroup.add(humanDriver);

      // Cab Pillars
      const pillarGeo = createBevelBox(0.085, 1.62, 0.085, 0.01);
      [
        [-0.72, 2.02, 0.37],
        [0.72, 2.02, 0.37],
        [-0.72, 2.02, -1.17],
        [0.72, 2.02, -1.17],
      ].forEach(([px, py, pz]) => {
        const pillar = new THREE.Mesh(pillarGeo, chassisBlackMat);
        pillar.position.set(px, py, pz);
        jcbGroup.add(pillar);
      });

      // Wiper
      const wiperArm = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.7, 0.02), chassisBlackMat);
      wiperArm.rotation.z = -0.4;
      wiperArm.position.set(0.15, 2.1, 0.39);
      jcbGroup.add(wiperArm);

      // Roof
      const roofGeo = createBevelBox(1.64, 0.18, 1.78, 0.03);
      const roof = new THREE.Mesh(roofGeo, jcbYellowMat);
      roof.position.set(0, 2.9, -0.4);
      roof.castShadow = true;
      jcbGroup.add(roof);

      // Beacon
      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, 0.24, 20), amberBeaconMat);
      beacon.position.set(-0.56, 3.08, -0.3);
      jcbGroup.add(beacon);



      // Side Mirrors
      [-1, 1].forEach((side) => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.04, 0.04), chassisBlackMat);
        arm.position.set(side * 0.92, 2.32, 0.2);
        const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.18), chromeMat);
        mirror.position.set(side * 1.08, 2.32, 0.2);
        jcbGroup.add(arm, mirror);
      });

      // Seat & Steering Wheel
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.52), chassisBlackMat);
      seat.position.set(0, 1.48, -0.4);
      const wheelRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 10, 24), chassisBlackMat);
      wheelRing.rotation.x = Math.PI / 3;
      wheelRing.position.set(0, 1.72, 0.1);
      jcbGroup.add(seat, wheelRing);

      // --- C. FRONT LOADER ASSEMBLY ---
      const loaderGroup = new THREE.Group();

      [-0.84, 0.84].forEach((side) => {
        const armGeo = createBevelBox(0.14, 0.22, 2.45, 0.02);
        const arm = new THREE.Mesh(armGeo, jcbYellowMat);
        arm.rotation.x = -0.22;
        arm.position.set(side, 1.12, 1.82);
        arm.castShadow = true;
        loaderGroup.add(arm);

        const cylBody = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.15, 20), jcbYellowDarkMat);
        cylBody.rotation.x = Math.PI / 2 - 0.2;
        cylBody.position.set(side * 0.96, 0.96, 1.2);

        const cylRod = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.85, 20), chromeMat);
        cylRod.rotation.x = Math.PI / 2 - 0.2;
        cylRod.position.set(side * 0.96, 1.12, 1.62);
        loaderGroup.add(cylBody, cylRod);
      });

      const loaderCrossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.65, 20), jcbYellowMat);
      loaderCrossbar.rotation.z = Math.PI / 2;
      loaderCrossbar.position.set(0, 1.38, 2.62);
      loaderGroup.add(loaderCrossbar);

      // Weathered Scratched Front Bucket
      const bucketBackGeo = createBevelBox(2.2, 0.86, 0.76, 0.03);
      const bucketBack = new THREE.Mesh(bucketBackGeo, jcbYellowMat);
      bucketBack.position.set(0, 0.76, 2.92);
      bucketBack.castShadow = true;
      loaderGroup.add(bucketBack);

      const bucketInner = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.8, 0.7), hardenedSteelMat);
      bucketInner.position.set(0, 0.78, 2.97);
      loaderGroup.add(bucketInner);

      [-1.08, 1.08].forEach((side) => {
        const sidePlate = new THREE.Mesh(createBevelBox(0.04, 0.86, 0.86, 0.01), jcbYellowMat);
        sidePlate.position.set(side, 0.76, 3.12);
        sidePlate.castShadow = true;
        loaderGroup.add(sidePlate);
      });

      // 5 Digging Teeth with Weathered Scratches
      for (let t = -0.85; t <= 0.85; t += 0.425) {
        const toothBase = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.3), hardenedSteelMat);
        toothBase.position.set(t, 0.38, 3.42);

        const toothTip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.3, 4), toothTipMat);
        toothTip.rotation.x = Math.PI / 2 + 0.2;
        toothTip.position.set(t, 0.36, 3.6);
        toothTip.castShadow = true;
        loaderGroup.add(toothBase, toothTip);
      }

      // Hydraulic Hoses
      const hoseL = createHydraulicHose(
        [new THREE.Vector3(-0.7, 1.1, 0.5), new THREE.Vector3(-0.85, 1.3, 1.6), new THREE.Vector3(-0.85, 1.1, 2.5)],
        0.024,
        hoseRubberMat
      );
      const hoseR = createHydraulicHose(
        [new THREE.Vector3(0.7, 1.1, 0.5), new THREE.Vector3(-0.85, 1.3, 1.6), new THREE.Vector3(-0.85, 1.1, 2.5)],
        0.024,
        hoseRubberMat
      );
      loaderGroup.add(hoseL, hoseR);

      jcbGroup.add(loaderGroup);

      // --- D. REAR BACKHOE EXCAVATOR ASSEMBLY ---
      const backhoeGroup = new THREE.Group();

      const kingpost = new THREE.Mesh(createBevelBox(0.82, 1.12, 0.72, 0.03), chassisBlackMat);
      kingpost.position.set(0, 1.22, -1.56);
      kingpost.castShadow = true;
      backhoeGroup.add(kingpost);

      const rearJCBBadge = new THREE.Mesh(createBevelBox(0.46, 0.23, 0.04, 0.01), logoMat);
      rearJCBBadge.position.set(0, 1.32, -1.92);
      backhoeGroup.add(rearJCBBadge);

      // Outriggers
      [-1, 1].forEach((side) => {
        const legArm = new THREE.Mesh(createBevelBox(0.16, 1.22, 0.16, 0.02), jcbYellowMat);
        legArm.rotation.z = side * -0.25;
        legArm.position.set(side * 1.02, 0.72, -1.52);

        const footPad = new THREE.Mesh(createBevelBox(0.42, 0.09, 0.42, 0.01), chassisBlackMat);
        footPad.position.set(side * 1.18, 0.16, -1.52);
        backhoeGroup.add(legArm, footPad);
      });

      // Curved Boom Arm
      const boomGroup = new THREE.Group();

      const boomLower = new THREE.Mesh(createBevelBox(0.24, 0.32, 1.85, 0.02), jcbYellowMat);
      boomLower.rotation.x = -0.7;
      boomLower.position.set(0, 1.82, -2.12);
      boomLower.castShadow = true;
      boomGroup.add(boomLower);

      const boomUpper = new THREE.Mesh(createBevelBox(0.22, 0.3, 1.55, 0.02), jcbYellowMat);
      boomUpper.rotation.x = 0.5;
      boomUpper.position.set(0, 2.52, -3.02);
      boomUpper.castShadow = true;
      boomGroup.add(boomUpper);

      const boomCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.25, 20), jcbYellowDarkMat);
      boomCyl.rotation.x = -0.7;
      boomCyl.position.set(0, 1.62, -2.12);

      const boomRod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.95, 20), chromeMat);
      boomRod.rotation.x = -0.7;
      boomRod.position.set(0, 1.92, -2.32);
      boomGroup.add(boomCyl, boomRod);

      // Dipper Arm
      const dipperArm = new THREE.Mesh(createBevelBox(0.2, 0.24, 1.45, 0.02), jcbYellowMat);
      dipperArm.rotation.x = 0.9;
      dipperArm.position.set(0, 1.82, -3.82);
      dipperArm.castShadow = true;
      boomGroup.add(dipperArm);

      const dipperCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.95, 20), chromeMat);
      dipperCyl.rotation.x = 0.5;
      dipperCyl.position.set(0, 2.62, -3.12);
      boomGroup.add(dipperCyl);

      // Rear Excavator Bucket
      const bhBucketBody = new THREE.Mesh(createBevelBox(0.68, 0.62, 0.62, 0.02), hardenedSteelMat);
      bhBucketBody.rotation.x = 0.2;
      bhBucketBody.position.set(0, 1.22, -4.22);
      bhBucketBody.castShadow = true;
      boomGroup.add(bhBucketBody);

      for (let bt = -0.24; bt <= 0.24; bt += 0.16) {
        const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.3, 4), toothTipMat);
        tooth.rotation.x = Math.PI / 2 + 0.4;
        tooth.position.set(bt, 0.95, -4.55);
        tooth.castShadow = true;
        boomGroup.add(tooth);
      }

      const bhHose = createHydraulicHose(
        [new THREE.Vector3(0, 1.4, -1.8), new THREE.Vector3(0, 2.6, -2.6), new THREE.Vector3(0, 2.0, -3.6)],
        0.024,
        hoseRubberMat
      );
      boomGroup.add(bhHose);

      backhoeGroup.add(boomGroup);
      jcbGroup.add(backhoeGroup);

      // --- E. 3D WHEELS WITH VISIBLE CONTINUOUS ROTATION ---
      const wheelsGroup = new THREE.Group();

      // Front Steering Wheels
      [
        [-0.96, 0.48, 1.5],
        [0.96, 0.48, 1.5],
      ].forEach(([wx, wy, wz]) => {
        const wGroup = new THREE.Group();
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.34, 32), tireMat);
        tire.rotation.z = Math.PI / 2;
        tire.castShadow = true;

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.35, 24), rimYellowMat);
        rim.rotation.z = Math.PI / 2;

        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.36, 16), chassisBlackMat);
        hub.rotation.z = Math.PI / 2;

        wGroup.add(tire, rim, hub);
        wGroup.position.set(wx, wy, wz);
        wheelsGroup.add(wGroup);

        // Push to spinWheels array for render loop animation!
        spinWheels.push(wGroup);
      });

      // Rear Big Tractor Earthmover Wheels (Deep 3D V-Tread Lugs)
      [
        [-1.08, 0.84, -0.6],
        [1.08, 0.84, -0.6],
      ].forEach(([wx, wy, wz]) => {
        const wGroup = new THREE.Group();

        const tireMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.54, 32), tireMat);
        tireMesh.rotation.z = Math.PI / 2;
        tireMesh.castShadow = true;
        wGroup.add(tireMesh);

        // 3D Chevron V-Lug Treads
        const numLugs = 18;
        const lugGeo = createBevelBox(0.18, 0.1, 0.22, 0.01);
        for (let i = 0; i < numLugs; i++) {
          const angle = (i / numLugs) * Math.PI * 2;

          const lugL = new THREE.Mesh(lugGeo, tireMat);
          lugL.position.set(0.14, Math.sin(angle) * 0.85, Math.cos(angle) * 0.85);
          lugL.rotation.x = angle + 0.35;
          lugL.rotation.y = 0.25;
          lugL.castShadow = true;

          const lugR = new THREE.Mesh(lugGeo, tireMat);
          lugR.position.set(-0.14, Math.sin(angle) * 0.85, Math.cos(angle) * 0.85);
          lugR.rotation.x = angle - 0.35;
          lugR.rotation.y = -0.25;
          lugR.castShadow = true;

          wGroup.add(lugL, lugR);
        }

        const rimMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.55, 24), rimYellowMat);
        rimMesh.rotation.z = Math.PI / 2;
        wGroup.add(rimMesh);

        const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.57, 16), chassisBlackMat);
        hubCap.rotation.z = Math.PI / 2;
        wGroup.add(hubCap);

        for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
          const lug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.58, 8), hardenedSteelMat);
          lug.rotation.z = Math.PI / 2;
          lug.position.set(0, Math.sin(a) * 0.35, Math.cos(a) * 0.35);
          wGroup.add(lug);
        }

        wGroup.position.set(wx, wy, wz);
        wheelsGroup.add(wGroup);

        // Push to spinWheels array for render loop animation!
        spinWheels.push(wGroup);
      });

      jcbGroup.add(wheelsGroup);
      jcbGroup.position.set(0, -0.1, 0);
    }

    worldGroup.add(jcbGroup);

    // --- ROAD & ENVIRONMENT ---
    // Extended 220-length road plane so it spans across the entire 110 radius circular green ground with NO gaps!
    const roadGeo = new THREE.PlaneGeometry(16, 220);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x14171c, roughness: 0.3, metalness: 0.2 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.15;
    road.receiveShadow = true;
    worldGroup.add(road);

    const laneGroup = new THREE.Group();
    for (let z = -105; z <= 105; z += 5) {
      const lineG = new THREE.PlaneGeometry(0.3, 2.5);
      const lineM = new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.8 });
      const line = new THREE.Mesh(lineG, lineM);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, -0.14, z);
      laneGroup.add(line);
    }
    worldGroup.add(laneGroup);

    // Surrounding Environment Ground (Big Circle with Pure Unlit Raw Green Grass Image)
    const textureLoader = new THREE.TextureLoader();
    const grassStockTex = textureLoader.load("https://images.unsplash.com/photo-1544914379-806667cd9489?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    grassStockTex.colorSpace = THREE.SRGBColorSpace;
    grassStockTex.wrapS = THREE.RepeatWrapping;
    grassStockTex.wrapT = THREE.RepeatWrapping;
    grassStockTex.repeat.set(16, 16);

    const groundGeo = new THREE.CircleGeometry(110, 64);
    // MeshBasicMaterial with fog: false and toneMapped: false renders 1:1 EXACT raw image colors without exposure/brightness/contrast distortion
    const groundMat = new THREE.MeshBasicMaterial({
      map: grassStockTex,
      fog: false,
      toneMapped: false,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.16;
    worldGroup.add(ground);

    scene.add(worldGroup);

    // 8. ANIMATION RENDER LOOP WITH VISIBLE CONTINUOUS FORWARD WHEEL ROTATION & OPTION 4 ZOOM IN
    let animId: number;

    const renderLoop = () => {
      const sp = scrollRef.current;

      // 180° Synchronized World Rotation
      const startAngle = -Math.PI * 0.35;
      const targetY = startAngle + sp * Math.PI * 0.75;
      worldGroup.rotation.y += (targetY - worldGroup.rotation.y) * 0.08;

      // Camera Tracking & Smooth Zoom-In on Option 4 ("Optimal Health / Predictive Service & Hydraulics")
      let targetCamX = -8.5 + Math.sin(sp * Math.PI) * 1.5;
      let targetCamY = 4.0;
      let targetCamZ = 13.5 + Math.cos(sp * Math.PI) * 1.5;
      let targetLookY = 1.15;

      // When Option 4 is highlighted (sp >= 0.75), zoom in closer smoothly!
      if (sp >= 0.75) {
        const zoomFactor = Math.min(1, (sp - 0.75) / 0.18);
        targetCamX = THREE.MathUtils.lerp(targetCamX, -4.2, zoomFactor);
        targetCamY = THREE.MathUtils.lerp(targetCamY, 2.3, zoomFactor);
        targetCamZ = THREE.MathUtils.lerp(targetCamZ, 7.5, zoomFactor);
        targetLookY = THREE.MathUtils.lerp(targetLookY, 1.4, zoomFactor);
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(0, targetLookY, 0);

      // Natural Working Vibration
      const t = performance.now() * 0.003;
      jcbGroup.position.y = -0.1 + Math.sin(t * 3.5) * 0.012;

      // CONTINUOUS FORWARD WHEEL ROTATION
      const wheelSpeed = 0.08;
      spinWheels.forEach((w) => {
        w.rotation.x += wheelSpeed;
      });

      // Animate Center Lane Markings
      laneGroup.position.z = -((performance.now() * 0.015) % 5);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 9. Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[580px]" />;
}
