"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TruckCanvasProps {
  scrollProgress: number; // 0 to 1
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
    const height = container.clientHeight || 450;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x111111, 0.03);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 9);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffcc00, 1.8);
    dirLight.position.set(10, 15, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const spotLight = new THREE.SpotLight(0xffcc00, 3);
    spotLight.position.set(0, 5, 5);
    spotLight.angle = 0.6;
    scene.add(spotLight);

    // 5. Procedural 3D Truck Group
    const truckGroup = new THREE.Group();

    // Chassis Base
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.4, 4.4);
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.8 });
    const chassis = new THREE.Mesh(chassisGeo, darkMat);
    chassis.position.y = 0.4;
    chassis.castShadow = true;
    truckGroup.add(chassis);

    // Main Body — JCB Yellow
    const bodyGeo = new THREE.BoxGeometry(2.2, 1.1, 2.9);
    const jcbYellowMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.2, metalness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, jcbYellowMat);
    body.position.set(0, 1.1, -0.2);
    body.castShadow = true;
    truckGroup.add(body);

    // Hood Front Accent
    const hoodGeo = new THREE.BoxGeometry(2.0, 0.7, 1.3);
    const hoodMat = new THREE.MeshStandardMaterial({ color: 0xe6b800, roughness: 0.3 });
    const hood = new THREE.Mesh(hoodGeo, hoodMat);
    hood.position.set(0, 0.9, 1.4);
    hood.castShadow = true;
    truckGroup.add(hood);

    // Cab Glass Window
    const windowGeo = new THREE.BoxGeometry(1.8, 0.7, 0.1);
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x5ba8d9, transparent: true, opacity: 0.7, roughness: 0.1 });
    const glassWindow = new THREE.Mesh(windowGeo, glassMat);
    glassWindow.position.set(0, 1.8, 1.25);
    truckGroup.add(glassWindow);

    // Headlights
    const headlightGeo = new THREE.BoxGeometry(0.3, 0.2, 0.1);
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffcc00, emissiveIntensity: 2 });
    const hlLeft = new THREE.Mesh(headlightGeo, lightMat);
    hlLeft.position.set(-0.7, 0.8, 2.05);
    truckGroup.add(hlLeft);

    const hlRight = new THREE.Mesh(headlightGeo, lightMat);
    hlRight.position.set(0.7, 0.8, 2.05);
    truckGroup.add(hlRight);

    // GPS Dome Antenna
    const gpsGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
    const gpsMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 2 });
    const gpsDome = new THREE.Mesh(gpsGeo, gpsMat);
    gpsDome.position.set(0, 2.3, 0.2);
    truckGroup.add(gpsDome);

    // Wheels
    const wheelsGroup = new THREE.Group();
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.4, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });

    const wheelPositions: [number, number, number][] = [
      [-1.25, 0.35, 1.4],
      [1.25, 0.35, 1.4],
      [-1.25, 0.35, -0.5],
      [1.25, 0.35, -0.5],
      [-1.25, 0.35, -1.6],
      [1.25, 0.35, -1.6],
    ];

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      wheel.castShadow = true;
      wheelsGroup.add(wheel);
    });

    truckGroup.add(wheelsGroup);
    truckGroup.position.set(0, -0.4, 0);
    truckGroup.scale.set(1.1, 1.1, 1.1);
    scene.add(truckGroup);

    // 6. Road Environment
    const roadGeo = new THREE.PlaneGeometry(8, 80);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.58;
    road.receiveShadow = true;
    scene.add(road);

    // Yellow Center Line
    const centerLineGeo = new THREE.PlaneGeometry(0.3, 80);
    const centerLineMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.4 });
    const centerLine = new THREE.Mesh(centerLineGeo, centerLineMat);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.y = -0.57;
    scene.add(centerLine);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    ground.receiveShadow = true;
    scene.add(ground);

    // 7. Animation Loop (Synched to scroll progress lodisna.com style)
    let animationFrameId: number;

    const animate = () => {
      const sp = scrollRef.current;

      // 360 Degree Smooth Rotation based on scroll
      const targetRotationY = sp * Math.PI * 2.5;
      truckGroup.rotation.y += (targetRotationY - truckGroup.rotation.y) * 0.08;

      // Floating vibration effect
      const time = performance.now() * 0.003;
      truckGroup.position.y = -0.4 + Math.sin(time * 2) * 0.06;

      // Wheel rotation simulation
      wheelsGroup.children.forEach((w) => {
        w.rotation.x += 0.05;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[450px]" />;
}
