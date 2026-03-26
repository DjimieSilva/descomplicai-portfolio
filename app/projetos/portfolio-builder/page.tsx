"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Template = "minimalista" | "moderno" | "criativo";

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  skills: string[];
  projects: Project[];
  accentColor: string;
  template: Template;
}

// ─── HTML Export ──────────────────────────────────────────────────────────────

function generateHTML(data: PortfolioData): string {
  const { name, title, bio, email, skills, projects, accentColor, template } =
    data;

  const skillsHTML = skills
    .map(
      (s) =>
        `<span style="display:inline-block;padding:4px 14px;border-radius:999px;background:${accentColor}22;color:${accentColor};font-size:14px;margin:4px 4px 4px 0;border:1px solid ${accentColor}44;">${s}</span>`
    )
    .join("");

  const projectsHTML = projects
    .map(
      (p) =>
        `<div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:16px;background:#fff;">
      <h3 style="margin:0 0 6px;font-size:18px;">${p.name}</h3>
      <p style="margin:0 0 10px;color:#6b7280;font-size:14px;">${p.description}</p>
      ${p.link ? `<a href="${p.link}" target="_blank" style="color:${accentColor};font-size:14px;text-decoration:none;">${p.link}</a>` : ""}
    </div>`
    )
    .join("");

  const styles: Record<Template, string> = {
    minimalista: `
      body { font-family: Georgia, serif; background: #fff; color: #111; margin: 0; }
      .header { border-bottom: 2px solid #111; padding: 40px; }
      .accent { display: block; width: 60px; height: 3px; background: ${accentColor}; margin-bottom: 12px; }
      .name { font-size: 48px; font-weight: 700; margin: 0 0 6px; letter-spacing: -1px; }
      .job-title { font-size: 18px; color: #555; margin: 0; font-style: italic; }
      .section { padding: 40px; border-bottom: 1px solid #e5e7eb; }
      .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: #999; margin: 0 0 20px; }
      a { color: ${accentColor}; }
    `,
    moderno: `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1e293b; margin: 0; }
      .header { background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%); padding: 60px 40px; color: #fff; }
      .accent { display: none; }
      .name { font-size: 48px; font-weight: 800; margin: 0 0 8px; }
      .job-title { font-size: 20px; opacity: 0.85; margin: 0; }
      .section { padding: 40px; background: #fff; margin: 16px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
      .section-title { font-size: 20px; font-weight: 700; color: ${accentColor}; margin: 0 0 20px; }
      a { color: ${accentColor}; }
    `,
    criativo: `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: ${accentColor}11; color: #1e293b; margin: 0; }
      .header { background: ${accentColor}; padding: 60px 40px; color: #fff; position: relative; overflow: hidden; }
      .header::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(255,255,255,.1); border-radius: 50%; }
      .accent { display: none; }
      .name { font-size: 52px; font-weight: 900; margin: 0 0 8px; }
      .job-title { font-size: 20px; opacity: 0.9; margin: 0; }
      .section { padding: 40px; margin: 20px; background: #fff; border-radius: 20px; border: 2px solid ${accentColor}22; }
      .section-title { font-size: 22px; font-weight: 800; margin: 0 0 20px; }
      a { color: ${accentColor}; }
    `,
  };

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Portfolio</title>
  <style>
    * { box-sizing: border-box; }
    ${styles[template]}
  </style>
</head>
<body>
  <div class="header">
    <span class="accent"></span>
    <h1 class="name">${name || "O teu nome"}</h1>
    <p class="job-title">${title || "O teu título"}</p>
  </div>
  ${bio ? `<div class="section"><p class="section-title">Sobre mim</p><p style="line-height:1.7;margin:0;">${bio}</p></div>` : ""}
  ${skills.length > 0 ? `<div class="section"><p class="section-title">Competências</p>${skillsHTML}</div>` : ""}
  ${projects.some((p) => p.name) ? `<div class="section"><p class="section-title">Projetos</p>${projectsHTML}</div>` : ""}
  ${email ? `<div class="section"><p class="section-title">Contacto</p><a href="mailto:${email}">${email}</a></div>` : ""}
</body>
</html>`;
}

// ─── Preview Component ────────────────────────────────────────────────────────

function PortfolioPreview({ data }: { data: PortfolioData }) {
  const { name, title, bio, email, skills, projects, accentColor, template } =
    data;

  const templateConfig = {
    minimalista: {
      wrapper: "bg-white text-gray-900 font-serif",
      header: "border-b-2 border-gray-900 p-6",
      nameClass: "text-3xl font-bold tracking-tight leading-none",
      titleClass: "text-sm text-gray-500 italic mt-1",
      accentBar: true,
      sectionClass: "p-6 border-b border-gray-100",
      sectionTitleClass:
        "text-xs uppercase tracking-widest text-gray-400 mb-3 font-sans",
      skillPill: `inline-block px-3 py-1 rounded-full text-xs mr-1 mb-1 border`,
      cardClass: "border border-gray-200 rounded p-3 mb-2",
    },
    moderno: {
      wrapper: "bg-slate-50 text-slate-800 font-sans",
      header: "p-8 text-white",
      nameClass: "text-3xl font-extrabold leading-none",
      titleClass: "text-sm opacity-85 mt-1",
      accentBar: false,
      sectionClass: "mx-3 mb-3 bg-white rounded-xl shadow-sm p-5",
      sectionTitleClass: "text-base font-bold mb-3",
      skillPill: `inline-block px-3 py-1 rounded-full text-xs mr-1 mb-1`,
      cardClass: "border border-slate-100 rounded-xl p-3 mb-2 bg-white",
    },
    criativo: {
      wrapper: "text-slate-800 font-sans",
      header: "p-8 text-white relative overflow-hidden",
      nameClass: "text-3xl font-black leading-none",
      titleClass: "text-sm opacity-90 mt-1",
      accentBar: false,
      sectionClass: "mx-3 mb-3 bg-white rounded-2xl p-5 border-2",
      sectionTitleClass: "text-base font-extrabold mb-3",
      skillPill: `inline-block px-3 py-1 rounded-full text-xs mr-1 mb-1`,
      cardClass: "rounded-xl p-3 mb-2",
    },
  };

  const cfg = templateConfig[template];

  const headerStyle =
    template === "minimalista"
      ? { borderColor: "#111" }
      : template === "moderno"
        ? { background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }
        : { background: accentColor };

  const wrapperBg =
    template === "criativo" ? `${accentColor}15` : undefined;

  const sectionBorderColor =
    template === "criativo" ? `${accentColor}30` : undefined;

  const cardBg =
    template === "criativo" ? `${accentColor}10` : undefined;

  return (
    <div
      className={`${cfg.wrapper} rounded-xl overflow-hidden shadow-inner text-sm`}
      style={{ background: wrapperBg, minHeight: 480 }}
    >
      {/* Header */}
      <div className={cfg.header} style={headerStyle}>
        {cfg.accentBar && (
          <div
            className="w-10 h-0.5 mb-3"
            style={{ background: accentColor }}
          />
        )}
        <div className={cfg.nameClass}>{name || "O teu nome"}</div>
        <div className={cfg.titleClass}>{title || "Título profissional"}</div>
      </div>

      {/* Bio */}
      {bio && (
        <div
          className={cfg.sectionClass}
          style={sectionBorderColor ? { borderColor: sectionBorderColor } : undefined}
        >
          <div
            className={cfg.sectionTitleClass}
            style={template !== "minimalista" ? { color: accentColor } : undefined}
          >
            {template === "criativo" ? "✦ Sobre mim" : "Sobre mim"}
          </div>
          <p className="leading-relaxed text-xs text-gray-600">{bio}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div
          className={cfg.sectionClass}
          style={sectionBorderColor ? { borderColor: sectionBorderColor } : undefined}
        >
          <div
            className={cfg.sectionTitleClass}
            style={template !== "minimalista" ? { color: accentColor } : undefined}
          >
            {template === "criativo" ? "⚡ Competências" : "Competências"}
          </div>
          <div>
            {skills.map((skill, i) => (
              <span
                key={i}
                className={cfg.skillPill}
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.name) && (
        <div
          className={cfg.sectionClass}
          style={sectionBorderColor ? { borderColor: sectionBorderColor } : undefined}
        >
          <div
            className={cfg.sectionTitleClass}
            style={template !== "minimalista" ? { color: accentColor } : undefined}
          >
            {template === "criativo" ? "🚀 Projetos" : "Projetos"}
          </div>
          {projects
            .filter((p) => p.name)
            .map((p) => (
              <div
                key={p.id}
                className={cfg.cardClass}
                style={
                  template === "criativo"
                    ? { background: cardBg, borderColor: `${accentColor}20` }
                    : undefined
                }
              >
                <div className="font-semibold text-xs">{p.name}</div>
                {p.description && (
                  <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {p.description}
                  </div>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    className="text-xs mt-1 block truncate"
                    style={{ color: accentColor }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.link}
                  </a>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Contact */}
      {email && (
        <div
          className={cfg.sectionClass}
          style={sectionBorderColor ? { borderColor: sectionBorderColor } : undefined}
        >
          <div
            className={cfg.sectionTitleClass}
            style={template !== "minimalista" ? { color: accentColor } : undefined}
          >
            {template === "criativo" ? "📬 Contacto" : "Contacto"}
          </div>
          <a href={`mailto:${email}`} className="text-xs" style={{ color: accentColor }}>
            {email}
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const EMPTY_PROJECT = (): Project => ({
  id: Math.random().toString(36).slice(2),
  name: "",
  description: "",
  link: "",
});

const TEMPLATES: { id: Template; label: string; desc: string }[] = [
  { id: "minimalista", label: "Minimalista", desc: "Preto/branco, serifas, elegante" },
  { id: "moderno", label: "Moderno", desc: "Gradientes, arredondado, limpo" },
  { id: "criativo", label: "Criativo", desc: "Colorido, expressivo, divertido" },
];

export default function PortfolioBuilderPage() {
  const [data, setData] = useState<PortfolioData>({
    name: "",
    title: "",
    bio: "",
    email: "",
    skills: [],
    projects: [EMPTY_PROJECT(), EMPTY_PROJECT(), EMPTY_PROJECT()],
    accentColor: "#3b82f6",
    template: "moderno",
  });

  const [skillInput, setSkillInput] = useState("");
  const [exported, setExported] = useState(false);
  const skillInputRef = useRef<HTMLInputElement>(null);

  const update = useCallback(
    <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || data.skills.length >= 8) return;
    update("skills", [...data.skills, s]);
    setSkillInput("");
    skillInputRef.current?.focus();
  };

  const removeSkill = (i: number) => {
    update(
      "skills",
      data.skills.filter((_, idx) => idx !== i)
    );
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = data.projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    update("projects", updated);
  };

  const handleExport = () => {
    const html = generateHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name ? data.name.replace(/\s+/g, "-").toLowerCase() : "portfolio"}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-8 md:px-12">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Cria o teu Portfolio 🎨
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Preenche os campos e vê o resultado em tempo real
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 px-6 py-8 md:px-12 max-w-screen-2xl mx-auto">
        {/* ── Form Panel ── */}
        <div className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 space-y-6">

          {/* Basic Info */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Informação básica
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Ex: Ana Silva"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título profissional
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Ex: Web Developer"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Ex: ana@exemplo.pt"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio{" "}
                  <span
                    className={`text-xs ${data.bio.length > 180 ? "text-red-400" : "text-gray-400"}`}
                  >
                    {data.bio.length}/200
                  </span>
                </label>
                <textarea
                  value={data.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) update("bio", e.target.value);
                  }}
                  placeholder="Uma breve descrição sobre ti e o teu trabalho..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Competências
            </h2>
            <div className="flex gap-2 mb-2">
              <input
                ref={skillInputRef}
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Ex: React, Design, Python…"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                disabled={!skillInput.trim() || data.skills.length >= 8}
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                + Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[28px]">
              <AnimatePresence>
                {data.skills.map((skill, i) => (
                  <motion.span
                    key={skill + i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(i)}
                      className="ml-0.5 text-blue-400 hover:text-blue-700 transition-colors leading-none"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
              {data.skills.length === 0 && (
                <span className="text-xs text-gray-300">Nenhuma competência adicionada</span>
              )}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Projetos
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, i) => (
                <div key={project.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                  <div className="text-xs font-semibold text-gray-400 mb-2">
                    Projeto {i + 1}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(i, "name", e.target.value)}
                      placeholder="Nome do projeto"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={project.description}
                      onChange={(e) => updateProject(i, "description", e.target.value)}
                      placeholder="Breve descrição"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(i, "link", e.target.value)}
                      placeholder="Link (opcional)"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Appearance */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Aparência
            </h2>
            <div className="space-y-4">
              {/* Color picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor de destaque
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={data.accentColor}
                    onChange={(e) => update("accentColor", e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {[
                      "#3b82f6",
                      "#8b5cf6",
                      "#ec4899",
                      "#10b981",
                      "#f59e0b",
                      "#ef4444",
                      "#06b6d4",
                      "#111827",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => update("accentColor", color)}
                        className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                        style={{
                          background: color,
                          borderColor:
                            data.accentColor === color ? "#fff" : "transparent",
                          boxShadow:
                            data.accentColor === color
                              ? `0 0 0 2px ${color}`
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Template selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => update("template", t.id)}
                      className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                        data.template === t.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`font-semibold text-xs mb-0.5 ${
                          data.template === t.id ? "text-blue-700" : "text-gray-800"
                        }`}
                      >
                        {t.label}
                      </div>
                      <div className="text-xs text-gray-400 leading-snug">
                        {t.desc}
                      </div>
                      {data.template === t.id && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Export button */}
          <div className="pb-4">
            <button
              onClick={handleExport}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all relative overflow-hidden"
              style={{ background: data.accentColor }}
            >
              <AnimatePresence mode="wait">
                {exported ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center justify-center gap-2"
                  >
                    ✓ HTML exportado!
                  </motion.span>
                ) : (
                  <motion.span
                    key="export"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center justify-center gap-2"
                  >
                    ↓ Exportar HTML
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Gera um ficheiro .html pronto a publicar
            </p>
          </div>
        </div>

        {/* ── Preview Panel ── */}
        <div className="flex-1 lg:sticky lg:top-8 lg:self-start">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Preview em tempo real
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
              style={{
                background: `${data.accentColor}20`,
                color: data.accentColor,
              }}
            >
              {data.template}
            </span>
          </div>

          {/* Scaled preview wrapper */}
          <div className="relative bg-gray-50 rounded-2xl p-4 border border-gray-100 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              <div className="ml-2 flex-1 bg-white rounded px-3 py-0.5 text-xs text-gray-300 border border-gray-100">
                {data.name
                  ? `${data.name.toLowerCase().replace(/\s/g, "")}.portfolio.pt`
                  : "o-teu-portfolio.pt"}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={data.template}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <PortfolioPreview data={data} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick tips */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { emoji: "⚡", text: "Preview instantâneo" },
              { emoji: "🎨", text: "3 templates únicos" },
              { emoji: "📄", text: "Exporta HTML puro" },
            ].map((tip) => (
              <div
                key={tip.text}
                className="text-center p-2.5 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="text-lg mb-0.5">{tip.emoji}</div>
                <div className="text-xs text-gray-500">{tip.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
