import { motion } from "motion/react";
import { Users, MessageCircle, Star, Youtube } from "lucide-react";

export function CommunitySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16"
    >
      {/* Card container with VersionTabs style */}
      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] shadow-2xl shadow-black/40 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Title section */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-0 p-4 sm:p-6 md:p-8 pb-0">
          <div className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <Users className="text-slate-300" size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Partecipa al progetto
          </h2>
        </div>

        <div className="p-4 sm:p-6 md:p-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <a
              href="https://t.me/GlitchTalkGroup"
              target="_blank"
              rel="noreferrer"
              aria-label="Gruppo di discussione Telegram (apre in una nuova finestra)"
              className="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 shadow-2xl border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 group min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              <div className="p-3 sm:p-4 bg-blue-500/20 rounded-2xl border border-blue-500/30 mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-blue-500/30 group-hover:border-blue-500/40 transition-all duration-500 backdrop-blur-md">
                <MessageCircle
                  className="text-blue-400 group-hover:text-blue-300 transition-colors"
                  size={28}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Gruppo di Discussione
              </h3>
              <p className="text-slate-400 text-sm">
                Unisciti alla community su Telegram per supporto e feedback.
              </p>
            </a>

            <a
              href="https://github.com/Magnetarman/WinToolkit"
              target="_blank"
              rel="noreferrer"
              aria-label="Repository GitHub (apre in una nuova finestra)"
              className="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 shadow-2xl border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(250,204,21,0.1)] transition-all duration-500 group min-h-[44px] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              <div className="p-3 sm:p-4 bg-yellow-500/20 rounded-2xl border border-yellow-500/30 mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-yellow-500/30 group-hover:border-yellow-500/40 transition-all duration-500 backdrop-blur-md">
                <Star
                  className="text-yellow-400 group-hover:text-yellow-300 transition-colors"
                  size={28}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Dona una Stella
              </h3>
              <p className="text-slate-400 text-sm">
                Supporta il progetto su GitHub per renderlo più visibile.
              </p>
            </a>

            <a
              href="https://www.youtube.com/@magnetarman?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              aria-label="Canale YouTube (apre in una nuova finestra)"
              className="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 shadow-2xl border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(239,68,68,0.1)] transition-all duration-500 group min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              <div className="p-3 sm:p-4 bg-red-500/20 rounded-2xl border border-red-500/30 mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-red-500/30 group-hover:border-red-500/40 transition-all duration-500 backdrop-blur-md">
                <Youtube
                  className="text-red-400 group-hover:text-red-300 transition-colors"
                  size={28}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Iscriviti al Canale
              </h3>
              <p className="text-slate-400 text-sm">
                Rimani aggiornato con i video tutorial e le live.
              </p>
            </a>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-6 sm:mb-8" />

        {/* RepoStars embed */}
        <div className="px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-20">
          <a
            href="https://repostars.dev/?repos=Magnetarman%2FWinToolkit&theme=dark"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center hover:opacity-90 transition-opacity"
          >
            <img
              src="https://repostars.dev/api/embed?repo=Magnetarman%2FWinToolkit&theme=dark"
              alt="Grafico della cronologia delle stelle GitHub - Andamento delle stelle del progetto WinToolkit nel tempo"
              loading="lazy"
              decoding="async"
              width={800}
              height={300}
              className="w-full max-w-3xl h-auto rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-3 sm:p-5"
            />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
