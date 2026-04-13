"use client";

import { useEffect } from "react";

export default function ZeffPizzaPiratePage() {
  useEffect(() => {
    const scriptContent = `
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });

        // Mobile menu
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');

        function syncMobileMenuState(isOpen) {
            hamburger.classList.toggle('active', isOpen);
            mobileMenu.classList.toggle('active', isOpen);
            mobileOverlay.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        function toggleMobileMenu() {
            syncMobileMenuState(!mobileMenu.classList.contains('active'));
        }

        if (hamburger && mobileMenu && mobileOverlay) {
            hamburger.addEventListener('click', toggleMobileMenu);
            mobileOverlay.addEventListener('click', toggleMobileMenu);

            // Close mobile menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileMenu.classList.contains('active')) toggleMobileMenu();
                });
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        }

        // Parallax hero
        const heroBg = document.getElementById('heroBg');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = \`translateY(\${scrolled * 0.4}px)\`;
            }
        });

        // Scroll reveal (IntersectionObserver)
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        revealElements.forEach(el => revealObserver.observe(el));

        // Menu filter tabs
        const menuTabs = document.querySelectorAll('.menu-tab');
        const menuCards = document.querySelectorAll('.menu-card');

        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                menuTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.dataset.category;

                menuCards.forEach(card => {
                    if (category === 'all' || card.dataset.cat === category) {
                        card.style.display = '';
                        // Re-trigger animation
                        card.classList.remove('visible');
                        setTimeout(() => card.classList.add('visible'), 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = href ? document.querySelector(href) : null;
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
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
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Pirata+One&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== RESET & BASE ===== */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body {
            font-family: 'DM Sans', sans-serif;
            background: #0D1117;
            color: #F0E6D3;
            overflow-x: hidden;
            line-height: 1.6;
        }
        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; display: block; }
        ul { list-style: none; }
        h1, h2, h3, h4 { font-family: 'Pirata One', cursive; font-weight: 400; }
        .caveat { font-family: 'Caveat', cursive; }

        /* ===== CSS VARIABLES ===== */
        :root {
            --bg: #0D1117;
            --bg-light: #161B22;
            --primary: #D4652A;
            --secondary: #C9973E;
            --text: #F0E6D3;
            --text-muted: #9CA3AF;
            --accent: #8B0000;
            --parchment: #F0E6D3;
            --parchment-dark: #D4C5A0;
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--secondary); }

        /* ===== NAVBAR ===== */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            padding: 1rem 2rem;
            transition: all 0.4s ease;
            background: transparent;
        }
        .navbar.scrolled {
            background: rgba(13, 17, 23, 0.95);
            backdrop-filter: blur(12px);
            padding: 0.6rem 2rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
        .navbar-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .logo {
            font-family: 'Pirata One', cursive;
            font-size: 2rem;
            color: var(--secondary);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: transform 0.3s;
        }
        .logo:hover { transform: scale(1.05); }
        .logo svg { width: 36px; height: 36px; fill: var(--secondary); }
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            font-size: 0.95rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            padding: 0.25rem 0;
            transition: color 0.3s;
        }
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary);
            transition: width 0.3s;
        }
        .nav-links a:hover { color: var(--primary); }
        .nav-links a:hover::after { width: 100%; }
        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
            z-index: 1001;
            background: none;
            border: 0;
            padding: 0;
        }
        .hamburger span {
            width: 28px;
            height: 3px;
            background: var(--secondary);
            border-radius: 2px;
            transition: all 0.3s;
        }
        .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }

        /* Mobile Menu */
        .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 320px;
            height: 100vh;
            background: linear-gradient(180deg, #0D1117 0%, #161B22 100%);
            z-index: 999;
            transition: right 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            padding: 5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            border-left: 2px solid var(--primary);
        }
        .mobile-menu.active { right: 0; }
        .mobile-menu a {
            font-family: 'Pirata One', cursive;
            font-size: 1.5rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(201, 151, 62, 0.2);
            transition: color 0.3s, padding-left 0.3s;
        }
        .mobile-menu a:hover { color: var(--primary); padding-left: 1rem; }
        .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 998;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s;
        }
        .mobile-overlay.active { opacity: 1; pointer-events: all; }

        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hamburger { display: flex; }
            .navbar { padding: 0.75rem 1rem; }
            .navbar.scrolled { padding: 0.5rem 1rem; }
            .logo { font-size: 1.6rem; }
            .logo svg { width: 28px; height: 28px; }
        }

        /* ===== HERO ===== */
        .hero {
            position: relative;
            height: 100vh;
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
        }
        .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 120%;
            background: url('/zeff-pizza/glovo-bella-hq.png') center/cover no-repeat;
            filter: brightness(0.85);
            will-change: transform;
        }
        .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                180deg,
                rgba(13, 17, 23, 0.7) 0%,
                rgba(13, 17, 23, 0.5) 40%,
                rgba(13, 17, 23, 0.8) 100%
            );
        }
        .hero-content {
            position: relative;
            z-index: 2;
            padding: 2rem;
            max-width: 900px;
        }
        .hero-badge {
            display: inline-block;
            font-family: 'Caveat', cursive;
            font-size: 1.3rem;
            color: var(--secondary);
            border: 1px solid var(--secondary);
            padding: 0.3rem 1.2rem;
            border-radius: 50px;
            margin-bottom: 1.5rem;
            animation: float 3s ease-in-out infinite;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 7vw, 5rem);
            line-height: 1.1;
            color: var(--text);
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .hero h1 span { color: var(--primary); }
        .hero-sub {
            font-family: 'Caveat', cursive;
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            color: var(--secondary);
            margin-bottom: 2.5rem;
            opacity: 0.9;
        }
        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.9rem 2rem;
            min-height: 48px;
            border-radius: 8px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s;
            cursor: pointer;
            border: none;
        }
        .btn-primary {
            background: var(--primary);
            color: #fff;
            box-shadow: 0 4px 15px rgba(212, 101, 42, 0.4);
        }
        .btn-primary:hover {
            background: #e0753a;
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(212, 101, 42, 0.5);
        }
        .btn-outline {
            background: transparent;
            color: var(--secondary);
            border: 2px solid var(--secondary);
        }
        .btn-outline:hover {
            background: var(--secondary);
            color: var(--bg);
            transform: translateY(-2px);
        }
        .btn-accent {
            background: var(--accent);
            color: #fff;
            box-shadow: 0 4px 15px rgba(139, 0, 0, 0.4);
        }
        .btn-accent:hover {
            background: #a50000;
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(139, 0, 0, 0.5);
        }
        .hero-scroll {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            animation: bounce 2s infinite;
        }
        .hero-scroll svg { width: 32px; height: 32px; stroke: var(--secondary); opacity: 0.6; }

        /* Rope Border */
        .rope-border {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            z-index: 3;
            overflow: hidden;
        }
        .rope-border::before {
            content: '';
            display: block;
            width: 200%;
            height: 6px;
            background: repeating-linear-gradient(
                90deg,
                var(--secondary) 0px, var(--secondary) 12px,
                transparent 12px, transparent 16px,
                #8B6914 16px, #8B6914 28px,
                transparent 28px, transparent 32px
            );
            position: absolute;
            bottom: 12px;
            left: 0;
            animation: ropeSlide 8s linear infinite;
        }

        @keyframes ropeSlide { to { transform: translateX(-50%); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
        }

        /* ===== SECTION DIVIDER ===== */
        .section-divider {
            text-align: center;
            padding: 2rem 0;
            position: relative;
        }
        .section-divider::before,
        .section-divider::after {
            content: '';
            position: absolute;
            top: 50%;
            width: calc(50% - 40px);
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--secondary), transparent);
        }
        .section-divider::before { left: 0; }
        .section-divider::after { right: 0; }
        .section-divider svg { width: 50px; height: 50px; fill: var(--secondary); opacity: 0.6; }

        /* ===== SECTIONS COMMON ===== */
        section { padding: 6rem 2rem; position: relative; }
        .section-header {
            text-align: center;
            margin-bottom: 3.5rem;
        }
        .section-header h2 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            color: var(--secondary);
            margin-bottom: 0.5rem;
        }
        .section-header .subtitle {
            font-family: 'Caveat', cursive;
            font-size: 1.3rem;
            color: var(--text-muted);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* ===== STORY SECTION ===== */
        .story {
            background: linear-gradient(180deg, var(--bg) 0%, var(--bg-light) 50%, var(--bg) 100%);
        }
        .story-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        .story-text p {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
            color: rgba(240, 230, 211, 0.85);
        }
        .story-text .highlight {
            color: var(--primary);
            font-weight: 700;
        }
        .story-text .pirate-quote {
            font-family: 'Pirata One', cursive;
            font-size: 1.8rem;
            color: var(--secondary);
            border-left: 3px solid var(--primary);
            padding-left: 1.5rem;
            margin: 2rem 0;
        }
        .story-image {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
        }
        .story-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 12px;
            transition: transform 0.5s;
        }
        .story-image:hover img { transform: scale(1.05); }
        .story-image::after {
            content: '';
            position: absolute;
            inset: 0;
            border: 2px solid var(--secondary);
            border-radius: 12px;
            opacity: 0.3;
        }
        .story-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .stat {
            text-align: center;
            padding: 1rem;
            background: rgba(201, 151, 62, 0.05);
            border: 1px solid rgba(201, 151, 62, 0.15);
            border-radius: 8px;
        }
        .stat-number {
            font-family: 'Pirata One', cursive;
            font-size: 2rem;
            color: var(--primary);
        }
        .stat-label {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 0.3rem;
        }

        /* Compass Rose SVG decoration */
        .compass-decoration {
            position: absolute;
            opacity: 0.03;
            pointer-events: none;
        }

        @media (max-width: 768px) {
            section { padding: 4rem 1.25rem; }
            .section-header { margin-bottom: 2.5rem; }
            .section-header .subtitle { font-size: 1.1rem; }
            .story-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .story-image { order: -1; }
            .story-image img { height: 280px; }
            .story-text p { font-size: 1rem; }
            .story-text .pirate-quote { font-size: 1.4rem; padding-left: 1rem; }
            .story-stats { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
            .stat-number { font-size: 1.6rem; }
            .menu-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
            .menu-tabs { gap: 0.5rem; }
            .menu-tab { padding: 0.5rem 1.2rem; font-size: 1rem; }
            .reviews-grid { grid-template-columns: 1fr; }
            .reviews-ratings { gap: 1rem; flex-direction: column; align-items: center; }
            .rating-badge { width: 100%; max-width: 320px; padding: 0.75rem 1.5rem; }
            .rating-score { font-size: 2rem; }
            .review-card { padding: 1.5rem; }
            /* Disable hover transforms on touch for menu cards */
            .menu-card:hover { transform: none; }
            .menu-card:hover .menu-card-img { transform: none; }
            /* Prevent bg-glow from causing horizontal scroll */
            .bg-glow { display: none; }
        }

        /* ===== MENU SECTION ===== */
        .menu {
            background: var(--bg);
            position: relative;
        }
        .menu-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        .menu-tab {
            padding: 0.6rem 1.8rem;
            border: 1px solid var(--secondary);
            border-radius: 50px;
            font-family: 'Pirata One', cursive;
            font-size: 1.1rem;
            color: var(--secondary);
            cursor: pointer;
            transition: all 0.3s;
            background: transparent;
        }
        .menu-tab:hover, .menu-tab.active {
            background: var(--secondary);
            color: var(--bg);
        }
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }
        .menu-card {
            background: linear-gradient(145deg, rgba(240, 230, 211, 0.04), rgba(240, 230, 211, 0.01));
            border: 1px solid rgba(201, 151, 62, 0.15);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
        }
        .menu-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at top right, rgba(212, 101, 42, 0.08), transparent 60%);
            opacity: 0;
            transition: opacity 0.4s;
        }
        .menu-card:hover {
            transform: translateY(-6px);
            border-color: rgba(212, 101, 42, 0.4);
            box-shadow: 0 12px 40px rgba(212, 101, 42, 0.15);
        }
        .menu-card:hover::before { opacity: 1; }
        .menu-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.5rem;
            position: relative;
        }
        .menu-card-name {
            font-family: 'Pirata One', cursive;
            font-size: 1.4rem;
            color: var(--text);
        }
        .menu-card-price {
            font-family: 'Pirata One', cursive;
            font-size: 1.5rem;
            color: var(--secondary);
            white-space: nowrap;
        }
        .menu-card-price::before {
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            background: var(--secondary);
            border-radius: 50%;
            margin-right: 4px;
            vertical-align: middle;
            position: relative;
            top: -2px;
            box-shadow: inset 0 0 0 2px #8B6914;
        }
        .menu-card-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.5;
            position: relative;
        }
        .menu-card.premium {
            border-color: rgba(201, 151, 62, 0.3);
            background: linear-gradient(145deg, rgba(201, 151, 62, 0.06), rgba(201, 151, 62, 0.01));
        }
        .menu-card-img {
            width: 100%;
            height: 160px;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
            filter: brightness(0.9);
            transition: filter 0.4s ease, transform 0.4s ease;
        }
        .menu-card:hover .menu-card-img {
            filter: brightness(1);
            transform: scale(1.05);
        }
        .menu-card-img-wrap {
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .menu-card.premium .menu-card-name::after {
            content: '★';
            margin-left: 0.5rem;
            color: var(--secondary);
            font-size: 0.9rem;
        }
        .menu-category-hidden { display: none; }

        @media (max-width: 480px) {
            section { padding: 3rem 0.75rem; }
            .section-header { margin-bottom: 2rem; }
            .section-header .subtitle { font-size: 1rem; }
            .menu-grid { grid-template-columns: 1fr; }
            .menu-card { padding: 1.25rem; }
            .menu-card-img { height: 140px; }
            .menu-card-name { font-size: 1.2rem; }
            .menu-card-price { font-size: 1.3rem; }
            .menu-tabs { gap: 0.4rem; }
            .menu-tab { padding: 0.4rem 1rem; font-size: 0.9rem; }
            .story-image img { height: 220px; }
            .story-text .pirate-quote { font-size: 1.2rem; }
            .story-stats { grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
            .stat { padding: 0.75rem 0.5rem; }
            .stat-number { font-size: 1.4rem; }
            .hero { min-height: 500px; }
            .hero-content { padding: 1.25rem; }
            .hero-buttons { flex-direction: column; align-items: center; }
            .hero-buttons .btn { width: 100%; max-width: 280px; }
            .hero-badge { font-size: 1.1rem; padding: 0.25rem 1rem; }
        }

        /* ===== REVIEWS SECTION ===== */
        .reviews {
            background: linear-gradient(180deg, var(--bg) 0%, var(--bg-light) 100%);
        }
        .reviews-ratings {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        .rating-badge {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: rgba(201, 151, 62, 0.08);
            border: 1px solid rgba(201, 151, 62, 0.2);
            border-radius: 12px;
            padding: 1rem 2rem;
        }
        .rating-score {
            font-family: 'Pirata One', cursive;
            font-size: 2.5rem;
            color: var(--secondary);
        }
        .rating-info { text-align: left; }
        .rating-stars { color: var(--secondary); font-size: 1.1rem; letter-spacing: 2px; }
        .rating-source { font-size: 0.85rem; color: var(--text-muted); }
        .reviews-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        .review-card {
            background: linear-gradient(145deg, rgba(240, 230, 211, 0.05), rgba(240, 230, 211, 0.01));
            border: 1px solid rgba(201, 151, 62, 0.12);
            border-radius: 12px;
            padding: 2rem;
            position: relative;
            transition: transform 0.3s, border-color 0.3s;
        }
        .review-card:hover {
            transform: translateY(-4px);
            border-color: rgba(201, 151, 62, 0.3);
        }
        .review-card::before {
            content: '"';
            font-family: 'Pirata One', cursive;
            font-size: 4rem;
            color: var(--primary);
            opacity: 0.2;
            position: absolute;
            top: 0.5rem;
            left: 1rem;
            line-height: 1;
        }
        .review-text {
            font-style: italic;
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 1rem;
            color: rgba(240, 230, 211, 0.85);
            position: relative;
            z-index: 1;
        }
        .review-author {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .review-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Pirata One', cursive;
            font-size: 1.1rem;
            color: #fff;
        }
        .review-name {
            font-weight: 700;
            font-size: 0.95rem;
        }
        .review-date {
            font-size: 0.8rem;
            color: var(--text-muted);
        }
        .review-stars {
            color: var(--secondary);
            font-size: 0.85rem;
            letter-spacing: 1px;
        }
        .captain-log-label {
            font-family: 'Caveat', cursive;
            font-size: 0.9rem;
            color: var(--primary);
            margin-bottom: 0.75rem;
            display: block;
        }

        @media (max-width: 480px) {
            .reviews-grid { grid-template-columns: 1fr; }
            .reviews-ratings { gap: 0.75rem; }
            .rating-badge { padding: 0.6rem 1rem; }
            .rating-score { font-size: 1.8rem; }
            .rating-source { font-size: 0.875rem; }
            .review-card { padding: 1.25rem; }
            .review-text { font-size: 0.95rem; }
            .review-date { font-size: 0.875rem; }
            .menu-card-desc { font-size: 0.9rem; }
            .info-label { font-size: 0.875rem; }
            .stat-label { font-size: 0.875rem; }
            .captain-log-label { font-size: 0.85rem; }
        }

        /* ===== LOCATION SECTION ===== */
        .location {
            background: var(--bg);
        }
        .location-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
        }
        .location-map {
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid rgba(201, 151, 62, 0.2);
            height: 400px;
        }
        .location-map iframe {
            width: 100%;
            height: 100%;
            border: 0;
            filter: saturate(0.6) brightness(0.8) contrast(1.1);
        }
        .location-info {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .location-card {
            background: linear-gradient(145deg, rgba(240, 230, 211, 0.04), rgba(240, 230, 211, 0.01));
            border: 1px solid rgba(201, 151, 62, 0.15);
            border-radius: 12px;
            padding: 1.5rem;
        }
        .location-card h3 {
            font-size: 1.3rem;
            color: var(--secondary);
            margin-bottom: 1rem;
        }
        .info-row {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .info-row:last-child { margin-bottom: 0; }
        .info-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: rgba(212, 101, 42, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .info-icon svg { width: 20px; height: 20px; stroke: var(--primary); fill: none; stroke-width: 2; }
        .info-text { flex: 1; }
        .info-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .info-value {
            font-size: 1rem;
            color: var(--text);
            margin-top: 0.2rem;
        }
        .hours-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
        }
        .hour-block {
            background: rgba(212, 101, 42, 0.05);
            border-radius: 8px;
            padding: 0.75rem;
            text-align: center;
        }
        .hour-label {
            font-family: 'Caveat', cursive;
            font-size: 1.1rem;
            color: var(--secondary);
        }
        .hour-time {
            font-size: 0.95rem;
            color: var(--text);
            margin-top: 0.25rem;
        }
        /* Animated compass */
        .compass-container {
            text-align: center;
            margin-top: 1.5rem;
        }
        .compass-svg {
            width: 80px;
            height: 80px;
            animation: compassSpin 10s linear infinite;
        }
        @keyframes compassSpin { to { transform: rotate(360deg); } }

        .delivery-banner {
            background: linear-gradient(135deg, var(--primary), #e0753a);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            margin-top: 1rem;
        }
        .delivery-banner h3 {
            color: #fff;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }
        .delivery-banner p {
            color: rgba(255,255,255,0.85);
            font-size: 0.95rem;
            margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
            .location-grid { grid-template-columns: 1fr; gap: 2rem; }
            .location-map { height: 280px; }
            .location-card { padding: 1.25rem; }
            .location-card h3 { font-size: 1.15rem; }
            .delivery-banner { padding: 1.25rem; }
            .delivery-banner h3 { font-size: 1.1rem; }
            .delivery-banner p { font-size: 0.9rem; }
            .compass-svg { width: 60px; height: 60px; }
        }
        @media (max-width: 480px) {
            .location-map { height: 240px; }
            .location-card { padding: 1rem; }
            .hours-grid { gap: 0.5rem; }
            .hour-block { padding: 0.6rem; }
            .hour-label { font-size: 1rem; }
            .hour-time { font-size: 0.9rem; }
        }

        /* ===== FOOTER ===== */
        .footer {
            background: var(--bg-light);
            border-top: 1px solid rgba(201, 151, 62, 0.1);
            padding: 3rem 2rem;
        }
        .footer-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 2rem;
            align-items: center;
        }
        .footer-left {
            font-family: 'Pirata One', cursive;
            font-size: 1.5rem;
            color: var(--secondary);
        }
        .footer-center {
            text-align: center;
        }
        .footer-center a {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .footer-right {
            text-align: right;
        }
        .footer-copyright {
            font-size: 0.85rem;
            color: var(--text-muted);
        }
        .footer-tagline {
            font-family: 'Caveat', cursive;
            color: var(--secondary);
            font-size: 1rem;
            margin-top: 0.3rem;
            opacity: 0.7;
        }
        .footer-contact {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 0.75rem;
            line-height: 1.6;
        }
        .footer-contact a {
            color: var(--primary);
            transition: color 0.2s;
        }
        .footer-contact a:hover { color: var(--secondary); }

        @media (max-width: 768px) {
            .footer { padding: 2.5rem 1.25rem; }
            .footer-inner {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 1.5rem;
            }
            .footer-left { font-size: 1.3rem; }
            .footer-right { text-align: center; }
            .footer-copyright { font-size: 0.8rem; }
            .footer-tagline { font-size: 0.9rem; }
            .footer-contact { font-size: 0.8rem; }
        }

        /* ===== SCROLL REVEAL ===== */
        .reveal {
            opacity: 0;
            transform: translateY(36px);
            transition: opacity 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
            will-change: opacity, transform;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-left {
            opacity: 0;
            transform: translateX(-36px);
            transition: opacity 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
            will-change: opacity, transform;
        }
        .reveal-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-right {
            opacity: 0;
            transform: translateX(36px);
            transition: opacity 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
            will-change: opacity, transform;
        }
        .reveal-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }

        /* ===== BACKGROUND DECORATIONS ===== */
        .bg-glow {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            pointer-events: none;
            opacity: 0.06;
        }
        .bg-glow-primary { background: var(--primary); }
        .bg-glow-secondary { background: var(--secondary); }

        /* ===== ANCHOR SEPARATOR ===== */
        .anchor-separator {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 0;
            gap: 1rem;
        }
        .anchor-separator .line {
            width: 80px;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--secondary), transparent);
        }
        .anchor-separator svg {
            width: 28px;
            height: 28px;
            fill: var(--secondary);
            opacity: 0.4;
        }
    ` }} />
      <div dangerouslySetInnerHTML={{ __html: `

    <!-- NAVBAR -->
    <nav class="navbar" id="navbar">
        <div class="navbar-inner">
            <a href="#hero" class="logo">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="2.5"/>
                    <path d="M22 42 C22 30 42 30 42 42" fill="none" stroke="currentColor" stroke-width="2.5"/>
                    <line x1="15" y1="32" x2="49" y2="32" stroke="currentColor" stroke-width="2.5"/>
                    <circle cx="25" cy="17" r="2.5"/>
                    <circle cx="39" cy="17" r="2.5"/>
                    <path d="M27 24 Q32 28 37 24" fill="none" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                ZEFF
            </a>
            <div class="nav-links">
                <a href="#taverna">A Taverna</a>
                <a href="#mapa">O Mapa</a>
                <a href="#marinheiros">Tripulação</a>
                <a href="#porto">Localização</a>
                <a href="https://glovoapp.com" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">Encomendar</a>
            </div>
            <button type="button" class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- MOBILE MENU -->
    <div class="mobile-overlay" id="mobileOverlay"></div>
    <div class="mobile-menu" id="mobileMenu" aria-label="Menu móvel">
        <a href="#taverna">A Taverna</a>
        <a href="#mapa">O Mapa do Tesouro</a>
        <a href="#marinheiros">Os Marinheiros</a>
        <a href="#porto">Porto de Ancoragem</a>
        <a href="https://glovoapp.com" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">Encomendar no Glovo</a>
    </div>

    <!-- HERO -->
    <section class="hero" id="hero">
        <div class="hero-bg" id="heroBg"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <div class="hero-badge reveal">&#9875; Pizza Romana desde 2004</div>
            <h1 class="reveal delay-1">ARRR! A <span>MELHOR PIZZA</span> DESTA COSTA!</h1>
            <p class="hero-sub reveal delay-2">Pizzas deliciosas servidas por piratas simpáticos na Figueira da Foz</p>
            <div class="hero-buttons reveal delay-3">
                <a href="#mapa" class="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    Ver o Mapa do Tesouro
                </a>
                <a href="https://glovoapp.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Encomendar
                </a>
            </div>
        </div>
        <div class="hero-scroll">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </div>
        <div class="rope-border"></div>
    </section>

    <!-- ANCHOR SEPARATOR -->
    <div class="anchor-separator">
        <div class="line"></div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a3 3 0 00-3 3c0 1.3.8 2.4 2 2.8V10H8v2h3v6.9A5 5 0 017 14H5a7 7 0 006 6.9V12h3v-2h-3V7.8A3 3 0 0012 2zm0 2a1 1 0 110 2 1 1 0 010-2z"/><path d="M19 14h-2a5 5 0 01-4 4.9V12"/></svg>
        <div class="line"></div>
    </div>

    <!-- STORY SECTION -->
    <section class="story" id="taverna">
        <div class="container">
            <div class="section-header reveal">
                <h2>A Lenda da Zeff Pizza</h2>
                <p class="subtitle">Uma história contada entre marés e massa de pizza...</p>
            </div>
            <div class="story-grid">
                <div class="story-text reveal-left">
                    <p>Há <span class="highlight">20 anos</span>, um destemido pizzaiolo partiu de terras distantes, navegando mares revoltos com um único sonho: trazer a <span class="highlight">verdadeira pizza romana</span> à costa portuguesa.</p>
                    <p>O capitão <span class="highlight">Amir Soliman</span> ancorou na Figueira da Foz e ergueu a sua taverna — um porto seguro onde a massa é fina como a brisa do mar e estaladiça como a madeira dos navios antigos.</p>
                    <div class="pirate-quote">
                        "A melhor pizza não se encontra em mapas — sente-se no coração."
                    </div>
                    <p>Cada pizza é uma aventura. Cada ingrediente, um tesouro cuidadosamente selecionado. Na Zeff, não servimos apenas comida — contamos histórias em cada fatia.</p>
                    <div class="story-stats">
                        <div class="stat reveal delay-1">
                            <div class="stat-number">20+</div>
                            <div class="stat-label">Anos de Aventura</div>
                        </div>
                        <div class="stat reveal delay-2">
                            <div class="stat-number">4.8★</div>
                            <div class="stat-label">Nota Google</div>
                        </div>
                        <div class="stat reveal delay-3">
                            <div class="stat-number">99%</div>
                            <div class="stat-label">Satisfação Glovo</div>
                        </div>
                    </div>
                </div>
                <div class="story-image reveal-right">
                    <img src="/zeff-pizza/glovo-store-banner.png" alt="Interior do restaurante Zeff Pizza" loading="lazy">
                </div>
            </div>
        </div>
        <div class="bg-glow bg-glow-primary" style="width: 400px; height: 400px; top: 20%; right: -100px;"></div>
    </section>

    <!-- ANCHOR SEPARATOR -->
    <div class="anchor-separator">
        <div class="line"></div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a3 3 0 00-3 3c0 1.3.8 2.4 2 2.8V10H8v2h3v6.9A5 5 0 017 14H5a7 7 0 006 6.9V12h3v-2h-3V7.8A3 3 0 0012 2zm0 2a1 1 0 110 2 1 1 0 010-2z"/><path d="M19 14h-2a5 5 0 01-4 4.9V12"/></svg>
        <div class="line"></div>
    </div>

    <!-- MENU SECTION -->
    <section class="menu" id="mapa">
        <div class="container">
            <div class="section-header reveal">
                <h2>O Mapa do Tesouro</h2>
                <p class="subtitle">Cada pizza é uma ilha de sabor por descobrir</p>
            </div>

            <div class="menu-tabs reveal">
                <button class="menu-tab active" data-category="all">Todas</button>
                <button class="menu-tab" data-category="classicas">Clássicas</button>
                <button class="menu-tab" data-category="premium">Premium</button>
                <button class="menu-tab" data-category="extras">Extras & Bebidas</button>
            </div>

            <div class="menu-grid" id="menuGrid">
                <!-- Clássicas -->
                <div class="menu-card reveal delay-1" data-cat="classicas">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-margherita-hq.png" alt="Pizza Margherita da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Margherita</div>
                        <div class="menu-card-price">€8</div>
                    </div>
                    <p class="menu-card-desc">A clássica que conquistou os sete mares — molho de tomate, mozzarella e manjericão fresco.</p>
                </div>
                <div class="menu-card reveal delay-2" data-cat="classicas">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-diavola-hq.png" alt="Pizza Diavola da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Diavola</div>
                        <div class="menu-card-price">€10</div>
                    </div>
                    <p class="menu-card-desc">Picante como o fogo de um canhão — salame picante sobre um mar de mozzarella derretida.</p>
                </div>
                <div class="menu-card reveal delay-3" data-cat="classicas">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-prosciutto-funghi-hq.png" alt="Pizza Prosciutto e Funghi da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Prosciutto e Funghi</div>
                        <div class="menu-card-price">€10</div>
                    </div>
                    <p class="menu-card-desc">Presunto e cogumelos — o tesouro dos bosques encontra o mar.</p>
                </div>
                <div class="menu-card reveal delay-1" data-cat="classicas">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-napoli-hq.png" alt="Pizza Napoli da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Napoli</div>
                        <div class="menu-card-price">€11</div>
                    </div>
                    <p class="menu-card-desc">Uma homenagem à terra natal — anchovas, alcaparras, azeitonas e o espírito napolitano.</p>
                </div>
                <div class="menu-card reveal delay-2" data-cat="classicas">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-bote-hq.png" alt="Pizza Bote da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Bote</div>
                        <div class="menu-card-price">€11</div>
                    </div>
                    <p class="menu-card-desc">O bote do capitão — uma viagem de sabores que te leva até à costa italiana.</p>
                </div>
                <div class="menu-card reveal delay-3" data-cat="classicas">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-calzone-hq.png" alt="Calzone da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Calzone</div>
                        <div class="menu-card-price">€11</div>
                    </div>
                    <p class="menu-card-desc">Dobrado como um mapa do tesouro — todos os segredos escondidos dentro da massa.</p>
                </div>
                <!-- Premium -->
                <div class="menu-card premium reveal delay-1" data-cat="premium">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-saracena-hq.png" alt="Pizza Saracena da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Saracena</div>
                        <div class="menu-card-price">€13</div>
                    </div>
                    <p class="menu-card-desc">A receita secreta trazida das rotas do Mediterrâneo — sabores que contam histórias.</p>
                </div>
                <div class="menu-card premium reveal delay-2" data-cat="premium">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-quattro-formaggi-hq.png" alt="Pizza Quattro Formaggi da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Quattro Formaggi</div>
                        <div class="menu-card-price">€13</div>
                    </div>
                    <p class="menu-card-desc">Quatro queijos que são quatro ilhas de prazer — uma expedição cremosa e irresistível.</p>
                </div>
                <div class="menu-card premium reveal delay-3" data-cat="premium">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-capricciosa-hq.png" alt="Pizza Capricciosa da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Capricciosa</div>
                        <div class="menu-card-price">€14</div>
                    </div>
                    <p class="menu-card-desc">Caprichosa como o mar — presunto, cogumelos, alcachofras e azeitonas no convés.</p>
                </div>
                <div class="menu-card premium reveal delay-1" data-cat="premium">
                    <div class="menu-card-img-wrap"><img src="/zeff-pizza/glovo-bella-hq.png" alt="Pizza Bella da Zeff Pizza" class="menu-card-img" loading="lazy"></div>
                    <div class="menu-card-header">
                        <div class="menu-card-name">Bella</div>
                        <div class="menu-card-price">€15</div>
                    </div>
                    <p class="menu-card-desc">O tesouro supremo — presunto de Parma, grana padano, mozzarella de búfala e rúcula. A jóia da coroa.</p>
                </div>
                <!-- Extras -->
                <div class="menu-card reveal delay-1" data-cat="extras">
                    <div class="menu-card-header">
                        <div class="menu-card-name">Pão de Alho</div>
                        <div class="menu-card-price">€5-€7</div>
                    </div>
                    <p class="menu-card-desc">Simples ou com queijo — o aperitivo perfeito antes da batalha principal.</p>
                </div>
                <div class="menu-card reveal delay-2" data-cat="extras">
                    <div class="menu-card-header">
                        <div class="menu-card-name">Vinhos</div>
                        <div class="menu-card-price">€10-€23</div>
                    </div>
                    <p class="menu-card-desc">Seleção de vinhos portugueses — o rum dos tempos modernos para acompanhar o banquete.</p>
                </div>
                <div class="menu-card reveal delay-3" data-cat="extras">
                    <div class="menu-card-header">
                        <div class="menu-card-name">Cerveja</div>
                        <div class="menu-card-price">€2-€3</div>
                    </div>
                    <p class="menu-card-desc">Fresca como a brisa do Atlântico — a bebida do verdadeiro marinheiro.</p>
                </div>
            </div>
        </div>
        <div class="bg-glow bg-glow-secondary" style="width: 500px; height: 500px; bottom: -100px; left: -150px;"></div>
    </section>

    <!-- ANCHOR SEPARATOR -->
    <div class="anchor-separator">
        <div class="line"></div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a3 3 0 00-3 3c0 1.3.8 2.4 2 2.8V10H8v2h3v6.9A5 5 0 017 14H5a7 7 0 006 6.9V12h3v-2h-3V7.8A3 3 0 0012 2zm0 2a1 1 0 110 2 1 1 0 010-2z"/><path d="M19 14h-2a5 5 0 01-4 4.9V12"/></svg>
        <div class="line"></div>
    </div>

    <!-- REVIEWS SECTION -->
    <section class="reviews" id="marinheiros">
        <div class="container">
            <div class="section-header reveal">
                <h2>O Que Dizem os Marinheiros</h2>
                <p class="subtitle">Relatos do diário de bordo dos nossos tripulantes</p>
            </div>

            <div class="reviews-ratings reveal">
                <div class="rating-badge">
                    <div class="rating-score">4.8</div>
                    <div class="rating-info">
                        <div class="rating-stars">★★★★★</div>
                        <div class="rating-source">Google · 49 avaliações</div>
                    </div>
                </div>
                <div class="rating-badge">
                    <div class="rating-score">5.0</div>
                    <div class="rating-info">
                        <div class="rating-stars">★★★★★</div>
                        <div class="rating-source">TripAdvisor</div>
                    </div>
                </div>
            </div>

            <div class="reviews-grid">
                <div class="review-card reveal delay-1">
                    <span class="captain-log-label">Diário de Bordo — Entrada #47</span>
                    <p class="review-text">A melhor pizza que já comi em Portugal! A massa fina e estaladiça lembrou-me as melhores pizzarias de Roma. O Amir é um verdadeiro mestre.</p>
                    <div class="review-author">
                        <div class="review-avatar">M</div>
                        <div>
                            <div class="review-name">Marco S.</div>
                            <div class="review-stars">★★★★★</div>
                        </div>
                    </div>
                </div>
                <div class="review-card reveal delay-2">
                    <span class="captain-log-label">Diário de Bordo — Entrada #32</span>
                    <p class="review-text">Ambiente incrível e pizzas ainda melhores! A Bella é uma obra-prima — o presunto de Parma com mozzarella de búfala é perfeição. Voltaremos sempre!</p>
                    <div class="review-author">
                        <div class="review-avatar">A</div>
                        <div>
                            <div class="review-name">Ana R.</div>
                            <div class="review-stars">★★★★★</div>
                        </div>
                    </div>
                </div>
                <div class="review-card reveal delay-3">
                    <span class="captain-log-label">Diário de Bordo — Entrada #15</span>
                    <p class="review-text">20 anos de experiência notam-se em cada detalhe. A Diavola tem o nível de picante perfeito. Serviço simpático e preços honestos. Uma jóia da Figueira!</p>
                    <div class="review-author">
                        <div class="review-avatar">P</div>
                        <div>
                            <div class="review-name">Pedro L.</div>
                            <div class="review-stars">★★★★★</div>
                        </div>
                    </div>
                </div>
                <div class="review-card reveal delay-4">
                    <span class="captain-log-label">Diário de Bordo — Entrada #08</span>
                    <p class="review-text">Encomendámos pelo Glovo e chegou perfeita! Massa crocante mesmo depois da entrega. A Quattro Formaggi é viciante. Obrigatório na Figueira da Foz.</p>
                    <div class="review-author">
                        <div class="review-avatar">S</div>
                        <div>
                            <div class="review-name">Sofia M.</div>
                            <div class="review-stars">★★★★★</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-glow bg-glow-primary" style="width: 400px; height: 400px; top: 10%; left: -100px;"></div>
    </section>

    <!-- ANCHOR SEPARATOR -->
    <div class="anchor-separator">
        <div class="line"></div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a3 3 0 00-3 3c0 1.3.8 2.4 2 2.8V10H8v2h3v6.9A5 5 0 017 14H5a7 7 0 006 6.9V12h3v-2h-3V7.8A3 3 0 0012 2zm0 2a1 1 0 110 2 1 1 0 010-2z"/><path d="M19 14h-2a5 5 0 01-4 4.9V12"/></svg>
        <div class="line"></div>
    </div>

    <!-- LOCATION SECTION -->
    <section class="location" id="porto">
        <div class="container">
            <div class="section-header reveal">
                <h2>Porto de Ancoragem</h2>
                <p class="subtitle">Coordenadas para encontrar o nosso tesouro</p>
            </div>

            <div class="location-grid">
                <div class="location-map reveal-left">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8!2d-8.857!3d40.148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA4JzUyLjgiTiA4wrA1MScyNS4yIlc!5e0!3m2!1spt-PT!2spt!4v1"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Localização da Zeff Pizza">
                    </iframe>
                </div>
                <div class="location-info reveal-right">
                    <div class="location-card">
                        <h3>&#9875; Coordenadas</h3>
                        <div class="info-row">
                            <div class="info-icon">
                                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div class="info-text">
                                <div class="info-label">Morada</div>
                                <div class="info-value">R. Poeta Acácio Antunes 1/A<br>3080-158, Figueira da Foz</div>
                            </div>
                        </div>
                        <div class="info-row">
                            <div class="info-icon">
                                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                            </div>
                            <div class="info-text">
                                <div class="info-label">Telefone</div>
                                <div class="info-value"><a href="tel:233096420" style="color: var(--primary);">233 096 420</a></div>
                            </div>
                        </div>
                    </div>

                    <div class="location-card">
                        <h3>&#9200; Horário de Navegação</h3>
                        <div class="hours-grid">
                            <div class="hour-block">
                                <div class="hour-label">Almoço</div>
                                <div class="hour-time">12:00 — 15:00</div>
                            </div>
                            <div class="hour-block">
                                <div class="hour-label">Jantar</div>
                                <div class="hour-time">19:00 — 22:30</div>
                            </div>
                        </div>
                    </div>

                    <div class="delivery-banner">
                        <h3>Entregas pelo Glovo</h3>
                        <p>99% de satisfação — o tesouro chega à tua porta!</p>
                        <a href="https://glovoapp.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="border-color: #fff; color: #fff; font-size: 0.9rem;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            Encomendar Agora
                        </a>
                    </div>

                    <div class="compass-container">
                        <svg class="compass-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="45" stroke="#C9973E" stroke-width="1.5" opacity="0.3"/>
                            <circle cx="50" cy="50" r="38" stroke="#C9973E" stroke-width="0.5" opacity="0.2"/>
                            <polygon points="50,8 54,45 50,40 46,45" fill="#D4652A"/>
                            <polygon points="50,92 54,55 50,60 46,55" fill="#C9973E" opacity="0.5"/>
                            <polygon points="8,50 45,46 40,50 45,54" fill="#C9973E" opacity="0.5"/>
                            <polygon points="92,50 55,46 60,50 55,54" fill="#C9973E" opacity="0.5"/>
                            <circle cx="50" cy="50" r="4" fill="#C9973E"/>
                            <text x="50" y="5" text-anchor="middle" font-size="6" fill="#C9973E" font-family="Pirata One">N</text>
                            <text x="50" y="100" text-anchor="middle" font-size="6" fill="#C9973E" font-family="Pirata One">S</text>
                            <text x="2" y="52" text-anchor="middle" font-size="6" fill="#C9973E" font-family="Pirata One">O</text>
                            <text x="98" y="52" text-anchor="middle" font-size="6" fill="#C9973E" font-family="Pirata One">L</text>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-left">
                ZEFF PIZZA
            </div>
            <div class="footer-center">
                <a href="https://glovoapp.com" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="font-size: 0.85rem; padding: 0.6rem 1.5rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Encomendar no Glovo
                </a>
            </div>
            <div class="footer-right">
                <div class="footer-copyright">&copy; 2025 Zeff Pizza — Todos os mares reservados.</div>
                <div class="footer-tagline">Pizzas deliciosas servidas por piratas simpáticos!</div>
                <div class="footer-contact">
                    Rua Poeta Acácio Antunes 1/A, Figueira da Foz<br>
                    <a href="tel:233096420">233 096 420</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- ===== JAVASCRIPT ===== -->
    ` }} />
    </>
  );
}
