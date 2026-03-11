import { motion } from "motion/react";
import {
  GitBranch,
  GitCommit,
  Users,
  GitPullRequest,
  CircleDot,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useOnlineGitHubData } from "../hooks/useGitHubData";

type BranchTab = "main" | "dev";

export function RepositoryStatus() {
  const [activeBranch, setActiveBranch] = useState<BranchTab>("main");
  const { data, loading, error } = useOnlineGitHubData();

  const branchData =
    activeBranch === "main" && data?.mainCommits
      ? data.mainCommits
      : activeBranch === "dev" && data?.devCommits
        ? data.devCommits
        : null;
  const branchLabel = activeBranch === "main" ? "Main" : "Dev";

  // Get last 24 weeks for the chart
  const weeklyData = branchData?.weekly?.slice(-24) || [];

  if (error) {
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
              <GitBranch className="text-slate-300" size={20} />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
              Stato Repository
            </h3>
          </div>

          <div className="text-center py-12 sm:py-16">
            <div className="text-slate-400 mb-4">
              <AlertTriangle size={48} />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Errore nel caricamento
            </h4>
            <p className="text-slate-500 text-sm">
              Impossibile recuperare i dati dal server. Riprova più tardi.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

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

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <GitBranch className="text-slate-300" size={20} />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
            Stato Repository
          </h3>
        </div>

        {/* Branch Tabs */}
        <div className="flex flex-col sm:flex-row border-b border-white/10 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveBranch("main")}
            aria-label="Visualizza statistiche ramo Main"
            aria-pressed={activeBranch === "main"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold tracking-wide transition-all duration-300 relative min-h-[44px] ${
              activeBranch === "main"
                ? "text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <div
              className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
                activeBranch === "main"
                  ? "bg-cyan-500/20 border-cyan-500/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <CheckCircle
                className={
                  activeBranch === "main" ? "text-cyan-300" : "text-slate-500"
                }
                size={16}
              />
            </div>
            <span>Ramo Main</span>
            {activeBranch === "main" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            )}
          </button>

          <button
            onClick={() => setActiveBranch("dev")}
            aria-label="Visualizza statistiche ramo Dev"
            aria-pressed={activeBranch === "dev"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold tracking-wide transition-all duration-300 relative min-h-[44px] ${
              activeBranch === "dev"
                ? "text-white"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <div
              className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${
                activeBranch === "dev"
                  ? "bg-red-500/20 border-red-500/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <AlertTriangle
                className={
                  activeBranch === "dev" ? "text-red-300" : "text-slate-500"
                }
                size={16}
              />
            </div>
            <span>Ramo Dev</span>
            {activeBranch === "dev" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            )}
          </button>
        </div>

        {/* Branch Stats */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-8">
          {/* Total Commits Card */}
          <div
            className={`bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 shadow-2xl border ${
              activeBranch === "main"
                ? "border-cyan-500/30"
                : "border-red-500/30"
            } flex flex-col sm:flex-row items-center justify-between relative overflow-hidden`}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                boxShadow: `inset 0 0 60px -20px ${
                  activeBranch === "main"
                    ? "rgba(6,182,212,0.3)"
                    : "rgba(239,68,68,0.3)"
                }`,
              }}
            />
            <div className="relative z-10 flex w-full items-center justify-between">
              <div>
                <h4 className="text-slate-400 font-medium tracking-wide text-sm sm:mb-2">
                  Commit Totali
                </h4>
                <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {loading ? (
                    <div className="h-8 sm:h-12 w-24 sm:w-32 bg-white/10 animate-pulse rounded-xl overflow-hidden relative">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                  ) : (
                    branchData?.total || 0
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
                  Totale commit sul ramo {branchLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Commit Frequency Card */}
          <div
            className={`bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-8 shadow-2xl border ${
              activeBranch === "main"
                ? "border-cyan-500/30"
                : "border-red-500/30"
            } flex flex-col relative overflow-hidden w-full`}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                boxShadow: `inset 0 0 60px -20px ${
                  activeBranch === "main"
                    ? "rgba(6,182,212,0.3)"
                    : "rgba(239,68,68,0.3)"
                }`,
              }}
            />
            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-slate-300 font-bold tracking-wide text-lg">
                    Andamento Sviluppo
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
                    Frequenza commit delle ultime 24 settimane
                  </p>
                </div>
                <div
                  className={`p-2 sm:p-3 rounded-2xl border ${
                    activeBranch === "main"
                      ? "bg-cyan-500/20 border-cyan-500/40"
                      : "bg-red-500/20 border-red-500/40"
                  } backdrop-blur-md flex-shrink-0`}
                >
                  <GitCommit
                    className={
                      activeBranch === "main" ? "text-cyan-300" : "text-red-300"
                    }
                    size={20}
                  />
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="relative h-40 sm:h-56 mt-4 pt-4">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-6 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-white/5" />
                  ))}
                </div>

                <div className="h-full flex items-end justify-between gap-1 sm:gap-3 pb-6 relative z-10">
                  {weeklyData.length > 0 ? (
                    weeklyData.map((week, index) => {
                      const maxCount = Math.max(
                        ...weeklyData.map((w) => w.count),
                        1,
                      );
                      const height =
                        week.count === 0 ? 0 : (week.count / maxCount) * 100;

                      return (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center justify-end h-full group relative"
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-20 pointer-events-none shadow-lg border border-white/10">
                            {week.count} commit
                            <br />
                            <span className="text-slate-400 text-[10px]">
                              {week.date}
                            </span>
                          </div>

                          {/* Minimal bar representation */}
                          <div className="w-full h-full flex items-end justify-center relative">
                            {week.count > 0 ? (
                              <div
                                className={`w-full sm:w-4/5 rounded-t-md transition-all duration-700 ease-out ${
                                  activeBranch === "main"
                                    ? "bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                    : "bg-gradient-to-t from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                }`}
                                style={{ height: `${Math.max(height, 5)}%` }}
                              />
                            ) : (
                              <div className="w-full sm:w-4/5 h-[2px] bg-white/10 rounded-full" />
                            )}
                          </div>

                          {/* Month labels (roughly every 4 weeks) */}
                          {index % 4 === 0 && (
                            <span className="absolute -bottom-6 text-[9px] sm:text-[10px] text-slate-500 font-medium tracking-wider">
                              {new Date(week.date).toLocaleDateString("it-IT", {
                                month: "short",
                              })}
                            </span>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                      {loading ? (
                        <div className="flex gap-2 w-full justify-between items-end pb-6">
                          {[...Array(24)].map((_, i) => (
                            <div
                              key={i}
                              className="w-full bg-white/5 animate-pulse rounded-t-md"
                              style={{ height: `${Math.random() * 80 + 10}%` }}
                            />
                          ))}
                        </div>
                      ) : (
                        "Nessun dato disponibile"
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
              <Users className="text-slate-300" size={20} />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Contributori
            </h4>
          </div>

          {data?.contributors && data.contributors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {data.contributors.map((contributor) => (
                <a
                  key={contributor.login}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 group"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={`Avatar del contributore ${contributor.login} su GitHub`}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/20 mb-2 sm:mb-3 group-hover:border-cyan-500/50 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                  />
                  <span className="text-white font-medium text-xs sm:text-sm truncate w-full">
                    {contributor.login}
                  </span>
                  <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-xs">
                    <span className="flex items-center gap-1 text-slate-400">
                      <GitCommit size={10} />
                      {contributor.contributions}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <GitPullRequest size={10} />
                      {contributor.prs}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <CircleDot size={10} />
                      {contributor.issues}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-slate-500">
              {loading ? (
                <div className="flex gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-24 bg-white/10 animate-pulse rounded-2xl"
                    />
                  ))}
                </div>
              ) : (
                <p>Nessun contributore trovato</p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
