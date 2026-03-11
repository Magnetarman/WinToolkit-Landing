import type { ReactNode } from "react";

interface FooterLinkProps {
  href: string;
  icon: ReactNode;
  text: string;
  ariaLabel?: string;
}

export function FooterLink({ href, icon, text, ariaLabel }: FooterLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className="flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-all duration-300 group min-h-[44px] px-2 sm:px-0 rounded-lg sm:rounded-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505]"
    >
      <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-md">
        {icon}
      </div>
      <span className="font-medium tracking-wide text-sm sm:text-base">
        {text}
      </span>
    </a>
  );
}
