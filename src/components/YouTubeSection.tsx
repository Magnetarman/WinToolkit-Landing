import { motion } from "motion/react";
import { Youtube } from "lucide-react";

export function YouTubeSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16"
    >
      {/* Card container with VersionTabs style */}
      <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/40 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        {/* Title section */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-0 p-4 sm:p-6 md:p-8 pb-0">
          <div className="p-2 sm:p-3 bg-red-500/20 rounded-2xl border border-red-500/30 backdrop-blur-md">
            <Youtube className="text-red-400" size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Prossima Live Youtube
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 pt-4">
          {/* Prossima Live */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-4 sm:p-6 border border-white/10 flex flex-col w-full">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
              {/* Loading skeleton placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Youtube className="text-red-500" size={32} />
                  </div>
                  <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse" />
                </div>
              </div>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/1fh7LMxRmtE"
                title="Prossima Live WinToolkit"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onLoad={(e) => {
                  // Hide skeleton when iframe loads
                  const skeleton = e.currentTarget
                    .previousSibling as HTMLElement;
                  if (skeleton) {
                    skeleton.style.display = "none";
                  }
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
