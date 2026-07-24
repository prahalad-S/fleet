"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TruckCanvasProps {
  scrollProgress: number; // 0 to 1
}

// Procedural Flame Texture Generator for Real Semi-Truck Cab & Doors
function createFlameTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Deep Metallic Blue Background
  ctx.fillStyle = "#0A2050";
  ctx.fillRect(0, 0, 512, 512);

  // Red & Orange Flames
  const drawFlame = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.bezierCurveTo(x + w * 0.2, y + h * 0.6, x - w * 0.1, y + h * 0.3, x + w * 0.5, y);
    ctx.bezierCurveTo(x + w * 0.8, y + h * 0.3, x + w * 0.6, y + h * 0.6, x + w, y + h);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  for (let i = 0; i < 8; i++) {
    drawFlame(i * 60 + 10, 100, 70, 350, "#C81014");
    drawFlame(i * 60 + 22, 180, 45, 250, "#FF8C00");
    drawFlame(i * 60 + 30, 240, 30, 180, "#FFCC00");
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
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

    // 1. Scene & Atmosphere Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1217);
    scene.fog = new THREE.FogExp2(0x0e1217, 0.012);

    // 2. Camera Setup — Comfortably Zoomed for prominent 3D truck framing
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.5, 1000);
    camera.position.set(-9, 4.8, 19);
    camera.lookAt(0, 1.0, -1.5);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111622, 1.0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 3.0);
    sunLight.position.set(20, 30, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x0066ff, 1.5);
    blueRimLight.position.set(-20, 15, -20);
    scene.add(blueRimLight);

    // 5. Materials
    const flameTexture = createFlameTexture();

    const bluePaintMat = new THREE.MeshStandardMaterial({ color: 0x0a2050, metalness: 0.65, roughness: 0.22 });
    const flameHoodMat = new THREE.MeshStandardMaterial({ map: flameTexture, metalness: 0.55, roughness: 0.22 });
    const redFenderMat = new THREE.MeshStandardMaterial({ color: 0xc81014, metalness: 0.55, roughness: 0.25 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.04 });
    const trailerSilverMat = new THREE.MeshStandardMaterial({ color: 0xb0b5bc, metalness: 0.75, roughness: 0.28 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x111111, transmission: 0.85, transparent: true, opacity: 0.8, roughness: 0.05 });
    const blueLedMat = new THREE.MeshStandardMaterial({ color: 0x0088ff, emissive: 0x0088ff, emissiveIntensity: 4 });
    const warmHeadlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff0bb, emissiveIntensity: 5 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x161616, roughness: 0.92 });
    const chromeWheelMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, metalness: 0.95, roughness: 0.1 });

    // --- MASTER WORLD GROUP (Truck + Road + Lane Markings rotate TOGETHER) ---
    const worldGroup = new THREE.Group();

    // 6. Real Semi-Truck & Cargo Trailer Assembly
    const truckGroup = new THREE.Group();

    // Tractor Cab & Sleeper
    const cabSleeperGeo = new THREE.BoxGeometry(2.4, 1.8, 3.2);
    const cabSleeper = new THREE.Mesh(cabSleeperGeo, bluePaintMat);
    cabSleeper.position.set(0, 1.8, -0.6);
    cabSleeper.castShadow = true;
    truckGroup.add(cabSleeper);

    // Windshield & Chrome Visor
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.6, 0.05), glassMat);
    windshield.position.set(0, 2.1, 0.96);
    truckGroup.add(windshield);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.25, 0.4), chromeMat);
    visor.rotation.x = 0.2;
    visor.position.set(0, 2.45, 1.05);
    visor.castShadow = true;
    truckGroup.add(visor);

    // Blue Cab Marker Lights
    for (let lx = -1.0; lx <= 1.0; lx += 0.25) {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), blueLedMat);
      led.position.set(lx, 2.58, 1.15);
      truckGroup.add(led);
    }

    // Side Mirrors
    for (let side = -1; side <= 1; side += 2) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.04), chromeMat);
      arm.position.set(side * 1.35, 1.9, 0.8);
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.2), chromeMat);
      mirror.position.set(side * 1.6, 1.9, 0.8);
      truckGroup.add(arm, mirror);
    }

    // Tall Vertical Chrome Exhaust Stacks
    for (let side = -1; side <= 1; side += 2) {
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.8, 20), chromeMat);
      stack.position.set(side * 1.25, 3.1, -0.4);
      stack.castShadow = true;

      const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 1.6, 16), chromeMat);
      shield.position.set(side * 1.25, 2.0, -0.4);
      truckGroup.add(stack, shield);
    }

    // Chrome Fuel Tanks & Steps
    for (let side = -1; side <= 1; side += 2) {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.8, 24), chromeMat);
      tank.rotation.x = Math.PI / 2;
      tank.position.set(side * 1.35, 0.65, 0.2);
      tank.castShadow = true;

      const step = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 1.4), chromeMat);
      step.position.set(side * 1.4, 0.95, 0.2);
      truckGroup.add(tank, step);
    }

    // Long Flame Hood & Red Fenders
    const hood = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.15, 2.5), flameHoodMat);
    hood.position.set(0, 1.28, 2.2);
    hood.castShadow = true;
    truckGroup.add(hood);

    for (let side = -1; side <= 1; side += 2) {
      const fender = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.8, 1.4), redFenderMat);
      fender.position.set(side * 1.3, 0.7, 2.6);
      fender.castShadow = true;
      truckGroup.add(fender);
    }

    // Massive Chrome Grille & Bumper
    const grille = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.4, 0.15), chromeMat);
    grille.position.set(0, 1.3, 3.48);
    grille.castShadow = true;
    truckGroup.add(grille);

    for (let gx = -0.75; gx <= 0.75; gx += 0.15) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.3, 0.18), chromeMat);
      slat.position.set(gx, 1.3, 3.49);
      truckGroup.add(slat);
    }

    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.08), redFenderMat);
    badge.position.set(0, 1.9, 3.5);
    truckGroup.add(badge);

    const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.45, 0.3), chromeMat);
    bumper.position.set(0, 0.35, 3.55);
    bumper.castShadow = true;
    truckGroup.add(bumper);

    for (let bx = -1.15; bx <= 1.15; bx += 0.2) {
      const ledB = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), blueLedMat);
      ledB.position.set(bx, 0.22, 3.71);
      truckGroup.add(ledB);
    }

    // Quad Headlights
    for (let side = -1; side <= 1; side += 2) {
      const hlHousing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.2), chromeMat);
      hlHousing.position.set(side * 1.25, 0.9, 3.45);
      truckGroup.add(hlHousing);

      for (let ly = -0.08; ly <= 0.08; ly += 0.16) {
        const roundL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.05, 16), warmHeadlightMat);
        roundL.rotation.x = Math.PI / 2;
        roundL.position.set(side * 1.25, 0.9 + ly, 3.56);
        truckGroup.add(roundL);
      }

      const spot = new THREE.SpotLight(0xfff5cc, 6, 30, 0.45, 0.5);
      spot.position.set(side * 1.25, 0.9, 3.6);
      spot.target.position.set(side * 1.25, 0, 20);
      truckGroup.add(spot);
      truckGroup.add(spot.target);
    }

    // Cargo Container Trailer
    const trailerGroup = new THREE.Group();

    const trailerBody = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.1, 10.5), trailerSilverMat);
    trailerBody.position.set(0, 2.5, -7.2);
    trailerBody.castShadow = true;
    trailerGroup.add(trailerBody);

    const trailerTrim = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.25, 10.6), bluePaintMat);
    trailerTrim.position.set(0, 4.05, -7.2);
    trailerGroup.add(trailerTrim);

    const trailerFrontTrim = new THREE.Mesh(new THREE.BoxGeometry(2.75, 3.15, 0.2), bluePaintMat);
    trailerFrontTrim.position.set(0, 2.5, -2.0);
    trailerGroup.add(trailerFrontTrim);

    const shieldBadge = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.1), redFenderMat);
    shieldBadge.position.set(0, 3.0, -1.88);
    trailerGroup.add(shieldBadge);

    const rearFender = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.4, 2.6), redFenderMat);
    rearFender.position.set(0, 0.85, -10.5);
    trailerGroup.add(rearFender);

    truckGroup.add(trailerGroup);

    // Wheels & Tandem Axles
    const wheelsGroup = new THREE.Group();
    const tireGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.38, 32);
    const rimGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.39, 24);

    const wheelCoords: [number, number, number][] = [
      [-1.3, 0.52, 2.6],
      [1.3, 0.52, 2.6],
      [-1.3, 0.52, -1.2],
      [1.3, 0.52, -1.2],
      [-1.3, 0.52, -2.1],
      [1.3, 0.52, -2.1],
      [-1.3, 0.52, -9.8],
      [1.3, 0.52, -9.8],
      [-1.3, 0.52, -11.0],
      [1.3, 0.52, -11.0],
    ];

    wheelCoords.forEach(([wx, wy, wz]) => {
      const singleW = new THREE.Group();
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;

      const rim = new THREE.Mesh(rimGeo, chromeWheelMat);
      rim.rotation.z = Math.PI / 2;

      singleW.add(tire, rim);
      singleW.position.set(wx, wy, wz);
      wheelsGroup.add(singleW);
    });

    truckGroup.add(wheelsGroup);
    truckGroup.position.set(0, -0.1, 3.5);

    // Add Truck to Master World Group
    worldGroup.add(truckGroup);

    // --- ROAD & ENVIRONMENT (Grouped inside World Group so Road & Truck rotate together!) ---
    const roadGeo = new THREE.PlaneGeometry(16, 120);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x14171c, roughness: 0.3, metalness: 0.2 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.15;
    road.receiveShadow = true;
    worldGroup.add(road);

    // Yellow Lane Markings
    const laneGroup = new THREE.Group();
    for (let z = -50; z <= 50; z += 5) {
      const lineG = new THREE.PlaneGeometry(0.3, 2.5);
      const lineM = new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.8 });
      const line = new THREE.Mesh(lineG, lineM);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, -0.14, z);
      laneGroup.add(line);
    }
    worldGroup.add(laneGroup);

    // Surrounding Environment Ground
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0e1217, roughness: 0.95 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.16;
    ground.receiveShadow = true;
    worldGroup.add(ground);

    // Add Master World Group to Scene
    scene.add(worldGroup);

    // 7. 180-DEGREE SYNCHRONIZED ROTATION (WORLD + ROAD + TRUCK ROTATE TOGETHER)
    let animId: number;

    const renderLoop = () => {
      const sp = scrollRef.current;

      // ROTATE ENTIRE WORLD (Road + Truck align perfectly without skidding!)
      const startAngle = -Math.PI * 0.35;
      const targetY = startAngle + sp * Math.PI * 0.75;
      worldGroup.rotation.y += (targetY - worldGroup.rotation.y) * 0.08;

      // Camera Tracking — Comfortably Zoomed Framing
      camera.position.x = -9 + Math.sin(sp * Math.PI) * 1.5;
      camera.position.z = 19 + Math.cos(sp * Math.PI) * 1.5;
      camera.position.y = 4.8;
      camera.lookAt(0, 1.0, -1.5);

      // Subtle natural driving vibration
      const t = performance.now() * 0.003;
      truckGroup.position.y = -0.1 + Math.sin(t * 3.5) * 0.02;

      // Spin Wheels Forward
      wheelsGroup.children.forEach((w) => {
        w.rotation.x -= 0.06;
      });

      // Animate Center Lane Markings (Negative sign for FORWARD truck motion!)
      laneGroup.position.z = -((performance.now() * 0.015) % 5);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 8. Resize Handler
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
