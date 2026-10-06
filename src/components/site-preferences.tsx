"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { Languages } from "lucide-react";
import { SiteSelect } from "@/components/site-select";
import { translate } from "@/data/translations";

type Language = "en" | "id";
const preferenceKey = "rei-preferences";
const defaults = { language: "en" as Language };
const PreferenceContext = createContext(defaults);
let memoryPreferences: Partial<typeof defaults> | null = null;
const subscribe = (callback: () => void) => {
  const onStorage = () => { memoryPreferences = null; callback(); };
  window.addEventListener("rei-preferences", callback);
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener("rei-preferences", callback); window.removeEventListener("storage", onStorage); };
};
function snapshot() {
  let saved: Partial<typeof defaults> = {};
  try { const parsed = JSON.parse(localStorage.getItem(preferenceKey) ?? "{}"); if (parsed && typeof parsed === "object") saved = parsed; } catch { /* Storage can be unavailable in private browsers. */ }
  if (memoryPreferences) saved = memoryPreferences;
  return saved.language === "id" ? "id" : "en";
}
function save(language: Language) {
  memoryPreferences = { language };
  try { localStorage.setItem(preferenceKey, JSON.stringify({ language })); } catch { /* Keep controls functional without storage. */ }
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  window.dispatchEvent(new Event("rei-preferences"));
}

export function SitePreferences({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, snapshot, () => "en") as Language;
  useEffect(() => {
    document.documentElement.lang = language;
    delete document.documentElement.dataset.theme;
    document.documentElement.dataset.language = language;
  }, [language]);
  return <PreferenceContext.Provider value={{ language }}>{children}<ScrollAnimations /></PreferenceContext.Provider>;
}
export function useLocale() {
  const { language } = useContext(PreferenceContext);
  return { language, t: (value: string) => translate(value, language) };
}
export function Text({ value }: { value: ReactNode }) {
  const { t } = useLocale();
  return typeof value === "string" ? t(value) : value;
}
export function PreferenceControls({ className = "" }: { className?: string }) {
  const { language, t } = useLocale();
  return <div className={`preference-controls ${className}`}>
    <SiteSelect className="language-select" label={t("Language")} value={language} onChange={(value) => save(value as Language)} triggerLabel={language.toUpperCase()} icon={<Languages size={17} aria-hidden="true" />} options={[{ value: "en", label: "English", code: "EN" }, { value: "id", label: "Bahasa Indonesia", code: "ID" }]} />
  </div>;
}

function ScrollAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selector = ".about-visual, .about-copy, .video-section .section-heading, .video-grid, .services-heading, .services-toolbar, .services-browser, .hot-training-heading, .events-toolbar, .events-stage, .publications-heading, .publications-toolbar, .publication-stage > .container, .contact-layout, .footer-grid";
    const seen = new WeakSet<Element>();
    const pending = new Set<HTMLElement>();
    const running = new Map<HTMLElement, Animation>();
    let discoveryFrame: number | null = null;
    let skipUntil = 0;
    function settle(element: HTMLElement) {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      running.get(element)?.cancel();
      running.delete(element);
      pending.delete(element);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (reduced.matches || performance.now() < skipUntil) { settle(element); return; }
        const animation = element.animate([
          { opacity: .8, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 400, easing: "cubic-bezier(.2,.65,.3,1)", fill: "both" });
        running.set(element, animation);
        animation.onfinish = () => settle(element);
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    function discover() {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        // Already visible content stays still, including reloads at an anchor.
        if (reduced.matches || element.getBoundingClientRect().top < window.innerHeight) return;
        element.style.opacity = ".8";
        element.style.transform = "translateY(6px)";
        pending.add(element);
        observer.observe(element);
      });
    }
    discover();
    const mutations = new MutationObserver(() => {
      if (discoveryFrame !== null) return;
      discoveryFrame = requestAnimationFrame(() => { discoveryFrame = null; discover(); });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    const cancel = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      Array.from(pending).forEach(settle);
    };
    const skipNavigation = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("a[href^='#']")) return;
      skipUntil = performance.now() + 1000;
      Array.from(running.keys()).forEach(settle);
    };
    document.addEventListener("click", skipNavigation, true);
    reduced.addEventListener("change", cancel);
    return () => {
      observer.disconnect(); mutations.disconnect();
      if (discoveryFrame !== null) cancelAnimationFrame(discoveryFrame);
      Array.from(pending).forEach(settle);
      document.removeEventListener("click", skipNavigation, true);
      reduced.removeEventListener("change", cancel);
    };
  }, []);
  return null;
}
