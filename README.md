# 🌐 Portfolio 2026.00 — Pawan Tripathi

A premium, cinematic-grade personal portfolio built with **Next.js 14**, **TypeScript**, **Three.js / React Three Fiber**, **GSAP**, **Framer Motion**, and **Lenis** — featuring a WebGL scene with 200 dust particles + 3 orbiting octahedron satellites + mouse-reactive camera rig, a lerp-based custom cursor with `MutationObserver` for dynamic element tracking, a CSS-only vertical scroll progress bar, a GSAP-scrubbed horizontal project rail, animated `ScrollTrigger` counters via `requestAnimationFrame`, a cinematic `body::after` vignette, and a fully typed `schema.org` JSON-LD `Person` schema. Design system built on carbon `#050505`, ember `#F37512`, bone `#F2F2EC`, with Fraunces, Geist, and JetBrains Mono as the type foundation.

---

## 📌 Overview

This portfolio is the 2026.00 edition of Pawan Tripathi's professional showcase — a complete, ground-up build in Next.js 14 App Router with a cinematic aesthetic. Every interaction and visual detail is intentional: scroll momentum is physics-based via Lenis, the cursor uses a pure linear-interpolation (lerp) RAF loop entirely outside React state, the hero headline splits each character into an individual `<span>` for a GSAP per-character stagger animation, and the projects section pins the page and scrolls cards horizontally using GSAP's `ScrollTrigger` scrub.

The design language combines a multi-step graphite scale (`graphite-100` through `graphite-600`) with an ember accent palette, and lays CSS custom properties directly alongside Tailwind classes. A global `body::before` noise grain and a `body::after` radial vignette give the site a film-like depth no screenshot fully captures.

---

## ✨ Features

### 🖱️ Custom Cursor — Lerp RAF Architecture
- **Pure lerp outside React** — `CustomCursor` in `src/components/ui/CustomCursor.tsx` runs a standalone `requestAnimationFrame` loop with linear interpolation: dot at `lerp factor 0.9` (snappy), ring at `lerp factor 0.12` (heavy lag). Position state lives in plain `let` variables — zero React re-renders per frame.
- **4 cursor states** — `default` (6px bone dot + 36px semi-transparent ring), `hover` (ember ring expands to 48px on `<a>`, `<button>`, `[data-cursor-hover]`), `text` (2×20px bar shape on `<input>`, `<textarea>`, `[data-cursor-text]`), `view` (80px ember ring + "VIEW" label on `[data-cursor-view]` elements).
- **`MutationObserver` for dynamic elements** — A `MutationObserver` watches `document.body` with `{ childList: true, subtree: true }`, re-attaching event listeners whenever new `<a>`, `<button>`, or data-attribute elements are added to the DOM — ensuring cursor state works on dynamically rendered content.
- **`(pointer: coarse)` bypass** — Checked on mount via `window.matchMedia`; the entire cursor system is skipped and native cursor restored on touch devices.
- **`mix-blend-difference`** on the dot for automatic color inversion over light backgrounds.

### 🌊 Lenis Smooth Scroll + GSAP Sync
- **Physics easing** — `SmoothScrollProvider` initialises Lenis with `duration: 1.4`, custom exponential easing `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `wheelMultiplier: 0.9`, and `touchMultiplier: 1.5` for a different drag feel on mobile.
- **`gsap.ticker.lagSmoothing(0)`** — Disables GSAP's built-in lag compensation so Lenis momentum stays smooth under CPU load. Combined with `gsap.ticker.add(time => lenis.raf(time * 1000))` and `lenis.on('scroll', ScrollTrigger.update)`, the three systems (Lenis, GSAP, ScrollTrigger) all tick from a single RAF loop.
- **`window.__lenis` typed global** — A `declare global { interface Window { __lenis: Lenis } }` declaration makes the Lenis instance available site-wide. Hero CTAs, Nav links, Services CTA card, and Footer back-to-top all call `window.__lenis.scrollTo(href)`.
- **`prefers-reduced-motion` guard** — Lenis is skipped entirely when the OS accessibility setting is active.

### 🔲 WebGL Three.js Hero Scene — 3 Distinct Sub-Systems
All three sub-systems are composed inside a single `<Canvas>` in `src/components/three/HeroThreeScene.tsx`, lazily imported with React `Suspense` to avoid blocking the hero render.

1. **`DustParticles` — 200-particle system with individual velocities** — Positions and per-particle velocities are computed once in `useMemo` (200 × 3 Float32Arrays). On every `useFrame` tick, each particle X/Y position is advanced by its velocity plus a `Math.sin(clock.getElapsedTime() * 0.3 + i) * 0.0003` sinusoidal vertical drift. Particles wrap at ±5 units — creating a seamless floating dust effect without resetting position to origin.

2. **`GeometricSatellite` — 3 orbiting wireframe octahedra** — Each satellite follows an elliptical orbit: `x = cos(t * speed) * radius`, `y = sin(t * 0.7 * speed) * radius * 0.5`, `z = sin(t * speed) * radius * 0.3`. The `0.7` Y multiplier creates an elliptical rather than circular orbit. Each mesh also `rotation.x += 0.01` and `rotation.y += 0.008` per frame for continuous self-rotation. Satellites are desktop-only — skipped when `window.innerWidth < 768`.

3. **`CameraRig` — Mouse-reactive camera** — Tracks normalized mouse position `(-1 to +1)` and every frame moves the camera with `camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05` — a lerp with 5% convergence, giving a subtle parallax as the mouse moves. `camera.lookAt(0, 0, 0)` keeps the scene centered. Also desktop-only.

- **DPR capped per device** — `dpr={Math.min(devicePixelRatio, isMobile ? 1.5 : 2)}` caps pixel ratio on mobile to 1.5 for performance.

### 📜 Hero Section — Sequenced GSAP Timeline
- **Per-character split headline** — `SplitHeadline` maps every character of "Crafting Digital Experiences." into its own `<span class="split-char">`. GSAP animates all chars with `{ y: '110%', opacity: 0 } → { y: '0%', opacity: 1, stagger: 0.04 }` — the chars slide up from below, with `delay: 1.2` to run after the page loader clears.
- **Staggered element reveal sequence** — 5 separate `gsap.fromTo` calls inside a `gsap.context()`: eyebrow (delay 0.8s), subtitle (1.8s), CTAs (2.1s), stats (2.4s), meta strip (0.5s) — creating a deliberate orchestrated entry animation.
- **`gsap.context(() => {}, sectionRef).revert()`** — All GSAP animations are scoped to the section's DOM tree and properly cleaned up on unmount.
- **Fallback visual** — When no hero video is found, a CSS-animated "PT" monogram with concentric pulsing/spinning rings renders as a placeholder.
- **Stat bar** — Bottom section shows `04 Live projects`, `05 Disciplines`, `22 Tools & techs` in Fraunces display font with ember numbers.

### 🗂️ Projects — GSAP Horizontal Scroll Rail
- **ScrollTrigger pin + scrub** — On desktop (`window.innerWidth >= 768`), `ProjectsSection` pins the entire section using `pin: true` in `ScrollTrigger`, then drives `gsap.to(railRef, { x: -(rail.scrollWidth - window.innerWidth + 96) })` with `scrub: 1`. The horizontal distance is calculated dynamically on each `invalidateOnRefresh` so it adapts to viewport resizes.
- **4 project cards + "More on the way" card** — Each card has a `PatternBg` (grid, lines, circles, or mesh CSS/SVG background), a gradient overlay fading to carbon, per-card accent color, corner brackets, category pill, tech tags, a line-expand "Live project →" indicator, and a hover radial glow.
- **`data-cursor-view`** — All project cards carry `data-cursor-view`, triggering the cursor's VIEW state while hovering.
- **Mobile fallback** — On mobile, the rail renders as a vertical `flex-wrap` list instead of the pinned horizontal rail.

### 🛎️ Services — Real-Time 3D Card Tilt + Radial Spotlight
- **Per-card mouse-tracking** — `ServiceCard` calculates rotation from `(mouseX - cardCenterX) / cardCenterX * 8` (Y rotation) and `-(mouseY - cardCenterY) / cardCenterY * 6` (X rotation), applying `perspective(1200px) rotateX rotateY scale(1.02)` directly to `card.style.transform` for zero React overhead.
- **Live radial spotlight** — `glowRef.current.style.background` is updated every `mousemove` to `radial-gradient(280px circle at ${x}px ${y}px, rgba(243,117,18,0.12), transparent 70%)` — the glow follows the cursor in real time.
- **Metal sheen + corner brackets** — Defined as CSS utility classes in `globals.css` (`.metal-sheen`, `.corner-bracket-tl/tr/bl/br`), applied consistently across services and projects.
- **Bottom accent line** — `width: 0 → width: 100%` CSS transition on `group-hover`, drawn as an absolute `bg-ember h-px` at the card base.
- **GSAP ScrollTrigger entry** — Cards stagger in with `{ opacity: 0, y: 50 } → { stagger: 0.1, ease: 'power3.out' }` when entering the viewport.
- **5 services + CTA card** — UI/UX Design, Front-end Development, GenAI Integration, Prompt Engineering, Data Analysis — each with a symbolic icon character (`◈`, `⌬`, `◎`, `⟡`, `◬`) and capability pills.

### 👤 About — `requestAnimationFrame` Counter + CSS Skill Bars
- **`AnimatedCounter` — rAF-based easing** — Each stat counter (`4 Live projects`, `5 Disciplines`, `22 Tools mastered`, `97 Lighthouse avg`) uses a standalone `requestAnimationFrame` loop with a cubic ease-out: `eased = 1 - (1 - progress)³`. The loop is triggered once by a `ScrollTrigger.create({ once: true, onEnter: ... })` when the counter enters the viewport.
- **CSS transition skill bars** — `IntersectionObserver` fires when the bars container reaches 30% viewport visibility, setting each `.skill-bar-fill`'s `style.width` from `data-pct` attribute value. The transition is handled purely by CSS `transition: width 0.8s ease` — no GSAP needed.
- **Full tech stack grid** — 4 rows (Languages, Frameworks & Libraries, Tools & Platforms, AI & GenAI) with `pill-tag` chips for 22+ individual technologies.
- **GSAP portrait + bio slide-in** — `.about-portrait` slides from `x: -50` and `.about-bio` from `x: 50` on scroll entry, creating a split open-book reveal.

### 📬 Contact — Multi-Select Chip Toggles + Floating Labels
- **Multi-select project type chips** — 6 chip-toggle buttons (UI/UX Design, Front-end Dev, GenAI Integration, Prompt Engineering, Data Analysis, Full-Stack) that toggle on/off independently. State stored as `string[]` in React; active chips apply `.chip-toggle.active` CSS class for ember fill.
- **Floating label inputs** — CSS-only floating label pattern using `:placeholder-shown` and `:focus` pseudo-classes. Labels animate from inside the input to an elevated position without any JavaScript.
- **`data-cursor-text`** — All `<input>` and `<textarea>` elements carry `data-cursor-text`, triggering the cursor's text-bar state.
- **Submit shimmer state** — While `sending` is true, a shimmer animation sweeps across the ember submit button. On success, a checkmark confirmation card replaces the form.
- **Social channels panel** — LinkedIn, GitHub, Instagram, WhatsApp listed as hover-animated rows with `↗` arrow indicator.
- **"Currently" info card** — A glass card displaying role, company (PhysicsWallah), education (NSUT), and collaboration status.

### 🦶 Footer
- **GSAP infinite marquee** — Same `gsap.to(content, { x: -clientWidth, duration: 20, repeat: -1, ease: 'none' })` technique as other sections — a 3-copy duplicated string for seamless loop.
- **ScrollTrigger parallax wordmark** — `gsap.fromTo(wordmarkRef, { scale: 0.8, opacity: 0.3 }, { scale: 1.05, opacity: 0.06, scrollTrigger: { scrub: true } })` — the oversized "Pawan Tripathi" wordmark subtly scales and fades as the user scrolls through the footer.
- **Diamond logo** — A filled-center rotated square (`rotate(45deg)`) with a counter-rotating inner square, matching the Nav logo motif.

### 📐 CSS Design System
- **Multi-step graphite scale** — `graphite-100` through `graphite-600` defined as both Tailwind tokens and CSS custom properties, enabling fine-grained contrast control across borders, text, and backgrounds.
- **`body::before` noise grain** — `feTurbulence` SVG noise at `baseFrequency: 0.9`, 4 octaves, `opacity: 0.04`, `mix-blend-mode: overlay`, `z-index: 9998` — subtle film grain that gives depth to flat carbon backgrounds.
- **`body::after` cinematic vignette** — `radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.6) 100%)` at `z-index: 9997` — darkens corners for a cinematic focus effect.
- **`scroll-behavior: auto`** — Explicitly set so browser native smooth scroll doesn't conflict with Lenis.
- **Vertical scroll progress bar** — `ScrollProgress` renders a fixed `2px × 80px` graphite track on the right edge (desktop only via `hidden lg:block`), filled with an ember bar driven by a `passive: true` scroll listener.
- **`.glass` and `.glass-dark`** — `background: rgba(26,26,26,0.7)` + `backdrop-filter: blur(20px)` and `rgba(5,5,5,0.8)` + `blur(24px)` respectively — two tiers of glass surface for different hierarchy levels.
- **`cursor: none`** on `body` — Hands all cursor rendering to `CustomCursor`.
- **3px ember scrollbar** — `::-webkit-scrollbar-thumb { background: var(--ember) }` on a `3px` track.
- **Ember `::selection`** — Text selections render as ember on carbon.
- **`.availability-dot`** — A pulsing green dot defined in CSS, used in Hero and About metadata strips to signal "open to work" status.
- **`.corner-bracket-*`** CSS classes — Reusable absolute-positioned bracket corners in ember, applied to service cards, project cards, about portrait card, and loader.

### 🔍 SEO & Metadata
- **Full Next.js `Metadata` export** — `layout.tsx` exports `metadataBase`, `title`, `description`, `keywords`, `authors`, `openGraph` (type, locale, url, siteName, og image), and `twitter` (summary_large_image) fields via Next.js 14's native Metadata API.
- **`schema.org` JSON-LD `Person`** — Inline `<script type="application/ld+json">` with `name`, `url`, `email`, `jobTitle`, `alumniOf` (NSUT), `worksFor` (PhysicsWallah), `sameAs` (LinkedIn, GitHub, Instagram), and `knowsAbout` array (Web Development, UI/UX, React, TypeScript, GenAI, Prompt Engineering, Python, Figma).
- **`robots.ts`** — Returns `MetadataRoute.Robots` allowing all user agents and pointing to the sitemap URL.
- **`sitemap.ts`** — Returns canonical URL with `lastModified: new Date()`, `changeFrequency: 'monthly'`, `priority: 1`.
- **Security headers** — `next.config.js` `headers()` sets `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `X-XSS-Protection: 1; mode=block` on all routes.
- **Next.js `optimizePackageImports`** — `experimental.optimizePackageImports` for `@react-three/fiber`, `@react-three/drei`, and `gsap` reduces bundle size by tree-shaking unused exports at the Next.js level.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | App Router, SSR, Metadata API, `robots.ts`, `sitemap.ts`, image optimization |
| React 18 | Client components, `Suspense` lazy loading for Three.js scene |
| TypeScript 5 | Full static typing; typed `window.__lenis` global declaration |
| Tailwind CSS 3 | Multi-step graphite scale, ember/bone palette, utility classes |
| Three.js 0.169 | WebGL geometry — `BufferGeometry`, `Points`, `OctahedronGeometry` |
| `@react-three/fiber` | React renderer for Three.js — `useFrame`, `useThree`, `Canvas` |
| `@react-three/drei` | Three.js React helpers |
| `@react-three/postprocessing` | WebGL post-processing pipeline |
| `postprocessing` | Core post-processing library |
| GSAP 3.12 + ScrollTrigger | Per-character stagger, horizontal scroll pin/scrub, counter triggers, marquee, parallax wordmark |
| Framer Motion 11 | Mobile menu `AnimatePresence`, nav entry animation |
| Lenis 1.1 | Physics smooth scroll; `wheelMultiplier: 0.9`, `touchMultiplier: 1.5`; GSAP ticker sync |
| clsx + tailwind-merge | Conditional and conflict-free class name composition |

---

## 📁 Project Structure

```
Portfolio_2026_00/
├── public/
│   ├── favicon.svg                           # SVG favicon
│   └── og.svg                                # Open Graph image (1200×630) for social previews
│
├── src/
│   ├── app/
│   │   ├── globals.css                       # Full CSS design system — CSS custom properties,
│   │   │                                     #   grain overlay, cinematic vignette, glass classes,
│   │   │                                     #   cursor:none, scroll progress bar, corner brackets,
│   │   │                                     #   metal sheen, skill bars, floating labels, chip-toggle,
│   │   │                                     #   availability dot, pill tags, ambient orbs
│   │   ├── layout.tsx                        # Root layout — full Metadata API export, JSON-LD
│   │   │                                     #   schema.org Person, SmoothScrollProvider, Loader,
│   │   │                                     #   CustomCursor, Nav, ScrollProgress wrapper
│   │   ├── page.tsx                          # Home — HeroSection, ServicesSection, ProjectsSection,
│   │   │                                     #   AboutSection, ContactSection, FooterSection
│   │   ├── robots.ts                         # Next.js robots.txt generation
│   │   └── sitemap.ts                        # Next.js sitemap.xml generation
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx               # GSAP context timeline, SplitHeadline char stagger,
│   │   │   │                                 #   Three.js overlay via Suspense, stat bar, CTAs,
│   │   │   │                                 #   ambient orbs, metadata strip, video + fallback monogram
│   │   │   ├── ServicesSection.tsx           # 5 ServiceCards + CTA card, GSAP ScrollTrigger stagger,
│   │   │   │                                 #   3D tilt + radial spotlight + metal sheen per card
│   │   │   ├── ProjectsSection.tsx           # GSAP ScrollTrigger horizontal pin/scrub rail (desktop),
│   │   │   │                                 #   4 project cards, PatternBg, corner brackets,
│   │   │   │                                 #   data-cursor-view, "More on the way" CTA card
│   │   │   ├── AboutSection.tsx              # GSAP slide-in portrait + bio, AnimatedCounter rAF,
│   │   │   │                                 #   CSS IntersectionObserver skill bars, tech stack grid,
│   │   │   │                                 #   ambient orb
│   │   │   ├── ContactSection.tsx            # Multi-select chip toggles, floating label inputs,
│   │   │   │                                 #   data-cursor-text, shimmer submit, success state,
│   │   │   │                                 #   social channels, "Currently" glass card
│   │   │   └── FooterSection.tsx             # GSAP infinite marquee, ScrollTrigger parallax wordmark,
│   │   │                                     #   diamond logo, quick links, Lenis back-to-top
│   │   │
│   │   ├── three/
│   │   │   └── HeroThreeScene.tsx            # React Three Fiber Canvas — DustParticles (200 pts,
│   │   │                                     #   individual velocities, sin drift, wrap), GeometricSatellite
│   │   │                                     #   (3 orbiting octahedra, elliptical path), CameraRig
│   │   │                                     #   (mouse-reactive lerp), mobile-aware DPR cap
│   │   │
│   │   └── ui/
│   │       ├── CustomCursor.tsx              # Lerp RAF loop cursor — dot lerp 0.9, ring lerp 0.12,
│   │       │                                 #   4 states, MutationObserver re-attach, touch bypass,
│   │       │                                 #   mix-blend-difference dot, VIEW label
│   │       ├── Loader.tsx                    # Page loader — dual counter-rotating diamond rings,
│   │       │                                 #   ember progress bar with glow, opacity fade exit,
│   │       │                                 #   setInterval random increment, Pawan Tripathi name label
│   │       ├── Nav.tsx                       # Floating pill navbar — auto-width on scroll, glass bg,
│   │       │                                 #   numbered items, spinning diamond logo, CTA btn-sweep,
│   │       │                                 #   hamburger + AnimatePresence full-screen mobile overlay
│   │       ├── ScrollProgress.tsx            # Vertical 2px ember progress bar — right-edge, desktop only,
│   │       │                                 #   passive scroll listener, percentage height calculation
│   │       └── SmoothScrollProvider.tsx      # Lenis init — exponential easing, GSAP ticker sync,
│   │                                         #   lagSmoothing(0), window.__lenis typed global,
│   │                                         #   prefers-reduced-motion guard, cleanup on unmount
│
├── tailwind.config.ts                        # graphite 100–600 scale, ember/bone tokens,
│                                             #   Fraunces/Geist/JetBrains font vars, grid-pattern bg,
│                                             #   marquee/shimmer/float/countUp keyframes
├── postcss.config.js                         # Tailwind + Autoprefixer
├── next.config.js                            # optimizePackageImports for Three.js + GSAP,
│                                             #   avif/webp image formats, security headers
├── tsconfig.json                             # Next.js strict TS config with @/* path alias
├── vercel.json                               # Next.js framework declaration, build commands
├── .eslintrc.json                            # Next.js ESLint config
└── package.json                              # Dependencies and npm scripts
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

**1. Clone the repository**
```bash
git clone https://github.com/tripathipawan/Portfolio_2026_00.git
cd Portfolio_2026_00
```

**2. Install dependencies**
```bash
npm install
```

**3. Add hero video (optional)**

Place video files in `public/` for the hero visual:
```
public/hero-developer.webm
public/hero-developer.mp4
```

> Without these files, the hero renders a CSS animated "PT" monogram fallback with concentric ember rings.

**4. Start the development server**
```bash
npm run dev
```

**5. Build for production**
```bash
npm run build
npm run start
```

---

## 🎮 Page Sections

| Section | ID | Signature Feature |
|---|---|---|
| **Loader** | — | Dual counter-rotating diamond rings, ember progress glow, opacity fade exit |
| **Navigation** | — | Floating pill, auto-shrink on scroll, spinning diamond, numbered links, mobile full-screen overlay |
| **Scroll Progress** | — | Vertical 2px ember bar, right-edge, desktop only |
| **Hero** | `#hero` | GSAP char stagger, 200-particle WebGL scene, 3 orbiting octahedra, mouse-reactive camera |
| **Services** | `#services` | 3D tilt + live radial spotlight + metal sheen, GSAP ScrollTrigger stagger |
| **Projects** | `#projects` | GSAP ScrollTrigger horizontal pin/scrub rail, per-card pattern backgrounds |
| **About** | `#about` | rAF stat counters, CSS skill bars via IntersectionObserver, tech stack grid |
| **Contact** | `#contact` | Multi-select chips, floating label inputs, shimmer submit, channels + "Currently" panel |
| **Footer** | — | GSAP infinite marquee, ScrollTrigger parallax wordmark, Lenis back-to-top |

---

## 🧠 Architecture Highlights

| Concern | Implementation |
|---|---|
| Cursor Performance | Lerp loop runs entirely in `requestAnimationFrame` with plain `let` variables — zero React state updates per frame |
| Dynamic Cursor Targets | `MutationObserver` re-attaches event listeners on DOM changes — cursor state works on async-rendered content |
| Lenis + GSAP Sync | `gsap.ticker.lagSmoothing(0)` + ticker sync + `lenis.on('scroll', ScrollTrigger.update)` — single RAF loop for all three systems |
| WebGL Particles | `useMemo` for position/velocity arrays (computed once), `useFrame` for per-frame mutation of `BufferAttribute` |
| Horizontal Scroll | `ScrollTrigger` pin + `scrub: 1` + `invalidateOnRefresh: true` + dynamic `getScrollAmount()` — adapts to resize |
| Stat Counters | `ScrollTrigger.create({ once: true, onEnter })` fires a standalone rAF loop with cubic ease-out — no GSAP tween overhead |
| Skill Bars | `IntersectionObserver` triggers CSS `transition: width` via `data-pct` attribute — pure CSS animation, no JS animation frame |
| SEO | Next.js `Metadata` API + `schema.org` JSON-LD `Person` + `robots.ts` + `sitemap.ts` + 3 security headers |

---

## 🌱 What I Learned

- Running a high-performance lerp cursor loop entirely outside React state using plain variables and `requestAnimationFrame` — avoiding re-renders while keeping cursor smooth at 60fps
- Using `MutationObserver` to keep cursor event listeners attached to dynamically rendered content
- Composing a multi-system WebGL scene in React Three Fiber — separating particles, orbiting geometry, and a camera rig into isolated components sharing a single `<Canvas>`
- Building a GSAP `ScrollTrigger` horizontal pin-and-scrub rail with dynamic scroll distance calculation and resize invalidation
- Implementing `ScrollTrigger`-triggered `requestAnimationFrame` counter animations without GSAP tweens for fine-grained easing control
- Structuring a production Next.js 14 App Router project with full SEO metadata, JSON-LD schema, security headers, and package import optimization in a single config layer

---

## 👨‍💻 Author

**Pawan Tripathi**
- GitHub: [@tripathipawan](https://github.com/tripathipawan)
- LinkedIn: [Pawan Tripathi](https://www.linkedin.com/in/pawantripathi)
- Email: tripathipawan8705@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
