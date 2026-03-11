import { motion } from "motion/react";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-4 lg:pt-32 lg:pb-8 px-4 sm:px-6"
      role="banner"
      aria-label="WinToolkit - Tool PowerShell per Windows"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
          {/* Cyberpunk glowing icon container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/50 p-1.5 sm:p-2 transform hover:scale-105 transition-all duration-500 border border-cyan-500/30 relative group flex-shrink-0">
            {/* Neon glow effect */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/30 via-fuchsia-500/20 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/wintoolkit/WinToolkit-icon.png"
              alt="WinToolkit - Logo ufficiale del tool PowerShell per Windows"
              className="w-full h-full object-cover rounded-3xl bg-black/50 relative z-10"
              width={128}
              height={128}
              decoding="async"
            />
          </div>

          {/* Cyberpunk title with neon gradient */}
          <header>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 tracking-tight drop-shadow-lg">
              WinToolkit
            </h1>
          </header>
        </div>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 mb-4 leading-relaxed max-w-2xl mx-auto font-light">
          Il Tool Powershell definitivo per sopravvivere a Windows
        </p>
      </div>
    </motion.section>
  );
}
