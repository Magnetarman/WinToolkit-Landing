import { Github, Send } from "lucide-react";
import { FooterLink } from "./FooterLink";

export function Footer() {
  return (
    <footer
      className="bg-black/40 backdrop-blur-3xl border-t border-white/10 pt-12 sm:pt-16 pb-6 sm:pb-8 mt-8 sm:mt-12 rounded-t-[3rem] px-4 sm:px-6 relative overflow-hidden"
      role="contentinfo"
      aria-label="Informazioni footer WinToolkit"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 relative z-10 mb-8 sm:mb-12">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner shadow-white/5 border border-white/10 backdrop-blur-md overflow-hidden p-1.5">
            <img
              src="/wintoolkit/WinToolkit-icon.png"
              alt="WinToolkit Logo - Tool PowerShell per Windows"
              className="w-full h-full object-contain"
              width={56}
              height={56}
              decoding="async"
            />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-white block tracking-wide">
              WinToolkit
            </span>
            <span className="text-sm text-slate-400 font-light">
              Sopravvivi a Windows, con stile
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap justify-center">
          <FooterLink
            href="https://github.com/Magnetarman/WinToolkit"
            icon={<Github size={18} />}
            text="GitHub Repo"
            ariaLabel="Visita la repository GitHub di WinToolkit"
          />
          <FooterLink
            href="https://t.me/MagnetarManFeed"
            icon={<Send size={18} />}
            text="Feed Telegram"
            ariaLabel="Segui il feed Telegram di WinToolkit"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center border-t border-white/10 pt-6 sm:pt-8 relative z-10">
        <p className="text-slate-500 text-sm">
          WinToolkit Landing Page V 1.3.0 - Designed By{" "}
          <a
            href="https://magnetarman.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Sito web di Magnetarman (apre in una nuova finestra)"
            className="text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505] rounded px-1"
          >
            Magnetarman
          </a>{" "}
          | Coded by Gemini
        </p>
      </div>
    </footer>
  );
}
