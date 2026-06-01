'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 4, label: 'Live projects' },
  { num: 5, label: 'Disciplines' },
  { num: 22, label: 'Tools mastered' },
  { num: 97, label: 'Lighthouse avg' },
]

const skillBars = [
  { label: 'React', pct: 90 },
  { label: 'Tailwind', pct: 92 },
  { label: 'JavaScript', pct: 88 },
  { label: 'Python', pct: 78 },
  { label: 'UI/UX Design', pct: 85 },
  { label: 'Figma', pct: 82 },
  { label: 'GenAI / LLMs', pct: 80 },
  { label: 'Prompt Eng.', pct: 84 },
]

const techStack = [
  { row: 'Languages', tags: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
  { row: 'Frameworks & Libraries', tags: ['React', 'Tailwind', 'Pandas', 'NumPy', 'Scikit-learn', 'NLTK'] },
  { row: 'Tools & Platforms', tags: ['Figma', 'Vercel', 'Git', 'GitHub', 'Power BI', 'Canva', 'Excel'] },
  { row: 'AI & GenAI', tags: ['Gemini', 'Claude', 'OpenAI', 'Prompt Engineering'] },
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let start = 0
        const duration = 1500
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
    })
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-portrait',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-portrait', start: 'top 75%' }
        }
      )
      gsap.fromTo('.about-bio',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-bio', start: 'top 75%' }
        }
      )
    }, sectionRef)

    // Skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill') as NodeListOf<HTMLElement>
          fills.forEach((fill) => {
            const pct = fill.dataset.pct || '0'
            fill.style.width = `${pct}%`
          })
          observer.disconnect()
        }
      })
    }, { threshold: 0.3 })

    if (barsRef.current) observer.observe(barsRef.current)
    return () => { ctx.revert(); observer.disconnect() }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 relative">
      {/* Ambient orb */}
      <div className="ambient-orb w-72 h-72 bg-ember/6 top-1/4 right-0" style={{ position: 'absolute' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-3">— About</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold text-bone leading-tight">
            Designed end-to-end.<br />
            <span className="italic text-ember">Built with intention.</span>
          </h2>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Portrait card */}
          <div
            className="about-portrait opacity-0 glass rounded-2xl overflow-hidden relative"
            style={{ aspectRatio: '4/5', maxWidth: 420 }}
          >
            <div className="metal-sheen rounded-2xl" />

            {/* Corner brackets — always visible */}
            <div className="corner-bracket corner-bracket-tl" style={{ opacity: 1, borderColor: 'var(--ember)' }} />
            <div className="corner-bracket corner-bracket-tr" style={{ opacity: 1, borderColor: 'var(--ember)' }} />
            <div className="corner-bracket corner-bracket-bl" style={{ opacity: 1, borderColor: 'var(--ember)' }} />
            <div className="corner-bracket corner-bracket-br" style={{ opacity: 1, borderColor: 'var(--ember)' }} />

            {/* Top metadata */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="font-mono text-[9px] tracking-widest text-graphite">Profile · 001</span>
              <div className="flex items-center gap-1.5">
                <div className="availability-dot" />
                <span className="font-mono text-[9px] tracking-widest text-graphite">Live</span>
              </div>
            </div>

            {/* Monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(243,117,18,0.3) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="relative z-10 flex items-end">
                <span className="font-display font-bold text-[10rem] leading-none text-bone select-none" style={{ letterSpacing: '-0.04em' }}>
                  H
                </span>
                <span className="font-display font-bold italic text-[10rem] leading-none text-ember select-none -ml-6" style={{ letterSpacing: '-0.04em' }}>
                  G
                </span>
              </div>
              {/* Ambient glow under monogram */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ember/10 to-transparent" />
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-carbon/90 to-transparent z-10">
              <p className="font-mono text-[9px] tracking-widest text-graphite uppercase leading-relaxed">
                Based in India / Open to collaborations · NSUT · 2024
              </p>
            </div>
          </div>

          {/* Bio + skills */}
          <div className="about-bio opacity-0">
            {/* Bio */}
            <div className="mb-8 space-y-4">
              <p className="font-geist text-[15px] leading-relaxed text-bone/90">
                I&apos;m a Computer Science graduate from NSUT, currently a Content R&amp;D Trainee at{' '}
                <span className="text-ember font-medium">PhysicsWallah</span>, where I help ship live, customer-facing learning products.
              </p>
              <p className="font-geist text-[15px] leading-relaxed text-graphite-600">
                My focus is the intersection of design and engineering — building interfaces that are intuitive, performant, and delightful to use. I care about the details that most people overlook.
              </p>
              <p className="font-geist text-[15px] leading-relaxed text-graphite-600">
                Comfortable across the stack: from Figma wireframes to production React apps, AI-integrated tools to data dashboards. I move fast and ship clean.
              </p>
            </div>

            {/* Animated stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <div className="font-display text-3xl font-bold text-ember mb-1">
                    <AnimatedCounter target={stat.num} />
                  </div>
                  <div className="font-mono text-[9px] tracking-widest text-graphite uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-4">— Tech Stack</span>
              <div className="space-y-3">
                {techStack.map(({ row, tags }) => (
                  <div key={row} className="flex flex-wrap items-start gap-2">
                    <span className="font-mono text-[9px] tracking-widest text-graphite uppercase w-36 flex-shrink-0 pt-1">{row}</span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="pill-tag hover:border-ember/50 hover:text-ember/80 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill bars */}
            <div ref={barsRef}>
              <span className="font-mono text-[10px] tracking-widest text-ember uppercase block mb-4">— Proficiency</span>
              <div className="space-y-3">
                {skillBars.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-[10px] tracking-wide text-graphite">{skill.label}</span>
                      <span className="font-mono text-[10px] text-ember">{skill.pct}%</span>
                    </div>
                    <div className="h-px bg-graphite-300 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill"
                        data-pct={skill.pct}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
