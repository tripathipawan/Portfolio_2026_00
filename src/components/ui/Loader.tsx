'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => setDone(true), 200)
        setTimeout(() => setHidden(true), 900)
      }
      setProgress(Math.min(p, 100))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{
        background: 'var(--carbon)',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'all',
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Rotating diamond */}
      <div className="relative mb-10">
        <div
          className="w-12 h-12 border-2 border-ember"
          style={{
            transform: 'rotate(45deg)',
            animation: 'spin 1.6s linear infinite',
          }}
        />
        <div
          className="absolute inset-1 border border-ember/30"
          style={{ transform: 'rotate(45deg)', animation: 'spin 2.4s linear infinite reverse' }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-graphite-300 relative mb-4 overflow-hidden rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-ember rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 0.1s ease',
            boxShadow: '0 0 10px var(--ember)',
          }}
        />
      </div>

      {/* Progress label */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-graphite tracking-widest uppercase">Loading</span>
        <span className="font-mono text-xs text-ember">{Math.round(progress)}%</span>
      </div>

      {/* Name */}
      <div className="mt-8 font-display text-xs tracking-[0.3em] text-graphite uppercase">
        Pawan Tripathi
      </div>
    </div>
  )
}
