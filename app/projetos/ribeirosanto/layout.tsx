"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ribeirosanto.css";

/* ────────────────────────────────────────────
   Metadata is exported from a separate head or
   handled via generateMetadata in a server file.
   For client layout we set <title> via useEffect.
   ──────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Início", href: "/projetos/ribeirosanto" },
  { label: "Vinhos", href: "/projetos/ribeirosanto/vinhos" },
  { label: "Quinta", href: "/projetos/ribeirosanto/quinta" },
  { label: "Enólogo", href: "/projetos/ribeirosanto/enologo" },
  { label: "Enoturismo", href: "/projetos/ribeirosanto/enoturismo" },
  { label: "Prémios", href: "/projetos/ribeirosanto/premios" },
  { label: "Contacto", href: "/projetos/ribeirosanto/contacto" },
];

const FOOTER_LINKS = [
  {
    title: "Explorar",
    links: [
      { label: "Vinhos", href: "/projetos/ribeirosanto/vinhos" },
      { label: "A Quinta", href: "/projetos/ribeirosanto/quinta" },
      { label: "Enoturismo", href: "/projetos/ribeirosanto/enoturismo" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "O Enólogo", href: "/projetos/ribeirosanto/enologo" },
      { label: "Prémios", href: "/projetos/ribeirosanto/premios" },
      { label: "Contacto", href: "/projetos/ribeirosanto/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos e Condições", href: "#" },
      { label: "Livro de Reclamações", href: "#" },
    ],
  },
];

export default function RibeiroSantoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Pages with light/cream backgrounds need dark nav text */
  const LIGHT_PAGES = ["/projetos/ribeirosanto/contacto"];
  const isLightPage = LIGHT_PAGES.some((p) => pathname === p || pathname.startsWith(p + "/"));

  /* ── Scroll listener ──────────────────────── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 48);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Close mobile menu on route change ────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when mobile menu open ─ */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/projetos/ribeirosanto") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="rs-root">
      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <motion.header
        className={`rs-nav ${scrolled ? "rs-nav--scrolled" : ""} ${isLightPage ? "rs-nav--light" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="rs-nav__inner">
          {/* Logo */}
          <Link href="/projetos/ribeirosanto" className="rs-nav__logo">
            <span className="rs-nav__logo-accent">Ribeiro</span>{" "}
            <span className="rs-nav__logo-light">Santo</span>
          </Link>

          {/* Desktop links */}
          <nav className="rs-nav__links" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rs-nav__link ${
                  isActive(link.href) ? "rs-nav__link--active" : ""
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    className="rs-nav__link-underline"
                    layoutId="rs-active-link"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className={`rs-nav__hamburger ${
              mobileOpen ? "rs-nav__hamburger--open" : ""
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* ═══════════════ MOBILE MENU ══════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="rs-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.nav
              className="rs-mobile-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              aria-label="Menu móvel"
            >
              <div className="rs-mobile-panel__header">
                <span className="rs-nav__logo">
                  <span className="rs-nav__logo-accent">Ribeiro</span>{" "}
                  <span className="rs-nav__logo-light">Santo</span>
                </span>
              </div>

              <div className="rs-mobile-panel__links">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`rs-mobile-panel__link ${
                        isActive(link.href)
                          ? "rs-mobile-panel__link--active"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="rs-mobile-panel__footer">
                <p className="rs-mobile-panel__tagline">
                  Vinhos do Dão desde 1940
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN CONTENT ═════════════ */}
      <main className="rs-main">{children}</main>

      {/* ═══════════════ FOOTER ═══════════════════ */}
      <footer className="rs-footer">
        {/* Decorative divider */}
        <div className="rs-divider" aria-hidden="true">
          <span className="rs-divider__vine" />
          <span className="rs-divider__grape">&#127815;</span>
          <span className="rs-divider__vine" />
        </div>

        <div className="rs-footer__inner">
          {/* Brand column */}
          <div className="rs-footer__brand">
            <h2 className="rs-footer__title">
              <span className="rs-nav__logo-accent">Ribeiro</span>{" "}
              <span className="rs-nav__logo-light">Santo</span>
            </h2>
            <p className="rs-footer__location">
              Carregal do Sal, Região do Dão
            </p>
            <p className="rs-footer__subtitle">
              Vinhos de terroir, feitos com respeito pela tradição e pela terra.
            </p>

            {/* Social icons placeholder */}
            <div className="rs-footer__social">
              {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="rs-footer__social-icon"
                  aria-label={name}
                  title={name}
                >
                  <span>{name.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="rs-footer__col">
              <h3 className="rs-footer__col-title">{col.title}</h3>
              <ul className="rs-footer__col-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="rs-footer__col-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="rs-footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Magnum &mdash; Carlos Lucas
            Vinhos, Lda. Todos os direitos reservados.
          </p>
          <p className="rs-footer__legal">
            Beba com moderação. Venda proibida a menores de 18 anos.
          </p>
        </div>
      </footer>
    </div>
  );
}
