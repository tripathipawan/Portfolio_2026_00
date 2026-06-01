'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'view'>('default')

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    const animate = () => {
      dotX = lerp(dotX, mouseX, 0.9)
      dotY = lerp(dotY, mouseY, 0.9)
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(animate)
    }

    const handleMouseEnter = (e: Event) => {
      const el = e.target as HTMLElement
      if (el.dataset.cursorView) setCursorState('view')
      else if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.dataset.cursorHover) {
        setCursorState('hover')
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.dataset.cursorText) {
        setCursorState('text')
      }
    }
    const handleMouseLeave = () => setCursorState('default')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor-hover], [data-cursor-view], input, textarea').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor-hover], [data-cursor-view], input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  const isView = cursorState === 'view'
  const isHover = cursorState === 'hover'
  const isText = cursorState === 'text'

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: isText ? 2 : 6,
          height: isText ? 20 : 6,
          borderRadius: isText ? 1 : '50%',
          backgroundColor: '#F2F2EC',
          transition: 'width 0.15s ease, height 0.15s ease, border-radius 0.15s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: isView ? 80 : isHover ? 48 : 36,
          height: isView ? 80 : isHover ? 48 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${isHover || isView ? '#F37512' : 'rgba(242,242,236,0.5)'}`,
          backgroundColor: isView ? 'rgba(243,117,18,0.08)' : 'transparent',
          transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, background-color 0.2s ease',
          willChange: 'transform',
        }}
      >
        {isView && (
          <span
            ref={labelRef}
            className="text-ember font-mono text-[9px] tracking-widest uppercase"
          >
            VIEW
          </span>
        )}
      </div>
    </>
  )
}
