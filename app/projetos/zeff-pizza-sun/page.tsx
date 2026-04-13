"use client";

import { useEffect } from "react";

export default function ZeffPizzaSunPage() {
  useEffect(() => {
    const scriptContent = `
// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  const isOpen = mobileNav.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
function closeMobile() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ===== SCROLL FADE ANIMATIONS =====
const fadeEls = document.querySelectorAll('.fade-up, .fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const isFloat = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isFloat ? target.toFixed(1) : target;
    }
    requestAnimationFrame(update);
  });
}
// Trigger counters when hero badges visible
const badgeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      badgeObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const badges = document.querySelector('.trust-badges');
if (badges) badgeObserver.observe(badges);
// Also observe the bento big-number
const bentoNum = document.querySelector('.bento-card.experience-badge');
if (bentoNum) {
  const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target.querySelector('.big-number');
        if (el && el.getAttribute('data-count')) {
          const target = parseInt(el.getAttribute('data-count'));
          const duration = 2000;
          const start = performance.now();
          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * ease);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
          }
          requestAnimationFrame(update);
        }
        bentoObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  bentoObserver.observe(bentoNum);
}

// ===== MENU TABS =====
const tabs = document.querySelectorAll('.menu-tab');
const panels = document.querySelectorAll('.menu-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    panels.forEach(p => {
      p.classList.remove('active');
      if (p.id === 'tab-' + target) {
        p.classList.add('active');
        // Re-trigger card animations
        p.querySelectorAll('.menu-card').forEach((card, i) => {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
          card.style.animationDelay = (i * 0.08) + 's';
        });
      }
    });
  });
});

// ===== REVIEWS CAROUSEL =====
const track = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('reviewPrev');
const nextBtn = document.getElementById('reviewNext');
let reviewIndex = 0;
let autoPlayInterval;

function getCardWidth() {
  const card = track.querySelector('.review-card');
  if (!card) return 384;
  return card.offsetWidth + 24; // card width + gap
}
function getMaxIndex() {
  const cards = track.querySelectorAll('.review-card').length;
  const visible = Math.floor(track.parentElement.offsetWidth / getCardWidth());
  return Math.max(0, cards - visible);
}
function scrollReviews(index) {
  reviewIndex = Math.max(0, Math.min(index, getMaxIndex()));
  track.style.transform = \`translateX(-\${reviewIndex * getCardWidth()}px)\`;
}
prevBtn.addEventListener('click', () => { scrollReviews(reviewIndex - 1); resetAutoPlay(); });
nextBtn.addEventListener('click', () => { scrollReviews(reviewIndex + 1); resetAutoPlay(); });

function autoPlay() {
  autoPlayInterval = setInterval(() => {
    if (reviewIndex >= getMaxIndex()) reviewIndex = -1;
    scrollReviews(reviewIndex + 1);
  }, 4000);
}
function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlay();
}
// Pause on hover
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
track.parentElement.addEventListener('mouseleave', autoPlay);
autoPlay();

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
`;
    const script = document.createElement("script");
    script.textContent = scriptContent;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Lato:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
/* ===== RESET & BASE ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --bg: #FFF9F0;
  --primary: #D4652A;
  --primary-light: #e8854e;
  --secondary: #1B6B93;
  --secondary-light: #2a8ab8;
  --accent: #E8A946;
  --accent-light: #f0c06a;
  --text-dark: #2D2016;
  --text-light: #5C4F43;
  --card-bg: #FFFFFF;
  --sand: #F5E6D0;
  --shadow: 0 4px 24px rgba(45,32,22,0.08);
  --shadow-lg: 0 12px 40px rgba(45,32,22,0.12);
  --radius: 16px;
  --radius-xl: 24px;
  --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
}
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: 'Lato', sans-serif;
  background: var(--bg);
  color: var(--text-dark);
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
}
/* Grain texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
h1, h2, h3, h4, h5 { font-family: 'Playfair Display', serif; line-height: 1.2; }
.cursive { font-family: 'Dancing Script', cursive; }
.container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* Scroll-triggered animation base */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--transition), transform 0.8s var(--transition);
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
.fade-in {
  opacity: 0;
  transition: opacity 0.9s var(--transition);
}
.fade-in.visible { opacity: 1; }
/* Staggered child delays for bento / contact grids */
.bento-grid .bento-card:nth-child(1) { transition-delay: 0s; }
.bento-grid .bento-card:nth-child(2) { transition-delay: 0.1s; }
.bento-grid .bento-card:nth-child(3) { transition-delay: 0.2s; }
.bento-grid .bento-card:nth-child(4) { transition-delay: 0.3s; }
.contact-grid > *:nth-child(2) { transition-delay: 0.15s; }

/* Section title */
.section-title {
  text-align: center;
  margin-bottom: 24px;
}
.section-title .cursive {
  color: var(--primary);
  font-size: 1.25rem;
  display: block;
  margin-bottom: 8px;
}
.section-title h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text-dark);
}
.section-subtitle {
  text-align: center;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto 48px;
  font-size: 1.05rem;
}

/* ===== NAVBAR ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255,249,240,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: box-shadow var(--transition);
  padding: 0 24px;
}
.navbar.scrolled { box-shadow: 0 2px 20px rgba(45,32,22,0.08); }
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
}
.sun-icon {
  width: 32px;
  height: 32px;
  animation: spin-slow 20s linear infinite;
}
@keyframes spin-slow { to { transform: rotate(360deg); } }
.navbar-links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.navbar-links a {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-light);
  transition: color var(--transition);
  position: relative;
}
.navbar-links a:not(.btn-cta):hover { color: var(--primary); }
.navbar-links a:not(.btn-cta)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width var(--transition);
}
.navbar-links a:not(.btn-cta):hover::after { width: 100%; }
.btn-cta {
  background: var(--primary);
  color: #fff !important;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  box-shadow: 0 4px 16px rgba(212,101,42,0.25);
}
.btn-cta:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(212,101,42,0.35);
}
.btn-cta::after { display: none !important; }
/* Mobile hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
  background: none;
  border: none;
}
.hamburger span {
  width: 24px;
  height: 2.5px;
  background: var(--text-dark);
  border-radius: 4px;
  transition: var(--transition);
}
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* ===== HERO ===== */
.hero {
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.hero-text h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: var(--text-dark);
  margin-bottom: 24px;
  line-height: 1.1;
}
.hero-text h1 .highlight {
  position: relative;
  display: inline-block;
}
.hero-text h1 .highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 12px;
  background: var(--secondary);
  opacity: 0.2;
  border-radius: 6px;
}
.wavy-underline {
  display: block;
  width: 120px;
  height: 12px;
  margin: -8px 0 0;
}
.wavy-underline path {
  stroke: var(--secondary);
  stroke-width: 3;
  fill: none;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: wave-draw 2s ease forwards 0.5s;
}
@keyframes wave-draw {
  to { stroke-dashoffset: 0; }
}
.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-light);
  margin-bottom: 32px;
  max-width: 480px;
  line-height: 1.7;
}
.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
.btn-secondary {
  border: 2px solid var(--secondary);
  color: var(--secondary);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}
.btn-secondary:hover {
  background: var(--secondary);
  color: #fff;
  transform: translateY(-2px);
}
.hero-image-wrap {
  position: relative;
  display: flex;
  justify-content: center;
}
.hero-image-float {
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  animation: float 6s ease-in-out infinite;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.5s var(--transition);
}
.hero-image-float:hover {
  box-shadow: 0 20px 60px rgba(45,32,22,0.18);
  animation-play-state: paused;
}
.hero-image-float img {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  display: block;
  transition: transform 0.5s var(--transition);
}
.hero-image-float:hover img { transform: scale(1.05); }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
.hero-image-wrap::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0.15;
  border-radius: 50%;
  top: -40px;
  right: -40px;
  z-index: -1;
}
/* Gradient overlay on hero image for visual depth */
.hero-image-float::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    transparent 40%,
    rgba(212,101,42,0.15) 100%
  );
  pointer-events: none;
  z-index: 1;
}
/* Trust badges */
.trust-badges {
  display: flex;
  gap: 32px;
  margin-top: 48px;
  flex-wrap: wrap;
}
.trust-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card-bg);
  padding: 12px 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.trust-badge-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}
.trust-badge-icon.gold { background: rgba(232,169,70,0.15); }
.trust-badge-icon.blue { background: rgba(27,107,147,0.15); }
.trust-badge-icon.terra { background: rgba(212,101,42,0.15); }
.trust-badge-text { font-size: 0.85rem; }
.trust-badge-text strong {
  display: block;
  font-size: 1.1rem;
  color: var(--text-dark);
}
.trust-badge-text span { color: var(--text-light); }

/* ===== WAVE DIVIDERS ===== */
.wave-divider {
  width: 100%;
  line-height: 0;
  overflow: hidden;
}
.wave-divider svg {
  width: 100%;
  height: 60px;
  display: block;
}
.wave-divider.flip { transform: scaleY(-1); }

/* ===== ABOUT ===== */
.about {
  background: var(--sand);
  padding: 96px 0;
}
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
}
.bento-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}
.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.bento-card.story {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.bento-card.story h3 {
  font-size: 1.6rem;
  margin-bottom: 16px;
  color: var(--text-dark);
}
.bento-card.story p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 12px;
}
.bento-card.experience-badge {
  grid-column: 3;
  grid-row: 1;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #fff;
  text-align: center;
}
.bento-card.experience-badge .big-number {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
}
.bento-card.experience-badge span {
  font-size: 1.1rem;
  margin-top: 8px;
  opacity: 0.9;
}
.bento-card.photo {
  grid-column: 4;
  grid-row: 1 / 3;
}
.bento-card.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--transition);
  display: block;
}
.bento-card.photo:hover img { transform: scale(1.05); }
.bento-card.fun-fact {
  grid-column: 3;
  grid-row: 2;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--secondary);
  color: #fff;
}
.bento-card.fun-fact .cursive {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 8px;
}
.bento-card.fun-fact p {
  font-size: 1rem;
  line-height: 1.6;
}

/* ===== MENU ===== */
.menu {
  padding: 96px 0;
  background: var(--bg);
}
.menu-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.menu-tab {
  padding: 10px 28px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  min-height: 48px;
  border: 2px solid var(--sand);
  background: var(--card-bg);
  color: var(--text-light);
  cursor: pointer;
  transition: all var(--transition);
}
.menu-tab.active, .menu-tab:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.menu-panel { display: none; }
.menu-panel.active { display: block; }
.menu-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
  opacity: 0;
  transform: translateY(20px);
  animation: menu-card-in 0.5s ease forwards;
}
.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}
@keyframes menu-card-in {
  to { opacity: 1; transform: translateY(0); }
}
.menu-card-header {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-card-header h4 {
  color: #fff;
  font-size: 1.15rem;
  font-family: 'Playfair Display', serif;
}
.menu-price {
  background: #fff;
  color: var(--primary);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.menu-card-body {
  padding: 20px 24px;
}
.menu-card-body p {
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.6;
}
/* Card animation delays */
.menu-card:nth-child(1) { animation-delay: 0s; }
.menu-card:nth-child(2) { animation-delay: 0.08s; }
.menu-card:nth-child(3) { animation-delay: 0.16s; }
.menu-card:nth-child(4) { animation-delay: 0.24s; }
.menu-card:nth-child(5) { animation-delay: 0.32s; }
.menu-card:nth-child(6) { animation-delay: 0.4s; }

/* ===== EXPERIENCE ===== */
.experience {
  padding: 96px 0;
  background: var(--sand);
  overflow: hidden;
}
.experience-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.experience-text p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 1.05rem;
}
.gallery-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 16px 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.gallery-scroll::-webkit-scrollbar { display: none; }
.gallery-item {
  flex: 0 0 280px;
  scroll-snap-align: start;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: box-shadow var(--transition);
}
.gallery-item:hover { box-shadow: var(--shadow-lg); }
.gallery-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius);
  transition: transform 0.5s var(--transition);
  display: block;
}
.gallery-item:hover img { transform: scale(1.05); }

/* ===== REVIEWS ===== */
.reviews {
  padding: 96px 0;
  background: var(--bg);
  overflow: hidden;
}
.reviews-track-wrapper {
  position: relative;
  overflow: hidden;
  margin: 0 -24px;
  padding: 0 24px;
}
.reviews-track {
  display: flex;
  gap: 24px;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
}
.review-card {
  flex: 0 0 360px;
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}
.review-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.review-stars {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}
.review-stars svg {
  width: 20px;
  height: 20px;
  fill: var(--accent);
}
.review-text {
  color: var(--text-dark);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
}
.review-author {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.review-author-name {
  font-weight: 700;
  color: var(--text-dark);
  font-size: 0.95rem;
}
.review-source {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.review-source .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.review-source .dot.google { background: #4285F4; }
.review-source .dot.tripadvisor { background: #34E0A1; }
.reviews-nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.reviews-nav button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--sand);
  background: var(--card-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  color: var(--text-light);
}
.reviews-nav button:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

/* ===== CONTACT ===== */
.contact {
  padding: 96px 0;
  background: var(--sand);
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
.contact-info-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 40px;
  box-shadow: var(--shadow);
}
.contact-info-card h3 {
  font-size: 1.4rem;
  margin-bottom: 24px;
  color: var(--text-dark);
}
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}
.contact-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(212,101,42,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-icon svg { width: 20px; height: 20px; color: var(--primary); }
.contact-item-text strong {
  display: block;
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.contact-item-text span, .contact-item-text a {
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 600;
}
.contact-item-text a:hover { color: var(--primary); }
.contact-buttons {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  flex-wrap: wrap;
}
.btn-glovo {
  background: #FFC244;
  color: #2D2016;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  min-height: 48px;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-glovo:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(255,194,68,0.4); }
.btn-directions {
  border: 2px solid var(--secondary);
  color: var(--secondary);
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  min-height: 48px;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-directions:hover {
  background: var(--secondary);
  color: #fff;
  transform: translateY(-2px);
}
.contact-map {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  min-height: 400px;
}
.contact-map iframe {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: none;
}

/* ===== FOOTER ===== */
.footer {
  background: var(--bg);
  padding: 48px 0 24px;
  border-top: 1px solid rgba(0,0,0,0.05);
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}
.footer-brand .navbar-logo { margin-bottom: 12px; }
.footer-brand p { color: var(--text-light); font-size: 0.9rem; max-width: 280px; }
.footer-links h5 {
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-light);
  margin-bottom: 16px;
}
.footer-links a {
  display: block;
  color: var(--text-dark);
  font-size: 0.95rem;
  margin-bottom: 10px;
  transition: color var(--transition);
}
.footer-links a:hover { color: var(--primary); }
.footer-social {
  display: flex;
  gap: 12px;
}
.footer-social a,
.footer-social span {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--sand);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}
.footer-social a:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-3px);
}
.footer-social span {
  opacity: 0.6;
  cursor: default;
}
.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(0,0,0,0.05);
  color: var(--text-light);
  font-size: 0.85rem;
}

/* ===== MOBILE NAV OVERLAY ===== */
.mobile-nav {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(255,249,240,0.98);
  backdrop-filter: blur(16px);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
}
.mobile-nav.open { opacity: 1; pointer-events: all; }
.mobile-nav a {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: var(--text-dark);
  transition: color var(--transition);
}
.mobile-nav a:hover { color: var(--primary); }

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .hero-subtitle { margin: 0 auto 32px; }
  .hero-buttons { justify-content: center; }
  .trust-badges { justify-content: center; }
  .hero-image-wrap { order: -1; }
  .bento-grid { grid-template-columns: 1fr 1fr; }
  .bento-card.story { grid-column: 1 / 3; grid-row: auto; }
  .bento-card.experience-badge { grid-column: auto; grid-row: auto; }
  .bento-card.photo { grid-column: auto; grid-row: auto; min-height: 250px; }
  .bento-card.fun-fact { grid-column: auto; grid-row: auto; }
  .experience-content { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .navbar-links { display: none; }
  .hamburger { display: flex; }
  .mobile-nav { display: flex; }
  .hero { min-height: auto; padding: 100px 0 80px; }
  .bento-grid { grid-template-columns: 1fr; }
  .bento-card.story { grid-column: auto; }
  .review-card { flex: 0 0 300px; }
  .footer-inner { flex-direction: column; align-items: center; text-align: center; }
}
@media (max-width: 480px) {
  .trust-badges { flex-direction: column; align-items: center; }
  .review-card { flex: 0 0 280px; padding: 24px; }
  .menu-grid { grid-template-columns: 1fr; }
  /* Ensure minimum readable font size on small screens */
  body { font-size: 15px; }
  .menu-card-body p,
  .bento-card.story p,
  .experience-text p,
  .section-subtitle,
  .review-text,
  .trust-badge-text span,
  .contact-item-text span,
  .contact-item-text a,
  .footer-brand p { font-size: 0.9rem; }
  .hero-subtitle { font-size: 1rem; }
  .hero-buttons .btn-cta,
  .hero-buttons .btn-secondary { width: 100%; text-align: center; justify-content: center; }
  .hero-buttons { flex-direction: column; gap: 12px; }
  .contact-buttons { flex-direction: column; }
  .contact-buttons a { width: 100%; justify-content: center; }
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="#home" class="navbar-logo">
      <svg class="sun-icon" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="14" fill="#E8A946"/>
        <g stroke="#E8A946" stroke-width="3" stroke-linecap="round">
          <line x1="32" y1="4" x2="32" y2="14"/>
          <line x1="32" y1="50" x2="32" y2="60"/>
          <line x1="4" y1="32" x2="14" y2="32"/>
          <line x1="50" y1="32" x2="60" y2="32"/>
          <line x1="12.2" y1="12.2" x2="19.1" y2="19.1"/>
          <line x1="44.9" y1="44.9" x2="51.8" y2="51.8"/>
          <line x1="12.2" y1="51.8" x2="19.1" y2="44.9"/>
          <line x1="44.9" y1="19.1" x2="51.8" y2="12.2"/>
        </g>
      </svg>
      Zeff Pizza
    </a>
    <div class="navbar-links">
      <a href="#sobre">Sobre</a>
      <a href="#menu">Menu</a>
      <a href="#galeria">Galeria</a>
      <a href="#contacto">Contacto</a>
      <a href="tel:233096420" class="btn-cta">Encomendar</a>
    </div>
    <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobileNav">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile Nav Overlay -->
<div class="mobile-nav" id="mobileNav">
  <a href="#sobre" onclick="closeMobile()">Sobre</a>
  <a href="#menu" onclick="closeMobile()">Menu</a>
  <a href="#galeria" onclick="closeMobile()">Galeria</a>
  <a href="#contacto" onclick="closeMobile()">Contacto</a>
  <a href="tel:233096420" class="btn-cta" onclick="closeMobile()">Encomendar</a>
</div>

<!-- HERO -->
<section class="hero" id="home">
  <div class="container">
    <div class="hero-inner">
      <div class="hero-text fade-up">
        <p class="cursive" style="font-size:1.2rem;color:var(--primary);margin-bottom:8px;">Desde 2006 na Figueira da Foz</p>
        <h1>Sol, Mar &amp;<br>A Melhor <span class="highlight">Pizza</span> da Figueira</h1>
        <svg class="wavy-underline" viewBox="0 0 120 12">
          <path d="M0 6 Q15 0 30 6 Q45 12 60 6 Q75 0 90 6 Q105 12 120 6"/>
        </svg>
        <p class="hero-subtitle" style="margin-top:20px;">Pizza Romana artesanal com massa fina e crocante, preparada com o carinho de 20 anos de experiência. Sabores autênticos à beira-mar.</p>
        <div class="hero-buttons">
          <a href="#menu" class="btn-cta" style="font-size:1rem;padding:14px 32px;">Ver Menu</a>
          <a href="#contacto" class="btn-secondary">Contactar</a>
        </div>
        <div class="trust-badges">
          <div class="trust-badge">
            <div class="trust-badge-icon gold">&#11088;</div>
            <div class="trust-badge-text">
              <strong data-count="4.8">0</strong>
              <span>Google Reviews</span>
            </div>
          </div>
          <div class="trust-badge">
            <div class="trust-badge-icon blue">&#127829;</div>
            <div class="trust-badge-text">
              <strong data-count="20">0</strong>
              <span>Anos de Experiência</span>
            </div>
          </div>
          <div class="trust-badge">
            <div class="trust-badge-icon terra">&#128293;</div>
            <div class="trust-badge-text">
              <strong>Pizza Romana</strong>
              <span>Massa Fina &amp; Crocante</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-image-wrap fade-up" style="transition-delay:0.2s;">
        <div class="hero-image-float">
          <img src="/zeff-pizza/glovo-bella-hq.png" alt="Pizza Bella da Zeff Pizza" loading="eager">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Wave divider -->
<div class="wave-divider">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#F5E6D0"/>
  </svg>
</div>

<!-- ABOUT -->
<section class="about" id="sobre">
  <div class="container">
    <div class="section-title fade-up">
      <span class="cursive">Conheça-nos</span>
      <h2>A Nossa História</h2>
    </div>
    <p class="section-subtitle fade-up">Duas décadas a servir a melhor pizza romana da Figueira da Foz</p>

    <div class="bento-grid">
      <div class="bento-card story fade-up">
        <h3>Uma Paixão que Nasceu no Mediterrâneo</h3>
        <p>Amir Soliman trouxe consigo os sabores autênticos da pizza romana para a Figueira da Foz. Com massa fina e crocante, cada pizza é uma obra de arte preparada com ingredientes frescos e o carinho de quem ama o que faz.</p>
        <p>Há 20 anos que a Zeff Pizza é o ponto de encontro de quem procura sabor genuíno numa das cidades mais bonitas da costa portuguesa. A nossa filosofia é simples: ingredientes de qualidade, técnica perfeita e muito amor.</p>
      </div>
      <div class="bento-card experience-badge fade-up" style="transition-delay:0.1s;">
        <div class="big-number" data-count="20">0</div>
        <span>Anos de Paixão<br>pela Pizza</span>
      </div>
      <div class="bento-card photo fade-up" style="transition-delay:0.2s;">
        <img src="/zeff-pizza/glovo-napoli-hq.png" alt="Preparação artesanal de pizza na Zeff" loading="lazy">
      </div>
      <div class="bento-card fun-fact fade-up" style="transition-delay:0.3s;">
        <span class="cursive">Sabias que?</span>
        <p>A Pizza Romana distingue-se pela massa ultra-fina e crocante, diferente da Napolitana. Na Zeff, cada massa descansa 72 horas para uma textura perfeita.</p>
      </div>
    </div>
  </div>
</section>

<!-- Wave divider -->
<div class="wave-divider flip">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#F5E6D0"/>
  </svg>
</div>

<!-- MENU -->
<section class="menu" id="menu">
  <div class="container">
    <div class="section-title fade-up">
      <span class="cursive">Sabores Autênticos</span>
      <h2>O Nosso Menu</h2>
    </div>
    <p class="section-subtitle fade-up">Pizzas artesanais com ingredientes frescos, preparadas no forno a lenha</p>

    <div class="menu-tabs fade-up">
      <button class="menu-tab active" data-tab="classicas">Clássicas</button>
      <button class="menu-tab" data-tab="premium">Premium</button>
      <button class="menu-tab" data-tab="extras">Extras</button>
    </div>

    <!-- Clássicas -->
    <div class="menu-panel active" id="tab-classicas">
      <div class="menu-grid">
        <div class="menu-card">
          <div class="menu-card-header"><h4>Margherita</h4><div class="menu-price">&euro;8</div></div>
          <div class="menu-card-body"><p>O clássico eterno: molho de tomate San Marzano, mozzarella fior di latte, manjericão fresco e azeite virgem extra.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header"><h4>Diavola</h4><div class="menu-price">&euro;10</div></div>
          <div class="menu-card-body"><p>Para quem gosta de picante: salame picante, molho de tomate, mozzarella e um toque de pimenta calabresa.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header"><h4>Prosciutto e Funghi</h4><div class="menu-price">&euro;10</div></div>
          <div class="menu-card-body"><p>Fiambre italiano, cogumelos frescos salteados, mozzarella e molho de tomate. Um clássico reconfortante.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header"><h4>Napoli</h4><div class="menu-price">&euro;11</div></div>
          <div class="menu-card-body"><p>Anchovas, alcaparras, azeitonas pretas, molho de tomate e mozzarella. Sabores intensos do Mediterrâneo.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header"><h4>Bote</h4><div class="menu-price">&euro;11</div></div>
          <div class="menu-card-body"><p>A especialidade da casa: uma combinação única de sabores que conquista desde o primeiro pedaço.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header"><h4>Calzone</h4><div class="menu-price">&euro;11</div></div>
          <div class="menu-card-body"><p>A pizza dobrada, recheada com fiambre, cogumelos, mozzarella e ricotta. Crocante por fora, suculento por dentro.</p></div>
        </div>
      </div>
    </div>

    <!-- Premium -->
    <div class="menu-panel" id="tab-premium">
      <div class="menu-grid">
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--secondary),var(--accent));">
            <h4>Saracena</h4><div class="menu-price">&euro;13</div>
          </div>
          <div class="menu-card-body"><p>Uma criação especial com sabores do Mediterrâneo oriental. Ingredientes premium numa base de massa romana perfeita.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--secondary),var(--accent));">
            <h4>Quattro Formaggi</h4><div class="menu-price">&euro;13</div>
          </div>
          <div class="menu-card-body"><p>Quatro queijos selecionados: mozzarella, gorgonzola, parmesão e fontina. Uma explosão de sabor cremoso.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--secondary),var(--accent));">
            <h4>Capricciosa</h4><div class="menu-price">&euro;14</div>
          </div>
          <div class="menu-card-body"><p>A pizza generosa: fiambre, cogumelos, alcachofras, azeitonas e mozzarella. Cada fatia é uma surpresa.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--secondary),var(--accent));">
            <h4>Bella</h4><div class="menu-price">&euro;15</div>
          </div>
          <div class="menu-card-body"><p>A nossa jóia: presunto de Parma, grana padano, mozzarella de búfala e rúcula fresca. A mais premium da casa.</p></div>
        </div>
      </div>
    </div>

    <!-- Extras -->
    <div class="menu-panel" id="tab-extras">
      <div class="menu-grid">
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--accent),#d4a03a);">
            <h4>Pão de Alho</h4><div class="menu-price">&euro;5-7</div>
          </div>
          <div class="menu-card-body"><p>Pão artesanal com manteiga de alho, ervas aromáticas e opção com queijo gratinado. O acompanhamento perfeito.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--accent),#d4a03a);">
            <h4>Vinhos</h4><div class="menu-price">&euro;10-23</div>
          </div>
          <div class="menu-card-body"><p>Seleção de vinhos tintos, brancos e rosés. Rótulos portugueses e italianos para acompanhar a sua pizza.</p></div>
        </div>
        <div class="menu-card">
          <div class="menu-card-header" style="background:linear-gradient(135deg,var(--accent),#d4a03a);">
            <h4>Cervejas</h4><div class="menu-price">&euro;2-3</div>
          </div>
          <div class="menu-card-body"><p>Cervejas nacionais e internacionais, sempre frescas. Imperial ou garrafa, como preferir.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Wave divider -->
<div class="wave-divider">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z" fill="#F5E6D0"/>
  </svg>
</div>

<!-- EXPERIENCE / GALLERY -->
<section class="experience" id="galeria">
  <div class="container">
    <div class="section-title fade-up">
      <span class="cursive">Viver a Figueira</span>
      <h2>Mais Que Pizza</h2>
    </div>
    <p class="section-subtitle fade-up">Uma experiência costeira: sol, mar e sabores autênticos</p>

    <div class="experience-content">
      <div class="experience-text fade-up">
        <p>Na Figueira da Foz, a vida tem outro ritmo. O sol brilha sobre a praia mais larga da Europa, o mar convida a passeios ao entardecer, e o aroma de pizza fresca paira no ar.</p>
        <p>A Zeff Pizza não é apenas um restaurante &mdash; é parte da paisagem costeira. Venha desfrutar de uma pizza romana autêntica depois de um dia de praia, ou marque um jantar especial com vista para a cidade.</p>
        <p style="color:var(--primary);font-weight:700;">Entrega ao domicílio via Glovo com 99% de satisfação.</p>
      </div>
      <div class="fade-up" style="transition-delay:0.2s;">
        <div class="gallery-scroll">
          <div class="gallery-item">
            <img src="/zeff-pizza/glovo-store-banner.png" alt="Zeff Pizza — Figueira da Foz" loading="lazy">
          </div>
          <div class="gallery-item">
            <img src="/zeff-pizza/glovo-quattro-formaggi-hq.png" alt="Pizza Quattro Formaggi da Zeff" loading="lazy">
          </div>
          <div class="gallery-item">
            <img src="/zeff-pizza/glovo-capricciosa-hq.png" alt="Pizza Capricciosa com ingredientes frescos" loading="lazy">
          </div>
          <div class="gallery-item">
            <img src="/zeff-pizza/glovo-saracena-hq.png" alt="Pizza Saracena da Zeff Pizza" loading="lazy">
          </div>
          <div class="gallery-item">
            <img src="/zeff-pizza/glovo-diavola-hq.png" alt="Pizza Diavola da Zeff Pizza" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Wave divider -->
<div class="wave-divider flip">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z" fill="#F5E6D0"/>
  </svg>
</div>

<!-- REVIEWS -->
<section class="reviews" id="reviews">
  <div class="container">
    <div class="section-title fade-up">
      <span class="cursive">Avaliações</span>
      <h2>O Que Dizem de Nós</h2>
    </div>
    <p class="section-subtitle fade-up">4.8&#11088; no Google &bull; 5.0&#11088; no TripAdvisor</p>

    <div class="reviews-track-wrapper fade-up">
      <div class="reviews-track" id="reviewsTrack">
        <div class="review-card">
          <div class="review-stars">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="review-text">"A melhor pizza da Figueira, sem dúvida! A massa é incrivelmente fina e crocante. A Bella é divinal — o presunto de Parma derrete na boca."</p>
          <div class="review-author">
            <span class="review-author-name">Maria S.</span>
            <span class="review-source"><span class="dot google"></span>Google</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="review-text">"Viemos de férias e ficámos apaixonados. O Amir é super simpático, o ambiente é acolhedor e a pizza... possivelmente a melhor que já comi em Portugal!"</p>
          <div class="review-author">
            <span class="review-author-name">João R.</span>
            <span class="review-source"><span class="dot tripadvisor"></span>TripAdvisor</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="review-text">"Pedimos pelo Glovo e chegou quentinha e perfeita. A Diavola tem o nível de picante ideal. Já somos clientes habituais!"</p>
          <div class="review-author">
            <span class="review-author-name">Ana C.</span>
            <span class="review-source"><span class="dot google"></span>Google</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="review-text">"Excelente relação qualidade-preço. O calzone é enorme e delicioso. O espaço é pequeno mas muito acolhedor. Recomendo vivamente!"</p>
          <div class="review-author">
            <span class="review-author-name">Pedro M.</span>
            <span class="review-source"><span class="dot tripadvisor"></span>TripAdvisor</span>
          </div>
        </div>
        <div class="review-card">
          <div class="review-stars">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="review-text">"20 anos de experiência notam-se em cada detalhe. A Quattro Formaggi é sublime e o pão de alho com queijo é viciante. Voltaremos sempre!"</p>
          <div class="review-author">
            <span class="review-author-name">Sofia L.</span>
            <span class="review-source"><span class="dot google"></span>Google</span>
          </div>
        </div>
      </div>
    </div>
    <div class="reviews-nav">
      <button id="reviewPrev" aria-label="Anterior">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button id="reviewNext" aria-label="Próximo">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</section>

<!-- Wave divider -->
<div class="wave-divider">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#F5E6D0"/>
  </svg>
</div>

<!-- CONTACT -->
<section class="contact" id="contacto">
  <div class="container">
    <div class="section-title fade-up">
      <span class="cursive">Estamos à espera</span>
      <h2>Venha Visitar-nos</h2>
    </div>
    <p class="section-subtitle fade-up">No coração da Figueira da Foz, a poucos passos do mar</p>

    <div class="contact-grid">
      <div class="contact-info-card fade-up">
        <h3>Informações</h3>
        <div class="contact-item">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="contact-item-text">
            <strong>Morada</strong>
            <span>Rua Poeta Acácio Antunes 1/A<br>3080-158, Figueira da Foz</span>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div class="contact-item-text">
            <strong>Telefone</strong>
            <a href="tel:233096420">233 096 420</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="contact-item-text">
            <strong>Horário</strong>
            <span>Almoço: 12:00 &ndash; 15:00<br>Jantar: 19:00 &ndash; 22:30</span>
          </div>
        </div>
        <div class="contact-buttons">
          <a href="https://glovoapp.com" target="_blank" rel="noopener noreferrer" class="btn-glovo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            Pedir no Glovo
          </a>
          <a href="https://www.google.com/maps/dir//R.+Poeta+Ac%C3%A1cio+Antunes+1%2FA,+3080-158+Figueira+da+Foz" target="_blank" rel="noopener noreferrer" class="btn-directions">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            Como Chegar
          </a>
        </div>
      </div>
      <div class="contact-map fade-in" style="transition-delay:0.2s;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.0!2d-8.857!3d40.151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd23a1c0f1234567%3A0x1234567890abcdef!2sR.%20Poeta%20Ac%C3%A1cio%20Antunes%201%2FA%2C%203080-158%20Figueira%20da%20Foz!5e0!3m2!1spt-PT!2spt!4v1700000000000!5m2!1spt-PT!2spt" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localização Zeff Pizza"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="#home" class="navbar-logo" style="margin-bottom:12px;">
          <svg class="sun-icon" viewBox="0 0 64 64" fill="none" style="width:28px;height:28px;">
            <circle cx="32" cy="32" r="14" fill="#E8A946"/>
            <g stroke="#E8A946" stroke-width="3" stroke-linecap="round">
              <line x1="32" y1="4" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="60"/>
              <line x1="4" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="60" y2="32"/>
              <line x1="12.2" y1="12.2" x2="19.1" y2="19.1"/><line x1="44.9" y1="44.9" x2="51.8" y2="51.8"/>
              <line x1="12.2" y1="51.8" x2="19.1" y2="44.9"/><line x1="44.9" y1="19.1" x2="51.8" y2="12.2"/>
            </g>
          </svg>
          Zeff Pizza
        </a>
        <p>Sol, mar e a melhor pizza da Figueira. Pizza Romana artesanal desde 2006.</p>
      </div>
      <div class="footer-links">
        <h5>Navegação</h5>
        <a href="#sobre">Sobre Nós</a>
        <a href="#menu">Menu</a>
        <a href="#galeria">Galeria</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div class="footer-links">
        <h5>Contacto</h5>
        <a href="tel:233096420">233 096 420</a>
        <span style="display:block;color:var(--text-dark);font-size:0.95rem;margin-bottom:10px;">Almoço: 12h–15h</span>
        <span style="display:block;color:var(--text-dark);font-size:0.95rem;margin-bottom:10px;">Jantar: 19h–22h30</span>
      </div>
      <div>
        <h5 style="font-family:'Lato',sans-serif;font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;color:var(--text-light);margin-bottom:16px;">Siga-nos</h5>
        <div class="footer-social">
          <span aria-label="Facebook indisponível" aria-disabled="true" title="Facebook indisponível">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </span>
          <span aria-label="Instagram indisponível" aria-disabled="true" title="Instagram indisponível">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </span>
          <span aria-label="TripAdvisor indisponível" aria-disabled="true" title="TripAdvisor indisponível">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Feito com &#9728;&#65039; na Figueira da Foz &bull; &copy; 2026 Zeff Pizza. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>

` }} />
    </>
  );
}
