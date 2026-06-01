'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'Forge',
    year: '2024',
    category: 'Personal',
    desc: 'A personal toolkit and productivity workspace — built with Next.js and TypeScript, focusing on clean UI and fast interactions.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    url: 'https://pawantripathi.vercel.app/',
    pattern: 'grid',
    accent: '#F37512',
    accentDim: 'rgba(243,117,18,0.12)',
  },
  {
    num: '02',
    title: 'LawLab',
    year: '2024',
    category: 'Personal',
    desc: 'A legal research assistant interface for rapid document analysis and clause extraction using AI-powered tooling.',
    tech: ['React', 'Tailwind', 'GenAI'],
    url: 'https://pawantripathi.vercel.app',
    pattern: 'lines',
    accent: '#F2F2EC',
    accentDim: 'rgba(242,242,236,0.08)',
  },
  {
    num: '03',
    title: 'ResumeIQ',
    year: '2024',
    category: 'Personal · GenAI',
    desc: 'AI-powered resume analyzer and optimizer. Integrates LLMs to score, rewrite, and tailor resumes for job descriptions.',
    tech: ['React', 'Gemini API', 'Python'],
    url: 'https://pawantripathi.vercel.app',
    pattern: 'circles',
    accent: '#c0392b',
    accentDim: 'rgba(192,57,43,0.12)',
  },
  {
    num: '04',
    title: 'Notch',
    year: '2024',
    category: 'Personal · Design',
    desc: 'A polished design showcase and interactive UI component library — built for demonstration of advanced animation and interaction patterns.',
    tech: ['Next.js', 'Framer Motion', 'Figma'],
    url: 'https://pawantripathi.vercel.app',
    pattern: 'mesh',
    accent: '#c0693a',
    accentDim: 'rgba(192,105,58,0.12)',
  },
]

function PatternBg({ pattern, accent }: { pattern: string; accent: string }) {
  const opacity = 0.5

  if (pattern === 'grid') {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity,
        }}
      />
    )
  }
  if (pattern === 'lines') {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, ${accent}18 19px)`,
          opacity,
        }}
      />
    )
  }
  if (pattern === 'circles') {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${accent}28 1.5px, transparent 1.5px)`,
          backgroundSize: '22px 22px',
          opacity,
        }}
      />
    )
  }
  // mesh
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accent} strokeWidth="0.4" strokeOpacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh)" />
    </svg>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-view
      className="relative flex-shrink-0 w-[85vw] sm:w-[520px] lg:w-[500px] h-[58vh] min-h-[440px] max-h-[600px] rounded-2xl overflow-hidden group"
      style={{ background: 'var(--graphite-100)', border: '1px solid var(--graphite-300)' }}
    >
      {/* Pattern background */}
      <PatternBg pattern={project.pattern} accent={project.accent} />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${project.accentDim}, rgba(5,5,5,0.92))` }}
      />

      {/* Corner brackets */}
      <div className="corner-bracket corner-bracket-tl" style={{ opacity: 0, transition: 'opacity 0.3s ease' }} />
      <div className="corner-bracket corner-bracket-tr" style={{ opacity: 0, transition: 'opacity 0.3s ease' }} />
      <div className="corner-bracket corner-bracket-bl" style={{ opacity: 0, transition: 'opacity 0.3s ease' }} />
      <div className="corner-bracket corner-bracket-br" style={{ opacity: 0, transition: 'opacity 0.3s ease' }} />

      {/* Content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-between">
        {/* Top */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-graphite">{project.num}/04</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-graphite">{project.year}</span>
            <span className="pill-tag" style={{ borderColor: `${project.accent}40`, color: project.accent }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-bone leading-none mb-4 group-hover:text-ember transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-geist text-sm text-graphite-600 leading-relaxed mb-5 max-w-xs">
            {project.desc}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="pill-tag" style={{ borderColor: `${project.accent}30` }}>{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
              <div
                className="w-6 h-px transition-all group-hover:w-10"
                style={{ background: project.accent }}
              />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: project.accent }}>
                Live project →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent}15, transparent 60%)` }}
      />
    </a>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    const wrap = wrapRef.current
    if (!section || !rail || !wrap) return

    const isMobile = window.innerWidth < 768

    if (!isMobile) {
      // Horizontal scroll on desktop
      const getScrollAmount = () => -(rail.scrollWidth - window.innerWidth + 96)

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${rail.scrollWidth - window.innerWidth + 96}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.to(rail, { x: () => getScrollAmount(), ease: 'none' })
      }, section)

      return () => ctx.revert()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="flex flex-col h-full" style={{ minHeight: '100vh' }}>
        {/* Section title — in normal flow, not absolute */}
        <div className="flex items-end justify-between px-6 md:px-12 pt-24 pb-10 flex-wrap gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-3">— Selected Work</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold text-bone leading-tight">
              Things I&apos;ve <span className="italic text-ember">built</span>.
            </h2>
          </div>
          <p className="font-geist text-sm text-graphite-600 max-w-xs">
            Live projects — shipped and running in the wild.
          </p>
        </div>

        {/* Horizontal scroll rail */}
        <div ref={wrapRef} className="flex-1 flex items-center overflow-hidden">
          <div
            ref={railRef}
            className="flex items-center gap-6 px-6 md:px-12 md:flex-nowrap flex-wrap"
            style={{ willChange: 'transform' }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.num} project={p} />
            ))}

            {/* More CTA card */}
            <div
              className="relative flex-shrink-0 w-[85vw] sm:w-[300px] h-[58vh] min-h-[440px] max-h-[600px] rounded-2xl overflow-hidden flex flex-col items-center justify-center"
              style={{ border: '1px dashed var(--graphite-400)' }}
            >
              <div className="text-center p-8">
                <div className="w-12 h-12 border border-ember/40 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-ember text-lg">+</span>
                </div>
                <p className="font-display text-2xl font-bold text-graphite-600 mb-2">More on</p>
                <p className="font-display text-2xl font-bold italic text-ember">the way</p>
                <p className="font-mono text-[10px] tracking-widest text-graphite mt-4 uppercase">Stay tuned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hidden md:flex items-center gap-2 px-12 pb-6">
          <span className="font-mono text-[10px] tracking-widest text-graphite uppercase">Scroll to explore</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-graphite-400" />
            <div className="w-2 h-2 rounded-full bg-ember" />
            <div className="w-2 h-2 rounded-full bg-graphite-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
