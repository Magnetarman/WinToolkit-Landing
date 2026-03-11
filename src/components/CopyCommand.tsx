import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import type { CommandColor } from "../types";

interface CopyCommandProps {
  command: string;
  color: CommandColor;
}

export function CopyCommand({ command, color }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  const colorClasses =
    color === "cyan"
      ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-200"
      : color === "red"
        ? "bg-red-950/30 border-red-500/30 text-red-200"
        : color === "violet"
          ? "bg-violet-950/30 border-violet-500/30 text-violet-200"
          : "bg-fuchsia-950/30 border-fuchsia-500/30 text-fuchsia-200";

  const buttonClasses =
    color === "cyan"
      ? "bg-cyan-600 hover:bg-cyan-500 text-white"
      : color === "red"
        ? "bg-red-600 hover:bg-red-500 text-white"
        : color === "violet"
          ? "bg-violet-600 hover:bg-violet-500 text-white"
          : "bg-fuchsia-600 hover:bg-fuchsia-500 text-white";

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between p-3 sm:p-4 md:p-1.5 md:pl-4 rounded-xl md:rounded-xl border backdrop-blur-md transition-all duration-300 gap-3 md:gap-0 ${colorClasses}`}
    >
      <code className="font-mono text-xs sm:text-sm break-all md:truncate w-full md:w-auto text-center md:text-left">
        {command}
      </code>
      <button
        onClick={handleCopy}
        aria-label={copied ? "Comando copiato" : "Copia comando negli appunti"}
        className={`w-full md:w-auto px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] ${color === "cyan" ? "focus:ring-cyan-500" : color === "red" ? "focus:ring-red-500" : color === "violet" ? "focus:ring-violet-500" : "focus:ring-fuchsia-500"} ${buttonClasses}`}
      >
        {copied ? (
          <>
            <Check size={16} />{" "}
            <span className="hidden sm:inline">Copiato</span>
          </>
        ) : (
          <>
            <Copy size={16} /> <span className="hidden sm:inline">Copia</span>
          </>
        )}
      </button>
    </div>
  );
}
