'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const marqueeItems = [
  'Open to collaborations',
  '·',
  'Let\'s build something incredible',
  '·',
  'Available for projects',
  '·',
  'UI/UX · Dev · GenAI',
  '·',
  'Based in India',
  '·',
  'Open to collaborations',
  '·',
  'Let\'s build something incredible',
  '·',
  'Available for projects',
  '·',
  'UI/UX · Dev · GenAI',
  '·',
  'Based in India',
  '·',
]

export default function FooterSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    // Marquee animation
    const marquee = marqueeRef.current;
    const marqueeContent = marquee.querySelector('[data-marquee-content]');

    if (marqueeContent) {
      gsap.to(marqueeContent, {
        x: -marqueeContent.clientWidth,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);



  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordmarkRef.current) {
        gsap.fromTo(wordmarkRef.current,
          { scale: 0.8, opacity: 0.3 },
          {
            scale: 1.05,
            opacity: 0.06,
            ease: 'none',
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    });
    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-graphite-200">
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="overflow-hidden py-12 border-b border-graphite"
      >
        <div data-marquee-content className="flex gap-8 whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-4xl lg:text-5xl font-display font-bold text-bone/20"
            >
              Open to collaborations · Let's build something incredible ·
            </span>
          ))}
        </div>~
      </div>

      {/* Mega wordmark */}
      <div className="relative py-16 px-6 md:px-12 overflow-hidden">
        <div
          ref={wordmarkRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.06 }}
        >
          <span className="font-display font-bold text-[clamp(4rem,15vw,14rem)] text-bone whitespace-nowrap leading-none">
            Pawan Tripathi
          </span>
        </div>

        {/* Content over wordmark */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Diamond logo */}
          <div
            className="w-12 h-12 border-2 border-ember flex items-center justify-center mb-8"
            style={{ transform: 'rotate(45deg)' }}
          >
            <div className="w-4 h-4 bg-ember" style={{ transform: 'rotate(-45deg)' }} />
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-bold text-bone mb-2">
            Pawan Tripathi
          </h2>
          <p className="font-mono text-[11px] tracking-[0.3em] text-graphite uppercase mb-8">
            React Developer &amp; TypeScript Developer
          </p>

          <div className="flex items-center gap-2 mb-12">
            <div className="availability-dot" />
            <span className="font-mono text-[10px] tracking-widest text-graphite uppercase">
              Built with care
            </span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12">
            {[
              { label: 'LinkedIn', url: 'https://linkedin.com/in/harsh-goyal-7900b2256' },
              { label: 'GitHub', url: 'https://github.com/harshgoyal27' },
              { label: 'Instagram', url: 'https://instagram.com/harshgoyal_27' },
              { label: 'Email', url: 'mailto:goyalharsh642@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest text-graphite hover:text-ember transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-graphite-200 px-6 md:px-12 py-4 flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[10px] tracking-widest text-graphite">
          © 2024 Pawan Tripathi · All rights reserved
        </span>

        <div className="flex items-center gap-6">
          <a href="#" className="font-mono text-[10px] tracking-widest text-graphite hover:text-bone transition-colors">
            Privacy
          </a>
          <a href="#" className="font-mono text-[10px] tracking-widest text-graphite hover:text-bone transition-colors">
            Imprint
          </a>
          <button
            onClick={scrollToTop}
            className="font-mono text-[10px] tracking-widest text-ember hover:text-ember-light transition-colors uppercase"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
