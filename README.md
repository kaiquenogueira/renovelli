# Renovelli — Cinematic Automotive Experience

![Renovelli Banner](https://renovelli.com.br/images/seq-4.jpg)

A high-end, cinematic landing page for **Renovelli**, a premium automotive aesthetics and restoration studio. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**, this project features the "Vidro Líquido" design system, immersive scroll-driven animations, and elite editorial typography.

## 🎞️ Cinematic Drama & Vidro Líquido

The project implements a sophisticated design language (source of truth: `src/index.css`):
- **Palette**: Deep ink (`#0A0E12`) with a warm Brass accent (`#C9A36A`), LED ice (`#E8F4FF`) and Oxblood (`#8B2D2D`), used sparingly.
- **Glassmorphism**: Advanced blurring and translucency to mimic automotive lacquer; hexagonal/honeycomb leitmotif.
- **Micro-Animations**: GSAP-powered scroll-scrub, magnetic interactions, and reveal effects.
- **Typography**: *Fraunces* (variable editorial serif) + *Geist* (modern sans) + *JetBrains Mono*.

## 🎨 «Atelier» Design System

A standalone, contrast-safe **light** reinterpretation of the brand lives at
**[`assets/design_system.html`](assets/design_system.html)**. It fixes the
low-contrast text-over-video problem of the live hero by turning the automotive
photography into texture (faded, desaturated, reading gradient) on a paper
surface — keeping the cinematic drama with AAA legibility. It documents the
full type scale, color tokens (HEX/RGB/HSL + AA/AAA intent), components and
motion primitives. Spec: [`design-system/renovelli/ATELIER.md`](design-system/renovelli/ATELIER.md).

Preview it with a static server from the project root:

```bash
python3 -m http.server   # → http://localhost:8000/assets/design_system.html
```

## 🚀 Technical Stack

- **React 19**: Utilizing the latest concurrent rendering features.
- **Vite**: Ultra-fast development and optimized production builds.
- **Tailwind CSS v4**: CSS-first design token architecture.
- **Framer Motion & GSAP**: High-performance cinematic sequences.
- **TypeScript**: Full type safety for complex animation hooks.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kaiquenogueira/renovelli.git
   cd renovelli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```bash
src/
├── components/          # Reusable sections (Hero, Gallery, CTA, etc.)
├── hooks/               # Custom animation and interaction logic
├── index.css            # Global design tokens (source of truth) + Tailwind v4
└── main.tsx             # Application entry point
assets/
└── design_system.html   # Standalone «Atelier» design system showcase
design-system/renovelli/
├── MASTER.md            # Generic design-system rules
└── ATELIER.md           # «Atelier» light variant spec (overrides MASTER)
```

## 🏗️ Production Build

To create a production-ready bundle:

```bash
npm run build
npm run preview
```

---

<div align="center">
  <p>Crafted for automotive excellence.</p>
  <a href="https://renovelli.com.br">View Live Site</a>
</div>
