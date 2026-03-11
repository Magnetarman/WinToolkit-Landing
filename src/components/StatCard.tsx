import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  loading: boolean;
  glowColor: string;
  borderColor?: string;
  href?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  loading,
  glowColor,
  borderColor = "border-white/10",
  href,
}: StatCardProps) {
  const CardContent = (
    <div
      className={`bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 shadow-2xl border ${borderColor} flex flex-col hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 group relative overflow-hidden h-full`}
    >
      <div
        className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-pulse"
        style={{ boxShadow: `inset 0 0 60px -20px ${glowColor}` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h4 className="text-slate-400 font-medium tracking-wide text-sm sm:text-base">
            {title}
          </h4>
          <div className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
            {icon}
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight drop-shadow-md">
          {loading ? (
            <div className="h-8 sm:h-10 w-24 sm:w-32 bg-white/10 animate-pulse rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ) : (
            value
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-auto font-light">
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block h-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#050505] rounded-3xl"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
