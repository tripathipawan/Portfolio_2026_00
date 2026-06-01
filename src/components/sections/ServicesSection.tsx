'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'UI/UX Design',
    desc: 'Designing clean, intuitive interfaces that prioritise user flow, hierarchy, and visual clarity',
    caps: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing'],
    icon: '◈',
  },
  {
    num: '02',
    title: 'Front-end Development',
    desc: 'Building responsive, performant web apps with React, TypeScript, and Tailwind',
    caps: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP'],
    icon: '⌬',
  },
  {
    num: '03',
    title: 'GenAI Integration',
    desc: 'Wiring large language models into real products via Gemini, Claude, and OpenAI APIs',
    caps: ['Gemini API', 'OpenAI', 'Claude API', 'LangChain', 'RAG'],
    icon: '◎',
  },
  {
    num: '04',
    title: 'Prompt Engineering',
    desc: 'Crafting reliable prompts and automation flows for consistent, production-grade AI outputs',
    caps: ['Chain-of-thought', 'Few-shot', 'Automation', 'LLM Pipelines'],
    icon: '⟡',
  },
  {
    num: '05',
    title: 'Data Analysis',
    desc: 'Exploring datasets with Python (Pandas, NumPy, Seaborn) and Power BI dashboards',
    caps: ['Pandas', 'NumPy', 'Seaborn', 'Power BI', 'SQL'],
    icon: '◬',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotY = ((x - cx) / cx) * 8
    const rotX = -((y - cy) / cy) * 6
    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(243,117,18,0.12), transparent 70%)`
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card relative glass rounded-2xl p-6 overflow-hidden group cursor-default"
      style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d' }}
    >
      {/* Radial spotlight */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-300" />

      {/* Metal sheen */}
      <div className="metal-sheen rounded-2xl" />

      {/* Corner brackets */}
      <div className="corner-bracket corner-bracket-tl" />
      <div className="corner-bracket corner-bracket-tr" />
      <div className="corner-bracket corner-bracket-bl" />
      <div className="corner-bracket corner-bracket-br" />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <span className="font-mono text-[10px] tracking-widest text-ember">{service.num}</span>
        <span className="text-2xl text-graphite-400 group-hover:text-ember transition-colors">{service.icon}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-bold text-bone mb-3 relative z-10 group-hover:text-ember transition-colors duration-300">
        {service.title}
      </h3>

      {/* Desc */}
      <p className="font-geist text-sm text-graphite-600 leading-relaxed mb-5 relative z-10">
        {service.desc}
      </p>

      {/* Capabilities pills */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {service.caps.map((cap) => (
          <span key={cap} className="pill-tag group-hover:border-ember/40 group-hover:text-graphite-500 transition-colors">
            {cap}
          </span>
        ))}
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-ember transition-all duration-500" />
    </div>
  )
}

function CTACard() {
  const handleScrollTo = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#contact')
    }
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ background: 'linear-gradient(135deg, rgba(243,117,18,0.15), rgba(243,117,18,0.05))' , border: '1px solid rgba(243,117,18,0.25)' }}
      onClick={handleScrollTo}
    >
      <div className="p-6 h-full flex flex-col justify-between min-h-[200px]">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-ember">06</span>
          <h3 className="font-display text-2xl font-bold text-bone mt-4 mb-3">
            Have something<br />
            <span className="italic text-ember">else in mind?</span>
          </h3>
          <p className="font-geist text-sm text-graphite-600">Let&apos;s talk about your project.</p>
        </div>
        <div className="flex items-center gap-2 mt-6 group-hover:gap-4 transition-all">
          <span className="font-mono text-[11px] tracking-widest text-ember uppercase">Get in touch</span>
          <span className="text-ember transition-transform group-hover:translate-x-2">→</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-ember/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-title', start: 'top 80%' }
        }
      )
      gsap.fromTo('.service-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.service-card', start: 'top 85%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="services-title flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-3">— Services</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold text-bone leading-tight">
              What I <span className="italic text-ember">build</span>.
            </h2>
          </div>
          <p className="font-geist text-sm text-graphite-600 max-w-xs">
            End-to-end digital product creation — from pixels to production.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
          <CTACard />
        </div>
      </div>
    </section>
  )
}
