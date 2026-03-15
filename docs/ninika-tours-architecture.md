# NinikaTours — Architectural Specification

> **Experiências de vinho vulcânico e gastronomia açoriana pelas ruas da Terceira**
>
> Production-grade spec for 4 builder agents. Every string in PT-PT with correct accents.

---

## Table of Contents

1. [File Structure](#1-file-structure)
2. [Component Breakdown & Builder Agent Assignment](#2-component-breakdown--builder-agent-assignment)
3. [CSS Architecture](#3-css-architecture)
4. [Data Structures & Content](#4-data-structures--content)
5. [Animation Spec](#5-animation-spec)
6. [Lead Capture Form Spec](#6-lead-capture-form-spec)
7. [Mobile-First Responsive Plan](#7-mobile-first-responsive-plan)
8. [Accent & Naming Reference](#8-accent--naming-reference)
9. [SEO Metadata](#9-seo-metadata)

---

## 1. File Structure

```
portfolio/
├── app/
│   └── projetos/
│       └── ninika-tours/
│           ├── layout.tsx          # Metadata, font loading, .ninika-root wrapper
│           ├── page.tsx            # "use client" — assembles all 13 sections
│           └── ninika.css          # All scoped styles under .ninika-root
├── components/
│   └── ninika-tours/
│       ├── types.ts               # All TypeScript interfaces/types
│       ├── data.ts                # All data arrays (experiences, producers, etc.)
│       ├── utils.ts               # Shared helpers (cn, scroll, form validation)
│       ├── Hero.tsx               # Section 1
│       ├── AIlha.tsx              # Section 2 — A Ilha
│       ├── Experiencias.tsx       # Section 3
│       ├── ComoFunciona.tsx       # Section 4
│       ├── OQueVaisProvar.tsx      # Section 5
│       ├── Produtores.tsx         # Section 6
│       ├── ParaQuem.tsx           # Section 7
│       ├── Galeria.tsx            # Section 8
│       ├── Testemunhos.tsx        # Section 9
│       ├── Precos.tsx             # Section 10
│       ├── FAQ.tsx                # Section 11
│       ├── LeadCapture.tsx        # Section 12
│       └── Footer.tsx            # Section 13
└── public/
    └── ninika-tours/
        ├── og-image.jpg           # 1200×630 OG image (placeholder)
        └── textures/
            └── grain.png          # Subtle grain overlay texture
```

### Key files explained

| File | Purpose |
|---|---|
| `layout.tsx` | Loads Cormorant Garamond + DM Sans via `next/font/google`, sets metadata, wraps children in `<div className="ninika-root">` |
| `page.tsx` | Client component that imports and renders all 13 section components in order |
| `ninika.css` | All custom CSS scoped under `.ninika-root` — imported in `layout.tsx` |
| `types.ts` | Single source of truth for all TypeScript interfaces |
| `data.ts` | All content arrays — the ONLY file builders edit for content changes |

---

## 2. Component Breakdown & Builder Agent Assignment

### Agent 1 — Foundation & First Impression
**Files:** `types.ts`, `data.ts`, `utils.ts`, `layout.tsx`, `page.tsx`, `ninika.css`, `Hero.tsx`, `AIlha.tsx`

| Component | Estimated lines | Notes |
|---|---|---|
| `types.ts` | ~120 | All interfaces — must be done FIRST |
| `data.ts` | ~600 | All data arrays — must be done FIRST |
| `utils.ts` | ~40 | cn() helper, smoothScroll, validation |
| `layout.tsx` | ~50 | Font loading, metadata, root wrapper |
| `page.tsx` | ~80 | Import all sections, render in order |
| `ninika.css` | ~300 | Full CSS file with all custom styles |
| `Hero.tsx` | ~150 | Volcanic gradient, stats, dual CTAs |
| `AIlha.tsx` | ~120 | 3 zone cards with icons |

### Agent 2 — Core Experience Content
**Files:** `Experiencias.tsx`, `ComoFunciona.tsx`, `OQueVaisProvar.tsx`, `Produtores.tsx`

| Component | Estimated lines | Notes |
|---|---|---|
| `Experiencias.tsx` | ~180 | 6 experience cards with pricing, duration |
| `ComoFunciona.tsx` | ~120 | 4-step visual timeline |
| `OQueVaisProvar.tsx` | ~160 | 10 petisco cards, horizontal scroll mobile |
| `Produtores.tsx` | ~160 | 8 producer cards with real descriptions |

### Agent 3 — Social Proof & Pricing
**Files:** `ParaQuem.tsx`, `Galeria.tsx`, `Testemunhos.tsx`, `Precos.tsx`

| Component | Estimated lines | Notes |
|---|---|---|
| `ParaQuem.tsx` | ~140 | 4 audience segments with icons |
| `Galeria.tsx` | ~130 | Masonry grid, placeholder aspect ratios |
| `Testemunhos.tsx` | ~150 | 6 testimonial cards, auto-rotate |
| `Precos.tsx` | ~180 | 4 pricing tiers, highlight "Completo" |

### Agent 4 — Conversion & Footer
**Files:** `FAQ.tsx`, `LeadCapture.tsx`, `Footer.tsx`

| Component | Estimated lines | Notes |
|---|---|---|
| `FAQ.tsx` | ~200 | 12 accordion items |
| `LeadCapture.tsx` | ~250 | Full form, validation, WhatsApp CTA |
| `Footer.tsx` | ~120 | Links, social, newsletter, credits |

---

## 3. CSS Architecture

### 3.1 Root Scoping

All styles MUST be scoped under `.ninika-root` to prevent conflicts with the parent portfolio.

```css
/* ninika.css */

/* ═══════════════════════════════════════════════════
   NINIKA TOURS — Scoped Styles
   All rules under .ninika-root
   ═══════════════════════════════════════════════════ */

.ninika-root {
  --nk-basalt: #1a1a2e;
  --nk-basalt-light: #2a2a40;
  --nk-wine: #722F37;
  --nk-wine-light: #8B3A42;
  --nk-wine-dark: #5C262D;
  --nk-gold: #C5A55A;
  --nk-gold-light: #D4B86A;
  --nk-gold-muted: rgba(197, 165, 90, 0.15);
  --nk-white: #F5F0EB;
  --nk-white-pure: #FFFFFF;
  --nk-moss: #3D5A3E;
  --nk-moss-light: #4A6D4B;
  --nk-atlantic: #2C5F7C;
  --nk-atlantic-light: #3A7A9E;

  /* Neutral greys */
  --nk-gray-100: #F0EDE8;
  --nk-gray-200: #E0DCD6;
  --nk-gray-300: #C8C3BC;
  --nk-gray-400: #9E9890;
  --nk-gray-500: #6B6560;
  --nk-gray-600: #4A4540;

  /* Shadows */
  --nk-shadow-sm: 0 1px 2px rgba(26, 26, 46, 0.08);
  --nk-shadow-md: 0 4px 12px rgba(26, 26, 46, 0.12);
  --nk-shadow-lg: 0 8px 24px rgba(26, 26, 46, 0.16);
  --nk-shadow-wine: 0 4px 16px rgba(114, 47, 55, 0.25);

  /* Typography */
  --nk-font-display: var(--font-cormorant), 'Cormorant Garamond', serif;
  --nk-font-body: var(--font-dm-sans), 'DM Sans', sans-serif;

  /* Spacing scale */
  --nk-section-py: 5rem;       /* 80px */
  --nk-section-py-mobile: 3rem; /* 48px */
  --nk-container-px: 1.5rem;   /* 24px */
  --nk-container-max: 1200px;

  /* Transitions */
  --nk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --nk-duration: 0.4s;

  font-family: var(--nk-font-body);
  color: var(--nk-basalt);
  background: var(--nk-white);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
```

### 3.2 Utility Classes (inside `.ninika-root`)

```css
/* Container */
.ninika-root .nk-container {
  max-width: var(--nk-container-max);
  margin: 0 auto;
  padding: 0 var(--nk-container-px);
}

/* Section spacing */
.ninika-root .nk-section {
  padding: var(--nk-section-py) 0;
}

@media (max-width: 768px) {
  .ninika-root .nk-section {
    padding: var(--nk-section-py-mobile) 0;
  }
}

/* Section header */
.ninika-root .nk-section-label {
  font-family: var(--nk-font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--nk-gold);
  margin-bottom: 0.75rem;
}

.ninika-root .nk-section-title {
  font-family: var(--nk-font-display);
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--nk-basalt);
  margin-bottom: 1rem;
}

.ninika-root .nk-section-subtitle {
  font-family: var(--nk-font-body);
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--nk-gray-500);
  max-width: 600px;
}

/* Buttons */
.ninika-root .nk-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  min-width: 48px;
  padding: 0.875rem 2rem;
  font-family: var(--nk-font-body);
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--nk-duration) var(--nk-ease);
  border: none;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

.ninika-root .nk-btn-primary {
  background: var(--nk-wine);
  color: var(--nk-white);
}
.ninika-root .nk-btn-primary:hover {
  background: var(--nk-wine-light);
  box-shadow: var(--nk-shadow-wine);
  transform: translateY(-1px);
}

.ninika-root .nk-btn-secondary {
  background: transparent;
  color: var(--nk-gold);
  border: 2px solid var(--nk-gold);
}
.ninika-root .nk-btn-secondary:hover {
  background: var(--nk-gold-muted);
  transform: translateY(-1px);
}

.ninika-root .nk-btn-whatsapp {
  background: #25D366;
  color: #FFFFFF;
}
.ninika-root .nk-btn-whatsapp:hover {
  background: #20BD5A;
  transform: translateY(-1px);
}

/* Cards */
.ninika-root .nk-card {
  background: var(--nk-white-pure);
  border: 1px solid var(--nk-gray-200);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all var(--nk-duration) var(--nk-ease);
}
.ninika-root .nk-card:hover {
  border-color: var(--nk-gold);
  box-shadow: var(--nk-shadow-md);
  transform: translateY(-2px);
}

/* Dark sections (hero, lead capture, footer) */
.ninika-root .nk-dark {
  background: var(--nk-basalt);
  color: var(--nk-white);
}
.ninika-root .nk-dark .nk-section-title {
  color: var(--nk-white);
}
.ninika-root .nk-dark .nk-section-subtitle {
  color: var(--nk-gray-300);
}

/* Grain overlay */
.ninika-root .nk-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/ninika-tours/textures/grain.png') repeat;
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
}

/* Gold accent line */
.ninika-root .nk-gold-line {
  width: 48px;
  height: 3px;
  background: var(--nk-gold);
  border-radius: 2px;
  margin-bottom: 1.5rem;
}

/* Badge/tag */
.ninika-root .nk-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 999px;
  background: var(--nk-gold-muted);
  color: var(--nk-gold);
}

/* Scrollbar for horizontal scroll containers */
.ninika-root .nk-scroll-x {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 0.5rem;
}
.ninika-root .nk-scroll-x::-webkit-scrollbar {
  display: none;
}
.ninika-root .nk-scroll-x > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

### 3.3 Responsive Breakpoints

| Token | Value | Usage |
|---|---|---|
| `sm` | 480px | Small phones → larger phones |
| `md` | 768px | Phones → tablets |
| `lg` | 1024px | Tablets → desktop |
| `xl` | 1280px | Desktop → wide |

Use Tailwind classes with these breakpoints. Custom CSS uses `@media (min-width: ...)`.

### 3.4 Section Background Pattern

| Section | Background |
|---|---|
| Hero | `nk-dark` + volcanic gradient + grain |
| A Ilha | `nk-white` |
| Experiências | `nk-gray-100` (light warm grey) |
| Como Funciona | `nk-white` |
| O Que Vais Provar | `nk-basalt` (dark) |
| Produtores | `nk-white` |
| Para Quem | `nk-gray-100` |
| Galeria | `nk-white` |
| Testemunhos | `nk-basalt` (dark) |
| Preços | `nk-white` |
| FAQ | `nk-gray-100` |
| Lead Capture | `nk-dark` + grain |
| Footer | `nk-basalt` darker (#141424) |

---

## 4. Data Structures & Content

### 4.1 TypeScript Types (`types.ts`)

```typescript
// ═══════════════════════════════════════════════════
// NinikaTours — Type Definitions
// ═══════════════════════════════════════════════════

export interface HeroStat {
  value: string;
  label: string;
}

export interface ZoneCard {
  id: string;
  name: string;
  emoji: string;
  description: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  includes: string[];
  price: string;
  priceNote?: string;
  emoji: string;
  badge?: string;
  groupSize: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  emoji: string;
}

export interface Petisco {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'petisco' | 'prato' | 'doce' | 'vinho';
}

export interface Producer {
  id: string;
  name: string;
  location: string;
  description: string;
  specialty: string;
  emoji: string;
  founded?: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  description: string;
  emoji: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  alt: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  placeholder: string; // Evocative description for placeholder
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  text: string;
  rating: number;
  language: 'pt' | 'en';
  experience: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LeadFormData {
  nome: string;
  email: string;
  dataChegada: string;
  dataPartida: string;
  experiencia: string;
  tamanhoGrupo: string;
  mensagem: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

### 4.2 All Data Arrays (`data.ts`)

```typescript
import type {
  HeroStat,
  ZoneCard,
  Experience,
  Step,
  Petisco,
  Producer,
  AudienceSegment,
  GalleryItem,
  Testimonial,
  PricingTier,
  FAQItem,
  NavLink,
} from './types';

// ═══════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════

export const NAV_LINKS: NavLink[] = [
  { label: 'A Ilha', href: '#a-ilha' },
  { label: 'Experiências', href: '#experiencias' },
  { label: 'O Que Provar', href: '#o-que-provar' },
  { label: 'Produtores', href: '#produtores' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reservar', href: '#reservar' },
];

// ═══════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════

export const HERO_TAGLINE = 'Bebe. Prova. Descobre a Ilha.';
export const HERO_SUBTITLE =
  'Experiências de vinho vulcânico e gastronomia açoriana pelas ruas da Terceira';

export const HERO_STATS: HeroStat[] = [
  { value: '1', label: 'Ilha Vulcânica' },
  { value: '8+', label: 'Produtores' },
  { value: '500+', label: 'Anos de Vinho' },
  { value: '12+', label: 'Paragens' },
];

export const HERO_CTA_PRIMARY = 'Reservar Experiência';
export const HERO_CTA_SECONDARY = 'Ver Experiências';

// ═══════════════════════════════════════════════════
// A ILHA — 3 Zones
// ═══════════════════════════════════════════════════

export const ZONES: ZoneCard[] = [
  {
    id: 'biscoitos',
    name: 'Biscoitos & Costa Norte',
    emoji: '🌋',
    description:
      'O coração vinícola da Terceira. Vinhas plantadas em currais de pedra de basalto, protegidas do Atlântico. Aqui nasce o lendário Verdelho.',
    highlights: [
      'Museu do Vinho dos Biscoitos',
      'Currais de vinha (Património UNESCO candidato)',
      'Piscinas naturais vulcânicas',
      'Adegas históricas com provas',
    ],
  },
  {
    id: 'angra',
    name: 'Angra do Heroísmo',
    emoji: '🏛️',
    description:
      'Capital e Património Mundial UNESCO. Ruas coloridas, igrejas barrocas e tascas escondidas onde o vinho corre tão bem como a conversa.',
    highlights: [
      'Centro histórico Património UNESCO',
      'Tascas tradicionais com petiscos',
      'Forte de São João Baptista',
      'Mercado Duque de Bragança',
    ],
  },
  {
    id: 'praia',
    name: 'Praia da Vitória & Interior',
    emoji: '🌿',
    description:
      'A costa leste e o interior verdejante. Pastagens, queijarias artesanais, festas do Espírito Santo e uma gastronomia de campo autêntica.',
    highlights: [
      'Baía da Praia da Vitória',
      'Queijarias artesanais',
      'Festas do Divino Espírito Santo',
      'Algar do Carvão (gruta vulcânica)',
    ],
  },
];

// ═══════════════════════════════════════════════════
// EXPERIÊNCIAS — 6 Tours
// ═══════════════════════════════════════════════════

export const EXPERIENCES: Experience[] = [
  {
    id: 'rota-verdelho',
    name: 'Rota do Verdelho',
    tagline: 'O vinho que nasce da lava',
    description:
      'Percorre os currais de vinha dos Biscoitos, visita adegas centenárias e prova o Verdelho — a casta que pôs a Terceira no mapa do vinho mundial. Inclui visita ao Museu do Vinho e prova comentada em adega local.',
    duration: '4 horas',
    includes: [
      'Transporte desde Angra',
      'Visita ao Museu do Vinho',
      'Prova de 4 vinhos em adega',
      'Tábua de queijos e petiscos locais',
      'Guia especializado',
    ],
    price: 'Desde €55',
    emoji: '🍇',
    badge: 'Mais Popular',
    groupSize: '2–12 pessoas',
  },
  {
    id: 'tasquinha',
    name: 'Tasquinha a Tasquinha',
    tagline: 'De tasca em tasca, a Angra revela-se',
    description:
      'Walking tour gastronómico pelo centro histórico de Angra. 4 tascas autênticas, cada uma com o seu petisco e vinho. Histórias, segredos e a verdadeira alma da cidade.',
    duration: '3 horas',
    includes: [
      '4 paragens em tascas locais',
      '4 provas de vinho açoriano',
      '4 petiscos tradicionais',
      'Guia local com histórias da cidade',
    ],
    price: 'Desde €45',
    emoji: '🚶',
    groupSize: '2–10 pessoas',
  },
  {
    id: 'vulcao-copo',
    name: 'Vulcão no Copo',
    tagline: 'Geologia que se bebe',
    description:
      'Uma experiência que liga a terra ao copo. Visita o Algar do Carvão, caminha por paisagens vulcânicas e termina com prova de vinhos minerais que reflectem o terroir basáltico da ilha.',
    duration: '5 horas',
    includes: [
      'Visita ao Algar do Carvão',
      'Caminhada por paisagem vulcânica',
      'Prova de 5 vinhos com harmonização geológica',
      'Almoço ligeiro com produtos locais',
      'Transporte incluído',
    ],
    price: 'Desde €65',
    emoji: '🌋',
    groupSize: '2–8 pessoas',
  },
  {
    id: 'mar-mesa',
    name: 'Do Mar à Mesa',
    tagline: 'O Atlântico no prato e no copo',
    description:
      'Acompanha pescadores locais (ou visita a lota), aprende a preparar lapas e cracas, e senta-te à mesa com marisco fresco, vinho branco e a brisa do mar.',
    duration: '4 horas',
    includes: [
      'Visita à lota ou porto de pesca',
      'Demonstração de preparação de marisco',
      'Refeição completa de marisco fresco',
      'Harmonização com 3 vinhos brancos',
    ],
    price: 'Desde €60',
    emoji: '🦞',
    groupSize: '2–8 pessoas',
  },
  {
    id: 'espirito-santo',
    name: 'Espírito Santo à Mesa',
    tagline: 'A tradição que alimenta a alma',
    description:
      'Descobre a tradição mais profunda dos Açores: as Festas do Espírito Santo. Visita um Império, participa na preparação das Sopas e experimenta a generosidade que define a Terceira.',
    duration: '3,5 horas',
    includes: [
      'Visita a um Império do Espírito Santo',
      'Participação na preparação das Sopas',
      'Refeição comunitária tradicional',
      'Massa Sovada e Dona Amélia caseiras',
      'Contexto cultural e histórico',
    ],
    price: 'Desde €40',
    emoji: '👑',
    priceNote: 'Disponível de Maio a Setembro',
    groupSize: '2–15 pessoas',
  },
  {
    id: 'sunset-sip',
    name: 'Sunset & Sip',
    tagline: 'O pôr-do-sol mais vínico do Atlântico',
    description:
      'Tarde relaxada nos Biscoitos ou Monte Brasil. Vê o sol mergulhar no Atlântico enquanto provas vinhos locais com uma seleção de queijos e enchidos artesanais. Perfeito para casais.',
    duration: '2,5 horas',
    includes: [
      'Localização exclusiva ao pôr-do-sol',
      'Prova de 4 vinhos selecionados',
      'Tábua de queijos e enchidos artesanais',
      'Fotografia profissional do grupo',
    ],
    price: 'Desde €45',
    emoji: '🌅',
    badge: 'Romântico',
    groupSize: '2–6 pessoas',
  },
];

// ═══════════════════════════════════════════════════
// COMO FUNCIONA — 4 Steps
// ═══════════════════════════════════════════════════

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Escolhe',
    description:
      'Explora as nossas experiências e escolhe a que mais te entusiasma. Rota do Verdelho? Tasquinha a Tasquinha? Tu decides.',
    emoji: '🔍',
  },
  {
    number: 2,
    title: 'Reserva',
    description:
      'Preenche o formulário com as tuas datas e preferências. Respondemos em menos de 24 horas com disponibilidade e detalhes.',
    emoji: '📋',
  },
  {
    number: 3,
    title: 'Encontra-te',
    description:
      'No dia, encontramo-nos no ponto combinado em Angra ou nos Biscoitos. O teu guia local está à espera — relaxa e desfruta.',
    emoji: '📍',
  },
  {
    number: 4,
    title: 'Descomplica',
    description:
      'Bebe, prova, ri, descobre. Sem formalidades, sem julgamentos. Apenas tu, vinho vulcânico e a melhor gastronomia da Terceira.',
    emoji: '🎉',
  },
];

// ═══════════════════════════════════════════════════
// O QUE VAIS PROVAR — 10 Items
// ═══════════════════════════════════════════════════

export const PETISCOS: Petisco[] = [
  {
    id: 'polvo',
    name: 'Polvo Guisado',
    description:
      'Polvo do Atlântico cozinhado lentamente em vinho tinto, alho e ervas. Tão macio que derrete. Um clássico açoriano que não perdoas.',
    emoji: '🐙',
    category: 'prato',
  },
  {
    id: 'alcatra',
    name: 'Alcatra Terceirense',
    description:
      'O prato-rei da Terceira. Carne de vaca cozinhada em panela de barro com vinho, especiarias e toucinho. Cozinha lenta, sabor profundo. Tradicionalmente servida nas festas do Espírito Santo.',
    emoji: '🥩',
    category: 'prato',
  },
  {
    id: 'queijo-vaquinha',
    name: 'Queijo Vaquinha',
    description:
      'Queijo curado da ilha, com sabor intenso e ligeiramente picante. Produzido artesanalmente com leite de vacas que pastam livremente na ilha. O companheiro perfeito para o Verdelho.',
    emoji: '🧀',
    category: 'petisco',
  },
  {
    id: 'linguica',
    name: 'Linguiça da Ilha',
    description:
      'Enchido de porco temperado com pimenta da terra, alho e vinho. Grelhada na brasa ou cozida no vinho — qualquer versão é viciante.',
    emoji: '🌭',
    category: 'petisco',
  },
  {
    id: 'cracas',
    name: 'Cracas',
    description:
      'Crustáceo vulcânico agarrado às rochas do litoral. Cozidas em água do mar e servidas com limão. Sabor a oceano puro. Uma iguaria rara que só encontras nos Açores.',
    emoji: '🦪',
    category: 'petisco',
  },
  {
    id: 'dona-amelia',
    name: 'Dona Amélia',
    description:
      'Bolo húmido com mel, canela, erva-doce e frutos secos. Criado em honra da Rainha D. Amélia na sua visita à Terceira em 1901. O doce mais emblemático da ilha.',
    emoji: '🍰',
    category: 'doce',
  },
  {
    id: 'massa-sovada',
    name: 'Massa Sovada',
    description:
      'Pão doce fofo e amanteigado, indispensável em qualquer festa açoriana. Receita transmitida de geração em geração. Perfeita com manteiga ou sozinha.',
    emoji: '🍞',
    category: 'doce',
  },
  {
    id: 'sopas-es',
    name: 'Sopas do Espírito Santo',
    description:
      'Fatias de pão embebidas no caldo de carne das Festas, com couve, hortelã e especiarias. Muito mais do que uma sopa — é uma tradição com séculos. Sabor a comunidade.',
    emoji: '🍲',
    category: 'prato',
  },
  {
    id: 'lapas',
    name: 'Lapas Grelhadas',
    description:
      'Grelhadas na concha com manteiga de alho e limão. Apanhadas nas rochas vulcânicas e servidas a escaldar. O petisco obrigatório à beira-mar nos Açores.',
    emoji: '🐚',
    category: 'petisco',
  },
  {
    id: 'verdelho',
    name: 'Verdelho dos Biscoitos',
    description:
      'A estrela dos vinhos da Terceira. Casta cultivada em currais de basalto junto ao mar. Notas minerais, citrinos e sal — o terroir vulcânico no copo. Histórico favorito da corte russa.',
    emoji: '🍷',
    category: 'vinho',
  },
];

// ═══════════════════════════════════════════════════
// PRODUTORES — 8 Producers
// ═══════════════════════════════════════════════════

export const PRODUCERS: Producer[] = [
  {
    id: 'materramenta',
    name: 'Materramenta',
    location: 'Biscoitos',
    description:
      'Projecto de viticultura de precisão nos Biscoitos. Vinhos de autor com expressão vulcânica — o Verdelho deles é referência. Jovens enólogos a redefinir o vinho açoriano com respeito pela tradição.',
    specialty: 'Verdelho de terroir vulcânico',
    emoji: '🌿',
    founded: '2016',
  },
  {
    id: 'dimas',
    name: 'António Dimas Ferreira',
    location: 'Biscoitos',
    description:
      'Produtor artesanal com décadas de experiência. Vinhos honestos, feitos à moda antiga em adegas de pedra. O seu Verdelho de colheita tardia é um tesouro escondido da ilha.',
    specialty: 'Verdelho artesanal de colheita tardia',
    emoji: '🏺',
  },
  {
    id: 'brum',
    name: 'Brum',
    location: 'Biscoitos',
    description:
      'Família com raízes profundas na vitivinicultura terceirense. Produção limitada com uvas de vinhas velhas em currais de basalto. Vinhos com carácter e mineralidade atlântica.',
    specialty: 'Vinhas velhas, produção limitada',
    emoji: '🪨',
  },
  {
    id: 'cooperativa',
    name: 'Adega Cooperativa da Ilha Terceira',
    location: 'Biscoitos',
    description:
      'A cooperativa que agrega dezenas de pequenos viticultores da ilha. Vinhos acessíveis e autênticos que representam o esforço colectivo dos produtores terceirenses. Visita obrigatória nos Biscoitos.',
    specialty: 'Vinhos cooperativos acessíveis',
    emoji: '🤝',
    founded: '1992',
  },
  {
    id: 'quinta-ilhas',
    name: 'Quinta das Ilhas',
    location: 'Biscoitos',
    description:
      'Projecto vínico que combina tradição açoriana com técnicas modernas. Vinhas em currais recuperados e vinificação cuidada. Destaque para o branco aromático de castas regionais.',
    specialty: 'Brancos aromáticos de castas regionais',
    emoji: '🏝️',
  },
  {
    id: 'incerteza',
    name: 'Incerteza',
    location: 'Biscoitos',
    description:
      'Nome provocador, vinhos certeiros. Projecto jovem e experimental que desafia convenções. Lotes incomuns, fermentações espontâneas, rótulos artísticos. O lado rebelde do vinho açoriano.',
    specialty: 'Vinhos naturais e experimentais',
    emoji: '🎲',
  },
  {
    id: 'lira',
    name: 'Lira',
    location: 'Terceira',
    description:
      'Produtor com enfoque na expressão pura da casta Verdelho. Vinhos elegantes e equilibrados que mostram o lado refinado do terroir vulcânico. Produção pequena, qualidade consistente.',
    specialty: 'Verdelho elegante e equilibrado',
    emoji: '🎵',
  },
  {
    id: 'vinha-branca',
    name: 'Vinha Branca do Mar',
    location: 'Biscoitos',
    description:
      'Vinhas literalmente à beira-mar, batidas pela brisa atlântica. Vinhos com salinidade marcada e frescura única. O nome diz tudo — branco, puro, marítimo.',
    specialty: 'Vinhos brancos com salinidade atlântica',
    emoji: '🌊',
  },
];

// ═══════════════════════════════════════════════════
// PARA QUEM — 4 Segments
// ═══════════════════════════════════════════════════

export const AUDIENCES: AudienceSegment[] = [
  {
    id: 'familias',
    title: 'Famílias',
    description:
      'Experiências adaptadas para todas as idades. As crianças exploram enquanto os adultos provam. Versões sem álcool disponíveis com sumos de fruta açorianos.',
    emoji: '👨‍👩‍👧‍👦',
    highlights: [
      'Opções sem álcool para menores',
      'Ritmo adaptado a famílias',
      'Atividades para crianças nas quintas',
      'Menus infantis nos restaurantes parceiros',
    ],
  },
  {
    id: 'casais',
    title: 'Casais',
    description:
      'Sunset & Sip, jantares privados e rotas exclusivas. A Terceira é um dos destinos mais românticos e menos massificados da Europa. Perfeito para aniversários e luas-de-mel.',
    emoji: '💑',
    highlights: [
      'Experiência Sunset & Sip dedicada',
      'Jantares privados em adegas',
      'Rotas exclusivas a dois',
      'Fotografia incluída nas experiências premium',
    ],
  },
  {
    id: 'equipas',
    title: 'Equipas & Empresas',
    description:
      'Team building com sabor. Desafios de vindima, provas cegas competitivas e almoços de grupo em quintas. Até 30 pessoas com logística completa.',
    emoji: '🏢',
    highlights: [
      'Programas de team building personalizados',
      'Desafios de prova cega por equipas',
      'Capacidade até 30 participantes',
      'Facturação empresarial disponível',
    ],
  },
  {
    id: 'despedidas',
    title: 'Despedidas de Solteiro/a',
    description:
      'Esquece os destinos óbvios. Uma despedida na Terceira é inesquecível: vinhos vulcânicos, petiscos intermináveis e paisagens que ninguém do grupo vai acreditar.',
    emoji: '🎉',
    highlights: [
      'Roteiros personalizados para grupos',
      'Combinação com actividades náuticas',
      'Noite de tascas em Angra incluída',
      'Coordenação surpresa disponível',
    ],
  },
];

// ═══════════════════════════════════════════════════
// GALERIA — Placeholder Descriptions
// ═══════════════════════════════════════════════════

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    alt: 'Currais de vinha em basalto nos Biscoitos com o mar ao fundo',
    aspectRatio: 'landscape',
    placeholder: 'Muros de pedra escura protegem videiras verdes, o Atlântico azul-profundo ao fundo',
  },
  {
    id: 'g2',
    alt: 'Copo de Verdelho dourado contra pôr-do-sol na costa',
    aspectRatio: 'portrait',
    placeholder: 'Copo de vinho dourado iluminado pelo sol poente, silhueta da costa vulcânica',
  },
  {
    id: 'g3',
    alt: 'Alcatra a fumegar numa panela de barro tradicional',
    aspectRatio: 'square',
    placeholder: 'Panela de barro escuro com carne suculenta, vapor aromático a subir',
  },
  {
    id: 'g4',
    alt: 'Rua colorida de Angra do Heroísmo com grupo a rir',
    aspectRatio: 'landscape',
    placeholder: 'Rua estreita com casas coloridas, grupo alegre a caminhar com copos na mão',
  },
  {
    id: 'g5',
    alt: 'Lapas grelhadas na brasa à beira-mar',
    aspectRatio: 'square',
    placeholder: 'Conchas abertas sobre grelha fumegante, gotas de manteiga de alho, mar desfocado',
  },
  {
    id: 'g6',
    alt: 'Interior de adega centenária nos Biscoitos com barris de carvalho',
    aspectRatio: 'portrait',
    placeholder: 'Adega escura de pedra vulcânica, barris antigos, luz suave por uma janela pequena',
  },
  {
    id: 'g7',
    alt: 'Império do Espírito Santo decorado para as festas',
    aspectRatio: 'landscape',
    placeholder: 'Edifício branco e vermelho com coroa prateada, flores e bandeiras coloridas',
  },
  {
    id: 'g8',
    alt: 'Tábua de queijos e enchidos com Verdelho',
    aspectRatio: 'square',
    placeholder: 'Tábua de madeira com queijo curado, linguiça fatiada, pão e garrafa de vinho branco',
  },
];

// ═══════════════════════════════════════════════════
// TESTEMUNHOS — 6 Testimonials
// ═══════════════════════════════════════════════════

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sofia & Miguel',
    origin: 'Lisboa, Portugal',
    text: 'Viemos para a Terceira sem saber nada de vinhos açorianos. Saímos a perceber porque é que o Verdelho é especial. A experiência nos Biscoitos foi incrível — o guia sabia tudo sobre cada curral, cada adega. E os petiscos? Ai os petiscos...',
    rating: 5,
    language: 'pt',
    experience: 'Rota do Verdelho',
  },
  {
    id: 't2',
    name: 'James & Sarah',
    origin: 'London, UK',
    text: "We've done wine tours in Tuscany and Bordeaux, but nothing compares to this. Walking through volcanic stone walls with vines growing out of lava rock... it's otherworldly. The Verdelho was a revelation. Already planning to come back.",
    rating: 5,
    language: 'en',
    experience: 'Vulcão no Copo',
  },
  {
    id: 't3',
    name: 'Ana Rodrigues',
    origin: 'Porto, Portugal',
    text: 'Fiz a Tasquinha a Tasquinha com amigas e foi das melhores tardes que tivemos. O guia levou-nos a sítios que nunca encontraríamos sozinhas. A terceira tasca tinha um polvo guisado que ainda sonho com ele. Recomendo a 200%.',
    rating: 5,
    language: 'pt',
    experience: 'Tasquinha a Tasquinha',
  },
  {
    id: 't4',
    name: 'Hans & Petra',
    origin: 'München, Deutschland',
    text: "Wir haben die Sunset & Sip Erfahrung gemacht — sorry, I'll switch to English! The sunset at Biscoitos with local wines and cheese was magical. Our guide explained everything about volcanic soils and wine. Very intimate, very special.",
    rating: 5,
    language: 'en',
    experience: 'Sunset & Sip',
  },
  {
    id: 't5',
    name: 'Família Costa',
    origin: 'São Paulo, Brasil',
    text: 'Fizemos a experiência do Espírito Santo com os nossos filhos. Foi emocionante participar na preparação das Sopas e perceber a tradição que os nossos avós levaram para o Brasil. As crianças adoraram. Chorámos todos de emoção.',
    rating: 5,
    language: 'pt',
    experience: 'Espírito Santo à Mesa',
  },
  {
    id: 't6',
    name: 'Emma & Tom',
    origin: 'Sydney, Australia',
    text: "Best food experience of our entire Europe trip — and we'd been travelling for 3 months! The seafood tour was unreal. Barnacles from volcanic rocks, grilled limpets, octopus stew... paired with wines we'd never heard of. A hidden gem.",
    rating: 5,
    language: 'en',
    experience: 'Do Mar à Mesa',
  },
];

// ═══════════════════════════════════════════════════
// PREÇOS — 4 Tiers
// ═══════════════════════════════════════════════════

export const PRICING: PricingTier[] = [
  {
    id: 'casual',
    name: 'Casual',
    price: '€30',
    priceUnit: 'por pessoa',
    description:
      'Perfeito para quem quer provar a Terceira sem compromisso. Walking tour curto com paragens seleccionadas.',
    features: [
      '2 horas de experiência',
      '3 paragens com prova',
      '3 vinhos incluídos',
      'Petiscos em cada paragem',
      'Guia local',
    ],
    highlighted: false,
    cta: 'Reservar Casual',
  },
  {
    id: 'completo',
    name: 'Completo',
    price: '€55',
    priceUnit: 'por pessoa',
    description:
      'A experiência mais popular. Tempo suficiente para mergulhar nos sabores e conhecer a história por trás de cada copo.',
    features: [
      '4 horas de experiência',
      '5 paragens com prova',
      '5 vinhos incluídos',
      'Almoço ou petiscos completos',
      'Guia especializado em vinhos',
      'Transporte incluído',
      'Fotografia do grupo',
    ],
    highlighted: true,
    cta: 'Reservar Completo',
    badge: 'Mais Popular',
  },
  {
    id: 'privado',
    name: 'Privado',
    price: '€75',
    priceUnit: 'por pessoa',
    description:
      'Experiência exclusiva para o teu grupo. Roteiro personalizado, sem partilha com outros grupos.',
    features: [
      '5 horas de experiência',
      'Roteiro 100% personalizado',
      '6+ vinhos incluídos',
      'Refeição completa em restaurante parceiro',
      'Guia exclusivo para o grupo',
      'Transporte privado',
      'Garrafa de vinho de oferta',
    ],
    highlighted: false,
    cta: 'Reservar Privado',
  },
  {
    id: 'sob-medida',
    name: 'Sob Medida',
    price: 'Consultar',
    priceUnit: '',
    description:
      'Para grupos grandes, eventos especiais, team building ou experiências únicas. Desenhamos o programa à tua medida.',
    features: [
      'Duração flexível',
      'Programa totalmente personalizado',
      'Combinação de várias experiências',
      'Catering e logística completa',
      'Ideal para empresas e eventos',
      'Coordenação com parceiros locais',
      'Orçamento personalizado',
    ],
    highlighted: false,
    cta: 'Pedir Orçamento',
  },
];

// ═══════════════════════════════════════════════════
// FAQ — 12 Questions
// ═══════════════════════════════════════════════════

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Preciso de perceber de vinhos para participar?',
    answer:
      'Absolutamente não! As nossas experiências são desenhadas para todos — desde curiosos a enófilos. O guia explica tudo de forma casual e sem pretensão. A única coisa que precisas é vontade de provar.',
  },
  {
    id: 'faq-2',
    question: 'As experiências funcionam com chuva?',
    answer:
      'Sim! A Terceira tem um microclima e o tempo pode mudar rapidamente. As nossas experiências incluem sempre paragens em espaços cobertos (adegas, tascas, restaurantes). Se as condições forem mesmo adversas, adaptamos o roteiro. Nunca cancelámos por causa do tempo.',
  },
  {
    id: 'faq-3',
    question: 'Como chego à Terceira?',
    answer:
      'Voos directos desde Lisboa (2h15), Porto e outras ilhas dos Açores via SATA/Azores Airlines e Ryanair. De ferry, podes vir de São Jorge ou Graciosa com a Atlânticoline. O aeroporto fica na Praia da Vitória, a 20 minutos de Angra do Heroísmo.',
  },
  {
    id: 'faq-4',
    question: 'Posso participar se não beber álcool?',
    answer:
      'Claro! Temos sempre alternativas sem álcool — sumos de fruta açorianos, chás de ervas locais e água. A experiência gastronómica é tão rica que não perdes nada. Avisa-nos na reserva para prepararmos tudo.',
  },
  {
    id: 'faq-5',
    question: 'Qual é o tamanho máximo do grupo?',
    answer:
      'Os nossos grupos regulares têm no máximo 12 pessoas para garantir uma experiência íntima. Para grupos maiores (até 30), oferecemos experiências privadas e personalizadas. Contacta-nos para grupos acima de 12.',
  },
  {
    id: 'faq-6',
    question: 'O que é o Verdelho e porque é tão especial?',
    answer:
      'O Verdelho é uma casta de uva branca que encontrou na Terceira o seu habitat perfeito. Cultivado em "currais" — pequenos muros de pedra de basalto que protegem as videiras do vento atlântico — produz vinhos minerais, frescos e com uma salinidade única. No século XIX, o Verdelho dos Açores era exportado para a Rússia e era o vinho favorito dos czares.',
  },
  {
    id: 'faq-7',
    question: 'O que são os "currais" de vinha?',
    answer:
      'São pequenas parcelas de terreno rodeadas por muros de pedra de basalto negro. Construídos ao longo de séculos, protegem as videiras dos ventos fortes do Atlântico e criam microclimas quentes. Esta paisagem vinícola é única no mundo e está em processo de candidatura a Património da UNESCO. É espectacular de ver.',
  },
  {
    id: 'faq-8',
    question: 'As experiências incluem transporte?',
    answer:
      'As experiências Completo e Privado incluem transporte desde Angra do Heroísmo. Para a experiência Casual (walking tour), o ponto de encontro é no centro de Angra. Se estiveres noutro ponto da ilha, podemos ajudar a organizar transporte — basta indicar na reserva.',
  },
  {
    id: 'faq-9',
    question: 'Posso comprar vinhos durante a experiência?',
    answer:
      'Sim! Nas visitas a adegas e produtores, podes comprar directamente. Os nossos guias ajudam-te a escolher e dão dicas de como transportar garrafas em segurança na bagagem. Alguns produtores também enviam por correio.',
  },
  {
    id: 'faq-10',
    question: 'Qual é a melhor época para visitar a Terceira?',
    answer:
      'A Terceira é fantástica o ano todo. De Maio a Setembro tens temperaturas mais quentes (20–26°C) e as Festas do Espírito Santo. Abril e Outubro são excelentes com menos turistas. O Inverno é ameno (14–18°C) e perfeito para experiências gastronómicas mais intimistas. A vindima é em Agosto/Setembro.',
  },
  {
    id: 'faq-11',
    question: 'O que são as Festas do Espírito Santo?',
    answer:
      'São a tradição mais importante dos Açores — celebrações comunitárias que acontecem de Maio a Setembro em cada freguesia da ilha. Incluem procissões, decoração dos Impérios (pequenos templos coloridos), e sobretudo muita comida partilhada: as famosas Sopas do Espírito Santo, Alcatra e Massa Sovada. É generosidade pura.',
  },
  {
    id: 'faq-12',
    question: 'Qual é a vossa política de cancelamento?',
    answer:
      'Cancelamento gratuito até 48 horas antes da experiência. Entre 48h e 24h, cobramos 50% do valor. Com menos de 24h de antecedência, o valor total é retido. Em caso de condições meteorológicas extremas (o que é muito raro), reagendamos sem custo adicional.',
  },
];

// ═══════════════════════════════════════════════════
// EXPERIENCE TYPE OPTIONS (for lead form)
// ═══════════════════════════════════════════════════

export const EXPERIENCE_OPTIONS = [
  'Rota do Verdelho',
  'Tasquinha a Tasquinha',
  'Vulcão no Copo',
  'Do Mar à Mesa',
  'Espírito Santo à Mesa',
  'Sunset & Sip',
  'Ainda não sei — surpreendam-me!',
] as const;

export const GROUP_SIZE_OPTIONS = [
  '1–2 pessoas',
  '3–5 pessoas',
  '6–10 pessoas',
  '11–20 pessoas',
  '20+ pessoas',
] as const;
```

---

## 5. Animation Spec

All animations use Framer Motion. No CSS animations except the grain overlay and subtle background shifts.

### 5.1 Global Animation Variants

```typescript
// utils.ts — shared animation variants

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
```

### 5.2 Per-Section Animation Map

| Section | Animation | Trigger |
|---|---|---|
| **Hero** | Title: `fadeInUp` (delay 0.2). Tagline: `fadeInUp` (delay 0.4). Stats: `staggerContainer` + `fadeInUp` per stat. CTAs: `fadeInUp` (delay 0.6). Background gradient: subtle CSS shift. | Immediate on mount |
| **A Ilha** | Section label + title: `fadeInUp`. Cards: `staggerContainer` + `scaleIn`. | `whileInView`, `once: true`, `margin: "-80px"` |
| **Experiências** | Header: `fadeInUp`. Cards: `staggerContainer` + `fadeInUp`. Card hover: `scale: 1.02`, border-color to gold. | `whileInView`, `once: true` |
| **Como Funciona** | Steps: `staggerContainer` + `slideInLeft` (odd) / `slideInRight` (even). Number circles: `scaleIn`. Connecting line: CSS with `scaleY` from 0 to 1. | `whileInView`, `once: true` |
| **O Que Vais Provar** | Title: `fadeInUp`. Cards on mobile: horizontal scroll, no animation needed. Cards on desktop: `staggerContainer` + `fadeInUp`. | `whileInView`, `once: true` |
| **Produtores** | Grid cards: `staggerContainer` + `scaleIn`. | `whileInView`, `once: true` |
| **Para Quem** | Segments: `staggerContainer` + `fadeInUp`. | `whileInView`, `once: true` |
| **Galeria** | Masonry items: `staggerContainer` + `scaleIn`. Hover: `scale: 1.03` with overlay text reveal. | `whileInView`, `once: true` |
| **Testemunhos** | Auto-carousel: `AnimatePresence` with `fadeIn` + slight `x` offset. Dots/nav: instant. Auto-rotate every 6 seconds, pause on hover. | `whileInView` starts autoplay |
| **Preços** | Cards: `staggerContainer` + `fadeInUp`. Highlighted card: slight `scale: 1.02` default + gold border. | `whileInView`, `once: true` |
| **FAQ** | Items: `staggerContainer` + `fadeInUp`. Accordion open/close: `AnimatePresence` with `height: auto` animation. Chevron rotation: `rotate: 180`. | `whileInView` for list. Click for accordion. |
| **Lead Capture** | Form: `fadeInUp`. Success state: `scaleIn`. | `whileInView`, `once: true` |
| **Footer** | Columns: `staggerContainer` + `fadeInUp`. | `whileInView`, `once: true` |

### 5.3 Performance Rules

1. ALL `whileInView` use `once: true` — no re-triggering
2. Use `viewport={{ margin: "-80px" }}` to trigger slightly before visible
3. No layout animations (no `layout` prop) — they cause reflows
4. Reduce motion: wrap in `useReducedMotion()` check, skip animations if true
5. No animations on the horizontal scroll container (mobile petiscos)

---

## 6. Lead Capture Form Spec

### 6.1 Fields

| Field | Name | Type | Required | Validation |
|---|---|---|---|---|
| Nome | `nome` | text | Yes | Min 2 chars |
| Email | `email` | email | Yes | Valid email regex |
| Data de Chegada | `dataChegada` | date | No | Must be today or future |
| Data de Partida | `dataPartida` | date | No | Must be after `dataChegada` |
| Experiência | `experiencia` | select | No | One of `EXPERIENCE_OPTIONS` |
| Tamanho do Grupo | `tamanhoGrupo` | select | No | One of `GROUP_SIZE_OPTIONS` |
| Mensagem | `mensagem` | textarea | No | Max 500 chars |

### 6.2 Form Behaviour

```
States: idle → submitting → success | error

On submit:
1. Client-side validation
2. Set state to "submitting", disable button, show spinner
3. POST to Formspree endpoint (placeholder: https://formspree.io/f/PLACEHOLDER)
   - Content-Type: application/json
   - Body: { nome, email, dataChegada, dataPartida, experiencia, tamanhoGrupo, mensagem }
4. On 200: show success state with message "Obrigado! Respondemos em menos de 24 horas."
5. On error: show error state "Algo correu mal. Tenta novamente ou contacta-nos pelo WhatsApp."
6. After success, show "Enviar outro pedido" link to reset form
```

### 6.3 Alternative Contact CTAs (below form)

```
WhatsApp: wa.me/351XXXXXXXXX (placeholder number)
  Label: "Preferes falar directamente?"
  Button: "Enviar WhatsApp" (green, .nk-btn-whatsapp)

Email: info@ninikatours.com (placeholder)
  Label: "Ou envia-nos um email"
```

### 6.4 Form Markup Pattern

```tsx
<form onSubmit={handleSubmit} className="nk-lead-form">
  {/* All inputs must have:
    - id matching htmlFor on label
    - aria-describedby for error messages
    - min-height 48px (touch target)
    - autocomplete attributes
  */}
  <label htmlFor="nk-nome">Nome *</label>
  <input
    id="nk-nome"
    name="nome"
    type="text"
    required
    minLength={2}
    autoComplete="name"
    aria-describedby="nk-nome-error"
    className="nk-input"
  />
  <span id="nk-nome-error" className="nk-error" role="alert">{errors.nome}</span>
  {/* ... repeat pattern for all fields ... */}
</form>
```

### 6.5 Form CSS Classes

```css
.ninika-root .nk-lead-form {
  display: grid;
  gap: 1.25rem;
  max-width: 560px;
  margin: 0 auto;
}

.ninika-root .nk-input,
.ninika-root .nk-select,
.ninika-root .nk-textarea {
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 1rem;
  font-family: var(--nk-font-body);
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--nk-white);
  transition: border-color 0.3s;
}

.ninika-root .nk-input:focus,
.ninika-root .nk-select:focus,
.ninika-root .nk-textarea:focus {
  outline: none;
  border-color: var(--nk-gold);
  box-shadow: 0 0 0 3px rgba(197, 165, 90, 0.2);
}

.ninika-root .nk-input::placeholder {
  color: rgba(245, 240, 235, 0.4);
}

.ninika-root .nk-error {
  font-size: 0.8rem;
  color: #E57373;
  min-height: 1.2em;
}

.ninika-root .nk-textarea {
  min-height: 120px;
  resize: vertical;
}

.ninika-root .nk-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--nk-gray-300);
  margin-bottom: 0.25rem;
}

/* Date inputs row */
@media (min-width: 480px) {
  .ninika-root .nk-date-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
```

---

## 7. Mobile-First Responsive Plan

### 7.1 Base (0–479px) — Small Phones

All components are single-column, full-width.

| Element | Behaviour |
|---|---|
| Hero title | `font-size: clamp(2rem, 8vw, 2.5rem)` |
| Hero stats | 2×2 grid |
| Section titles | `clamp(1.5rem, 5vw, 2rem)` |
| Experience cards | Full-width stack, 1 per row |
| Petisco cards | Horizontal scroll, 280px wide each |
| Producer cards | Full-width stack |
| Pricing cards | Full-width stack |
| Gallery | Single column masonry (stack) |
| Testimonials | Full-width card carousel |
| Form | Single column, all fields full-width |
| Nav | Hidden, burger menu opens full-screen overlay |
| Touch targets | ALL interactive elements minimum 48px height |
| Section padding | `48px 0` |
| Container padding | `0 16px` |

### 7.2 `sm` (480px+) — Larger Phones

| Change |
|---|
| Hero stats: still 2×2 but with more spacing |
| Date fields in form: side-by-side (2 cols) |
| Gallery: 2-column masonry |

### 7.3 `md` (768px+) — Tablets

| Change |
|---|
| Nav: horizontal links replace burger menu |
| Experience cards: 2-column grid |
| Producer cards: 2-column grid |
| Zone cards (A Ilha): 3-column grid |
| Para Quem: 2-column grid |
| Pricing: 2-column grid (Completo spans slightly larger) |
| Section padding: `64px 0` |
| Container padding: `0 24px` |
| Gallery: 3-column masonry |

### 7.4 `lg` (1024px+) — Desktop

| Change |
|---|
| Experience cards: 3-column grid |
| Producer cards: 4-column grid |
| Pricing: 4-column grid, all equal |
| Steps (Como Funciona): horizontal timeline instead of vertical |
| Testimonials: show 2 at a time |
| Gallery: 4-column masonry with varied heights |
| Section padding: `80px 0` |
| Lead form + alternatives side by side |

### 7.5 `xl` (1280px+) — Wide Desktop

| Change |
|---|
| Container max-width: 1200px, centred |
| Hero: larger title, stats in single row |
| Slightly more generous whitespace |

---

## 8. Accent & Naming Reference

All strings in the codebase MUST use correct PT-PT orthography. Reference table:

| WRONG | CORRECT |
|---|---|
| Precos | **Preços** |
| Experiencia | **Experiência** |
| Tipico | **Típico** |
| Complicacoes | **Complicações** |
| Vulcanico | **Vulcânico** |
| Acores | **Açores** |
| Acoriana | **Açoriana** |
| Gastronomia acoriana | **Gastronomia açoriana** |
| Producao | **Produção** |
| Regiao | **Região** |
| Informacao | **Informação** |
| Informacoes | **Informações** |
| Cancao | **Canção** |
| Tradicao | **Tradição** |
| Opiniao | **Opinião** |
| Avaliacao | **Avaliação** |
| Reserva | **Reserva** (already correct) |
| Angra do Heroismo | **Angra do Heroísmo** |
| Sao Jorge | **São Jorge** |
| Esta | **Está** (when verb "to be") |
| E | **É** (when verb "to be") |
| Unico | **Único** |
| Historico | **Histórico** |
| Patrimonio | **Património** |
| Seculo | **Século** |
| Conteudo | **Conteúdo** |
| Inclusao | **Inclusão** |
| Organizacao | **Organização** |
| Localizacao | **Localização** |
| Facturacao | **Facturação** |
| Orcamento | **Orçamento** |
| Acessivel | **Acessível** |
| Tambem | **Também** |
| Ate | **Até** |
| So | **Só** |
| Ja | **Já** |
| Ai | **Aí** |
| Otimo | **Ótimo** |
| Obrigado | **Obrigado** (already correct) |
| Numero | **Número** |
| Horario | **Horário** |
| Sabado | **Sábado** |
| Domingo | **Domingo** (already correct) |
| Terceira | **Terceira** (already correct) |
| Biscoitos | **Biscoitos** (already correct) |
| Praia da Vitoria | **Praia da Vitória** |

### Naming conventions in code

| Item | Convention |
|---|---|
| File names | kebab-case: `ninika-tours/`, `ninika.css` |
| Component names | PascalCase: `Hero.tsx`, `AIlha.tsx`, `ComoFunciona.tsx` |
| CSS class prefix | `nk-` (e.g., `nk-container`, `nk-btn-primary`) |
| CSS variables | `--nk-` (e.g., `--nk-wine`, `--nk-gold`) |
| Data constants | UPPER_SNAKE_CASE: `HERO_STATS`, `FAQ_ITEMS` |
| TypeScript types | PascalCase: `Experience`, `PricingTier` |
| IDs in data | kebab-case: `'rota-verdelho'`, `'faq-1'` |
| Section HTML ids | kebab-case: `id="a-ilha"`, `id="experiencias"` |

---

## 9. SEO Metadata

### 9.1 `layout.tsx` Metadata Export

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NinikaTours — Experiências de Vinho Vulcânico e Gastronomia na Terceira, Açores',
  description:
    'Bebe. Prova. Descobre a Ilha. Tours de vinho Verdelho e gastronomia açoriana na Ilha Terceira. Rotas pelos Biscoitos, tascas de Angra e experiências vulcânicas autênticas. Reserva a tua experiência.',
  keywords: [
    'Terceira',
    'Açores',
    'vinho',
    'Verdelho',
    'enoturismo',
    'gastronomia açoriana',
    'wine tour Azores',
    'Biscoitos wine',
    'Angra do Heroísmo',
    'experiências Terceira',
    'NinikaTours',
    'vinho vulcânico',
    'walking tour Terceira',
    'petiscos açorianos',
    'Alcatra',
    'Espírito Santo Açores',
    'turismo Terceira',
    'wine tasting Azores',
  ],
  openGraph: {
    title: 'NinikaTours — Vinho Vulcânico & Gastronomia na Terceira',
    description:
      'Tours de vinho Verdelho e gastronomia açoriana na Ilha Terceira. Rotas pelos Biscoitos, tascas de Angra e experiências vulcânicas autênticas.',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'NinikaTours',
    images: [
      {
        url: '/ninika-tours/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NinikaTours — Currais de vinha vulcânica nos Biscoitos, Terceira',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NinikaTours — Vinho Vulcânico & Gastronomia na Terceira, Açores',
    description:
      'Bebe. Prova. Descobre a Ilha. Tours de vinho e gastronomia na Terceira.',
    images: ['/ninika-tours/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://descomplicai.com/projetos/ninika-tours',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 9.2 Schema.org Structured Data (JSON-LD)

Add this in the `layout.tsx` `<head>` via a `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "NinikaTours",
  "description": "Experiências de vinho vulcânico e gastronomia açoriana na Ilha Terceira, Açores",
  "url": "https://descomplicai.com/projetos/ninika-tours",
  "image": "https://descomplicai.com/ninika-tours/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Angra do Heroísmo",
    "addressRegion": "Açores",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.6545,
    "longitude": -27.2134
  },
  "priceRange": "€30–€75",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  },
  "sameAs": [],
  "offers": [
    {
      "@type": "Offer",
      "name": "Experiência Casual",
      "price": "30.00",
      "priceCurrency": "EUR",
      "description": "Walking tour de 2 horas com 3 paragens e provas de vinho"
    },
    {
      "@type": "Offer",
      "name": "Experiência Completo",
      "price": "55.00",
      "priceCurrency": "EUR",
      "description": "Tour de 4 horas com 5 paragens, almoço e transporte incluído"
    },
    {
      "@type": "Offer",
      "name": "Experiência Privado",
      "price": "75.00",
      "priceCurrency": "EUR",
      "description": "Experiência exclusiva de 5 horas com roteiro personalizado"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "6",
    "bestRating": "5"
  }
}
```

### 9.3 Additional Head Tags

```tsx
// In layout.tsx, inside a <head> block or via metadata.other:
<meta name="theme-color" content="#1a1a2e" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<link rel="icon" href="/favicon.ico" />
```

---

## Appendix A — Component Structure Templates

### Hero.tsx structure

```
<section id="hero" className="nk-dark nk-grain relative min-h-screen flex items-center">
  <div className="nk-container relative z-10">
    <motion.p — section label "NINIKA TOURS"
    <motion.h1 — "NinikaTours" with "Terceira" on separate styled line
    <motion.p — tagline
    <motion.p — subtitle
    <motion.div — 4 stat boxes in grid
    <motion.div — 2 CTA buttons
  </div>
  {/* Background: volcanic gradient via CSS */}
</section>
```

### page.tsx assembly order

```tsx
import Hero from '@/components/ninika-tours/Hero';
import AIlha from '@/components/ninika-tours/AIlha';
import Experiencias from '@/components/ninika-tours/Experiencias';
import ComoFunciona from '@/components/ninika-tours/ComoFunciona';
import OQueVaisProvar from '@/components/ninika-tours/OQueVaisProvar';
import Produtores from '@/components/ninika-tours/Produtores';
import ParaQuem from '@/components/ninika-tours/ParaQuem';
import Galeria from '@/components/ninika-tours/Galeria';
import Testemunhos from '@/components/ninika-tours/Testemunhos';
import Precos from '@/components/ninika-tours/Precos';
import FAQ from '@/components/ninika-tours/FAQ';
import LeadCapture from '@/components/ninika-tours/LeadCapture';
import Footer from '@/components/ninika-tours/Footer';

export default function NinikaTours() {
  return (
    <>
      <Hero />
      <AIlha />
      <Experiencias />
      <ComoFunciona />
      <OQueVaisProvar />
      <Produtores />
      <ParaQuem />
      <Galeria />
      <Testemunhos />
      <Precos />
      <FAQ />
      <LeadCapture />
      <Footer />
    </>
  );
}
```

---

## Appendix B — Volcanic Gradient CSS

```css
.ninika-root .nk-hero-bg {
  background: linear-gradient(
    165deg,
    #1a1a2e 0%,
    #2a1a28 25%,
    #3d1a24 45%,
    #722F37 60%,
    #5C262D 75%,
    #1a1a2e 100%
  );
  background-size: 200% 200%;
  animation: nk-volcanic-shift 12s ease infinite;
}

@keyframes nk-volcanic-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## Appendix C — Font Loading Pattern

```typescript
// layout.tsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export default function NinikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ninika-root ${cormorant.variable} ${dmSans.variable}`}>
      {children}
    </div>
  );
}
```

---

## Appendix D — Builder Agent Checklist

Each builder agent must verify:

- [ ] All strings use correct PT-PT accents (see Section 8)
- [ ] All interactive elements have min 48px touch target
- [ ] All `motion.*` components use `once: true` on `whileInView`
- [ ] All section `id` attributes match the values in `NAV_LINKS`
- [ ] All CSS classes are prefixed with `nk-` and scoped under `.ninika-root`
- [ ] No layout shift — specify dimensions on all images/placeholders
- [ ] Form inputs have `autocomplete`, `aria-describedby`, and `id`/`htmlFor` pairs
- [ ] Emoji are used as visual accents only, never as sole content indicators
- [ ] `useReducedMotion` is checked — skip animations if user prefers reduced motion
- [ ] No external API calls (100% static, no backend)
- [ ] All imports use `@/components/ninika-tours/` path alias

---

*Document generated for NinikaTours build. All content is production-grade PT-PT.*
*Last updated: 2026-03-15*
