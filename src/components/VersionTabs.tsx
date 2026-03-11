import { useState } from "react";
import { CheckCircle, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { CopyCommand } from "./CopyCommand";
import type { VersionTab } from "../types";

export function VersionTabs() {
  const [activeVersionTab, setActiveVersionTab] =
    useState<VersionTab>("stable");

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16"
    >
      {/* Versione Stabile / Dev — tabbed container */}
      <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/40 border border-white/10 relative overflow-hidden mb-12 sm:mb-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Tab bar - Improved responsive layout */}
        <div className="flex flex-col sm:flex-row border-b border-white/10">
          <button
            onClick={() => setActiveVersionTab("stable")}
            aria-label="Visualizza versione stabile"
            aria-pressed={activeVersionTab === "stable"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 md:py-5 text-sm font-semibold tracking-wide transition-all duration-300 relative min-h-[44px] ${
              activeVersionTab === "stable"
                ? "text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <div
              className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
                activeVersionTab === "stable"
                  ? "bg-cyan-500/20 border-cyan-500/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <CheckCircle
                className={
                  activeVersionTab === "stable"
                    ? "text-cyan-300"
                    : "text-slate-500"
                }
                size={16}
              />
            </div>
            <span className="hidden sm:inline">Versione Stabile</span>
            <span className="sm:hidden">Stabile</span>
            {activeVersionTab === "stable" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            )}
          </button>

          <button
            onClick={() => setActiveVersionTab("dev")}
            aria-label="Visualizza versione di sviluppo"
            aria-pressed={activeVersionTab === "dev"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 md:py-5 text-sm font-semibold tracking-wide transition-all duration-300 relative min-h-[44px] ${
              activeVersionTab === "dev"
                ? "text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <div
              className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
                activeVersionTab === "dev"
                  ? "bg-red-500/20 border-red-500/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <AlertTriangle
                className={
                  activeVersionTab === "dev" ? "text-red-300" : "text-slate-500"
                }
                size={16}
              />
            </div>
            <span className="hidden sm:inline">Versione Dev</span>
            <span className="sm:hidden">Dev</span>
            {activeVersionTab === "dev" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            )}
            <span className="px-1.5 sm:px-2 py-0.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded-full uppercase tracking-wider border border-red-500/30">
              Warning
            </span>
          </button>

          <button
            onClick={() => setActiveVersionTab("gui")}
            aria-label="Visualizza versione GUI"
            aria-pressed={activeVersionTab === "gui"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 md:py-5 text-sm font-semibold tracking-wide transition-all duration-300 relative min-h-[44px] ${
              activeVersionTab === "gui"
                ? "text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <div
              className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
                activeVersionTab === "gui"
                  ? "bg-violet-500/20 border-violet-500/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <Sparkles
                className={
                  activeVersionTab === "gui"
                    ? "text-violet-300"
                    : "text-slate-500"
                }
                size={16}
              />
            </div>
            <span className="hidden sm:inline">Versione GUI</span>
            <span className="sm:hidden">GUI</span>
            {activeVersionTab === "gui" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            )}
            <span className="px-1.5 sm:px-2 py-0.5 bg-violet-500/20 text-violet-300 text-[10px] font-bold rounded-full uppercase tracking-wider border border-violet-500/30">
              ALPHA
            </span>
          </button>
        </div>

        {/* Tab panels */}
        <div className="relative overflow-hidden">
          {/* Stable panel */}
          {activeVersionTab === "stable" && (
            <div className="p-4 sm:p-6 md:p-8 relative">
              <div className="absolute -top-20 -right-20 p-6 opacity-10 blur-sm pointer-events-none">
                <CheckCircle size={250} className="text-cyan-400" />
              </div>
              <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                  <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30">
                    <CheckCircle className="text-cyan-300" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Versione Stabile
                  </h3>
                </div>
                <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-lg font-light">
                  La versione stabile e testata. Consigliata per l'uso
                  quotidiano e per tutti gli utenti che cercano affidabilità.
                </p>
                <div className="mb-4 sm:mb-6">
                  <p className="text-slate-300 font-medium mb-1 text-sm">
                    1. Avvia PowerShell come amministratore
                  </p>
                  <p className="text-slate-300 font-medium text-sm">
                    2. Incolla il comando:
                  </p>
                </div>
                <CopyCommand
                  command="irm https://magnetarman.com/winstart | iex"
                  color="cyan"
                />
              </div>
            </div>
          )}

          {/* Dev panel */}
          {activeVersionTab === "dev" && (
            <div className="p-4 sm:p-6 md:p-8 relative">
              <div className="absolute -top-20 -right-20 p-6 opacity-10 blur-sm pointer-events-none">
                <AlertTriangle size={250} className="text-red-400" />
              </div>
              <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                  <div className="p-2 sm:p-3 bg-red-500/20 rounded-2xl border border-red-500/30">
                    <AlertTriangle className="text-red-300" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Versione Dev
                  </h3>
                  <span className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-full uppercase tracking-wider border border-red-500/30 backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                    Warning
                  </span>
                </div>
                <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-lg font-light">
                  <strong className="text-red-400 font-medium">
                    Versione sperimentale.
                  </strong>{" "}
                  Potenziali bug critici, instabilità. Uso a proprio rischio per
                  test e sviluppo.
                </p>
                <div className="mb-4 sm:mb-6">
                  <p className="text-slate-300 font-medium mb-1 text-sm">
                    1. Avvia PowerShell come amministratore
                  </p>
                  <p className="text-slate-300 font-medium text-sm">
                    2. Incolla il comando:
                  </p>
                </div>
                <CopyCommand
                  command="irm https://magnetarman.com/winstart-dev | iex"
                  color="red"
                />
              </div>
            </div>
          )}

          {/* GUI panel */}
          {activeVersionTab === "gui" && (
            <div className="p-4 sm:p-6 md:p-8 relative">
              <div className="absolute -top-20 -right-20 p-6 opacity-10 blur-sm pointer-events-none">
                <Sparkles size={250} className="text-violet-400" />
              </div>
              <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                  <div className="p-2 sm:p-3 bg-violet-500/20 rounded-2xl border border-violet-500/30">
                    <Sparkles className="text-violet-300" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Versione GUI
                  </h3>
                  <span className="px-2 sm:px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full uppercase tracking-wider border border-violet-500/30 backdrop-blur-md shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                    ALPHA
                  </span>
                </div>
                <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-lg font-light">
                  <strong className="text-violet-400 font-medium">
                    Versione ALPHA.
                  </strong>{" "}
                  Potenziali bug critici, instabilità, funzionalità incomplete.
                  Uso a proprio rischio per test e feedback.
                </p>
                <div className="mb-4 sm:mb-6">
                  <p className="text-slate-300 font-medium mb-1 text-sm">
                    1. Avvia PowerShell come amministratore
                  </p>
                  <p className="text-slate-300 font-medium text-sm">
                    2. Incolla il comando:
                  </p>
                </div>
                <CopyCommand
                  command="irm https://magnetarman.com/Wintoolkit-gui | iex"
                  color="violet"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
