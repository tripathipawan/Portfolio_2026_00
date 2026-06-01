'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { num: '01', label: 'Work', href: '#projects' },
  { num: '02', label: 'Services', href: '#services' },
  { num: '03', label: 'About', href: '#about' },
  { num: '04', label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prevY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      prevY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(href)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[500] transition-all duration-500"
        style={{
          width: scrolled ? 'auto' : 'calc(100% - 48px)',
          maxWidth: 1200,
        }}
      >
        <div
          className="glass flex items-center justify-between gap-6 transition-all duration-500"
          style={{
            padding: scrolled ? '8px 20px' : '12px 24px',
            borderRadius: 100,
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div
              className="w-7 h-7 border border-ember flex items-center justify-center flex-shrink-0"
              style={{
                transform: 'rotate(45deg)',
                animation: 'spin 10s linear infinite',
              }}
            >
              <div
                className="w-2.5 h-2.5 bg-ember"
                style={{ transform: 'rotate(-45deg)' }}
              />
            </div>
            {!scrolled && (
              <span className="font-mono text-[10px] tracking-widest text-graphite uppercase hidden sm:block">
                Pawan Tripathi / <span className="text-ember">PORTFOLIO</span>
              </span>
            )}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.num}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-graphite hover:text-bone transition-colors group"
              >
                <span className="font-mono text-[9px] text-ember group-hover:text-ember">{item.num}</span>
                <span className="font-geist text-xs tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="magnetic-btn hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-bone text-carbon font-mono text-[10px] tracking-wider uppercase hover:bg-ember hover:text-bone transition-colors flex-shrink-0"
          >
            <div className="btn-sweep" />
            Start a project →
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-bone transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-px bg-bone transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-bone transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[499] glass-dark flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center gap-4 group"
                >
                  <span className="font-mono text-sm text-ember">{item.num}</span>
                  <span className="font-display text-5xl text-bone group-hover:text-ember transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNavClick('#contact')}
                className="mt-4 px-8 py-3 rounded-full bg-ember text-carbon font-mono text-sm tracking-wider"
              >
                Start a project →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
