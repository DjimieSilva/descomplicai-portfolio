"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DocumentationContent } from "./_documentation-content";
import { ExperienceContent } from "./_experience/experience-content";

type Tab = "experience" | "docs";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  return (
    <main className="relative min-h-screen bg-[#fafaf9]">
      {/* ─── Sticky Tab Navigation ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/projetos"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/" className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              descomplicai
            </Link>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80">
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Experiencia
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "docs"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Documentacao
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-400">
            <span className="font-mono text-xs">v3.0</span>
          </div>
        </div>
      </nav>

      {/* ─── Tab Content ─── */}
      <div className="pt-14">
        {activeTab === "experience" ? <ExperienceContent /> : <DocumentationContent />}
      </div>
    </main>
  );
}
