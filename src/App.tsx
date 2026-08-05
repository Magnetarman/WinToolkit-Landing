import { LanguageProvider, useTranslation } from "./i18n/LanguageContext";
import { useOnlineGitHubData } from "./hooks/useGitHubData";
import {
  Hero,
  DescriptionBox,
  RequirementsSection,
  VersionTabs,
  StatsGrid,
  RepositoryStatus,
  CommunitySection,
  YouTubeSection,
  Footer,
  LazySection,
} from "./components";

function AppContent() {
  const { data: githubData } = useOnlineGitHubData();
  const { language } = useTranslation();

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* Cyberpunk Liquid Background Effects with Neon Colors */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cyan/Teal glow - primary cyberpunk */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        {/* Purple/Red glow - cyberpunk accent */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/20 blur-[120px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        {/* Neon green accent */}
        <div
          className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-emerald-500/15 blur-[100px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        {/* Additional neon accent - red/fire */}
        <div
          className="absolute top-[20%] right-[20%] w-[25%] h-[25%] rounded-full bg-red-500/15 blur-[80px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "15s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section - Loaded immediately for LCP */}
        <Hero />

        {/* Project Description Box - Lazy loaded */}
        <LazySection key={`desc-${language}`}>
          <DescriptionBox />
        </LazySection>

        {/* Avvia WinToolkit Macro Section - Lazy loaded */}
        <LazySection key={`req-${language}`}>
          <RequirementsSection />
        </LazySection>

        <LazySection key={`ver-${language}`}>
          <VersionTabs />
        </LazySection>

        <LazySection key={`stats-${language}`}>
          {githubData && <StatsGrid data={githubData} />}
        </LazySection>

        <LazySection key={`repo-${language}`}>
          <RepositoryStatus />
        </LazySection>

        {/* Partecipa al progetto - Lazy loaded */}
        <LazySection key={`comm-${language}`}>
          <CommunitySection />
        </LazySection>

        {/* YouTube Section - Lazy loaded */}
        <LazySection key={`yt-${language}`}>
          <YouTubeSection />
        </LazySection>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
