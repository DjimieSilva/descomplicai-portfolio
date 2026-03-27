# Descomplicai Homepage Designs — 3 Concepts

## Design 1: "Cosmos" — Dark, Immersive, Particle-Driven

### Color Palette
- Background: `#0a0a1a` (deep space)
- Surface: `#12122a` (card bg)
- Primary: `#6366f1` (indigo glow)
- Accent: `#06b6d4` (cyan spark)
- Secondary: `#a855f7` (purple nebula)
- Text: `#e2e8f0` (star white)
- Muted: `#64748b` (dim star)
- Glow: `rgba(99,102,241,0.4)` (indigo glow)

### Typography
- Headlines: `Space Grotesk` (700, 800)
- Body: `Inter` (400, 500)
- Mono: `JetBrains Mono` (stats, code)

### Sections (7 total)
1. **Hero** — Full viewport, animated particle constellation background (30+ particles connected by faint lines), large "Descomplicai" with animated gradient text glow, typing subtitle animation, scroll indicator arrow bounce
2. **Stats Counter** — 4 animated counters (100+ Projetos, 25+ Sites, 50+ Ferramentas, 7+ Industrias) with count-up animation on scroll
3. **Services** — 3 glassmorphism cards with hover glow effects (Presenca Digital, IA & Automacao, Consultoria), each with icon and description
4. **Featured Projects** — Horizontal carousel with 6 project cards, auto-scroll, dot navigation, gradient borders
5. **Philosophy** — "Humanos Primeiro" section with parallax text reveal, mission statement
6. **Founder** — Jaime Silva spotlight with avatar, bio, tech stack tags
7. **CTA/Contact** — Large gradient CTA button, social links, footer

### Animations
- Particle constellation: CSS keyframes with random positions, connected by SVG lines
- Count-up: Intersection Observer triggers number animation
- Cards: Glassmorphism with backdrop-blur, border glow on hover
- Parallax: useScroll + useTransform for depth layers
- Typing: CSS typing animation with blinking cursor

### Mobile
- Particles reduce to 15
- Carousel becomes vertical stack
- Nav becomes hamburger menu
- Cards full-width


## Design 2: "Jardim" — Light, Warm, Organic Portuguese

### Color Palette
- Background: `#fdf6ee` (warm cream)
- Surface: `#ffffff`
- Primary: `#c2410c` (terracotta)
- Accent: `#0369a1` (azulejo blue)
- Secondary: `#15803d` (olive green)
- Text: `#1c1917` (dark earth)
- Muted: `#78716c` (stone)
- Tile pattern: `#1e40af` + `#fbbf24` (azulejo blue & gold)

### Typography
- Headlines: `Playfair Display` (700, 800)
- Body: `Source Sans 3` (400, 500)
- Accent: `Caveat` (handwritten touches)

### Sections (7 total)
1. **Hero** — Warm gradient bg, handwritten-style "Descomplicai" with Caveat font accent, illustrated sun/wave SVG elements, tagline in Playfair
2. **Mission** — "Humanos Primeiro" with large quote, tile-pattern divider, founder photo area
3. **Numbers** — Stats in a warm card grid with terracotta accents
4. **Projects Gallery** — Masonry grid layout with rounded cards, hover lift, category tags
5. **Services** — 3 illustrated service cards with icon circles, terracotta borders
6. **Founder Spotlight** — Jaime bio with timeline, handwritten annotations
7. **Contact** — Warm CTA with WhatsApp link, azulejo pattern footer border

### Animations
- Smooth fade-in on scroll (no heavy effects)
- Cards lift subtly on hover
- SVG wave dividers between sections
- Handwritten text appears with draw-in animation

### Mobile
- Single column throughout
- Masonry becomes 1-col
- SVG decorations scale down
- Nav collapses to icon menu


## Design 3: "Terminal" — Brutalist, Developer-Focused, CLI Aesthetic

### Color Palette
- Background: `#0c0c0c` (terminal black)
- Surface: `#1a1a1a` (panel bg)
- Primary: `#22c55e` (terminal green)
- Accent: `#f59e0b` (amber warning)
- Secondary: `#3b82f6` (link blue)
- Text: `#d4d4d4` (terminal white)
- Muted: `#525252` (dim)
- Error: `#ef4444` (red)
- Prompt: `#22c55e` (green prompt)

### Typography
- Everything: `JetBrains Mono` (400, 700)
- Fallback: `Fira Code`, monospace

### Sections (7 total)
1. **Hero** — Terminal window with title bar (3 dots), typing animation "descomplicai --help" then showing command menu
2. **Help Output** — Formatted --help output showing available "commands" (sections)
3. **Projects (ls -la)** — File listing table with project names, types, dates
4. **Services (man descomplicai)** — Man page format with DESCRIPTION, OPTIONS, EXAMPLES
5. **Stats (neofetch)** — Neofetch-style system info with ASCII art logo
6. **About (cat README.md)** — Rendered markdown-style bio of Jaime
7. **Contact (mailto:)** — Terminal prompt for contact, links as commands

### Animations
- Character-by-character typing with cursor blink
- Commands "execute" with brief loading spinner
- Output appears line by line
- Scanline CRT effect overlay (subtle)

### Mobile
- Terminal scales to full width
- Font size reduces slightly
- Same aesthetic maintained
- Touch-friendly command buttons added
