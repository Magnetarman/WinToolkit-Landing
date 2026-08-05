import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  const isEn = language === "en";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-cyan-400/20 bg-slate-950/70 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_40px_rgba(8,145,178,0.18)] backdrop-blur-xl sm:gap-4 sm:px-4">
      <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-slate-300 sm:text-[13px]">
        {t.switch.label[language]}
      </span>

      <div className="relative flex h-11 w-[150px] items-center overflow-hidden rounded-full border border-white/10 bg-slate-900/80 p-1 sm:h-12 sm:w-[172px]">
        <motion.span
          initial={false}
          className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 shadow-[0_8px_24px_rgba(34,211,238,0.3)]"
          animate={{ x: isEn ? "100%" : "0%" }}
          transition={{ type: "tween", ease: [0.5, 0, 0.5, 1], duration: 0.4 }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={() => setLanguage("it")}
          aria-pressed={language === "it"}
          className={`relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 sm:text-[12px] ${
            language === "it"
              ? "text-slate-950"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {t.switch.it}
        </button>

        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
          className={`relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 sm:text-[12px] ${
            language === "en"
              ? "text-slate-950"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {t.switch.en}
        </button>
      </div>
    </div>
  );
}
