"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "@/components/site-preferences";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const isVisible = () => window.scrollY > 480;

export function BackToTop() {
  const visible = useSyncExternalStore(subscribe, isVisible, () => false);
  const { language } = useLocale();
  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "back_forward" || window.location.hash) return;
    // Finish the initial router render before resetting a restored browser position.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!visible) return null;
  return <button type="button" className="back-to-top" aria-label={language === "id" ? "Kembali ke atas" : "Back to top"} onClick={() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    if (!params.has("service") && !params.has("training")) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }}><ArrowUp size={20} aria-hidden="true" /></button>;
}
