"use client";
import { Text, useLocale } from "@/components/site-preferences";

import { useEffect, useRef, useState } from "react";

const statistics = [
  { value: 13, suffix: " years", label: "Years of industry experience" },
  { value: 500, suffix: "+", label: "Corporate clients" },
  { value: 1000, suffix: "+", label: "Certifications & services" },
  { value: 3, suffix: " offices", label: "Offices across Indonesia" },
];
const targets = statistics.map((stat) => stat.value);

export function CompanyStats() {
  const { t, language } = useLocale();
  const formatNumber = (value: number) => value.toLocaleString(language === "id" ? "id-ID" : "en-US");
  const section = useRef<HTMLElement>(null);
  // The published totals remain available before JavaScript and to screen readers.
  const [counts, setCounts] = useState(targets);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => {
      window.cancelAnimationFrame(frame);
      setCounts(targets);
    };
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      if (preference.matches) return;

      setCounts(targets.map(() => 0));
      let start: number | null = null;
      const tick = (timestamp: number) => {
        start ??= timestamp;
        const progress = Math.min((timestamp - start) / 1800, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts(targets.map((value) => Math.floor(value * eased)));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    if (section.current) observer.observe(section.current);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <section ref={section} className="stats-section" aria-label={t("REI Sistem in numbers")}>
      <div className="container stats-grid">
        {statistics.map((stat, index) => (
          <div key={stat.label}>
            <strong aria-label={t(`${formatNumber(stat.value)}${stat.suffix}`)}>
              <span className={`stat-number${stat.suffix === "+" ? " stat-number-fluid" : ""}`} aria-hidden="true">
                {stat.suffix !== "+" && <span className="stat-reserve">{formatNumber(stat.value)}</span>}
                <span className="stat-value">{formatNumber(counts[index])}</span>
              </span>
              <span className={stat.suffix === "+" ? "stat-plus" : undefined} aria-hidden="true"><Text value={stat.suffix} /></span>
            </strong>
            <p><Text value={stat.label} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}
