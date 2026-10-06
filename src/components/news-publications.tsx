"use client";
import { Text, useLocale } from "@/components/site-preferences";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, ExternalLink, X } from "lucide-react";
import { publications, publicationCategories, type Publication, type PublicationCategory } from "@/data/publications";
import { PublicationImage } from "@/components/publication-image";
import { MagazinePdf } from "@/components/magazine-pdf";

const subscribeToViewport = (callback: () => void) => {
  const tablet = window.matchMedia("(min-width: 761px)");
  const desktop = window.matchMedia("(min-width: 1024px)");
  tablet.addEventListener("change", callback); desktop.addEventListener("change", callback);
  return () => { tablet.removeEventListener("change", callback); desktop.removeEventListener("change", callback); };
};
const getCardLimit = () => window.innerWidth >= 1024 ? 6 : window.innerWidth >= 761 ? 4 : 2;
const getServerCardLimit = () => 6;

export function NewsPublications() {
  const { t } = useLocale();
  const [category, setCategory] = useState<PublicationCategory>("All");
  const [batches, setBatches] = useState(1);
  const limit = useSyncExternalStore(subscribeToViewport, getCardLimit, getServerCardLimit);
  const [active, setActive] = useState<Publication | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const moreControls = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const matches = publications.filter((item) => category === "All" || item.category === category);
  const visible = matches.slice(0, limit * batches);

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [active]);

  function openDetails(item: Publication) {
    if (!dialog.current || dialog.current.open) return;
    setActive(item); dialog.current.showModal(); dialog.current.scrollTop = 0;
  }

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  function toggleRows(closing: boolean) {
    if (animating || !results.current || !reveal.current) return;
    const viewport = reveal.current;
    const grid = results.current;
    const from = grid.getBoundingClientRect().height;
    const controlsTop = moreControls.current?.getBoundingClientRect().top;
    const keepControlsVisible = closing && controlsTop !== undefined && controlsTop > 0 && controlsTop < window.innerHeight;
    let to: number;
    if (closing) {
      const lastCard = grid.children[Math.min(limit, matches.length) - 1];
      to = lastCard.getBoundingClientRect().bottom - grid.getBoundingClientRect().top;
    } else {
      flushSync(() => setBatches((current) => current + 1));
      to = grid.getBoundingClientRect().height;
    }
    viewport.style.height = `${from}px`;
    viewport.style.overflow = "clip";
    setAnimating(true);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 520;
    const start = performance.now();
    function frame(now: number) {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      viewport.style.height = `${from + (to - from) * eased}px`;
      // Keep the clicked controls in view as rows fold away, without a final jump.
      if (keepControlsVisible && moreControls.current) {
        window.scrollBy({ top: moreControls.current.getBoundingClientRect().top - controlsTop!, behavior: "instant" });
      }
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(frame);
      } else {
        if (closing) flushSync(() => setBatches(1));
        viewport.style.removeProperty("height");
        viewport.style.removeProperty("overflow");
        animationFrame.current = null;
        flushSync(() => setAnimating(false));
        if (closing) moreControls.current?.querySelector("button")?.focus({ preventScroll: true });
      }
    }
    animationFrame.current = requestAnimationFrame(frame);
  }

  return (
    <section className="publications-section" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <div className="publications-heading"><h2 id="insights-title"><Text value={"News & Publications"} /></h2><p><Text value={"Company news, regulatory updates and System Magazine."} /></p></div>
        <div className="publications-toolbar">
          <div className="publication-filters" role="group" aria-label={t("Filter publications")}>
            {publicationCategories.map((name) => <button key={name} type="button" disabled={animating} aria-pressed={category === name} aria-controls="publication-results" onClick={() => { setCategory(name); setBatches(1); }}><Text value={name} /></button>)}
          </div>
          <span className="publication-count" role="status" aria-live="polite" aria-atomic="true"><Text value={visible.length} /> <Text value={"of "} /><Text value={matches.length} /> <Text value={matches.length === 1 ? "publication" : "publications"} /></span>
        </div>
      </div>
      <div className="publication-stage">
        <div className="container">
          <div ref={reveal} className="publication-reveal" aria-busy={animating}>
          <div ref={results} className="insights-grid" id="publication-results">
            {visible.map((item) => <article className="publication-glass-card" key={item.id}>
              <div className="publication-frost-layer" aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 90vw, (max-width: 1023px) 45vw, 30vw" /></div>
              <div className={`publication-card-image${item.category === "News" ? " publication-card-photo" : ""}`}><Image src={item.image} alt={t(item.category === "News" ? item.title : `${item.title}: original REI cover`)} fill sizes="(max-width: 760px) 90vw, (max-width: 1023px) 45vw, 30vw" /></div>
              <div className="publication-card-copy">
                <div className="publication-card-meta"><span className="publication-card-category"><Text value={item.category} /></span><time dateTime={item.date} title={t(item.dateContext)}><Text value={item.dateLabel} /></time></div>
                <h3>{item.category === "News"
                  ? <Link href={`/news/${item.id}`} className="publication-open"><Text value={item.title} /></Link>
                  : <button type="button" className="publication-open" aria-haspopup="dialog" onClick={() => openDetails(item)}><Text value={item.title} /></button>}
                </h3>
                <p><Text value={item.summary} /></p>
                <div className="publication-card-bottom"><span aria-hidden="true"><Text value={item.category === "Magazine" ? "Read PDF" : item.category === "News" ? "Read article" : "View details"} /><ArrowRight size={17} /></span></div>
              </div>
            </article>)}
          </div>
          </div>
          {(visible.length < matches.length || batches > 1) && <div ref={moreControls} className="publication-more">
            {visible.length < matches.length && <button type="button" disabled={animating} aria-expanded={batches > 1} aria-controls="publication-results" onClick={() => toggleRows(false)}><Text value={"View more"} /><ArrowRight size={18} /></button>}
            {batches > 1 && <button type="button" disabled={animating} aria-expanded="true" aria-controls="publication-results" onClick={() => toggleRows(true)}><Text value={"View less"} /><ArrowUp size={18} /></button>}
          </div>}
        </div>
      </div>
      <dialog ref={dialog} className={`publication-dialog publication-preview-glass ${active?.category === "Magazine" ? "publication-pdf-dialog" : "publication-regulation-dialog"}`} aria-labelledby="publication-dialog-title" onClose={(event) => { if (event.target === event.currentTarget) setActive(null); }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close();
      }}>
        <div className="publication-dialog-bar"><h2 id="publication-dialog-title"><Text value={active?.title ?? "Publication"} /></h2><button type="button" aria-label={t("Close publication")} autoFocus onClick={() => dialog.current?.close()}><X size={22} /></button></div>
        {active?.category === "Magazine" && active.pdf && <MagazinePdf key={active.id} src={active.pdf} title={t(active.title)} />}
        {active?.category === "Regulatory Updates" && <div className="publication-regulation-grid">
          <div className="publication-regulation-poster"><PublicationImage key={active.id} src={active.image} title={t(active.title)} /><p><Text value={"Original REI publication, in Indonesian."} /></p></div>
          <div className="publication-reader">
            <p className="publication-reader-summary"><Text value={active.summary} /></p>
            <dl className="publication-facts"><div><dt><Text value={active.dateContext} /></dt><dd><time dateTime={active.date}><Text value={active.dateLabel} /></time></dd></div><div><dt><Text value={"Regulation reference"} /></dt><dd><Text value={active.reference} /></dd></div></dl>
            {active.sections.map((section) => <section className="publication-reader-section" key={section.title}><h3><Text value={section.title} /></h3><p><Text value={section.text} /></p></section>)}
            <div className="publication-sources"><h3><Text value={"Official regulation"} /></h3>{active.sources.filter((source) => !new URL(source.href).hostname.endsWith("reisistem.id")).map((source) => <a href={source.href} key={source.href} target="_blank" rel="noopener noreferrer"><Text value={source.label} /><ExternalLink size={15} /></a>)}</div>
          </div>
        </div>}
      </dialog>
    </section>
  );
}
