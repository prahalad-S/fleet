// @ts-nocheck
"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface TruckCanvasProps {
  scrollProgress: number; // 0 to 1
}

function ProceduralJCBHeavyTruck({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate 3D truck based on scroll progress (lodisna.com 360 degree rotation)
      const targetRotationY = scrollProgress * Math.PI * 2.5;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);

      // Subtle float motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
      groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }

    if (wheelsRef.current) {
      // Spin wheels
      wheelsRef.current.children.forEach((wheel) => {
        wheel.rotation.x += delta * 6;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.2}>
      {/* Chassis Base */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.4, 4.2]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main Body - JCB Yellow */}
      <mesh position={[0, 1.1, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 1.0, 2.8]} />
        <meshStandardMaterial color="#FFCC00" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Engine Hood Accent */}
      <mesh position={[0, 1.0, 1.3]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.7, 1.2]} />
        <meshStandardMaterial color="#E6B800" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Driver Cab */}
      <mesh position={[0, 1.9, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.9, 1.4]} />
        <meshStandardMaterial color="#222222" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Cab Glass Window */}
      <mesh position={[0, 1.95, 1.1]}>
        <boxGeometry args={[1.6, 0.65, 0.1]} />
        <meshPhysicalMaterial
          color="#5BA8D9"
          transmission={0.8}
          opacity={0.7}
          transparent
          roughness={0.1}
        />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.7, 0.9, 1.95]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFD633" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.7, 0.9, 1.95]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFD633" emissiveIntensity={3} />
      </mesh>

      {/* Headlight Beams */}
      <spotLight
        position={[0, 1.0, 2.0]}
        target-position={[0, 0, 8]}
        angle={0.5}
        penumbra={0.5}
        intensity={8}
        color="#FFCC00"
      />

      {/* Heavy Machinery Wheels */}
      <group ref={wheelsRef}>
        {/* Front Left */}
        <mesh position={[-1.15, 0.3, 1.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Front Right */}
        <mesh position={[1.15, 0.3, 1.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Rear Left 1 */}
        <mesh position={[-1.15, 0.3, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Rear Right 1 */}
        <mesh position={[1.15, 0.3, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Rear Left 2 */}
        <mesh position={[-1.15, 0.3, -1.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Rear Right 2 */}
        <mesh position={[1.15, 0.3, -1.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* GPS Antenna Dome with pulsing light */}
      <mesh position={[0, 2.4, 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function RoadEnvironment({ scrollProgress }: { scrollProgress: number }) {
  const roadRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (roadRef.current && roadRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Move road texture to simulate driving forward
      roadRef.current.material.map?.offset.set(0, (scrollProgress * 20) % 1);
    }
  });

  return (
    <group>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* Highway Road Strip */}
      <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.58, 0]} receiveShadow>
        <planeGeometry args={[8, 60]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Yellow Center Road Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.57, 0]}>
        <planeGeometry args={[0.3, 60]} />
        <meshStandardMaterial color="#FFCC00" emissive="#FFCC00" emissiveIntensity={0.5} />
      </mesh>

      {/* GPS Towers along the road */}
      <group position={[-5, 0, -10]}>
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 6, 8]} />
          <meshStandardMaterial color="#444444" metalness={0.8} />
        </mesh>
        <mesh position={[0, 6, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={2} />
        </mesh>
      </group>

      <group position={[5, 0, 5]}>
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 6, 8]} />
          <meshStandardMaterial color="#444444" metalness={0.8} />
        </mesh>
        <mesh position={[0, 6, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

export default function TruckJourneyCanvas({ scrollProgress }: TruckCanvasProps) {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        shadows
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FFCC00" />

        <ProceduralJCBHeavyTruck scrollProgress={scrollProgress} />
        <RoadEnvironment scrollProgress={scrollProgress} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
