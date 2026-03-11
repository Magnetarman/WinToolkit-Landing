import { Settings, Wifi, HardDrive, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { VersionCard } from "./VersionCard";

export function RequirementsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16"
    >
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
        <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 backdrop-blur-md">
          <Settings className="text-cyan-400" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
          Avvia WinToolkit
        </h2>
      </div>

      {/* Requirements Section */}
      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/40 border border-white/10 relative overflow-hidden mb-12 sm:mb-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Settings className="text-amber-300" size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
            Requisiti Minimi
          </h2>
        </div>

        <div className="grid md:grid-cols-1 gap-8 sm:gap-12">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              Prerequisiti
            </h3>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3 text-slate-300 bg-white/5 px-3 sm:px-4 py-2 rounded-xl border border-white/10 min-h-[44px]">
                <Wifi className="text-amber-400" size={18} />
                <span className="text-sm sm:text-base">
                  Connessione ad Internet
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-slate-300 bg-white/5 px-3 sm:px-4 py-2 rounded-xl border border-white/10 min-h-[44px]">
                <HardDrive className="text-amber-400" size={18} />
                <span className="text-sm sm:text-base">
                  Spazio libero su disco: {">"} 50 GB
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-slate-300 bg-white/5 px-3 sm:px-4 py-2 rounded-xl border border-white/10 min-h-[44px]">
                <Monitor className="text-amber-400" size={18} />
                <span className="text-sm sm:text-base">Windows {">"} 8.1</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              Versioni Supportate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <VersionCard windows="Windows 11 >= 22H2" supported="yes" />
              <VersionCard windows="Windows 10 >= 1809" supported="yes" />
              <VersionCard windows="Windows 11 <= 21H2" supported="partial" />
              <VersionCard windows="Windows 10 <= 1809" supported="partial" />
              <VersionCard windows="Windows 8.1" supported="partial" />
              <VersionCard windows="Windows 8 e inferiori" supported="no" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
