import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'

const BLUE   = '#3B82F6'
const VIOLET = '#7C3AED'
const INDIGO = '#5E6AD2'

// ── Morphing glowing orb ────────────────────────────────────────────────────
function Orb({ mouse }) {
  const groupRef  = useRef()
  const outerRef  = useRef()
  const innerRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Damped mouse rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.45 - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.x += (mouse.y * -0.25 - groupRef.current.rotation.x) * 0.04
    }

    // Pulse outer glow
    if (outerRef.current) {
      outerRef.current.material.opacity = 0.07 + Math.sin(t * 0.85) * 0.03
    }

    // Pulse emissive of inner distort material
    if (innerRef.current) {
      innerRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.1) * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {/* Distorting core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.28, 64, 64]} />
        <MeshDistortMaterial
          color={BLUE}
          emissive={new THREE.Color(INDIGO)}
          emissiveIntensity={0.4}
          metalness={0.25}
          roughness={0.08}
          distort={0.38}
          speed={2.6}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Subtle inner bright core */}
      <mesh scale={0.62}>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshBasicMaterial color="#a5c8ff" transparent opacity={0.12} />
      </mesh>

      {/* Outer glow shell */}
      <mesh ref={outerRef} scale={1.28}>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

// ── Orbital ring ────────────────────────────────────────────────────────────
function Ring({ radius, tube, tiltX = 0, tiltZ = 0, speed, color, opacity }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed
  })

  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tube, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

// ── Floating particle cloud ─────────────────────────────────────────────────
function Particles({ count }) {
  const ref   = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const pts = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r     = 2.1 + Math.random() * 3.0
      arr.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pts.forEach((p, i) => {
      dummy.position.set(
        p[0] + Math.sin(t * 0.27 + i * 0.43) * 0.1,
        p[1] + Math.sin(t * 0.21 + i * 0.55) * 0.1,
        p[2] + Math.sin(t * 0.17 + i * 0.31) * 0.07,
      )
      dummy.scale.setScalar(0.5 + Math.sin(t * 0.5 + i) * 0.5)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.017, 6, 6]} />
      <meshBasicMaterial color={BLUE} transparent opacity={0.55} />
    </instancedMesh>
  )
}

// ── Scene composition ───────────────────────────────────────────────────────
function Scene({ mouse }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  return (
    <>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <ambientLight intensity={0.1} />
      <pointLight position={[-5, 4, 3]}  color={BLUE}    intensity={2.4} />
      <pointLight position={[5, -3, -3]} color={VIOLET}  intensity={1.9} />
      <pointLight position={[0, 5, 1]}   color="#c8deff" intensity={0.8} />

      {/* Orb with gentle float */}
      <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.5} floatingRange={[-0.14, 0.14]}>
        <Orb mouse={mouse} />
      </Float>

      {/* Three orbital rings at varied tilts */}
      <Ring radius={2.08} tube={0.014} tiltX={Math.PI * 0.28}              speed={0.22}  color={BLUE}   opacity={0.50} />
      <Ring radius={2.55} tube={0.009} tiltX={-Math.PI * 0.52} tiltZ={Math.PI * 0.18} speed={-0.16} color={VIOLET} opacity={0.38} />
      <Ring radius={1.78} tube={0.007} tiltX={Math.PI * 0.72}  tiltZ={Math.PI * 0.35} speed={0.31}  color={INDIGO} opacity={0.30} />

      {!isMobile && <Particles count={85} />}

      <Preload all />
    </>
  )
}

// ── Mouse hook ──────────────────────────────────────────────────────────────
function useNormMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const onMove  = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
      y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
    })
  }, [])
  const onLeave = useCallback(() => setMouse({ x: 0, y: 0 }), [])
  return { mouse, onMove, onLeave }
}

// ── Public export ───────────────────────────────────────────────────────────
export default function HeroScene() {
  const { mouse, onMove, onLeave } = useNormMouse()

  return (
    <div
      className="w-full h-full"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 44 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
