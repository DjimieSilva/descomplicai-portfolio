# Wine Experience Sites V2 — Master Plan

## Current State Analysis

### Site 1: Vindima Selvagem (KEEP + EXPAND)
**Concept:** Douro grape harvest experience (1-day, group)
**Current sections:** Nav, Hero, Timeline (6 steps), Features (6 items), Testimonials (3, auto-rotate), CTA/Pricing, Footer
**Strengths:**
- Clear timeline format works well for a day experience
- Good use of emojis for visual scanning on mobile
- WhatsApp CTA is direct and effective
- Scoped CSS with `vindima-` prefix
- Price anchored at EUR89/person

**Weaknesses:**
- Only ~5 sections — feels thin for a real business
- No photo gallery or visual proof of the experience
- No team/about section — who runs this?
- No FAQ — visitors will have questions
- No "About the Quinta" section — where is this?
- Only 3 testimonials — needs more social proof
- No seasonal calendar showing availability
- No group/private booking distinction
- No accessibility info (mobility, dietary needs)
- Missing trust signals (years in operation, number of guests served)

---

### Site 2: Rota dos Vinhos (KEEP + EXPAND)
**Concept:** Multi-region wine tour operator across Portugal
**Current sections:** Nav, Hero, Regions (6 cards, horizontal scroll), How It Works (3 steps), Experiences (6 tour cards), FAQ (5 items), CTA, Footer
**Strengths:**
- Great region card design with gradient backgrounds
- Good pricing spread (EUR39-69)
- FAQ section already exists
- Clean Nunito font choice, bright and friendly
- Family-friendly FAQ answer about children

**Weaknesses:**
- No photo gallery for any region
- Region cards are not expandable — no detail pages or expanded views
- No testimonials/reviews section
- No team/guide profiles
- No calendar or availability info
- No "What to Expect" detailed breakdown per tour
- No partner wineries listed
- Missing group discount details (only mentioned in CTA)
- External Google Font dependency (should be self-hosted or use Next.js font)
- No pickup location details

---

### Site 3: Noir Tasting (COMPLETELY REPLACE)
**Current concept:** Luxury blind tasting in Porto caves — dark/exclusive theme
**Why replace:** Too exclusive/nightlife-oriented. "Reservas apenas por convite" is not family-friendly. EUR150-350 price range feels elitist. Dark theme with gold accents evokes nightclub more than family wine experience. Wine list includes very expensive bottles (Barca Velha) that signal luxury exclusivity rather than accessibility.

---

### Site 4: Terroir & Alma (COMPLETELY REPLACE)
**Current concept:** 3-day immersive wine retreats with small producers
**Why replace:** EUR790-890/person for 3 days is very niche/premium. Good writing quality but the concept is too exclusive — "retiros imersivos" targeting sommelier/architect types. Fictional producer profiles feel disconnected. Not obviously family-friendly.

---

## V2 Plan

### Site 1: Vindima Selvagem V2 — Enhanced

**Identity:** Family-friendly grape harvest experience in the Douro Valley. A real business that has been welcoming families and groups since the concept started. Warm, earthy, authentic.

**Visual identity:** Keep current warm palette. Add more texture — earthy oranges, grape purples, vineyard greens. Subtle grape vine decorative elements.

**Target sections (10+):**

1. **Nav** — Add "Sobre", "Galeria", "FAQ" links (currently only 3 links)
2. **Hero** — Add a trust badge row: "500+ guests", "4.9 Google rating", "Since 2019", family icon
3. **About the Quinta** — NEW section: describe the location, the family that owns it, how many hectares, what castas they grow, short history paragraph
4. **Timeline (A Experiencia)** — Keep but expand each step with more detail text. Add a small image placeholder per step.
5. **Photo Gallery** — NEW section: 8-12 image placeholders in a masonry/grid layout showing grape picking, families, lunch, pisa, sunset. Use gradient placeholders until real images.
6. **What's Included (enhanced)** — Keep 6 features, add 3 more: "Seguro incluido", "Guia bilingue PT/EN", "Atividades para criancas"
7. **Family Corner** — NEW section: specifically addressing families. "Kids love it!" with kid-friendly activities listed, age recommendations, what to bring
8. **Testimonials (expanded)** — Go from 3 to 6 testimonials. Add star ratings. Add a Google Reviews badge.
9. **Team/Guides** — NEW section: 2-3 guide profiles with gradient placeholders for photos, name, role, short bio
10. **Seasonal Calendar** — NEW section: visual month grid (Sep/Oct/Nov) showing which weekends have availability
11. **FAQ** — NEW section: 6-8 common questions (What to wear? Is it accessible? Dietary needs? Rain policy? Minimum age? Parking?)
12. **Pricing Tiers** — Expand from single price. Add: "Grupo (4-8 pessoas) EUR89/pp", "Privado (2-4 pessoas) EUR129/pp", "Familia (2 adultos + 2 criancas) EUR299"
13. **CTA / Booking** — Keep WhatsApp but add email option too
14. **Footer** — Add social links placeholders, address, operating hours

---

### Site 2: Rota dos Vinhos V2 — Enhanced

**Identity:** Portugal's friendliest wine tour company. Multi-region, accessible, fun. The kind of business a tourist finds on TripAdvisor and instantly books.

**Visual identity:** Keep current bright blue + white palette. Add warmer accents per region. Keep Nunito but load via next/font (remove external dependency).

**Target sections (10+):**

1. **Nav** — Add "Guias", "Galeria", "FAQ" links
2. **Hero** — Add counter stats: "2000+ guests", "6 regions", "98% recommend us". Add a secondary CTA "Ver Tours"
3. **Regions (enhanced)** — Each region card becomes expandable or gets a detail panel below when tapped: 3 bullet points about what makes this region special, best time to visit, signature grape
4. **Photo Gallery** — NEW section: horizontal scroll of 10+ image placeholders showing tours in action across different regions
5. **How It Works** — Keep, it's good
6. **Experiences/Tours (enhanced)** — Add a short description paragraph to each tour card. Add "Most Popular" badge to Douro Classic. Add group size info.
7. **Meet the Guides** — NEW section: 3-4 guide cards with name, languages spoken, specialty region, years of experience
8. **Testimonials** — NEW section: 4-6 reviews with star ratings, nationality flags, which tour they did
9. **Group & Private Options** — NEW section: explain private tour option, corporate events, birthday celebrations, school trips
10. **Practical Info** — NEW section: pickup points with times, what to bring, dress code, cancellation policy summary
11. **FAQ (enhanced)** — Expand from 5 to 8 questions. Add: languages available, wheelchair access, vegetarian options, weather policy
12. **Pricing Table** — NEW section: side-by-side comparison table of all 6 tours (duration, meals, wineries, price)
13. **CTA / Booking** — Add email and phone in addition to WhatsApp
14. **Footer** — Add TripAdvisor/Google badge placeholders, address, social links

---

### Site 3: NEW — "Vindimas em Familia" (Family Vineyard Adventures)

**Replacing:** Noir Tasting

**Concept:** Family-oriented vineyard day experiences designed specifically for families with children. Educational, fun, hands-on. Think: grape juice making for kids, vineyard treasure hunts, family picnics among the vines, clay pottery with cork, making your own wine label. Located across multiple quintas in the Douro and Alentejo.

**Why this concept:**
- Fills a gap — no other site targets families specifically
- Different price range from all others (budget-friendly, EUR39-59/family)
- Extremely family-friendly by definition
- Educational angle for children
- Year-round activities (not just harvest season)
- Strong visual identity potential — playful, colorful, warm

**Business identity:** "Vindimas em Familia" — the first wine-country experience designed for the whole family. Run by a team of educators and wine enthusiasts who believe children should grow up understanding where food comes from.

**Visual identity:**
- Warm palette: sunflower yellow, grape purple, leaf green, earth brown
- Playful but not childish — parents should feel respected
- Hand-drawn style decorative elements (vine doodles, grape clusters)
- Rounded shapes, large touch targets
- Font: rounded sans-serif (system or Nunito/Quicksand)

**Sections (10):**

1. **Nav** — Logo "Vindimas em Familia" with grape cluster icon. Links: "Atividades", "Quintas", "Precos", "FAQ", "Reservar"
2. **Hero** — "Aventuras na vinha para toda a familia". Stats: "Para todas as idades", "4 quintas parceiras", "Todo o ano". Playful floating grape/leaf decorations.
3. **Activities Grid** — 6-8 activity cards:
   - Apanha de uvas (seasonal, Sep-Nov)
   - Pisa a pe para miudos (kids grape stomping)
   - Caca ao tesouro na vinha (vineyard treasure hunt)
   - Fabrica de sumo de uva (grape juice workshop)
   - Piquenique entre vinhas (family vineyard picnic)
   - Oficina de rotulos (design your own wine label)
   - Passeio de trator (tractor ride through vineyards)
   - Cozinha da quinta (farm cooking class)
4. **Partner Quintas** — 3-4 quinta cards with location, description, which activities available there
5. **A Day With Us** — Timeline of a typical family day (9:00 arrival, 10:00 activities, 12:30 picnic, 14:00 workshop, 16:00 goodbye)
6. **For Parents** — Section addressing parents: "Enquanto os miudos brincam, os pais provam" — parents get a wine tasting while kids do supervised activities
7. **Testimonials** — 4-5 family testimonials with ages of children mentioned
8. **Pricing** — 3 tiers: "Familia Basica (2+2) EUR39", "Familia Completa (2+3) EUR49", "Super Familia (2+4+) EUR59". Individual adult EUR15, child EUR10.
9. **FAQ** — 8 questions: minimum age, stroller access, food allergies, rain plan, what to bring, sunscreen, parking, pets
10. **CTA** — WhatsApp + email booking
11. **Footer** — "Uma experiencia Descomplicai", social links, address

**CSS prefix:** `vfam-`

---

### Site 4: NEW — "Quintas ao Entardecer" (Sunset Wine & Gastronomy Evenings)

**Replacing:** Terroir & Alma

**Concept:** Sunset wine and gastronomy evenings at beautiful Portuguese quintas. 3-4 hour experiences combining wine tasting with local gastronomy, held at golden hour for magical ambiance. Not a full day, not a multi-day retreat — the perfect mid-range experience for couples, friends, and families who want something special without a huge time commitment.

**Why this concept:**
- Different format from all others (evening-only, 3-4 hours)
- Mid-range pricing (EUR59-89/person) — fills gap between Rota (EUR39-69 full day) and Vindima (EUR89 full day)
- Sunset theme gives strong visual identity
- Year-round viability (adjust start time by season)
- Combines two experiences (wine + food) that pair naturally
- Very photogenic — sunset content drives social media
- Family-friendly: early evening timing works for families with kids

**Business identity:** "Quintas ao Entardecer" — curated sunset experiences at Portugal's most beautiful wine estates. Every Friday and Saturday evening, a different quinta opens its doors for an evening of wine, food, and unforgettable sunsets.

**Visual identity:**
- Sunset gradient palette: warm gold, amber, soft coral, deep purple twilight
- Elegant but warm — not stuffy
- Photography-driven (gradient placeholders showing sunset tones)
- Clean serif for headings (Playfair Display via next/font), system sans for body
- Subtle parallax effects for depth

**Sections (10):**

1. **Nav** — Logo "Quintas ao Entardecer" in elegant script. Links: "A Experiencia", "Quintas", "Menu", "Galeria", "Reservar"
2. **Hero** — "Onde o sol se poe, a mesa poe-se". Full-viewport gradient mimicking sunset. Stats: "Sextas & Sabados", "3-4 horas", "Vinho + Gastronomia".
3. **The Experience** — 4-step flow: "Chegada & Espumante de boas-vindas (18:00)", "Visita a vinha ao por-do-sol (18:30)", "Prova guiada de 4 vinhos (19:00)", "Jantar ao ar livre com harmonizacao (20:00)"
4. **The Quintas** — 4-5 quinta cards showing location, signature view, specialty wine, typical menu. Regions: Douro, Alentejo, Setubal, Dao, Minho.
5. **The Menu** — Sample seasonal menu: "Entrada: Queijos da serra + mel local", "Prato: Cabrito assado lentamente / Bacalhau com migas", "Sobremesa: Tarte de amendoa com vinho do Porto". Note: menus rotate weekly, dietary accommodations available.
6. **Photo Gallery** — Grid of 8-10 sunset-themed gradient placeholders. Horizontal scroll on mobile.
7. **Testimonials** — 4-5 testimonials emphasizing the ambiance, food, and sunset views
8. **Pricing** — 2 tiers: "Entardecer Classico EUR59/pp (4 vinhos + jantar)", "Entardecer Premium EUR89/pp (6 vinhos + jantar gourmet + digestivo + garrafa para levar)"
9. **Calendar** — Visual monthly calendar showing which quinta hosts each weekend
10. **FAQ** — 6-8 questions: dress code, parking, children welcome, rain plan, duration, allergies, group bookings, gift vouchers
11. **CTA** — WhatsApp + email
12. **Footer** — "Uma experiencia Descomplicai", links, copyright

**CSS prefix:** `entardecer-`

---

## Technical Specifications

### All 4 Sites Must Follow:

1. **Framework:** Next.js App Router, `"use client"` directive
2. **Styling:** Scoped CSS classes with site-specific prefixes (`vindima-`, `rota-`, `vfam-`, `entardecer-`). Tailwind utility classes allowed for layout.
3. **Animations:** framer-motion only. Use `useInView` for scroll-triggered animations. Keep animations subtle and performant.
4. **Fonts:** Use `next/font` for any custom fonts. Remove any `<link>` Google Font tags (Rota dos Vinhos currently has one — must fix).
5. **Images:** Use CSS gradient placeholders for all image spots. No actual image files. Gradients should suggest the mood (earthy for Vindima, sunset for Entardecer, etc.)
6. **Mobile-first:** Design for 375px width first. 98% of users are on phones. All touch targets minimum 44x44px. No hover-only interactions.
7. **No external dependencies:** No CDN links, no external APIs, no backend.
8. **Static export compatible:** No server-side logic. `generateStaticParams` if needed.
9. **WhatsApp CTA:** All sites link to `https://wa.me/351934035971`
10. **Footer:** All sites include "Uma experiencia Descomplicai" in footer
11. **Accessibility:** Semantic HTML, aria-labels on icon buttons, sufficient color contrast
12. **Performance:** No heavy scroll listeners. Use `{ passive: true }` on scroll events. Lazy animations with `viewport={{ once: true }}`.

---

## Build Steps (24 steps)

### Phase 1: Vindima Selvagem Enhancement (Steps 1-6)

**Step 1:** Add "About the Quinta" section after hero — location description, family history, hectares, castas grown. Use a 2-column layout on desktop.

**Step 2:** Add Photo Gallery section — create a responsive grid (2 cols mobile, 3 cols desktop) with 9 gradient placeholder divs simulating vineyard/harvest photos.

**Step 3:** Expand "What's Included" from 6 to 9 items. Add "Family Corner" section below it with kid-friendly activity descriptions and age recommendations.

**Step 4:** Expand testimonials from 3 to 6. Add star rating display (5 gold stars). Add a "Google Reviews" trust badge element.

**Step 5:** Add Team/Guides section (3 guide cards), Seasonal Calendar (Sep-Nov availability grid), and FAQ section (8 items with accordion).

**Step 6:** Restructure pricing into 3 tiers (Group, Private, Family). Add email contact option alongside WhatsApp. Update nav links to include new sections.

### Phase 2: Rota dos Vinhos Enhancement (Steps 7-12)

**Step 7:** Remove external Google Font `<link>`. Import Nunito via `next/font/google`. Add hero stat counters.

**Step 8:** Make region cards expandable — on tap/click, show 3 extra bullet points about each region (best grape, best season, unique feature).

**Step 9:** Add Photo Gallery section with horizontal scroll of 10 gradient placeholders.

**Step 10:** Add "Meet the Guides" section — 4 guide cards with name, languages, specialty, experience years.

**Step 11:** Add Testimonials section (5 reviews with ratings), Group & Private Options section, and Practical Info section (pickup points, what to bring).

**Step 12:** Expand FAQ to 8 questions. Add pricing comparison table. Update footer with trust badges and extra contact methods.

### Phase 3: Build "Vindimas em Familia" (Steps 13-18)

**Step 13:** Create new page at `app/projetos/vindimas-em-familia/page.tsx`. Set up component structure, CSS variables, and `vfam-` scoped styles in a `<style jsx global>` block or CSS file.

**Step 14:** Build Nav and Hero sections. Playful floating decorations (grape, leaf emojis). Warm color palette with sunflower yellow and grape purple accents.

**Step 15:** Build Activities Grid — 8 activity cards in a responsive grid (1 col mobile, 2 cols tablet, 4 cols desktop). Each card: emoji icon, title, short description, age range badge.

**Step 16:** Build Partner Quintas section (4 cards) and "A Day With Us" timeline (5 steps from 9:00 to 16:00).

**Step 17:** Build "For Parents" section (split layout: kids activities left, parent wine tasting right), Testimonials (5 family reviews), and Pricing section (3 family tiers).

**Step 18:** Build FAQ (8 items with accordion), CTA section, and Footer. Final review of mobile layout and touch targets.

### Phase 4: Build "Quintas ao Entardecer" (Steps 19-24)

**Step 19:** Create new page at `app/projetos/quintas-ao-entardecer/page.tsx`. Set up component structure, CSS variables with sunset palette, and `entardecer-` scoped styles.

**Step 20:** Build Nav and Hero sections. Full-viewport sunset gradient background. Elegant serif headings via next/font Playfair Display. Parallax-style hero text.

**Step 21:** Build "The Experience" 4-step flow section and "The Quintas" section — 4-5 cards with sunset-toned gradient placeholders.

**Step 22:** Build "The Menu" section (seasonal sample menu with elegant typography) and Photo Gallery (8-10 placeholders in grid/scroll).

**Step 23:** Build Testimonials (5 reviews), Pricing (2 tiers: Classic EUR59 and Premium EUR89), and Calendar section (monthly grid showing which quinta each weekend).

**Step 24:** Build FAQ (8 items), CTA section, and Footer. Final mobile review. Ensure all animations are performant and all touch targets meet 44px minimum.

---

## Portfolio Integration Notes

- Update portfolio project listing to reflect new site names
- Route for Site 3: `/projetos/vindimas-em-familia`
- Route for Site 4: `/projetos/quintas-ao-entardecer`
- Delete old routes: `/projetos/noir-tasting` and `/projetos/terroir-alma`
- Update any project metadata/cards that reference the old sites

---

## Summary of All 4 Sites

| Site | Concept | Price Range | Duration | Target | Tone |
|------|---------|-------------|----------|--------|------|
| Vindima Selvagem | Douro harvest experience | EUR89-299 | Full day | Adults + families | Warm, authentic |
| Rota dos Vinhos | Multi-region wine tours | EUR39-69 | Half/Full day | Tourists, groups | Bright, friendly |
| Vindimas em Familia | Family vineyard adventures | EUR10-59 | Half day | Families with kids | Playful, educational |
| Quintas ao Entardecer | Sunset wine & food evenings | EUR59-89 | 3-4 hours | Couples, friends, families | Elegant, warm |
