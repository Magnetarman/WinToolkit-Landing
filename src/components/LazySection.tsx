import type { ReactNode } from "react";
import { useLazySection } from "../hooks/useLazySection";

interface LazySectionProps {
  children: ReactNode;
}

export function LazySection({ children }: LazySectionProps) {
  const { ref, isVisible } = useLazySection(0.1);

  return (
    <div ref={ref} className={isVisible ? "animate-fade-in" : "opacity-0"}>
      {isVisible ? children : <div className="min-h-[200px]" />}
    </div>
  );
}
