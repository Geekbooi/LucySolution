import { useRef, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshReflectorMaterial, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'

// ── Laptop geometry constants ──────────────────────────────────────────────────
const BASE_W = 3.0
const BASE_D = 2.0
const BASE_H = 0.12
const LID_W  = 3.0
const LID_H  = 1.9
const LID_D  = 0.09

const BODY_DARK   = '#09090e'
const BODY_RIM    = '#111118'
const SCREEN_BG   = '#060610'
const BLUE_ACCENT = '#3B82F6'
const VIOLET_ACC  = '#7C3AED'

// Shared dark aluminum material
const bodyMat  = new THREE.MeshPhysicalMaterial({ color: BODY_DARK, metalness: 0.85, roughness: 0.15 })
const rimMat   = new THREE.MeshPhysicalMaterial({ color: BODY_RIM,  metalness: 0.75, roughness: 0.25 })
const screenMat = new THREE.MeshBasicMaterial({ color: SCREEN_BG })

// ── Mouse-tracking hook ─────────────────────────────────────────────────────────
function useNormalisedMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const onMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    })
  }, [])
  const onLeave = useCallback(() => setMouse({ x: 0, y: 0 }), [])
  return { mouse, onMove, onLeave }
}

// ── Screen content: simulated Kaldilabs UI ──────────────────────────────────────
function ScreenContent() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    // Pulse the screen emission gently
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = 0.18 + Math.sin(clock.getElapsedTime() * 1.2) * 0.04
    }
  })

  return (
    <group position={[0, LID_H * 0.5 - 0.05, LID_D * 0.5 + 0.004]}>
      {/* Screen base glow */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[LID_W * 0.88, LID_H * 0.88]} />
        <meshStandardMaterial
          color="#06060f"
          emissive={new THREE.Color(BLUE_ACCENT)}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Simulated browser chrome bar */}
      <mesh position={[0, LID_H * 0.38, 0.001]}>
        <planeGeometry args={[LID_W * 0.88, 0.12]} />
        <meshBasicMaterial color="#0d0d1a" />
      </mesh>

      {/* 3 traffic-light dots */}
      {[-0.9, -0.7, -0.5].map((x, i) => (
        <mesh key={i} position={[x * (LID_W * 0.88 / 2 / 0.9) * 0.12, LID_H * 0.38, 0.002]}>
          <circleGeometry args={[0.028, 16]} />
          <meshBasicMaterial color={['#ff5f57', '#ffbd2e', '#28c840'][i]} />
        </mesh>
      ))}

      {/* Heading text bar */}
      <mesh position={[0, LID_H * 0.14, 0.001]}>
        <planeGeometry args={[LID_W * 0.6, 0.08]} />
        <meshBasicMaterial color={BLUE_ACCENT} opacity={0.6} transparent />
      </mesh>
      <mesh position={[-LID_W * 0.14, LID_H * 0.14, 0.001]}>
        <planeGeometry args={[LID_W * 0.12, 0.06]} />
        <meshBasicMaterial color={VIOLET_ACC} opacity={0.5} transparent />
      </mesh>

      {/* Content rows */}
      {[-0.06, -0.18, -0.3, -0.42].map((y, i) => (
        <mesh key={i} position={[-(0.05 + (i % 2) * 0.1), y, 0.001]}>
          <planeGeometry args={[LID_W * (0.55 + (i % 3) * 0.08), 0.045]} />
          <meshBasicMaterial color="#1e2035" opacity={0.8} transparent />
        </mesh>
      ))}

      {/* CTA button sim */}
      <mesh position={[-LID_W * 0.22, -0.56, 0.001]}>
        <planeGeometry args={[0.45, 0.1]} />
        <meshBasicMaterial color={BLUE_ACCENT} opacity={0.9} transparent />
      </mesh>
      <mesh position={[LID_W * 0.05, -0.56, 0.001]}>
        <planeGeometry args={[0.42, 0.1]} />
        <meshBasicMaterial color="#1a1a30" opacity={0.8} transparent />
      </mesh>
    </group>
  )
}

// ── Laptop mesh ─────────────────────────────────────────────────────────────────
function Laptop({ mouse }) {
  const groupRef = useRef()
  const lidRef   = useRef()
  const screenLightRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const lerpFactor = 0.05

    if (groupRef.current) {
      // Damped mouse rotation — offset Y by 0.22 rad for default 3/4 view
      groupRef.current.rotation.y +=
        (mouse.x * 0.35 + 0.22 - groupRef.current.rotation.y) * lerpFactor
      groupRef.current.rotation.x +=
        (mouse.y * -0.12 - 0.05 - groupRef.current.rotation.x) * lerpFactor
    }

    // Pulse screen light intensity
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 1.2 + Math.sin(t * 1.1) * 0.2
    }
  })

  // Lid open angle: ~60° from vertical so screen faces the camera
  const lidOpenAngle = -Math.PI * 0.33

  return (
    <group ref={groupRef}>
      {/* ── BASE ────────────────────────────────────────────────── */}
      <group position={[0, 0, 0]}>

        {/* Main body */}
        <mesh material={bodyMat} castShadow receiveShadow>
          <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        </mesh>

        {/* Chamfered rim (thin strip around edge) */}
        <mesh material={rimMat} position={[0, -BASE_H * 0.5 + 0.005, 0]}>
          <boxGeometry args={[BASE_W + 0.02, 0.01, BASE_D + 0.02]} />
        </mesh>

        {/* Keyboard area (slightly recessed darker surface) */}
        <mesh position={[0, BASE_H * 0.5 + 0.002, 0.1]}>
          <boxGeometry args={[BASE_W * 0.86, 0.012, BASE_D * 0.7]} />
          <meshPhysicalMaterial color="#070710" metalness={0.6} roughness={0.5} />
        </mesh>

        {/* Keyboard backlight glow (emissive) */}
        <mesh position={[0, BASE_H * 0.5 + 0.009, 0.1]}>
          <boxGeometry args={[BASE_W * 0.84, 0.006, BASE_D * 0.68]} />
          <meshStandardMaterial
            color={BLUE_ACCENT}
            emissive={new THREE.Color(BLUE_ACCENT)}
            emissiveIntensity={0.08}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Touchpad */}
        <mesh position={[0, BASE_H * 0.5 + 0.003, BASE_D * 0.3]}>
          <boxGeometry args={[0.82, 0.01, 0.52]} />
          <meshPhysicalMaterial color="#0d0d16" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Screen light — illuminates the base from in front */}
        <pointLight
          ref={screenLightRef}
          position={[0, 1.0, 1.2]}
          color={BLUE_ACCENT}
          intensity={0.7}
          distance={4}
          decay={2}
        />
      </group>

      {/* ── LID (pivots from back edge) ─────────────────────────── */}
      <group
        ref={lidRef}
        position={[0, BASE_H * 0.5, -BASE_D * 0.5]}
        rotation={[lidOpenAngle, 0, 0]}
      >
        {/* Lid outer shell */}
        <mesh material={bodyMat} position={[0, LID_H * 0.5, 0]} castShadow>
          <boxGeometry args={[LID_W, LID_H, LID_D]} />
        </mesh>

        {/* Apple-logo-style emboss (back of lid) */}
        <mesh position={[0, LID_H * 0.5, -LID_D * 0.5 - 0.001]}>
          <circleGeometry args={[0.14, 32]} />
          <meshPhysicalMaterial color="#111118" metalness={1} roughness={0.05} />
        </mesh>

        {/* Screen bezel */}
        <mesh material={screenMat} position={[0, LID_H * 0.5, LID_D * 0.5 + 0.001]}>
          <boxGeometry args={[LID_W * 0.9, LID_H * 0.9, 0.005]} />
        </mesh>

        {/* Screen active area */}
        <mesh position={[0, LID_H * 0.5, LID_D * 0.5 + 0.003]}>
          <boxGeometry args={[LID_W * 0.86, LID_H * 0.85, 0.002]} />
          <meshStandardMaterial
            color={SCREEN_BG}
            emissive={new THREE.Color('#0a0a28')}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Simulated UI content on screen */}
        <ScreenContent />

        {/* Screen edge glow strip (top) */}
        <mesh position={[0, LID_H * 0.945, LID_D * 0.5 + 0.002]}>
          <boxGeometry args={[LID_W * 0.88, 0.018, 0.004]} />
          <meshBasicMaterial color={BLUE_ACCENT} />
        </mesh>
      </group>
    </group>
  )
}

// ── Ground reflection plane ─────────────────────────────────────────────────────
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <MeshReflectorMaterial
        blur={[300, 30]}
        mixBlur={0.6}
        mixStrength={0.4}
        resolution={256}
        mirror={0}
        depthScale={0.5}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        color="#050508"
        metalness={0.6}
        roughness={1}
      />
    </mesh>
  )
}

// ── Ambient particle field ──────────────────────────────────────────────────────
function Particles({ count = 60 }) {
  const mesh = useRef()
  const dummy = new THREE.Object3D()

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i * 3]     + Math.sin(t * 0.3 + i) * 0.05,
        positions[i * 3 + 1] + Math.sin(t * 0.4 + i * 0.7) * 0.05,
        positions[i * 3 + 2],
      )
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.014, 4, 4]} />
      <meshBasicMaterial color={BLUE_ACCENT} transparent opacity={0.45} />
    </instancedMesh>
  )
}

// ── Inner canvas scene ──────────────────────────────────────────────────────────
function Scene({ mouse }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  return (
    <>
      {/* Adaptive quality */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Lighting rig */}
      <ambientLight intensity={0.18} />
      <pointLight position={[-4, 4, 4]}  color="#ffffff" intensity={1.8} castShadow shadow-mapSize={512} />
      <pointLight position={[4, 2, -3]}  color={VIOLET_ACC} intensity={0.9} />
      <pointLight position={[0, 3, 6]}   color="#c0d8ff"   intensity={1.2} />
      <pointLight position={[0, -2, 4]}  color="#050510"   intensity={0.3} />

      {/* Laptop, floating */}
      <Float
        speed={1.4}
        rotationIntensity={0}
        floatIntensity={0.35}
        floatingRange={[-0.06, 0.06]}
      >
        <Suspense fallback={null}>
          <Laptop mouse={mouse} />
        </Suspense>
      </Float>

      {/* Ground */}
      {!isMobile && <Ground />}

      {/* Particles */}
      {!isMobile && <Particles count={50} />}

      <Preload all />
    </>
  )
}

// ── Public component ────────────────────────────────────────────────────────────
export default function LaptopScene() {
  const { mouse, onMove, onLeave } = useNormalisedMouse()

  return (
    <div
      className="w-full h-full"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden="true"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.9, 5.0], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
