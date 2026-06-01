'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function DustParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 200

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 2] = 0
    }
    return { positions, velocities }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1] + Math.sin(clock.getElapsedTime() * 0.3 + i) * 0.0003
      // Wrap around
      if (pos[i * 3] > 5) pos[i * 3] = -5
      if (pos[i * 3] < -5) pos[i * 3] = 5
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#F37512"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function GeometricSatellite({ radius, speed, size, offset }: { radius: number; speed: number; size: number; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() * speed + offset
    meshRef.current.position.x = Math.cos(t) * radius
    meshRef.current.position.y = Math.sin(t * 0.7) * radius * 0.5
    meshRef.current.position.z = Math.sin(t) * radius * 0.3
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.008
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color="#F37512" wireframe opacity={0.4} transparent />
    </mesh>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (-mouse.current.y * 0.3 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  // Listen to mouse
  if (typeof window !== 'undefined') {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
  }

  return null
}

export default function HeroThreeScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: !isMobile }}
      style={{ background: 'transparent' }}
      dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1.5 : 2)}
    >
      <ambientLight intensity={0.5} />
      <DustParticles />
      {!isMobile && (
        <>
          <GeometricSatellite radius={3.5} speed={0.3} size={0.06} offset={0} />
          <GeometricSatellite radius={2.5} speed={0.2} size={0.04} offset={2} />
          <GeometricSatellite radius={4} speed={0.15} size={0.08} offset={4} />
          <CameraRig />
        </>
      )}
    </Canvas>
  )
}
