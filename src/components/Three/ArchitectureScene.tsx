'use client'

import { Html, Line } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'

export type NodeId = 'frontend' | 'backend' | 'database' | 'cloud' | 'ai'

export const NODE_IDS: NodeId[] = ['frontend', 'backend', 'database', 'cloud', 'ai']

const POS: Record<NodeId, [number, number, number]> = {
  frontend: [-2.1, 1.25, 0.2],
  backend: [0, 0, 0.6],
  database: [2.15, 1.15, -0.3],
  cloud: [1.85, -1.45, 0.1],
  ai: [-1.85, -1.35, -0.2],
}
const EDGES: [NodeId, NodeId][] = [
  ['frontend', 'backend'],
  ['backend', 'database'],
  ['backend', 'cloud'],
  ['backend', 'ai'],
  ['frontend', 'cloud'],
  ['database', 'cloud'],
  ['ai', 'frontend'],
]

type SceneProps = {
  labels: Record<NodeId, string>
  active: NodeId
  onSelect: (id: NodeId) => void
  running: boolean
}

function Edge({ a, b, lit }: { a: NodeId; b: NodeId; lit: boolean }) {
  // drei's Line exposes a LineMaterial with dashOffset; animating it shows data flowing.
  const ref = useRef<{ material: { dashOffset: number } }>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.material.dashOffset -= dt * (lit ? 0.7 : 0.15)
  })
  return (
    <Line
      ref={ref as never}
      points={[POS[a], POS[b]]}
      color={lit ? '#365cf5' : '#b8c0cc'}
      lineWidth={lit ? 2 : 1}
      dashed
      dashSize={0.12}
      gapSize={0.08}
      transparent
      opacity={lit ? 1 : 0.55}
    />
  )
}

function Graph({ labels, active, onSelect }: Omit<SceneProps, 'running'>) {
  const group = useRef<Group>(null)
  // drei <Html> drops the first label if it mounts in the same tick as the canvas; render labels after mount.
  const [labelsReady, setLabelsReady] = useState(false)
  useEffect(() => setLabelsReady(true), [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.y += (Math.sin(t * 0.3) * 0.22 + state.pointer.x * 0.15 - g.rotation.y) * 0.04
    g.rotation.x += (-state.pointer.y * 0.1 - g.rotation.x) * 0.04
  })

  return (
    <group ref={group}>
      {EDGES.map(([a, b]) => (
        <Edge key={a + b} a={a} b={b} lit={active === a || active === b} />
      ))}
      {NODE_IDS.map((id) => {
        const on = active === id
        return (
          <group key={id} position={POS[id]}>
            <mesh
              scale={on ? 1.35 : 1}
              onPointerOver={(e) => {
                e.stopPropagation()
                onSelect(id)
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => (document.body.style.cursor = '')}>
              <sphereGeometry args={[id === 'backend' ? 0.26 : 0.2, 64, 64]} />
              <meshPhysicalMaterial
                color={on ? '#365cf5' : '#f4f6fa'}
                metalness={on ? 0.35 : 0.1}
                roughness={on ? 0.25 : 0.35}
                clearcoat={1}
                clearcoatRoughness={0.1}
                emissive={on ? '#365cf5' : '#000000'}
                emissiveIntensity={on ? 0.45 : 0}
              />
            </mesh>
            {labelsReady && (
              <Html center position={[0, -0.5, 0]} style={{ pointerEvents: 'none' }}>
                <span
                  className={`block rounded-full px-3 py-1 text-[13px] font-medium whitespace-nowrap shadow-sm transition-colors duration-300 ${
                    on ? 'bg-accent text-white' : 'bg-card text-neutral border-border border'
                  }`}>
                  {labels[id]}
                </span>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

export default function ArchitectureScene({ labels, active, onSelect, running }: SceneProps) {
  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true">
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#c7d2ff" />
      <Graph labels={labels} active={active} onSelect={onSelect} />
    </Canvas>
  )
}
