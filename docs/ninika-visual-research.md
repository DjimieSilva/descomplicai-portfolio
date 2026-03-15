# NinikaTours — Visual Design Research Brief

> Premium wine & gastronomy experience landing page for Ilha Terceira, Acores.
> Target: 98% mobile users. Performance-first. Conversion-focused.

---

## Table of Contents

1. [Design Philosophy & Color](#1-design-philosophy--color)
2. [Typography](#2-typography)
3. [Hero Section](#3-hero-section)
4. [Layout Patterns](#4-layout-patterns)
5. [Pricing Cards](#5-pricing-cards)
6. [Testimonials](#6-testimonials)
7. [Gallery](#7-gallery)
8. [FAQ Accordion](#8-faq-accordion)
9. [Lead Capture & CTA Strategy](#9-lead-capture--cta-strategy)
10. [Micro-interactions](#10-micro-interactions)
11. [Performance-First Visual Effects](#11-performance-first-visual-effects)
12. [Image Strategy](#12-image-strategy)
13. [Navigation](#13-navigation)
14. [CSS Snippets Library](#14-css-snippets-library)
15. [Component Architecture](#15-component-architecture)
16. [References & Sources](#16-references--sources)

---

## 1. Design Philosophy & Color

### Direction: "Elegant Volcanic"

Blend the deep, moody sophistication of premium wine branding with the raw volcanic beauty of the Azores. Dark backgrounds with warm accents — not cold luxury, but inviting warmth.

### Color Palette

```
--wine-deep:      #4A0E1B;   /* Deep burgundy — primary brand */
--wine-mid:       #722F37;   /* Merlot — hover states, accents */
--volcanic-dark:  #1A1A1A;   /* Near-black — backgrounds */
--volcanic-gray:  #2D2D2D;   /* Card backgrounds */
--cream:          #F5F0E8;   /* Warm cream — text on dark */
--gold-soft:      #D4A76A;   /* Warm gold — CTAs, highlights */
--gold-bright:    #E0BC75;   /* Brighter gold — hover states */
--sage:           #8B9A6B;   /* Vineyard green — secondary accent */
--white-warm:     #FAFAF7;   /* Off-white — light sections */
```

### Why This Works
- Black/dark backgrounds with gold and cream evoke high-end wine brands (Merus Wines approach)
- Warm tones prevent the "cold luxury" feel — this is about warmth, food, and connection
- Sage green nods to vineyards and Azorean landscapes
- Gold provides clear CTA contrast against dark backgrounds (high click-through)

---

## 2. Typography

### Recommended Stack

```css
/* Display / Headlines — elegant serif */
--font-display: 'Playfair Display', 'Georgia', serif;

/* Body — clean, readable sans-serif */
--font-body: 'Inter', 'system-ui', sans-serif;

/* Accent / Labels — refined small text */
--font-accent: 'Cormorant Garamond', 'Georgia', serif;
```

### Type Scale (Mobile-First)

```css
:root {
  /* Mobile base: 16px */
  --text-xs:    0.75rem;   /* 12px — labels, captions */
  --text-sm:    0.875rem;  /* 14px — small body */
  --text-base:  1rem;      /* 16px — body text */
  --text-lg:    1.125rem;  /* 18px — large body */
  --text-xl:    1.25rem;   /* 20px — section subtitles */
  --text-2xl:   1.5rem;    /* 24px — card titles */
  --text-3xl:   2rem;      /* 32px — section headings */
  --text-hero:  2.5rem;    /* 40px — hero heading mobile */
}

@media (min-width: 768px) {
  :root {
    --text-hero: 4rem;     /* 64px — hero heading desktop */
    --text-3xl:  2.5rem;
  }
}
```

### Key Principles
- Serif for headlines conveys tradition and premium quality
- Sans-serif for body ensures mobile readability
- Cormorant Garamond for small labels (price tags, categories) adds editorial finesse
- Never go below 16px for body text on mobile (prevents iOS zoom on focus)

---

## 3. Hero Section

### Recommended Pattern: "Stacked Full-Screen with Overlay"

This is the dominant pattern in successful wine tourism sites. A full-viewport image/video with a gradient overlay and centered text.

### Structure

```
+------------------------------------------+
|  [Sticky Nav — transparent initially]    |
|                                          |
|        [Background: hero image/video]    |
|        [Gradient overlay: bottom fade]   |
|                                          |
|        NINIKA TOURS                      |
|        Descubra os sabores da            |
|        Ilha Terceira                     |
|                                          |
|        [CTA Button: "Ver Experiencias"]  |
|                                          |
|        [Scroll indicator: chevron down]  |
+------------------------------------------+
```

### CSS for Hero

```css
.hero {
  position: relative;
  min-height: 100svh; /* svh for mobile viewport */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26, 26, 26, 0.3) 0%,
    rgba(26, 26, 26, 0.1) 40%,
    rgba(26, 26, 26, 0.6) 80%,
    rgba(26, 26, 26, 0.9) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 1.5rem;
}

/* Scroll indicator pulse */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
```

### Mobile Considerations
- Use `100svh` not `100vh` to handle mobile browser chrome
- Keep hero text to max 2 lines on mobile
- Single CTA button — no split CTAs on mobile hero
- Background image: use art direction via `<picture>` to serve a vertical crop for mobile
- Consider a subtle CSS-only Ken Burns effect on the hero image (slow scale over 20s)

---

## 4. Layout Patterns

### Recommended: Checkerboard / Alternating Sections

Based on wine tourism site research, the "Checkerboard" layout (alternating image-left/text-right and vice versa) is the most effective pattern for experience-based content. On mobile, this naturally stacks vertically.

### Section Flow (Top to Bottom)

```
1. Hero (full viewport)
2. Trust bar (small logos or stats strip)
3. "O que oferecemos" — experience cards (2-3 cards)
4. Featured Experience — full-width image + text overlay
5. Gallery — editorial masonry grid
6. Pricing — 2-3 tier cards
7. Testimonials — horizontal scroll cards
8. Timeline — "Como funciona" step-by-step
9. FAQ — accordion
10. Final CTA — full-width with background image
11. Contact / Lead Capture
12. Footer
```

### Stats/Trust Bar

```html
<!-- Compact trust strip after hero -->
<section class="trust-bar">
  <div class="stat">
    <span class="stat-number" data-target="500">0</span>
    <span class="stat-label">Experiencias</span>
  </div>
  <div class="stat">
    <span class="stat-number" data-target="4.9">0</span>
    <span class="stat-label">Avaliacao</span>
  </div>
  <div class="stat">
    <span class="stat-number" data-target="12">0</span>
    <span class="stat-label">Parceiros locais</span>
  </div>
</section>
```

---

## 5. Pricing Cards

### Design: Highlighted Middle Card with Vertical Stack on Mobile

Research shows 3 tiers maximum, with the recommended tier visually elevated.

### Structure

```
Mobile Layout (stacked):
+---------------------------+
| ESSENCIAL          EUR 49 |
| - 3 provas de vinho       |
| - Queijo artesanal        |
| - Guia local              |
| [Reservar]                |
+---------------------------+

+---------------------------+  <-- highlighted
| PREMIUM            EUR 89 |  <-- badge: "Mais Popular"
| - 5 provas de vinho       |
| - Menu degustacao          |
| - Guia + transporte       |
| - Foto profissional       |
| [Reservar Agora]          |
+---------------------------+

+---------------------------+
| EXCLUSIVA         EUR 149 |
| - Experiencia privada     |
| - Jantar harmonizado      |
| - Todo o dia              |
| [Contactar-nos]           |
+---------------------------+
```

### CSS for Highlighted Card

```css
.pricing-card {
  background: var(--volcanic-gray);
  border: 1px solid rgba(212, 167, 106, 0.1);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.pricing-card--featured {
  border-color: var(--gold-soft);
  position: relative;
  /* Subtle glow */
  box-shadow: 0 0 40px rgba(212, 167, 106, 0.08);
}

.pricing-card--featured::before {
  content: 'Mais Popular';
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold-soft);
  color: var(--volcanic-dark);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 1rem;
  border-radius: 2rem;
}

/* Mobile: no hover, so use tap feedback */
@media (hover: hover) {
  .pricing-card:hover {
    transform: translateY(-4px);
    border-color: var(--gold-soft);
  }
}
```

### Conversion Best Practices Applied
- 3 tiers only (avoid decision paralysis)
- Middle tier highlighted with badge and border glow
- Feature lists use checkmarks, max 5-6 items per card
- CTA button text varies per tier (soft "Reservar" vs urgent "Reservar Agora")
- On mobile, the featured card renders first (reorder with `order: -1`)

---

## 6. Testimonials

### Design: Horizontal Scroll Cards (Mobile-Native Pattern)

On mobile, horizontal scroll is the most natural pattern — users already swipe on Instagram.

```css
.testimonials-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 1rem;
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
}

.testimonials-track::-webkit-scrollbar {
  display: none;
}

.testimonial-card {
  flex: 0 0 85vw; /* Card takes 85% of viewport width */
  scroll-snap-align: center;
  background: var(--volcanic-gray);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@media (min-width: 768px) {
  .testimonial-card {
    flex: 0 0 340px;
  }
}
```

### Card Content Structure

```
+---------------------------+
| [5 stars - gold]          |
|                           |
| "Uma experiencia incrivel |
|  que nos fez sentir a     |
|  verdadeira alma dos      |
|  Acores."                 |
|                           |
| -- Maria S., Lisboa       |
| [Google Reviews badge]    |
+---------------------------+
```

### Tips
- Gold star icons (SVG inline, not font icons)
- Quote in Cormorant Garamond italic for editorial feel
- Show dots indicator below to hint at more cards
- Link to Google Reviews for trust

---

## 7. Gallery

### Design: Editorial Masonry Grid

For a food/wine experience, photos must feel editorial — not a standard grid. Use a CSS-only masonry-like approach that works today (no native masonry needed).

### CSS-Only Asymmetric Grid

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0 1rem;
}

/* Create visual interest with spanning */
.gallery-grid > *:nth-child(3n + 1) {
  grid-column: span 2;
  aspect-ratio: 16/9;
}

.gallery-grid > *:nth-child(3n + 2),
.gallery-grid > *:nth-child(3n + 3) {
  aspect-ratio: 1;
}

.gallery-item {
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

/* Tap-to-reveal on mobile */
.gallery-item::after {
  content: attr(data-caption);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: var(--cream);
  font-family: var(--font-accent);
  font-size: var(--text-sm);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

/* Desktop: hover reveal. Mobile: handled via JS tap */
@media (hover: hover) {
  .gallery-item:hover img {
    transform: scale(1.05);
  }
  .gallery-item:hover::after {
    transform: translateY(0);
  }
}
```

### Mobile Tap-to-Reveal (Lightweight JS)

```js
// Touch devices: toggle caption on tap
if (!window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('is-active');
    });
  });
}
```

---

## 8. FAQ Accordion

### Design: Smooth CSS-Driven Accordion

Use the native `<details>` / `<summary>` HTML elements for zero-JS FAQ, enhanced with CSS animations.

```css
.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--cream);
  list-style: none; /* Remove default marker */
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  font-size: 1.5rem;
  color: var(--gold-soft);
  transition: transform 0.3s ease;
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 0 1.25rem 0;
  color: rgba(245, 240, 232, 0.7);
  font-size: var(--text-base);
  line-height: 1.7;
  /* Animate open with grid trick */
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.faq-item[open] .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer > div {
  overflow: hidden;
}
```

### HTML Structure

```html
<details class="faq-item">
  <summary>Quanto tempo dura a experiencia?</summary>
  <div class="faq-answer">
    <div>
      As nossas experiencias duram entre 3 a 8 horas,
      dependendo do pacote escolhido...
    </div>
  </div>
</details>
```

### Why This Approach
- Zero JavaScript needed for basic functionality
- Native accessibility (keyboard, screen readers)
- The `grid-template-rows` trick provides smooth height animation (the old `max-height` hack causes jarring transitions)
- 200-300ms transition feels snappy yet smooth

---

## 9. Lead Capture & CTA Strategy

### Primary Strategy: Sticky Bottom CTA Bar (Mobile)

Non-intrusive bar that appears after scrolling past the hero. Contains a single action.

```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--volcanic-dark);
  border-top: 1px solid rgba(212, 167, 106, 0.15);
  padding: 0.75rem 1rem;
  transform: translateY(100%);
  transition: transform 0.4s ease;
  /* Ensure it doesn't cover content */
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}

.sticky-cta.is-visible {
  transform: translateY(0);
}

.sticky-cta-button {
  display: block;
  width: 100%;
  padding: 0.875rem;
  background: var(--gold-soft);
  color: var(--volcanic-dark);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-base);
  text-align: center;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  /* Tactile press effect */
  transition: transform 0.1s ease;
}

.sticky-cta-button:active {
  transform: scale(0.97);
}
```

### Show/Hide Logic (Intersection Observer)

```js
const hero = document.querySelector('.hero');
const stickyCta = document.querySelector('.sticky-cta');

const observer = new IntersectionObserver(
  ([entry]) => {
    stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
  },
  { threshold: 0 }
);

observer.observe(hero);
```

### WhatsApp CTA (High Conversion for Tours)

For Azores tourism, WhatsApp is the #1 conversion channel. Instead of a traditional form, use a WhatsApp link:

```html
<a href="https://wa.me/351XXXXXXXXX?text=Ola!%20Gostaria%20de%20saber%20mais%20sobre%20as%20experiencias."
   class="sticky-cta-button">
  Reservar via WhatsApp
</a>
```

### Secondary: Embedded Form (Bottom of Page)

Keep it to 3 fields max: Name, Email/Phone, Experience Interest (dropdown). No popup modals — they kill mobile UX.

---

## 10. Micro-interactions

### 10.1 Counter Animation (Stats Section)

```js
function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    element.textContent = current >= 100 ? current + '+' : current;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Trigger when visible
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
  counterObserver.observe(el);
});
```

### 10.2 Staggered Card Reveal

```css
.reveal-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.reveal-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger via custom property */
.reveal-card:nth-child(1) { transition-delay: 0ms; }
.reveal-card:nth-child(2) { transition-delay: 100ms; }
.reveal-card:nth-child(3) { transition-delay: 200ms; }
```

```js
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-card').forEach(el => {
  cardObserver.observe(el);
});
```

### 10.3 Button Hover States (Tactile Feel)

```css
.btn-primary {
  background: var(--gold-soft);
  color: var(--volcanic-dark);
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

/* Desktop hover: lift + glow */
@media (hover: hover) {
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 167, 106, 0.25);
  }
}

/* Mobile: press feedback */
.btn-primary:active {
  transform: scale(0.96);
  box-shadow: none;
}

/* Ripple effect on click */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 60%);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.4s, transform 0.4s;
}

.btn-primary:active::after {
  opacity: 1;
  transform: scale(2.5);
  transition: none;
}
```

### 10.4 Scroll Progress Indicator

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(to right, var(--wine-deep), var(--gold-soft));
  z-index: 100;
  transition: none; /* no transition — must be real-time */
}
```

```js
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.querySelector('.scroll-progress').style.width = progress + '%';
}, { passive: true });
```

### 10.5 Back-to-Top Button

```css
.back-to-top {
  position: fixed;
  bottom: 5rem; /* above sticky CTA */
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--volcanic-gray);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 40;
}

.back-to-top.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.back-to-top:active {
  transform: scale(0.9);
}
```

### 10.6 Form Field Focus Animation

```css
.form-field {
  position: relative;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: var(--cream);
  font-size: var(--text-base); /* 16px prevents iOS zoom */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--gold-soft);
  box-shadow: 0 0 0 3px rgba(212, 167, 106, 0.15);
}

/* Floating label */
.form-field label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: rgba(245, 240, 232, 0.4);
  font-size: var(--text-base);
  transition: all 0.2s ease;
  pointer-events: none;
}

.form-field input:focus + label,
.form-field input:not(:placeholder-shown) + label {
  top: -0.5rem;
  left: 0.75rem;
  font-size: var(--text-xs);
  color: var(--gold-soft);
  background: var(--volcanic-dark);
  padding: 0 0.25rem;
}
```

---

## 11. Performance-First Visual Effects

### 11.1 CSS-Only Grain/Noise Texture

Zero images. Uses inline SVG filter as data URI.

```css
.has-grain {
  position: relative;
  isolation: isolate;
}

.has-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 182px;
  opacity: 0.06; /* subtle — barely perceptible */
  pointer-events: none;
  z-index: -1;
}
```

**Use sparingly**: Apply to hero section and final CTA section only. The grain adds organic warmth that counteracts the "flat digital" feel, especially on dark backgrounds.

### 11.2 Gradient Animations (Battery-Safe)

```css
/* Slow gradient shift on hero — GPU friendly */
.hero-gradient {
  background: linear-gradient(
    135deg,
    var(--wine-deep) 0%,
    var(--volcanic-dark) 50%,
    var(--wine-mid) 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 12s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .hero-gradient {
    animation: none;
  }
}
```

### 11.3 Intersection Observer vs Framer Motion — Decision Matrix

| Criteria | Intersection Observer + CSS | Framer Motion |
|---|---|---|
| Bundle size | 0 KB (native API) | ~32 KB min |
| Mobile performance | Excellent (off main thread) | Good (JS-driven) |
| Complexity for scroll reveals | Low | Low |
| Complex gesture animations | Poor | Excellent |
| SSR compatibility | Perfect | Requires hydration |
| Learning curve | Low | Medium |

**Recommendation for NinikaTours**: Use **Intersection Observer + CSS transitions** for all scroll-triggered reveals and entrance animations. This covers 95% of needs with zero bundle cost. Only add Framer Motion if you need drag gestures or spring physics for interactive elements — which this landing page does not.

### 11.4 Disable Parallax on Mobile

```css
/* Subtle parallax ONLY on desktop with hover capability */
@media (hover: hover) and (min-width: 768px) {
  .parallax-bg {
    background-attachment: fixed; /* NOT supported on iOS */
    /* OR use transform-based parallax via JS */
  }
}

/* Mobile: static backgrounds, no parallax */
@media (hover: none) {
  .parallax-bg {
    background-attachment: scroll;
  }
}
```

Note: `background-attachment: fixed` is disabled on iOS Safari. For mobile, skip parallax entirely — it drains battery and causes jank. The scroll reveal animations provide enough visual interest.

---

## 12. Image Strategy

### Next.js Image Component Setup

```jsx
import Image from 'next/image';

// Static import for automatic blur placeholder
import heroImage from '@/public/images/hero-vineyard.jpg';

<Image
  src={heroImage}
  alt="Vinhas da Ilha Terceira com vista para o mar"
  fill
  priority  // hero image: no lazy loading
  placeholder="blur"  // auto-generated at build time
  sizes="100vw"
  className="object-cover"
/>
```

### For Remote/Dynamic Images

```jsx
// Generate blurDataURL with plaiceholder package
<Image
  src={dynamicUrl}
  alt={alt}
  fill
  placeholder="blur"
  blurDataURL={blurHash}  // 10px base64 string
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
/>
```

### Art Direction for Mobile

```jsx
<picture>
  {/* Mobile: vertical crop, smaller file */}
  <source
    media="(max-width: 767px)"
    srcSet="/images/hero-mobile.webp"
    type="image/webp"
  />
  {/* Desktop: wide landscape */}
  <source
    media="(min-width: 768px)"
    srcSet="/images/hero-desktop.webp"
    type="image/webp"
  />
  <img src="/images/hero-fallback.jpg" alt="..." />
</picture>
```

### Image Optimization Checklist

- All images in WebP format (AVIF as progressive enhancement)
- Hero image: max 200KB on mobile, priority load
- Gallery images: lazy loaded, 80% quality WebP
- Use `sizes` attribute correctly to prevent oversized downloads
- Blur placeholder for all images (perceived speed boost of ~40%)
- Mobile images served at max 750px width (most phones are 375px @2x)

---

## 13. Navigation

### Sticky Nav with Transparency-to-Solid Transition

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, padding 0.3s ease;
  /* Start transparent over hero */
  background-color: transparent;
}

.nav.is-scrolled {
  background-color: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Mobile Nav: Full-Screen Overlay (Not Hamburger Drawer)

For a premium feel, use a full-screen overlay menu rather than a side drawer:

```css
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: var(--volcanic-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-menu.is-open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu a {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--cream);
  text-decoration: none;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu.is-open a {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger menu items */
.mobile-menu.is-open a:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.is-open a:nth-child(2) { transition-delay: 0.15s; }
.mobile-menu.is-open a:nth-child(3) { transition-delay: 0.2s; }
.mobile-menu.is-open a:nth-child(4) { transition-delay: 0.25s; }
.mobile-menu.is-open a:nth-child(5) { transition-delay: 0.3s; }
```

---

## 14. CSS Snippets Library

### Glass Card Effect

```css
.glass-card {
  background: rgba(45, 45, 45, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
}
```

### Section Divider (Decorative)

```css
.section-divider {
  width: 3rem;
  height: 1px;
  background: var(--gold-soft);
  margin: 0 auto 2rem;
  opacity: 0.5;
}
```

### Text Gradient (Headlines)

```css
.text-gradient {
  background: linear-gradient(135deg, var(--cream) 0%, var(--gold-soft) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Smooth Scroll (Whole Page)

```css
html {
  scroll-behavior: smooth;
  /* But respect user preferences */
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Touch Ripple Utility

```css
.tap-highlight {
  -webkit-tap-highlight-color: rgba(212, 167, 106, 0.15);
}
```

---

## 15. Component Architecture

### Recommended React/Next.js Component Tree

```
src/
  components/
    layout/
      Nav.tsx              — Sticky nav with scroll detection
      Footer.tsx           — Contact info, social links
      StickyCtaBar.tsx     — Fixed bottom CTA (appears after hero)
      ScrollProgress.tsx   — Top progress bar
    sections/
      Hero.tsx             — Full viewport hero with image
      TrustBar.tsx         — Stats counter strip
      Experiences.tsx      — Experience cards grid
      FeaturedExperience.tsx — Full-width highlight
      Gallery.tsx          — Editorial masonry grid
      Pricing.tsx          — 3-tier pricing cards
      Testimonials.tsx     — Horizontal scroll cards
      HowItWorks.tsx       — 3-step timeline
      FAQ.tsx              — Details/summary accordion
      FinalCta.tsx         — Full-width CTA with background
    ui/
      Button.tsx           — Primary/secondary/ghost variants
      Card.tsx             — Base card with grain option
      Counter.tsx          — Animated number counter
      BackToTop.tsx        — Scroll-to-top button
    hooks/
      useInView.ts         — Intersection Observer hook
      useScrollProgress.ts — Scroll percentage tracker
  styles/
    globals.css            — CSS variables, base resets
    grain.css              — Grain texture utility
```

### useInView Hook (Reusable)

```ts
import { useEffect, useRef, useState } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(element); // trigger once
      }
    }, { threshold: 0.15, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}
```

---

## 16. References & Sources

### Wine Website Design
- [Wine Website Design — 30 Best Ideas for 2025 (Mediaboom)](https://mediaboom.com/news/wine-website-design/)
- [Winery Website Design Trends (Vinbound Marketing)](https://www.vinboundmarketing.com/winery-website-design-trends/)
- [The #1 Winery Website Trend for 2025 (5forests)](https://5forests.com/winery-websites-trends/)
- [Wine Website Design Ideas for 2025 (Seahawk)](https://seahawkmedia.com/wordpress/wine-website-design-ideas/)
- [Wine Web Design Ideas 2026 (99designs)](https://99designs.com/inspiration/websites/wine)

### Azores Tourism
- [Explore Terceira Island](https://www.exploreterceiraisland.com/en/)
- [Visit Azores — Terceira](https://www.visitazores.com/en/the-azores/terceira)
- [Visit Portugal — Acores](https://www.visitportugal.com/en/destinos/acores)

### Mobile Landing Pages
- [10 Best Mobile Landing Page Design Examples (Webstacks)](https://www.webstacks.com/blog/mobile-landing-page)
- [Design Lead Gen Landing Page for Mobile (Smashing Magazine)](https://www.smashingmagazine.com/2019/04/design-landing-page-mobile-conversion/)
- [Landing Page Design Best Practices 2025 (Fermat Commerce)](https://www.fermatcommerce.com/post/landing-page-design)

### Pricing Design
- [How to Design Pricing Tables That Convert (Telerik)](https://www.telerik.com/blogs/how-to-design-pricing-tables-convert-better)
- [Mobile SaaS Pricing Pages (CXL)](https://cxl.com/blog/mobile-saas-pricing-pages/)
- [Pricing Table Best Practices (NinjaTables)](https://ninjatables.com/pricing-table-best-practices/)

### CSS & Performance
- [Grainy Gradients (CSS-Tricks)](https://css-tricks.com/grainy-gradients/)
- [Create Grainy Backgrounds with CSS (ibelick)](https://ibelick.com/blog/create-grainy-backgrounds-with-css)
- [Parallax CSS for Mobile (natebal)](https://natebal.com/parallax-css/)
- [CSS Scroll-Triggered Animations (Bram.us)](https://www.bram.us/2025/12/12/css-scroll-triggered-animations-are-coming-to-chrome/)
- [Native CSS Masonry Layout (Smashing Magazine)](https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/)

### Micro-interactions
- [Motion UI Trends 2025 (Beta Soft)](https://www.betasofttechnology.com/motion-ui-trends-and-micro-interactions/)
- [Micro-Interactions Making Biggest Impact (Color Colour)](https://www.colorcolourcreative.com/creative-hub/2025/micro-interactions)
- [Framer Motion vs CSS (Ryan Aque)](https://blog.ryanaque.com/fuck-framer-motion-im-going-to-css-instead/)
- [AnimateNumber — Motion.dev](https://motion.dev/docs/react-animate-number)

### CTA & Lead Capture
- [Best CTA Placement Strategies 2026 (LandingPageFlow)](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [Landing Page Form Design Best Practices (Apexure)](https://www.apexure.com/blog/landing-page-form-design-best-practices-with-examples)

### Color & Typography
- [Wine Burgundy Color Palettes (media.io)](https://www.media.io/color-palette/wine-burgundy-color-palette.html)
- [Wine Color Palettes (Coolors)](https://coolors.co/palettes/popular/wine)
- [Minimalist Color & Typography (Bejamas)](https://bejamas.com/blog/minimalist-color-palette-and-typography-in-web-design)

### Image Optimization
- [Next.js Image Placeholder (DhiWise)](https://www.dhiwise.com/blog/design-converter/how-to-use-nextjs-image-placeholder-for-better-speed)
- [Advanced Image Optimization (Vercel Academy)](https://vercel.com/academy/nextjs-foundations/advanced-image-optimization)

---

## Summary: Key Decisions

| Decision | Recommendation | Why |
|---|---|---|
| Animation library | CSS + Intersection Observer | Zero bundle cost, 98% mobile users |
| Parallax | Disabled on mobile | iOS doesn't support it, kills battery |
| Gallery layout | CSS Grid asymmetric (not true masonry) | Works today, no polyfill needed |
| Pricing | 3 tiers, middle highlighted, stacked mobile | Decision science: fewer choices = more conversions |
| Lead capture | WhatsApp CTA + sticky bottom bar | Native to Azores tourism market |
| Typography | Playfair Display + Inter | Premium serif headlines, readable sans body |
| Color | Dark volcanic + warm gold + wine burgundy | Premium wine feel without cold luxury |
| Image loading | Next.js blur placeholder | 40% faster perceived loading |
| Noise texture | Inline SVG feTurbulence | Zero network request, ~200 bytes |
| FAQ | Native details/summary + CSS grid animation | Zero JS, accessible, smooth |
