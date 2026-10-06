"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useLocale } from "@/components/site-preferences";

type DetailKind = "service" | "training";
const linkEvent = "rei-detail-link";

export function readDetailLink(kind: DetailKind) {
  const params = new URLSearchParams(window.location.hash.slice(1));
  return params.get(kind);
}

export function setDetailLink(kind: DetailKind, id: string) {
  const hash = `#${kind}=${encodeURIComponent(id)}`;
  if (window.location.hash === hash) return;
  window.history.pushState(null, "", hash);
  window.setTimeout(() => window.dispatchEvent(new Event(linkEvent)), 0);
}

export function clearDetailLink(kind: DetailKind, id: string) {
  if (readDetailLink(kind) !== id) return;
  window.history.replaceState(null, "", kind === "service" ? "#layanan" : "#training");
}

export function useDetailLink(kind: DetailKind, onChange: (id: string | null) => void) {
  const sync = useEffectEvent(() => onChange(readDetailLink(kind)));
  useEffect(() => {
    const frame = requestAnimationFrame(() => sync());
    const listener = () => sync();
    window.addEventListener("hashchange", listener);
    window.addEventListener("popstate", listener);
    window.addEventListener(linkEvent, listener);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", listener);
      window.removeEventListener("popstate", listener);
      window.removeEventListener(linkEvent, listener);
    };
  }, [kind]);
}

export function CopyDetailLink({ kind, id }: { kind: DetailKind; id: string }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState("");
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  return <div className="detail-share">
    <button type="button" className="detail-share-button" onClick={async () => {
      const url = new URL("/", window.location.origin);
      url.hash = `${kind}=${encodeURIComponent(id)}`;
      try {
        await navigator.clipboard.writeText(url.href);
        setCopied(true);
        setFallback("");
      } catch { setFallback(url.href); }
    }}>{copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}<span aria-live="polite">{t(copied ? "Link copied" : "Copy link")}</span></button>
    {fallback && <label className="detail-share-fallback">{t("Copy this link")}<input readOnly value={fallback} onFocus={(event) => event.currentTarget.select()} /></label>}
  </div>;
}
