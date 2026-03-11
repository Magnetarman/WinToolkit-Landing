import type { VersionStatus } from "../types";

interface VersionCardProps {
  windows: string;
  supported: VersionStatus;
}

export function VersionCard({ windows, supported }: VersionCardProps) {
  const colors = {
    yes: {
      text: "text-emerald-400",
      bg: "bg-emerald-400",
      shadow: "rgba(52,211,153,0.8)",
    },
    partial: {
      text: "text-yellow-400",
      bg: "bg-yellow-400",
      shadow: "rgba(250,204,21,0.8)",
    },
    no: {
      text: "text-red-400",
      bg: "bg-red-400",
      shadow: "rgba(248,113,113,0.8)",
    },
  };
  const status = colors[supported];

  const label =
    supported === "yes"
      ? "Sì"
      : supported === "partial"
        ? "Parzialmente"
        : "No";

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 min-h-[44px]">
      <span className="text-slate-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
        {windows}
      </span>
      <span
        className={`flex items-center gap-2 ${status.text} font-bold text-sm sm:text-base`}
      >
        <div
          className={`w-3 h-3 rounded-full ${status.bg} shadow-[0_0_12px_${status.shadow}] animate-pulse`}
        />{" "}
        {label}
      </span>
    </div>
  );
}
