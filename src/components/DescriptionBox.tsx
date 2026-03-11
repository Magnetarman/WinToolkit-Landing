import { Info } from "lucide-react";
import { motion } from "motion/react";

export function DescriptionBox() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
    >
      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-3xl p-4 sm:p-6 md:p-8 text-left shadow-2xl shadow-black/40 border border-white/10 max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Info className="text-cyan-300" size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Cos'è WinToolkit?
          </h2>
        </div>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-lg font-light">
          WinToolkit è una suite di script PowerShell potente e compatta,
          progettata per offrire a professionisti IT, amministratori di sistema
          e utenti esperti un controllo granulare sulla manutenzione e sulla
          risoluzione dei problemi di Windows e della Suite Office. Questo
          toolkit intuitivo aggrega gli strumenti di riparazione di sistema più
          efficaci in un'unica interfaccia, automatizzando i processi complessi
          per ottimizzare le prestazioni e ripristinare la stabilità del sistema
          con pochi passaggi automatizzati. Questo progetto è traslitterato
          tramite un workflow AI.
        </p>
      </div>
    </motion.section>
  );
}
