# Harsh Goyal — Portfolio

A production-ready premium personal portfolio website for **Harsh Goyal** — Web Developer & UI/UX Designer.

Cinematic, immersive digital workspace aesthetic inspired by [Forged.build](https://forged.build).

---

## ✨ Features

- **Hero** — Full-screen cinematic landing with split-text reveal, 3D particles (Three.js), and transparent video of 3D developer character
- **Services** — 5 interactive cards with 3D tilt, radial cursor spotlight, and capability pills
- **Projects** — GSAP-pinned horizontal scroll gallery with procedural pattern visuals
- **About** — Portrait card with HG monogram, animated counters, tech stack pills, and shimmer skill bars
- **Contact** — Floating-label form, project-type chip toggles, simulated submit flow with success state
- **Footer** — Animated marquee strip, parallax mega wordmark

### Interaction Polishes

- Theatrical page loader (rotating diamond + progress bar)
- Lenis smooth inertia scrolling synced with GSAP ScrollTrigger
- Custom cursor: lerp-eased dot + ring with hover/text/view states
- Magnetic buttons with sweep highlight
- Scroll progress indicator
- Glass pill navigation morphing on scroll
- Mobile hamburger → fullscreen animated overlay

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/harshgoyal27/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🎬 3D Developer Video

The hero section expects a **transparent WebM** video at `/public/hero-developer.webm` (with `/public/hero-developer.mp4` as Safari fallback).

To add your own:
1. Export a transparent `.webm` (VP9 codec with alpha) from Spline, Blender, or any 3D tool
2. Place it at `/public/hero-developer.webm`
3. Optionally export an `.mp4` fallback at `/public/hero-developer.mp4`

If no video file is present, the section falls back to an ambient HG monogram illustration.

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and connect Vercel for automatic deployments
```

No environment variables are required for the base build.

### Optional: Real form submission

The contact form currently simulates a submit (1.4s delay → success state). To wire up real email:

**Option A — Resend**
```bash
npm install resend
```
Create `/src/app/api/contact/route.ts`:
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  await resend.emails.send({
    from: 'Portfolio <portfolio@yourdomain.com>',
    to: 'goyalharsh642@gmail.com',
    subject: `New message from ${body.name}`,
    text: body.message,
  })
  return Response.json({ ok: true })
}
```
Add `RESEND_API_KEY` to Vercel environment variables.

**Option B — Formspree**
Replace the `handleSubmit` function in `ContactSection.tsx` with a fetch to your Formspree endpoint.

---

## 🎨 Customization

### Colors
Edit `src/app/globals.css` (CSS variables) and `tailwind.config.ts`:
- `--ember` / `#F37512` — primary accent
- `--bone` / `#F2F2EC` — text
- `--carbon` / `#050505` — background

### Typography
Fonts loaded via Google Fonts in `globals.css`:
- **Display:** Fraunces (serif)
- **Body:** Geist (neo-grotesque)
- **Mono:** JetBrains Mono

### Projects
Edit the `projects` array in `src/components/sections/ProjectsSection.tsx`.

### Services
Edit the `services` array in `src/components/sections/ServicesSection.tsx`.

### About / Bio
Edit text directly in `src/components/sections/AboutSection.tsx`.

### Social links
Update in `src/components/sections/ContactSection.tsx` (channels array) and `FooterSection.tsx`.

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Language | TypeScript (strict) |
| 3D | Three.js r169 + @react-three/fiber + @react-three/drei |
| Animation | GSAP 3.12 + ScrollTrigger |
| Motion | Framer Motion 11 |
| Scroll | Lenis (Studio Freight) |
| Styling | Tailwind CSS 3.4 |
| Hosting | Vercel |

---

## 📈 Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css         # CSS variables, base styles, utilities
│   ├── layout.tsx          # Root layout, metadata, JSON-LD
│   ├── page.tsx            # Main page assembler
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   ├── three/
│   │   └── HeroThreeScene.tsx  # Three.js dust + satellites
│   └── ui/
│       ├── Nav.tsx
│       ├── CustomCursor.tsx
│       ├── Loader.tsx
│       ├── ScrollProgress.tsx
│       └── SmoothScrollProvider.tsx
public/
├── hero-developer.webm     # Add your transparent 3D video
├── hero-developer.mp4      # Safari fallback
├── og.svg                  # Open Graph image
└── favicon.svg
```

---

## 📄 License

MIT — feel free to use as a template. Attribution appreciated but not required.

Built by Harsh Goyal.
