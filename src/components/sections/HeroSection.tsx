'use client'

import { useEffect, useRef, Suspense, lazy } from 'react'
import { gsap } from 'gsap'

const HeroThreeScene = lazy(() => import('../three/HeroThreeScene'))

function SplitHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll('.split-char')
    gsap.fromTo(chars,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, stagger: 0.04, duration: 0.9, ease: 'power3.out', delay: 1.2 }
    )
  }, [])

  // "Crafting Digital Experiences."
  const words = [
    { text: 'Crafting ', italic: false, ember: false },
    { text: 'Digital', italic: true, ember: true },
    { text: ' Experiences.', italic: false, ember: false },
  ]

  return (
    <h1
      ref={ref}
      className="font-display font-bold leading-[1.0] text-[clamp(2.8rem,6vw,6rem)] text-bone"
      style={{ overflowVisible: 'visible' } as React.CSSProperties}
    >
      {words.map((word, wi) =>
        word.text.split('').map((char, ci) => (
          <span
            key={`${wi}-${ci}`}
            className="split-word"
            style={{ display: 'inline-block' }}
          >
            <span
              className={`split-char ${word.italic ? 'italic' : ''} ${word.ember ? 'text-ember' : ''}`}
              style={{ display: 'inline-block', paddingBottom: '0.12em' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))
      )}
    </h1>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-eyebrow',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.8, ease: 'power2.out' }
      )
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.8, ease: 'power2.out' }
      )
      gsap.fromTo('.hero-ctas',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.1, ease: 'power2.out' }
      )
      gsap.fromTo('.hero-stats',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 2.4, ease: 'power2.out' }
      )
      gsap.fromTo('.hero-meta',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(href)
    }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden grid-bg"
    >
      {/* Ambient orbs */}
      <div className="ambient-orb w-96 h-96 bg-ember/8 -top-24 -left-24" style={{ position: 'absolute' }} />
      <div className="ambient-orb w-64 h-64 bg-ember/5 top-1/3 right-1/4" style={{ position: 'absolute' }} />

      {/* Top metadata strip */}
      <div className="hero-meta opacity-0 flex items-center justify-between px-6 md:px-12 pt-28 pb-0">
        <span className="font-mono text-[10px] tracking-[0.2em] text-graphite uppercase">
          Pawan Tripathi · Portfolio
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-graphite uppercase hidden sm:block">
          2024–2025 Index
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-graphite uppercase hidden md:block">
          Designed · Built · Shipped
        </span>
      </div>

      {/* Main hero content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center relative px-6 md:px-12 pt-8 pb-6">
        {/* Left column */}
        <div ref={contentRef} className="flex-1 flex flex-col justify-center max-w-2xl">
          {/* Eyebrow */}
          <div className="hero-eyebrow opacity-0 flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-ember" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-ember uppercase">
              — Web Developer &amp; UI/UX Designer
            </span>
          </div>

          {/* Headline */}
          <div style={{ overflow: 'visible', paddingBottom: '0.2em' }}>
            <SplitHeadline />
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle opacity-0 mt-6 font-geist text-[15px] leading-relaxed text-graphite-600 max-w-lg">
            Computer Science graduate from NSUT, currently shipping live learning products at{' '}
            <span className="text-ember">PhysicsWallah</span>. UI/UX, front-end development, and GenAI integration —
            turning rough ideas into clean, engaging digital experiences.
          </p>

          {/* Availability */}
          <div className="hero-subtitle opacity-0 flex items-center gap-2 mt-4">
            <div className="availability-dot" />
            <span className="font-mono text-[10px] tracking-widest text-graphite uppercase">
              Available for collaboration
            </span>
          </div>

          {/* CTAs */}
          <div className="hero-ctas opacity-0 flex items-center gap-4 mt-8">
            <button
              onClick={() => scrollTo('#projects')}
              className="magnetic-btn group relative flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-carbon font-mono text-[11px] tracking-widest uppercase overflow-hidden"
              data-cursor-hover
            >
              <div className="btn-sweep" />
              <span className="relative z-10">View Projects</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="magnetic-btn flex items-center gap-2 px-7 py-3.5 rounded-full border border-graphite-400 text-bone font-mono text-[11px] tracking-widest uppercase hover:border-ember hover:text-ember transition-colors"
              data-cursor-hover
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right column — video + Three.js overlay */}
        <div className="relative w-full lg:w-auto lg:flex-1 h-[40vh] lg:h-[75vh] mt-8 lg:mt-0 max-w-lg mx-auto lg:mx-0">
          {/* Transparent video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain z-10"
            style={{ mixBlendMode: 'normal' }}
          >
            <source src="/hero-developer.webm" type="video/webm" />
            <source src="/hero-developer.mp4" type="video/mp4" />
          </video>

          {/* Fallback illustration when no video */}
          <div className="absolute inset-0 flex items-center justify-center z-5">
            <div className="relative w-64 h-64 opacity-20">
              <div className="absolute inset-0 border border-ember/30 rounded-full animate-pulse" />
              <div className="absolute inset-8 border border-ember/20 rounded-full" style={{ animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-16 bg-ember/10 rounded-full blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-7xl font-bold text-ember/30">PT</span>
              </div>
            </div>
          </div>

          {/* Three.js particles overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <Suspense fallback={null}>
              <HeroThreeScene />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Stat bar */}
      <div className="hero-stats opacity-0 border-t border-graphite-200 mx-6 md:mx-12 mb-6 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {[
            { num: '04', label: 'Live projects' },
            { num: '05', label: 'Disciplines' },
            { num: '22', label: 'Tools & techs' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-ember">{stat.num}</span>
              <span className="font-mono text-[10px] tracking-widest text-graphite uppercase">{stat.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <span className="font-mono text-[10px] tracking-widest text-graphite">Scroll to explore</span>
            <div className="flex flex-col gap-0.5">
              <div className="w-px h-4 bg-ember mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
