import { motion } from "motion/react";
import {
  CheckCircle,
  AlertTriangle,
  GitPullRequest,
  Star,
  BarChart3,
} from "lucide-react";
import { StatCard } from "./StatCard";
import type { RepoData } from "../types";

interface StatsGridProps {
  data: RepoData;
}

export function StatsGrid({ data }: StatsGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16"
    >
      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/40 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <BarChart3 className="text-slate-300" size={20} />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
            Statistiche Live
          </h3>
        </div>

        {/* Error state display */}
        {data.error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">
              Impossibile caricare le statistiche. I dati potrebbero non essere
              aggiornati.
            </p>
          </div>
        )}

        {/* Row 1: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <StatCard
            title="Versione Stabile"
            value={data.mainVersion}
            description="Ultima release stabile"
            icon={<CheckCircle className="text-cyan-400" size={20} />}
            loading={data.loading}
            glowColor="rgba(6,182,212,0.15)"
            borderColor="border-cyan-500/30"
          />
          <StatCard
            title="Versione DEV"
            value={data.devVersion}
            description="Ultima build di sviluppo"
            icon={<AlertTriangle className="text-red-400" size={20} />}
            loading={data.loading}
            glowColor="rgba(239,68,68,0.15)"
            borderColor="border-red-500/30"
          />
        </div>

        {/* Row 2: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="Issue Aperte"
            value={data.openIssues}
            description="Segnalazioni e bug aperti"
            icon={<AlertTriangle className="text-amber-400" size={20} />}
            loading={data.loading}
            glowColor="rgba(251,191,36,0.15)"
            href="https://github.com/Magnetarman/WinToolkit/issues"
          />
          <StatCard
            title="Pull Requests"
            value={data.pullRequests}
            description="Contributi in attesa"
            icon={<GitPullRequest className="text-emerald-400" size={20} />}
            loading={data.loading}
            glowColor="rgba(52,211,153,0.15)"
            href="https://github.com/Magnetarman/WinToolkit/pulls"
          />
          <StatCard
            title="Stelle su GitHub"
            value={data.stars}
            description="Apprezzamenti community"
            icon={<Star className="text-yellow-400" size={20} />}
            loading={data.loading}
            glowColor="rgba(250,204,21,0.15)"
            href="https://github.com/Magnetarman/WinToolkit/stargazers"
          />
        </div>
      </div>
    </motion.section>
  );
}
